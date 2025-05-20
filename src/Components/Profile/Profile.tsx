import { useLocation } from "react-router-dom";

export default function Profile() {
  const { user } = useLocation().state;
    return (
      <div>
        <h2>User Profile</h2>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.user_name}</p>
      </div>
    )
  }
  