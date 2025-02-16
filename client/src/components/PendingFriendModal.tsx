import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from "./alert";
import { Table, TableBody, TableCell, TableRow } from "./table";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosConfig } from "../axiosConfig";
import { FormEvent, useEffect, useState } from "react";
import { PendingFriends } from "../interfaces/friend.interface";

interface PendingFriendModalProps {
  pendingModal: boolean;
  setPendingModal: (value: boolean) => void;
}

const PendingFriendModal = ({
  pendingModal,
  setPendingModal,
}: PendingFriendModalProps) => {
  const [pendingFriends, setPendingFriends] = useState<PendingFriends[]>([]);
  const fetchPendingFriendRequest = async () => {
    try {
      const response = await axiosConfig.get("/friends/pending");
      setPendingFriends(response.data.details.data.pendingRequest);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchPendingFriendRequest();
  }, []);

  const handleAcceptFriend = async (e: FormEvent, friend_id: number) => {
    e.preventDefault();

    try {
      const data = {
        friend_id,
      };

      const response = await axiosConfig.post("/friends/accept", data);
      toast.success(response.data.message);
      fetchPendingFriendRequest();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <Alert size="2xl" onClose={setPendingModal} open={pendingModal}>
        <AlertTitle>Friend Request</AlertTitle>
        <AlertDescription>List of pending friends</AlertDescription>
        <AlertBody>
          <Table dense>
            <TableBody>
              {pendingFriends.map((pendingFriend) => (
                <TableRow>
                  <TableCell>
                    <Avatar
                      src={"https://avatar.iran.liara.run/public"}
                      className="size-6 mr-2"
                    />
                    {pendingFriend.user.username}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="hover:cursor-pointer"
                      color="green"
                      onClick={(e) =>
                        handleAcceptFriend(e, pendingFriend.user_id)
                      }
                    >
                      Accept
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AlertBody>
        <AlertActions>
          <Button
            className="hover:cursor-pointer"
            plain
            onClick={() => setPendingModal(false)}
          >
            Close
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default PendingFriendModal;
