export interface PendingFriends {
  id: number;
  user_id: number;
  friend_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
