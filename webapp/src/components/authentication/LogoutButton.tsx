import { Button, ConfirmationDialog } from "@prima-materia/ui";
import { ReactNode, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

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
  const { clearSession, session } = useContext(AuthContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onLogOut = useCallback(() => {
    clearSession();
    navigate("/");
  }, [clearSession]);

  if (session == null) {
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
