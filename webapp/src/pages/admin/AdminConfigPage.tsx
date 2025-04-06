import { SingleColumnPage } from "@prima-materia/ui";
import ConfigStoreManagement from "../../components/admin/config/ConfigStoreManagement";

const AdminConfigpage: React.FC = () => {
  return (
    <SingleColumnPage title="Config">
      <ConfigStoreManagement />
    </SingleColumnPage>
  );
};

export default AdminConfigpage;
