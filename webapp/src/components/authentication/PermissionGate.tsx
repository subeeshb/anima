import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type Props = {
  permissionName: string;
};

/**
 * Shows the children of this component only if the currently logged-in user has been granted a specified permission.
 */
const PermissionGate: React.FC<PropsWithChildren<Props>> = ({
  permissionName,
  children,
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const { currentUserHasPermission } = useContext(AuthContext);

  useEffect(() => {
    currentUserHasPermission(permissionName).then((result) => {
      setHasPermission(result);
    });
  }, [currentUserHasPermission, permissionName]);

  return hasPermission ? children : null;
};

export default PermissionGate;
