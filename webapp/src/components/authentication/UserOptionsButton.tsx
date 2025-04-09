import { Button, LeftRight, Text } from "@prima-materia/ui";
import { useNavigate } from "react-router-dom";
import { FaGear, FaRightFromBracket } from "react-icons/fa6";
import { useContext } from "react";
import LogoutButton from "./LogoutButton";
import { ServerContext } from "../../ServerContext";

const UserOptionsButton: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(ServerContext);

  return (
    <LeftRight>
      <div>
        <Text weight="bold">{currentUser?.displayName}</Text>
      </div>
      <div>
        <Button
          label={<FaGear />}
          onClick={() => {
            navigate("/settings");
          }}
          subtle
          tooltip="Settings"
        />
        <LogoutButton label={<FaRightFromBracket />} subtle tooltip="Log out" />
      </div>
    </LeftRight>
  );
};

export default UserOptionsButton;
