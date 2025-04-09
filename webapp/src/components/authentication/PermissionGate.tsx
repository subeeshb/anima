import { PropsWithChildren, useContext, useMemo } from "react";
import { ServerContext } from "../../ServerContext";

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
  const { currentUserHasPermission } = useContext(ServerContext);
  const hasPermission = useMemo(
    () => currentUserHasPermission(permissionName),
    [currentUserHasPermission, permissionName]
  );

  return hasPermission ? children : null;
};

export default PermissionGate;
