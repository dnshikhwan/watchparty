import { FormEvent, useState } from "react";
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
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleRequestResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email,
      };

      const response = await axiosConfig.post(
        "/auth/request-reset-password",
        data
      );
      toast.success(response.data.message);
      setEmail("");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        setEmail("");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form action="" className="w-full max-w-sm">
          <Fieldset>
            <Legend>Reset your password</Legend>
            <Text>
              Please provide your email address. A link will be sent to you
            </Text>
            <FieldGroup>
              <Field>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Button
                className="w-full hover:cursor-pointer"
                color="dark/white"
                onClick={handleRequestResetPassword}
              >
                Submit
              </Button>
            </FieldGroup>
          </Fieldset>
        </form>
      </div>
    </>
  );
};

export default RequestResetPassword;
