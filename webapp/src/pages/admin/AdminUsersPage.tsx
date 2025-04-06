import { SingleColumnPage } from "@prima-materia/ui";
import UserManagement from "../../components/admin/users/UserManagement";

const AdminUsersPage: React.FC = () => {
  return (
    <SingleColumnPage title="Users">
      <UserManagement />
    </SingleColumnPage>
  );
};

export default AdminUsersPage;
