import {
  Card,
  Center,
  CollapsibleCard,
  DateLabel,
  Grid,
  Heading,
  NoticeCard,
  SingleColumnPage,
  Spinner,
  Tab,
  TabContainer,
  Text,
  TextArea,
  Timeline,
  TimelineEntry,
  LabelledList,
  LabelledListSection,
  Paragraph,
  Button,
} from "@prima-materia/ui";
import { useSearchParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { JobStatusIcon } from "../../components/admin/jobs/JobStatus";
import { useMemo } from "react";
import cronstrue from "cronstrue";
import { format } from "date-fns";
import RunJobButton from "../../components/admin/jobs/RunJobButton";
import ChangeJobStatus from "../../components/admin/jobs/ChangeJobStatus";

export const ADMIN_GET_JOB_DETAIL = gql(`
  query AdminGetJobDetail($jobName: String!) {
    admin_get_job(jobName:$jobName) {
      description
      cronSchedule
      enabled
      runs {
        id
        status
        enqueuedTime
        startedTime
        finishedTime
        logs
      }
    }
  }
`);

const DATE_FORMAT = "d LLL y h:mm:ss a";

const AdminJobDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const jobName = searchParams.get("job") ?? "";

  const { loading, error, data, refetch } = useQuery(ADMIN_GET_JOB_DETAIL, {
    variables: {
      jobName,
    },
  });

  const successRate = useMemo<number>(() => {
    if (data == null || data.admin_get_job == null) return 0;

    return (
      data.admin_get_job.runs.filter((run) => run.status === "completed")
        .length /
      data.admin_get_job.runs.filter(
        (run) => run.status !== "pending" && run.status !== "running"
      ).length
    );
  }, [data]);

  const runDurationMS = useMemo<number>(() => {
    if (data == null || data.admin_get_job == null) return 0;

    const runTimes = data.admin_get_job.runs
      .filter((run) => run.startedTime != null && run.finishedTime != null)
      .map(
        (run) =>
          new Date(run.finishedTime ?? 0).valueOf() -
          new Date(run.startedTime ?? 0).valueOf()
      );
    return runTimes.reduce((a, b) => a + b, 0) / runTimes.length;
  }, [data]);

  return (
    <SingleColumnPage title="Jobs">
      <Heading type="page-title">{jobName}</Heading>

      {loading && (
        <Card>
          <Center horizontal>
            <Spinner />
          </Center>
        </Card>
      )}

      {error && (
        <NoticeCard type="error" title="Unable to load job details">
          The details of this job couldn't be loaded right now. Try again later.
        </NoticeCard>
      )}

      {data?.admin_get_job?.enabled === false && (
        <NoticeCard type="warning" title="This job is disabled.">
          The "{jobName}" job is currently disabled, and will not run at the
          configured cron schedule.
        </NoticeCard>
      )}

      <Card
        title="About"
        footerContent={
          <>
            {data?.admin_get_job?.cronSchedule != null && (
              <ChangeJobStatus
                jobName={jobName}
                enabled={data.admin_get_job.enabled ?? true}
              />
            )}
            <RunJobButton jobName={jobName} />
            <Button
              label="Refresh details"
              showSpinner={loading}
              onClick={async () => {
                await refetch();
              }}
            />
          </>
        }
      >
        {data?.admin_get_job?.description ? (
          <>
            <Paragraph>{data.admin_get_job.description}</Paragraph>
          </>
        ) : (
          <>
            <Paragraph color="subtle">No description set.</Paragraph>
          </>
        )}

        {data?.admin_get_job?.cronSchedule && (
          <Paragraph>
            Schedule: {cronstrue.toString(data.admin_get_job.cronSchedule)} (
            {data.admin_get_job.cronSchedule})
          </Paragraph>
        )}
      </Card>

      {data?.admin_get_job && data?.admin_get_job.runs.length > 0 ? (
        <>
          <Heading type="section-title">Statistics (last 30 days)</Heading>
          <Grid columns={3}>
            <StatisticCard
              title="Runs"
              content={data.admin_get_job.runs.length}
            />
            <StatisticCard
              title="Success rate"
              content={`${(successRate * 100).toFixed(1)} %`}
            />
            <StatisticCard
              title="Average run time"
              content={`${(runDurationMS / 1000).toFixed(1)} sec`}
            />
          </Grid>

          <Timeline title="History">
            {data.admin_get_job.runs.map((run) => (
              <TimelineEntry
                key={run.id}
                icon={<JobStatusIcon status={run.status} />}
              >
                <CollapsibleCard
                  key={run.id}
                  title={format(new Date(run.enqueuedTime), DATE_FORMAT)}
                >
                  <TabContainer>
                    <Tab id="details" title="Details">
                      <br />
                      <LabelledList>
                        <LabelledListSection id="id" title="Run ID">
                          <code>{run.id}</code>
                        </LabelledListSection>
                        <LabelledListSection id="enqueued" title="Enqueued at">
                          <DateLabel
                            date={new Date(run.enqueuedTime)}
                            format={DATE_FORMAT}
                          />
                        </LabelledListSection>
                        <LabelledListSection id="started" title="Started at">
                          {run.startedTime != null ? (
                            <DateLabel
                              date={new Date(run.startedTime)}
                              format={DATE_FORMAT}
                            />
                          ) : (
                            <>Not started</>
                          )}
                        </LabelledListSection>
                        <LabelledListSection id="ended" title="Finished at">
                          {run.finishedTime != null ? (
                            <DateLabel
                              date={new Date(run.finishedTime)}
                              format={DATE_FORMAT}
                            />
                          ) : (
                            <>Not finished</>
                          )}
                        </LabelledListSection>
                        <LabelledListSection id="runtime" title="Run time">
                          {run.startedTime != null &&
                          run.finishedTime != null ? (
                            <>
                              {(
                                (new Date(run.finishedTime).valueOf() -
                                  new Date(run.startedTime).valueOf()) /
                                1000
                              ).toFixed(1)}{" "}
                              seconds
                            </>
                          ) : (
                            <>-</>
                          )}
                        </LabelledListSection>
                      </LabelledList>
                    </Tab>
                    <Tab id="logs" title="Logs">
                      <TextArea
                        disabled
                        showLineNumbers={true}
                        value={run.logs}
                        onChange={() => {}}
                        allowResize={false}
                      />
                    </Tab>
                  </TabContainer>
                </CollapsibleCard>
              </TimelineEntry>
            ))}
          </Timeline>
        </>
      ) : (
        <NoticeCard type="info" title="Job not run yet">
          This job has not been run yet. Check the job's schedule to determine
          when this job will run.
        </NoticeCard>
      )}
    </SingleColumnPage>
  );
};

const StatisticCard: React.FC<{
  title: string;
  content: React.ReactNode;
}> = ({ title, content }) => (
  <Card title={title}>
    <Center horizontal vertical>
      <Text size="huge">{content}</Text>
    </Center>
  </Card>
);

export default AdminJobDetailPage;
