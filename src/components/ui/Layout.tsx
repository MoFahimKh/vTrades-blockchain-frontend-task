import React, { ReactNode } from "react";

import SideNavbar from "@/components/ui/sidenav";

import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showSidenavbar?: boolean;
}

// Main Layout
const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = false,
  showSidenavbar = false
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {showNavbar && <Navbar />}

      <div className="flex flex-1">
        {showSidenavbar && (
          <aside>
            <SideNavbar />
          </aside>
        )}

        <main className="flex-1 bg-[#f0f2f9] p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
