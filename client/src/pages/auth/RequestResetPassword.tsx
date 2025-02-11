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

const RequestResetPassword = () => {
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
                <Input name="email" type="email" />
              </Field>
              <Button
                className="w-full hover:cursor-pointer"
                color="dark/white"
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
