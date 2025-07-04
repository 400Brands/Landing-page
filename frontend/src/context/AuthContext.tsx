import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createClient,
  SupabaseClient,
  AuthSession,
  AuthError,
  User,
} from "@supabase/supabase-js";

// Define types for the auth context
type AuthContextType = {
  session: AuthSession | null;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    data: { user: User | null; session: AuthSession | null } | null;
    error: AuthError | null;
  }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<{
    data: { user: User | null; session: AuthSession | null } | null;
    error: AuthError | null;
  }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: {
    email?: string;
    password?: string;
    data?: Record<string, any>;
  }) => Promise<{
    data: { user: User | null } | null;
    error: AuthError | null;
  }>;
  supabase: SupabaseClient;
};

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Create the context with initial values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => ({ data: null, error: null }),
  signOut: async () => ({ error: null }),
  signUp: async () => ({ data: null, error: null }),
  resetPassword: async () => ({ error: null }),
  updateProfile: async () => ({ data: null, error: null }),
  supabase,
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider props type
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("🔧 AuthProvider: Initializing...");

    // Get initial session
    const getSession = async () => {
      try {
        console.log("🔍 AuthProvider: Getting initial session...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log("📊 AuthProvider: Initial session result:", {
          hasSession: !!session,
          userEmail: session?.user?.email,
          error: error?.message,
        });

        if (error) {
          console.error("❌ AuthProvider: Error getting session:", error);
        } else {
          console.log("✅ AuthProvider: Session retrieved successfully");
        }

        setSession(session);
        setLoading(false);
      } catch (err) {
        console.error("💥 AuthProvider: Exception getting session:", err);
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 AuthProvider: Auth state changed:", {
        event,
        hasSession: !!session,
        userEmail: session?.user?.email,
      });

      setSession(session);
      setLoading(false);

      // Handle different auth events
      switch (event) {
        case "SIGNED_IN":
          console.log("✅ AuthProvider: User signed in:", session?.user?.email);
          break;
        case "SIGNED_OUT":
          console.log("👋 AuthProvider: User signed out");
          break;
        case "TOKEN_REFRESHED":
          console.log("🔄 AuthProvider: Token refreshed");
          break;
        case "USER_UPDATED":
          console.log("📝 AuthProvider: User updated");
          break;
        default:
          console.log("❓ AuthProvider: Unknown event:", event);
      }
    });

    console.log("👂 AuthProvider: Auth listener setup complete");

    return () => {
      console.log("🧹 AuthProvider: Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    console.log("🔐 AuthProvider: Attempting sign in for:", email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      console.log("✅ AuthProvider: Sign in successful");
      return { data, error: null };
    } catch (error) {
      console.error("❌ AuthProvider: Sign in error:", error);
      return { data: null, error: error as AuthError };
    }
  };

  // Sign out function
  const signOut = async () => {
    console.log("👋 AuthProvider: Attempting sign out");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("✅ AuthProvider: Sign out successful");
      return { error: null };
    } catch (error) {
      console.error("❌ AuthProvider: Sign out error:", error);
      return { error: error as AuthError };
    }
  };

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    metadata: Record<string, any> = {}
  ) => {
    console.log("📝 AuthProvider: Attempting sign up for:", email);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      console.log("✅ AuthProvider: Sign up successful");
      return { data, error: null };
    } catch (error) {
      console.error("❌ AuthProvider: Sign up error:", error);
      return { data: null, error: error as AuthError };
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    console.log("🔑 AuthProvider: Attempting password reset for:", email);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      console.log("✅ AuthProvider: Password reset email sent");
      return { error: null };
    } catch (error) {
      console.error("❌ AuthProvider: Reset password error:", error);
      return { error: error as AuthError };
    }
  };

  // Update user profile
  const updateProfile = async (updates: {
    email?: string;
    password?: string;
    data?: Record<string, any>;
  }) => {
    console.log("📝 AuthProvider: Attempting profile update");
    try {
      const { data, error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      console.log("✅ AuthProvider: Profile updated successfully");
      return { data, error: null };
    } catch (error) {
      console.error("❌ AuthProvider: Update profile error:", error);
      return { data: null, error: error as AuthError };
    }
  };

  const value: AuthContextType = {
    session,
    user: session?.user || null,
    loading,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile,
    supabase,
  };

  // Debug current state
  console.log("🎯 AuthProvider: Current state:", {
    hasSession: !!session,
    userEmail: session?.user?.email,
    loading,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
