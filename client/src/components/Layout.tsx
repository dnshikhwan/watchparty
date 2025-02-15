import { ReactNode } from "react";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "./navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarSection,
} from "./sidebar";
import { StackedLayout } from "./stacked-layout";
import { Button } from "./button";
import { Avatar } from "./avatar";

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
            <NavbarSpacer />
            <NavbarSection>
              <Avatar
                className="size-8"
                src={"https://avatar.iran.liara.run/public"}
              />
              <NavbarItem className="max-lg:hidden">
                <Button color="dark/white">Sign out</Button>
              </NavbarItem>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarBody>
              <SidebarSection>
                {navItems.map(({ label, url }) => (
                  <SidebarItem key={label} href={url}>
                    {label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
            <SidebarFooter>
              <SidebarSection>
                <SidebarItem>
                  <Button color="dark/white">Sign out</Button>
                </SidebarItem>
              </SidebarSection>
            </SidebarFooter>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
    </>
  );
};

export default Layout;
