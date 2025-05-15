declare module "@heroui/link" {
  import * as React from "react";
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children?: React.ReactNode;
    isExternal?: boolean; // ✅ Add this line
  }

  export const Link: React.FC<LinkProps>;
  export default Link;
}
