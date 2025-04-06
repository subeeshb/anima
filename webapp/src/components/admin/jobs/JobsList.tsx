import { Card, Center, NoticeCard, Spinner, Text } from "@prima-materia/ui";
import { gql } from "../../../__generated__";
import { useQuery } from "@apollo/client";

import styles from "./JobsAdmin.module.css";
import { Link } from "react-router-dom";
import JobStatus from "./JobStatus";

const ADMIN_GET_JOBS = gql(`
  query AdminGetJobs {
    admin_jobs {
      name
      lastRun {
        status
        enqueuedTime
      }
    }
  }
`);

const JobsList: React.FC = () => {
  const { loading, error, data } = useQuery(ADMIN_GET_JOBS);

  if (loading) {
    return (
      <Card>
        <Center horizontal>
          <Spinner />
        </Center>
      </Card>
    );
  }

  if (error != null || data == null) {
    return (
      <NoticeCard type="error" title="Unable to load jobs">
        Unable to get list of jobs right now. Try again later.
      </NoticeCard>
    );
  }

  return (
    <Card title={`Jobs (${data.admin_jobs.length})`}>
      <Text size="small">
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Job</td>
              <td>Last run</td>
            </tr>
          </thead>
          <tbody>
            {data.admin_jobs.map((job) => (
              <tr key={job.name}>
                <td>
                  <Link to={`./detail?job=${encodeURIComponent(job.name)}`}>
                    {job.name}
                  </Link>
                </td>
                <td>
                  {job.lastRun == null ? (
                    <>Not run yet</>
                  ) : (
                    <>
                      <JobStatus
                        status={job.lastRun.status}
                        runTime={new Date(job.lastRun.enqueuedTime)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Text>
    </Card>
  );
};

export default JobsList;
