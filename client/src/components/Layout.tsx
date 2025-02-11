import { ReactNode } from "react";
import { Navbar, NavbarItem, NavbarSection } from "./navbar";
import { Sidebar, SidebarBody, SidebarItem } from "./sidebar";
import { StackedLayout } from "./stacked-layout";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Home", url: "/dashboard" },
  { label: "Rooms", url: "/rooms" },
  { label: "Friends", url: "/friends" },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <StackedLayout
        navbar={
          <Navbar>
            <NavbarSection className="max-lg:hidden">
              {navItems.map(({ label, url }) => (
                <NavbarItem key={label} href={url}>
                  {label}
                </NavbarItem>
              ))}
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarBody>
              {navItems.map(({ label, url }) => (
                <SidebarItem key={label} href={url}>
                  {label}
                </SidebarItem>
              ))}
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
    </>
  );
};

export default Layout;
