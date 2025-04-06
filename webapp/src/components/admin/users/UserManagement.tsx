import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../../__generated__/gql";
import {
  Button,
  Card,
  Center,
  ConfirmationDialog,
  DropDownMenu,
  Modal,
  NoticeCard,
  Spinner,
  Text,
  TextInput,
  TokenInput,
} from "@prima-materia/ui";
import AddNewUserButton from "./AddNewUserButton";
import { useContext, useState } from "react";

import styles from "./UserManagement.module.css";
import { AuthContext } from "../../authentication/AuthContext";

export const ADMIN_GET_USERS = gql(`
  query AdminGetUsers {
    admin_get_users {
      id
      displayName
      email
      permissions
    }
  }
`);

const ADMIN_DELETE_USER = gql(`
  mutation AdminDeleteUser($userID: ID!) {
    admin_delete_user(userID: $userID)
  }
`);

const ADMIN_TOGGLE_USER_LOCK = gql(`
  mutation AdminToggleUserLock($userID: ID!) {
    admin_toggle_user_locked(userID: $userID)
  }
`);

const ADMIN_CHANGE_USER_PASSWORD = gql(`
  mutation AdminChangeUserPassword($userID: ID!, $password: String!) {
    admin_change_user_password(userID: $userID, password: $password)
  }
`);

const ADMIN_CHANGE_USER_PERMISSIONS = gql(`
  mutation AdminChangeUserPermissions($userID: ID!, $permissions: [String!]!) {
    admin_change_user_permissions(userID: $userID, permissions: $permissions)
  }
`);

const UserManagement: React.FC = () => {
  const { session } = useContext(AuthContext);
  const { loading, error, data } = useQuery(ADMIN_GET_USERS);
  const [deleteUser, { loading: deleteInProgress }] = useMutation(
    ADMIN_DELETE_USER,
    {
      refetchQueries: [ADMIN_GET_USERS],
    }
  );
  const [toggleUserLock] = useMutation(ADMIN_TOGGLE_USER_LOCK, {
    refetchQueries: [ADMIN_GET_USERS],
  });
  const [changeUserPassword, { loading: passwordSaveInProgress }] = useMutation(
    ADMIN_CHANGE_USER_PASSWORD,
    {
      refetchQueries: [ADMIN_GET_USERS],
    }
  );
  const [changeUserPermissions, { loading: permissionsSaveInProgress }] =
    useMutation(ADMIN_CHANGE_USER_PERMISSIONS, {
      refetchQueries: [ADMIN_GET_USERS],
    });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userIDForMutation, setUserIDForMutation] = useState<string | null>(
    null
  );

  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPermissionChangeModal, setShowPermissionChangeModal] =
    useState(false);
  const [newPermissions, setNewPermissions] = useState<string[]>([]);

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
      <NoticeCard type="error" title="Unable to load users">
        The list of users for this app couldn't be loaded right now. Try again
        later.
      </NoticeCard>
    );
  }

  return (
    <>
      <ConfirmationDialog
        visible={userIDForMutation != null && showDeleteConfirmation}
        title="Delete this user?"
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setUserIDForMutation(null);
        }}
        onConfirm={() => {
          if (userIDForMutation == null) return;

          deleteUser({
            variables: {
              userID: userIDForMutation,
            },
          }).then((result) => {
            if (result.data?.admin_delete_user === true) {
              setShowDeleteConfirmation(false);
              setUserIDForMutation(null);
            }
          });
        }}
        message="Are you sure you want to delete this user? This cannot be undone."
        showSpinner={deleteInProgress}
      />

      <Modal
        title="Change password"
        onClose={() => {
          setShowPasswordChangeModal(false);
          setUserIDForMutation(null);
          setNewPassword("");
        }}
        closeOnEscKey
        footerContent={
          <>
            <Button
              label="Save new password"
              onClick={() => {
                if (userIDForMutation == null) return;

                changeUserPassword({
                  variables: {
                    userID: userIDForMutation,
                    password: newPassword,
                  },
                }).then((result) => {
                  if (result.data?.admin_change_user_password === true) {
                    setShowPasswordChangeModal(false);
                    setUserIDForMutation(null);
                    setNewPassword("");
                  }
                });
              }}
              disabled={newPassword.trim().length < 5}
              showSpinner={passwordSaveInProgress}
            />
          </>
        }
        visible={showPasswordChangeModal}
      >
        <TextInput
          label="New password"
          helpText="Use a password of at least 5 characters"
          value={newPassword}
          onChange={setNewPassword}
          onValidate={(value) =>
            value.trim().length < 5 ? "Minimum of 5 characters required" : null
          }
          focusOnLoad
        />
      </Modal>

      <Modal
        title="Change permissions"
        onClose={() => {
          setShowPermissionChangeModal(false);
          setUserIDForMutation(null);
          setNewPermissions([]);
        }}
        closeOnEscKey
        footerContent={
          <>
            <Button
              label="Save permissions"
              onClick={() => {
                if (userIDForMutation == null) return;

                changeUserPermissions({
                  variables: {
                    userID: userIDForMutation,
                    permissions: newPermissions,
                  },
                }).then((result) => {
                  if (result.data?.admin_change_user_permissions === true) {
                    setShowPermissionChangeModal(false);
                    setUserIDForMutation(null);
                    setNewPermissions([]);
                  }
                });
              }}
              showSpinner={permissionsSaveInProgress}
            />
          </>
        }
        visible={showPermissionChangeModal}
      >
        <TokenInput
          label="Permissions"
          value={newPermissions}
          onChange={setNewPermissions}
          suggestions={["admin", "account_locked"]}
          focusOnLoad
        />
      </Modal>

      <Card
        title={`Users (${data.admin_get_users.length})`}
        headerRightContent={
          <>
            <AddNewUserButton />
          </>
        }
      >
        <Text size="small">
          <table className={styles.users_table}>
            <thead style={{ fontWeight: "bold" }}>
              <tr>
                <td>User ID</td>
                <td>Email address</td>
                <td>Display name</td>
                <td>Permissions</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.admin_get_users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.displayName}</td>
                  <td>{user.permissions.join(", ")}</td>
                  <td>
                    {session?.userID !== user.id && (
                      <DropDownMenu
                        label="Options"
                        size="small"
                        items={[
                          {
                            key: "change_permissions",
                            label: "Edit permissions",
                            onClick: () => {
                              setUserIDForMutation(user.id);
                              setNewPermissions(user.permissions);
                              setShowPermissionChangeModal(true);
                            },
                          },
                          {
                            key: "reset_password",
                            label: "Reset password",
                            onClick: () => {
                              setUserIDForMutation(user.id);
                              setShowPasswordChangeModal(true);
                            },
                          },
                          {
                            key: "lock",
                            label: user.permissions.includes("account_locked")
                              ? "Unlock account"
                              : "Lock account",
                            onClick: async () => {
                              await toggleUserLock({
                                variables: {
                                  userID: user.id,
                                },
                              });
                            },
                          },
                          {
                            key: "delete",
                            label: "Delete account",
                            onClick: () => {
                              setUserIDForMutation(user.id);
                              setShowDeleteConfirmation(true);
                            },
                          },
                        ]}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Text>
      </Card>
    </>
  );
};

export default UserManagement;
