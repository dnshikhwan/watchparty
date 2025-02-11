import { Link, useNavigate } from "react-router";
import { Button } from "../../components/button";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../../components/fieldset";
import { Input } from "../../components/input";
import { Switch } from "../../components/switch";
import { Text } from "../../components/text";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };

      const response = await axiosConfig.post("/auth/signin", data);
      toast.success(response.data.message);
      return navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form action="" className="w-full max-w-sm">
          <Fieldset>
            <Legend>Welcome back</Legend>
            <Text>
              Join us back and enjoy quality time with someone you love!
            </Text>
            <FieldGroup>
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
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Field>
              <Field className="flex justify-between items-center">
                <Field className="flex gap-2">
                  <Switch name="remember_me" />
                  <Label>Remember me</Label>
                </Field>
                <Text>
                  <Link to={"/auth/request-reset-password"}>
                    Forgot password?
                  </Link>
                </Text>
              </Field>
              <Button
                className="w-full hover:cursor-pointer"
                color="dark/white"
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            </FieldGroup>
          </Fieldset>
        </form>
      </div>
    </>
  );
};

export default SignIn;
