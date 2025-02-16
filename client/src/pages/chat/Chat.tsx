import { useParams } from "react-router";
import { Heading } from "../../components/heading";
import Layout from "../../components/Layout";
import { Divider } from "../../components/divider";
import { Input } from "../../components/input";

const Chat = () => {
  const { username } = useParams();
  return (
    <div>
      <Layout>
        <Heading>{username}</Heading>
        <Divider className="my-5" />
        <div className="max-w-2xl">
          <div className="min-h-[400px] bg-gray-950 flex-col"></div>
          <Input name="message" placeholder="Message..." />
        </div>
      </Layout>
    </div>
  );
};

export default Chat;
