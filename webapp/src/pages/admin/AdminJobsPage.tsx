import { SingleColumnPage } from "@prima-materia/ui";
import JobsList from "../../components/admin/jobs/JobsList";

const AdminJobsPage: React.FC = () => {
  return (
    <SingleColumnPage title="Jobs">
      <JobsList />
    </SingleColumnPage>
  );
};

export default AdminJobsPage;
