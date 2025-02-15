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

interface PendingFriendModalProps {
  pendingModal: boolean;
  setPendingModal: (value: boolean) => void;
}

const PendingFriendModal = ({
  pendingModal,
  setPendingModal,
}: PendingFriendModalProps) => {
  return (
    <>
      <Alert size="2xl" onClose={setPendingModal} open={pendingModal}>
        <AlertTitle>Friend Request</AlertTitle>
        <AlertDescription>List of pending friends</AlertDescription>
        <AlertBody>
          <Table dense>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Avatar
                    src={"https://avatar.iran.liara.run/public"}
                    className="size-6 mr-2"
                  />
                  Danish
                </TableCell>
                <TableCell>
                  <Badge color="green">Accept</Badge>
                </TableCell>
              </TableRow>
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
