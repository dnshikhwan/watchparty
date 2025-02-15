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
import { Alert, AlertActions, AlertTitle } from "../../components/alert";
import toast from "react-hot-toast";
import { axiosConfig } from "../../axiosConfig";
import { AxiosError } from "axios";

interface Friend {
  friend: {
    id: number;
    username: string;
    email: string;
  };
}

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.get(`/friends/search?query=${query}`);
      console.log(response);
      setResults(response.data.details.data.users);
    } catch (err) {
      setResults([]);
      toast.error("User not found.");
      console.log(err);
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

  useEffect(() => {
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

    fetchFriends();
  }, []);

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
                onChange={(e) => setQuery(e.target.value)}
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
          <Button className="hover:cursor-pointer" color="dark/white">
            Friend request
            {pendingCount !== 0 && (
              <Badge color="red">{pendingCount > 0 ? pendingCount : ""}</Badge>
            )}
          </Button>
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
                ? friends.map(({ friend }) => (
                    <TableRow>
                      <TableCell className="flex items-center gap-2">
                        <Avatar
                          className="size-8"
                          src={`https://avatar.iran.liara.run/public/${friend.id}`}
                        />
                        {friend.username}
                      </TableCell>
                      <TableCell>
                        {/* <Badge color={status === "Online" ? "green" : "red"}>
                          {status}
                        </Badge> */}
                      </TableCell>
                      <TableCell>
                        <Badge>Join room</Badge>
                        <Badge className="ml-2">Chat</Badge>
                        <Badge
                          color="red"
                          onClick={() => setIsOpen(true)}
                          className="ml-2 hover:cursor-pointer"
                        >
                          Unfriend
                        </Badge>
                        <Alert open={isOpen} onClose={setIsOpen}>
                          <AlertTitle>Are you sure?</AlertTitle>

                          <AlertActions>
                            <Button plain onClick={() => setIsOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              color="red"
                              onClick={() => setIsOpen(false)}
                            >
                              Unfriend
                            </Button>
                          </AlertActions>
                        </Alert>
                      </TableCell>
                    </TableRow>
                  ))
                : results.map(({ id, username }) => (
                    <TableRow>
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
                        <Badge
                          color="red"
                          onClick={() => setIsOpen(true)}
                          className="ml-2 hover:cursor-pointer"
                        >
                          Unfriend
                        </Badge>
                        <Alert open={isOpen} onClose={setIsOpen}>
                          <AlertTitle>Are you sure?</AlertTitle>

                          <AlertActions>
                            <Button plain onClick={() => setIsOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              color="red"
                              onClick={() => setIsOpen(false)}
                            >
                              Unfriend
                            </Button>
                          </AlertActions>
                        </Alert>
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
