import {
  Button,
  FormValidationProvider,
  Modal,
  TextInput,
  TokenInput,
} from "@prima-materia/ui";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { isValidEmailAddress } from "../../../utils/StringUtils";
import { gql } from "../../../__generated__";
import { useMutation } from "@apollo/client";
import { ADMIN_GET_USERS } from "./UserManagement";

const ADMIN_CREATE_USER = gql(`
  mutation AdminCreateUser($email: String!, $password: String!, $displayName: String!, $permissions: [String!]!) {
    admin_create_user(email: $email, displayName: $displayName, permissions: $permissions, password: $password) {
      id
    }
  }
`);

const AddNewUserButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  const [createUser, { loading: saveInProgress }] = useMutation(
    ADMIN_CREATE_USER,
    {
      refetchQueries: [ADMIN_GET_USERS],
    }
  );

  return (
    <>
      <FormValidationProvider>
        <Modal
          visible={showModal}
          closeOnEscKey
          title="New user"
          footerContent={
            <>
              <Button
                label="Save user"
                primary
                disabled={email.trim() == "" || password.trim() == ""}
                disableIfFormValidationFails
                showSpinner={saveInProgress}
                onClick={() => {
                  createUser({
                    variables: {
                      email,
                      password,
                      displayName,
                      permissions,
                    },
                  }).then(() => {
                    setShowModal(false);

                    setEmail("");
                    setPassword("");
                    setDisplayName("");
                    setPermissions([]);
                  });
                }}
              />
            </>
          }
          onClose={() => {
            setShowModal(false);
            setEmail("");
            setPassword("");
            setDisplayName("");
            setPermissions([]);
          }}
        >
          <TextInput
            label="Email address"
            value={email}
            onChange={setEmail}
            focusOnLoad
            onValidate={(value) =>
              isValidEmailAddress(value)
                ? null
                : "Please type a valid email address"
            }
          />
          <TextInput
            label="Display name"
            value={displayName}
            onChange={setDisplayName}
          />
          <TextInput
            label="Password"
            value={password}
            onChange={setPassword}
            helpText="At least 5 characters long"
            onValidate={(value) =>
              value.trim().length > 5
                ? null
                : "Must be at least 5 characters long"
            }
          />
          <TokenInput
            label="Permissions"
            value={permissions}
            helpText="Use permission flags to gate features for this account"
            onChange={setPermissions}
            suggestions={["admin", "account_locked"]}
          />
        </Modal>
      </FormValidationProvider>

      <Button
        size="small"
        subtle
        label={
          <>
            <FaUserPlus /> Add new user
          </>
        }
        onClick={() => {
          setShowModal(true);
        }}
      />
    </>
  );
};

export default AddNewUserButton;
