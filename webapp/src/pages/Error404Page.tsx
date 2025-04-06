import { NoticeCard, SingleColumnPage } from "@prima-materia/ui";

const Error404Page: React.FC = () => {
  return (
    <SingleColumnPage title="Page not found">
      <NoticeCard type="error" title="Page not found">
        The page at <strong>{window.location.pathname}</strong> was not found.
        Check the URL and try again.
      </NoticeCard>
    </SingleColumnPage>
  );
};

export default Error404Page;
