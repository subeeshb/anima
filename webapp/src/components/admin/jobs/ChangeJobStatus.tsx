import { ConfirmationDialog, Button } from "@prima-materia/ui";
import { useState, useContext } from "react";
import { ADMIN_GET_JOB_DETAIL } from "../../../pages/admin/AdminJobDetailPage";
import { AuthContext } from "../../authentication/AuthContext";
import ToggleJobEnabledAPI from "../../../api/endpoints/ToggleJobEnabled.api";

type Props = {
  jobName: string;
  enabled: boolean;
};

const ChangeJobStatus: React.FC<Props> = ({ jobName, enabled }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { graphQLClient } = useContext(AuthContext);

  return (
    <>
      <ConfirmationDialog
        visible={showConfirmation}
        title={enabled ? "Disable job?" : "Enable job?"}
        message={
          enabled
            ? `Are you sure you want to disable the "${jobName}" job now? Any future scheduled instances of this job will not run until the job is enabled again.`
            : `Are you sure you want to enable the "${jobName}" job now? The job will run again at the next scheduled instance.`
        }
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onConfirm={async () => {
          await new ToggleJobEnabledAPI().fetch({
            jobName,
            enabled: !enabled,
          });

          graphQLClient?.refetchQueries({
            include: [ADMIN_GET_JOB_DETAIL],
          });
          setShowConfirmation(false);
        }}
      />
      <Button
        label={enabled ? "Disable job" : "Enable job"}
        onClick={() => {
          setShowConfirmation(true);
        }}
      />
    </>
  );
};

export default ChangeJobStatus;
