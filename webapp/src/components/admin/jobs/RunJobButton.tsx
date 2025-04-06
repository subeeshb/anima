import { Button, ConfirmationDialog } from "@prima-materia/ui";
import { useContext, useState } from "react";
import { AuthContext } from "../../authentication/AuthContext";
import { ADMIN_GET_JOB_DETAIL } from "../../../pages/admin/AdminJobDetailPage";
import RunJobAPI from "../../../api/endpoints/RunJob.api";

type Props = {
  jobName: string;
};

const RunJobButton: React.FC<Props> = ({ jobName }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { graphQLClient } = useContext(AuthContext);

  return (
    <>
      <ConfirmationDialog
        visible={showConfirmation}
        title="Run job now?"
        message={`Are you sure you want to run the "${jobName}" job now?`}
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onConfirm={async () => {
          await new RunJobAPI().fetch({
            jobName,
          });
          graphQLClient?.refetchQueries({
            include: [ADMIN_GET_JOB_DETAIL],
          });
          setShowConfirmation(false);
        }}
      />
      <Button
        label="Run job now"
        onClick={() => {
          setShowConfirmation(true);
        }}
      />
    </>
  );
};

export default RunJobButton;
