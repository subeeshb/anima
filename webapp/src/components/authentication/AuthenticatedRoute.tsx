import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren, useContext, useEffect, useState } from "react";

import {
  Center,
  NoticeCard,
  SingleColumnPage,
  Spinner,
} from "@prima-materia/ui";
import { ServerContext } from "../../ServerContext";

enum EvaluationResult {
  Loading = -1,
  Passed = 0,
  PromptForLogin = 1,
  Blocked = 2,
}

const AuthenticatedRoute: React.FC<
  PropsWithChildren<{
    requirePermission?: string;
  }>
> = ({ children, requirePermission }) => {
  // TODO
  const currentUserHasPermission = async (_: string) => false;
  // const { session, currentUserHasPermission } = useContext(AuthContext);

  const { currentUser } = useContext(ServerContext);
  const location = useLocation();
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult>(
    EvaluationResult.Loading
  );

  useEffect(() => {
    if (currentUser == null) {
      setEvaluationResult(EvaluationResult.PromptForLogin);
      return;
    }

    if (requirePermission == null) {
      setEvaluationResult(EvaluationResult.Passed);
      return;
    }

    currentUserHasPermission(requirePermission).then((hasPermission) => {
      setEvaluationResult(
        hasPermission ? EvaluationResult.Passed : EvaluationResult.Blocked
      );
    });
  }, [currentUser, requirePermission, currentUserHasPermission]);

  switch (evaluationResult) {
    case EvaluationResult.Loading:
      return (
        <Center horizontal vertical>
          <Spinner size="2rem" />
        </Center>
      );

    case EvaluationResult.Blocked:
      return (
        <SingleColumnPage title="Page not found">
          <NoticeCard type="error" title="Page not found">
            The page at <strong>{window.location.pathname}</strong> was not
            found. Check the URL and try again.
          </NoticeCard>
        </SingleColumnPage>
      );

    case EvaluationResult.PromptForLogin:
      return (
        <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} />
      );

    case EvaluationResult.Passed:
      return children;
  }
};

export default AuthenticatedRoute;
