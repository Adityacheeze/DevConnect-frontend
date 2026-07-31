import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import EmptyState from "./ui/EmptyState";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <EmptyState icon="◌" title="Profile loading" description="Pulling your identity from the devConnect graph." />;
  }

  return <EditProfile user={user} />;
};

export default Profile;
