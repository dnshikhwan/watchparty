import { Link } from "react-router";
import { Button } from "../../components/button";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../../components/fieldset";
import { Input } from "../../components/input";
import { Text } from "../../components/text";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error("Passwords don't match.");
      }

      const data = {
        username,
        email,
        password,
      };

      const response = await axiosConfig.post("/auth/signup", data);
      toast.success(response.data.message);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form action="" className="w-full max-w-sm">
          <Fieldset>
            <Legend>Create your new account!</Legend>
            <Text>Join us and watch together with friends and family</Text>
            <FieldGroup>
              <Field>
                <Label>Username</Label>
                <Input
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </Field>
              <Field>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Field>
              <Field>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
              </Field>
              <Field>
                <Label>Confirm Password</Label>
                <Input
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </Field>
              <Button
                onClick={handleSignUp}
                className="w-full hover:cursor-pointer dark:bg-white"
                color="dark/white"
              >
                Sign up
              </Button>
              <Text>
                Already have an accounnt?{" "}
                <Link to={"/auth/signin"} className="text-white">
                  Sign in
                </Link>
              </Text>
            </FieldGroup>
          </Fieldset>
        </form>
      </div>
    </>
  );
};

export default SignUp;
