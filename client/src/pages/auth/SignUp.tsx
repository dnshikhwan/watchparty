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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    try {
      const data = {
        username,
        email,
        password,
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form action="" className="w-full max-w-md">
          <Fieldset>
            <Legend>Create your new account!</Legend>
            <Text>Join us and watch together with friends and family</Text>
            <FieldGroup>
              <Field>
                <Label>Username</Label>
                <Input name="username" type="text" />
              </Field>
              <Field>
                <Label>Email Address</Label>
                <Input name="email" type="email" />
              </Field>
              <Field>
                <Label>Password</Label>
                <Input type="password" name="password" />
              </Field>
              <Field>
                <Label>Confirm Password</Label>
                <Input name="confirm_password" type="password" />
              </Field>
              <Button className="w-full" color="white">
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
