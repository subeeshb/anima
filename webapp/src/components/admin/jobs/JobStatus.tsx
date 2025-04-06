import { DateLabel } from "@prima-materia/ui";
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaHourglass,
  FaHourglassStart,
} from "react-icons/fa6";

import styles from "./JobsAdmin.module.css";

type Props = {
  status: string;
  runTime: Date;
};

const JobStatus: React.FC<Props> = ({ status, runTime }) => {
  return (
    <div className={styles.status_container}>
      <div className={styles.status_icon}>
        <JobStatusIcon status={status} />
      </div>
      <div>
        {status[0].toUpperCase()}
        {status.slice(1).toLowerCase()}
        <br />
        <DateLabel date={runTime} format="d LLL y h:mm:ss a" />
      </div>
    </div>
  );
};

export const JobStatusIcon: React.FC<{ status: string }> = ({ status }) => (
  <>
    {status === "pending" && <FaHourglass className={styles.status_pending} />}
    {status === "running" && (
      <FaHourglassStart className={styles.status_running} />
    )}
    {status === "completed" && (
      <FaCircleCheck className={styles.status_completed} />
    )}
    {status === "failed" && (
      <FaCircleExclamation className={styles.status_failed} />
    )}
  </>
);

export default JobStatus;
