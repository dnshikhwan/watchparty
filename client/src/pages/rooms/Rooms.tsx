import { Link } from "react-router";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { Heading, Subheading } from "../../components/heading";
import { Input, InputGroup } from "../../components/input";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { Room } from "../../interfaces/room.interface";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { Text } from "../../components/text";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosConfig.get("/rooms");
        setRooms(response.data.details.data.rooms);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Layout>
        <Heading>Rooms</Heading>
        <Divider className="my-6" />
        <div>
          <form action="" className="flex justify-between">
            <InputGroup>
              <Input
                name="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </InputGroup>
            <Button color="dark/white" className="hover:cursor-pointer">
              <Link to={"/rooms/create"}>Create room</Link>
            </Button>
          </form>
        </div>
        <div className="mt-10">
          <Heading level={2}>Trending</Heading>
          <div className="mt-5 grid max-w-2xl gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {rooms.map((room) => (
              <article
                key={room.id}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <img
                    alt=""
                    src={""}
                    className="aspect-video w-3/4 max-sm:w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div className="max-w-xl">
                  <div className="group relative">
                    <Subheading className="mt-3">{room.name}</Subheading>
                    <Text>{room.description}</Text>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Rooms;
