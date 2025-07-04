import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  User,
} from "@heroui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Define the allowed size types
type ButtonSize = "sm" | "md" | "lg";

// Define component props interface
interface GetStartedProps {
  size: ButtonSize;
}

export default function GetStarted({ size }: GetStartedProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // Use the auth context
  const { session, user, loading, signOut, supabase } = useAuth();

  // Debug logging
  console.log("🎨 GetStarted: Component state:", {
    hasSession: !!session,
    userEmail: session?.user?.email,
    loading,
  });

  const handleOpen = () => {
    onOpen();
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose(); // Close modal if open
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const renderAuthContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!session) {
      return (
        <Auth
          providers={["google"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
        />
      );
    } else {
      return (
        <div className="text-center p-4">
          <div className="mb-4">
            <Avatar
              src={user?.user_metadata?.avatar_url}
              name={user?.user_metadata?.full_name || user?.email}
              size="lg"
              showFallback
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
          <p className="text-sm text-gray-600 mb-4">
            {user?.user_metadata?.full_name || user?.email}
          </p>
          <Button
            onPress={() => {
              onClose();
              navigateToDashboard();
            }}
            className="bg-primary text-white"
          >
            Go to Dashboard
          </Button>
        </div>
      );
    }
  };

  // Get user info for display
  const userDisplayName =
    user?.user_metadata?.full_name || user?.email || "User";
  const userEmail = user?.email || "";
  const userAvatar = user?.user_metadata?.avatar_url;

  // Check current route
  const isOnDashboard = location.pathname === "/dashboard";
  const isOnProfile = location.pathname === "/profile";
  const isOnSettings = location.pathname === "/settings";

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Show authenticated user dropdown
  if (session) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              {/* Optional: Show user name next to avatar on larger screens */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{userDisplayName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>

              <Avatar
                isBordered
                color="success"
                src={userAvatar}
                name={userDisplayName}
                size={size}
                showFallback
                className="transition-transform"
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            className="w-60"
            itemClasses={{
              base: "rounded-md",
              title: "font-medium",
              description: "text-sm opacity-70",
            }}
          >
            <DropdownSection showDivider>
              <DropdownItem
                key="profile-info"
                isReadOnly
                className="h-14 gap-2"
                textValue="Profile Info"
              >
                <User
                  name={userDisplayName}
                  description={userEmail}
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-400",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: userAvatar,
                  }}
                />
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="dashboard"
                onPress={navigateToDashboard}
                className={isOnDashboard ? "bg-primary-50" : ""}
                startContent={
                  <div className="flex items-center justify-center w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path
                        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                }
              >
                Dashboard
              </DropdownItem>

              <DropdownItem
                key="profile"
                onPress={navigateToProfile}
                className={isOnProfile ? "bg-primary-50" : ""}
                startContent={
                  <div className="flex items-center justify-center w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                }
              >
                Profile
              </DropdownItem>

              <DropdownItem
                key="settings"
                onPress={navigateToSettings}
                className={isOnSettings ? "bg-primary-50" : ""}
                startContent={
                  <div className="flex items-center justify-center w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path
                        d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                }
              >
                Settings
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="help"
                startContent={
                  <div className="flex items-center justify-center w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                }
              >
                Help & Support
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={handleSignOut}
                startContent={
                  <div className="flex items-center justify-center w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path
                        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                }
              >
                Sign Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  // Show sign-in button for unauthenticated users
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          size={size}
          onPress={handleOpen}
          className="bg-primary text-default-100"
        >
          Get Started
        </Button>
      </div>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
            <ModalBody className="pb-6">{renderAuthContent()}</ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
