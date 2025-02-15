import { FormEvent, useState } from "react";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../../components/fieldset";
import { Heading } from "../../components/heading";
import { Input } from "../../components/input";
import Layout from "../../components/Layout";
import { Text } from "../../components/text";
import { Textarea } from "../../components/textarea";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { useNavigate } from "react-router";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name,
        description,
        videoUrl,
      };

      const response = await axiosConfig.post("/rooms", data);
      toast.success(response.data.message);
      return navigate("/rooms");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };
  return (
    <>
      <Layout>
        <Heading>Create room</Heading>
        <Divider className="my-6" />
        <div>
          <form action="" className="w-1/2">
            <Fieldset>
              <Legend>Create a new room</Legend>
              <Text>Make your own room and enjoy</Text>
              <FieldGroup>
                <Field>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field>
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field>
                <Field>
                  <Label>Video URL</Label>
                  <Input
                    name="video_url"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </Field>
                <Button
                  className="hover:cursor-pointer w-full"
                  color="dark/white"
                  onClick={handleCreateRoom}
                >
                  Create
                </Button>
              </FieldGroup>
            </Fieldset>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CreateRoom;
