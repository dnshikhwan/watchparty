import { useParams } from "react-router";
import { IoMdSend } from "react-icons/io";

import { Heading } from "../../components/heading";
import Layout from "../../components/Layout";
import { Divider } from "../../components/divider";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useState } from "react";
import { Badge } from "../../components/badge";

interface Message {
  id: number;
  type: string;
  message: string;
}

const Chat = () => {
  const { username } = useParams();
  const [messages, setMessage] = useState<Message[]>([
    { id: 1, type: "message", message: "Hello, how are you?" },
    { id: 2, type: "answer", message: "Im fine, how about you?" },
    { id: 3, type: "message", message: "Im good" },
    { id: 4, type: "answer", message: "Fuck you" },
    { id: 1, type: "message", message: "Hello, how are you?" },
    { id: 2, type: "answer", message: "Im fine, how about you?" },
    { id: 3, type: "message", message: "Im good" },
    { id: 4, type: "answer", message: "Fuck you" },
  ]);
  return (
    <div>
      <Layout>
        <Heading className="flex items-center gap-2">
          {username}
          <span className="flex w-2 h-2 me-3 bg-lime-400 rounded-full"></span>
        </Heading>
        <Divider className="my-5" />
        <div className="max-w-2xl mx-auto">
          <div className="h-[50vh] bg-gray-950 overflow-y-auto">
            <ul className="flex flex-col space-y-5">
              {messages.map(({ id, type, message }) => (
                <li
                  key={id}
                  className={`flex ${
                    type === "message" ? "justify-end " : "justify-start"
                  }`}
                >
                  <div
                    className={`text-white p-3 max-w-[70%] ${
                      type === "message" ? "bg-gray-700" : "bg-gray-800"
                    }`}
                  >
                    {message}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <Input name="message" placeholder="Message..." />
            <Button color="dark/white">
              <IoMdSend />
              Send
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Chat;
