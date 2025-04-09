import { Button, ConfirmationDialog } from "@prima-materia/ui";
import { ReactNode, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerContext } from "../../ServerContext";

type Props = {
  label?: ReactNode;
  subtle?: boolean;
  tooltip?: string;
};

const LogoutButton: React.FC<Props> = ({
  label = "Log out",
  subtle = false,
  tooltip,
}) => {
  const navigate = useNavigate();
  const { currentUser, invalidateLoginSession } = useContext(ServerContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onLogOut = useCallback(() => {
    invalidateLoginSession();
    navigate("/");
  }, [invalidateLoginSession]);

  if (currentUser == null) {
    return null;
  }

  return (
    <>
      <Button
        label={label}
        subtle={subtle}
        tooltip={tooltip}
        onClick={() => {
          setShowConfirmation(true);
        }}
      />
      <ConfirmationDialog
        visible={showConfirmation}
        title="Log out?"
        message="Are you sure you want to log out?"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onConfirm={onLogOut}
      />
    </>
  );
};

export default LogoutButton;
