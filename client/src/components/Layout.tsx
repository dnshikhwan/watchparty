import { FormEvent, ReactNode } from "react";
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
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../axiosConfig";
import { useNavigate } from "react-router";
import { Text } from "./text";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Home", url: "/dashboard" },
  { label: "Rooms", url: "/rooms" },
  { label: "Friends", url: "/friends" },
];

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.get("/auth/signout");
      toast.success(response.data.message);
      return navigate("/auth/signin");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };
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
              <Text>{username}</Text>
              <Avatar
                className="size-8"
                src={"https://avatar.iran.liara.run/public"}
              />
              <NavbarItem className="max-lg:hidden">
                <Button
                  className="hover:cursor-pointer"
                  onClick={handleSignOut}
                  color="dark/white"
                >
                  Sign out
                </Button>
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
                  <Button
                    className="hover:cursor-pointer"
                    onClick={handleSignOut}
                    color="dark/white"
                  >
                    Sign out
                  </Button>
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
