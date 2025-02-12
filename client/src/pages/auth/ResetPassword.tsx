import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { axiosConfig } from "../../axiosConfig";
import { Text } from "../../components/text";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../../components/fieldset";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

const ResetPassword = () => {
  const { token } = useParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  console.log(token);

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const response = await axiosConfig.get(`/auth/reset-password/${token}`);
        console.log(response.data);
        setTokenValid(true);
        setUserId(response.data.details.data.user_id);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          setTokenValid(false);
        }
      }
    };

    verifyResetToken();
  }, []);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        user_id: userId,
        password,
      };

      const response = await axiosConfig.put("/auth/reset-password", data);
      toast.success(response.data.message);
      navigate("/auth/signin");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        {!tokenValid ? (
          <div className="w-full max-w-sm">
            <Fieldset>
              <Legend>Invalid or expired token</Legend>
              <Text>
                Please request a new link. It will be sent to your email address
              </Text>
              <Button
                onClick={() => navigate("/auth/request-reset-password")}
                className="w-full hover:cursor-pointer mt-5"
                color="dark/white"
              >
                Request
              </Button>
            </Fieldset>
          </div>
        ) : (
          <form action="" className="w-full max-w-sm">
            <Fieldset>
              <Legend>Reset password</Legend>
              <Text>Please enter your new password</Text>
              <FieldGroup>
                <Field>
                  <Label>New Password</Label>
                  <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <Label>Confirm Password</Label>
                  <Input
                    name="confirm_password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>
                <Button
                  className="w-full hover:cursor-pointer"
                  color="dark/white"
                  onClick={handleResetPassword}
                >
                  Reset password
                </Button>
              </FieldGroup>
            </Fieldset>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
