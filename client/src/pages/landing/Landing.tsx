import { Link } from "react-router";
import { Divider } from "../../components/divider";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "../../components/navbar";
import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { Heading, Subheading } from "../../components/heading";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/howitworks" },
  { name: "Supports", href: "/supports" },
  { name: "Plans", href: "/plans" },
];

const Landing = () => {
  return (
    <>
      <div className="flex-col w-full min-h-screen">
        <div>
          <Navbar>
            <Link to={"/"}>
              <Text className="ml-2">WatchParty</Text>
            </Link>
            <NavbarSection>
              {navigation.map(({ name, href }) => (
                <NavbarItem href={href}>{name}</NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem>
                <Button color="dark/white">
                  <Link to={"/auth/signin"}>Sign in</Link>
                </Button>
              </NavbarItem>
            </NavbarSection>
          </Navbar>
          <Divider />
        </div>
        <div>
          <Heading>A new way to watch TV together</Heading>
          <Text>
            WatchParty is a new way to watch TV with your friends online.
            WatchParty synchronizes video playback and adds group chat to your
            rooms.
          </Text>
          <Button color="dark/white">
            <Link to={"/auth/signup"}>Get started</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Landing;
