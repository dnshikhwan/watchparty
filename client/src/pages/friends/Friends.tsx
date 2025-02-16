import { FormEvent, useEffect, useState } from "react";
import { Avatar } from "../../components/avatar";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { Heading, Subheading } from "../../components/heading";
import { Input, InputGroup } from "../../components/input";
import Layout from "../../components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { AxiosError } from "axios";
import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from "../../components/alert";
import PendingFriendModal from "../../components/PendingFriendModal";
import { Link } from "react-router";

interface Friend {
  status: string;
  friend: {
    id: number;
    username: string;
    email: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Friends = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingModal, setPendingModal] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.get(`/friends/search?query=${query}`);
      console.log(response);
      setResults(response.data.details.data.users);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPendingRequest = async () => {
      try {
        const response = await axiosConfig.get("/friends/pending");
        setPendingCount(response.data.details.data.pendingRequest.length);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      }
    };

    fetchPendingRequest();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axiosConfig.get("/friends");
      setFriends(response.data.details.data.friends);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleSendFriendRequest = async (e: FormEvent, friend_id: number) => {
    e.preventDefault();
    try {
      const data = {
        friend_id,
      };

      const response = await axiosConfig.post("/friends", data);
      toast.success(response.data.message);
      setQuery("");
      await handleSearch(e);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  const handleUnfollow = async (e: FormEvent, friend_id: number) => {
    e.preventDefault();
    try {
      const data = {
        friend_id,
      };

      const response = await axiosConfig.post("/friends/unfriend", data);
      toast.success(response.data.message);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  const username = localStorage.getItem("username");

  return (
    <>
      <Layout>
        <Heading>Friends</Heading>
        <Divider className="my-6" />
        <div className="flex items-center justify-between">
          <form action="" className="flex space-x-2 my-5">
            <InputGroup>
              <Input
                name="search"
                placeholder="Search friends..."
                aria-label="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e);
                }}
              />
            </InputGroup>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="max-lg:hidden hover:cursor-pointer"
            >
              Search
            </Button>
          </form>
          <Button
            onClick={() => setPendingModal(true)}
            className="hover:cursor-pointer"
            color="dark/white"
          >
            Friend request
            {pendingCount !== 0 && (
              <Badge color="red">{pendingCount > 0 ? pendingCount : ""}</Badge>
            )}
          </Button>
          <PendingFriendModal
            pendingModal={pendingModal}
            setPendingModal={setPendingModal}
          />
        </div>
        <div>
          <Subheading className="my-5">Friends list</Subheading>
          <Table dense>
            <TableHead>
              <TableRow>
                <TableHeader>Username</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.length === 0
                ? friends.map(({ status, friend, user }) => (
                    <TableRow key={friend.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar
                          className="size-8"
                          src={`https://avatar.iran.liara.run/public/${friend.id}`}
                        />
                        {friend.username === username
                          ? user.username
                          : friend.username}
                      </TableCell>
                      <TableCell>
                        {/* <Badge color={status === "Online" ? "green" : "red"}>
                          {status}
                        </Badge> */}
                      </TableCell>
                      <TableCell>
                        <Badge>Join room</Badge>
                        <Badge className="ml-2">
                          <Link
                            to={`/chat/${
                              friend.username === username
                                ? user.username
                                : friend.username
                            }`}
                          >
                            Chat
                          </Link>
                        </Badge>
                        {status === "accepted" ? (
                          <Badge
                            color="red"
                            onClick={(e) =>
                              handleUnfollow(
                                e,
                                friend.username === username
                                  ? user.id
                                  : friend.id
                              )
                            }
                            className="ml-2 hover:cursor-pointer"
                          >
                            Unfollow
                          </Badge>
                        ) : (
                          <Badge
                            color="green"
                            className="ml-2 hover:cursor-pointer"
                          >
                            Follow
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : results.map(({ id, username }) => (
                    <TableRow key={id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar
                          className="size-8"
                          src={`https://avatar.iran.liara.run/public/${id}`}
                        />
                        {username}
                      </TableCell>
                      <TableCell>
                        {/* <Badge color={status === "Online" ? "green" : "red"}>
                          {status}
                        </Badge> */}
                      </TableCell>
                      <TableCell>
                        <Badge>Join room</Badge>
                        <Badge className="ml-2">Chat</Badge>
                        {friends.some(({ friend }) => {
                          return friend.username === username;
                        }) ? (
                          <Badge
                            color="red"
                            className="ml-2 hover:cursor-pointer"
                          >
                            Unfollow
                          </Badge>
                        ) : (
                          <Badge
                            color="green"
                            onClick={(e) => handleSendFriendRequest(e, id)}
                            className="ml-2 hover:cursor-pointer"
                          >
                            Follow
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </Layout>
    </>
  );
};
export default Friends;
