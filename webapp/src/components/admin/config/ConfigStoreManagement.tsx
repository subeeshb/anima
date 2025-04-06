import styles from "./ConfigStoreManagement.module.css";
import { gql } from "../../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import {
  Card,
  Center,
  Spinner,
  NoticeCard,
  DateLabel,
  Text,
  Modal,
  FormValidationProvider,
  TextInput,
  TextArea,
  Button,
  ConfirmationDialog,
} from "@prima-materia/ui";
import { useState } from "react";

const ADMIN_GET_CONFIG_STORE_ITEMS = gql(`
  query AdminGetConfigStoreItems {
    admin_config_store_items {
      id
      key
      value
      modifiedTime
    }
  }
`);

const ADMIN_CREATE_CONFIG_STORE_ITEM = gql(`
  mutation AdminCreateConfigStoreItem($key: String!, $value: String!) {
    admin_create_config_store_item(key: $key, value: $value) {
      id
      key
      value
      modifiedTime
    }
  }
`);

const ADMIN_UPDATE_CONFIG_STORE_ITEM = gql(`
  mutation AdminUpdateConfigStoreItem($id: ID!, $value: String!) {
    admin_update_config_store_item(id: $id, value: $value) {
      id
      key
      value
      modifiedTime
    }
  }
`);

const ADMIN_DELETE_CONFIG_STORE_ITEM = gql(`
  mutation AdminDeleteConfigStoreItem($id: ID!) {
    admin_delete_config_store_item(id: $id)
  }
`);

const ConfigStoreManagement: React.FC = () => {
  const { loading, error, data } = useQuery(ADMIN_GET_CONFIG_STORE_ITEMS);
  const [createNewItem, { loading: saveItemInProgress }] = useMutation(
    ADMIN_CREATE_CONFIG_STORE_ITEM,
    { refetchQueries: [ADMIN_GET_CONFIG_STORE_ITEMS] }
  );
  const [updateItem, { loading: updateInProgress }] = useMutation(
    ADMIN_UPDATE_CONFIG_STORE_ITEM
  );
  const [deleteItem, { loading: deleteInProgress }] = useMutation(
    ADMIN_DELETE_CONFIG_STORE_ITEM,
    {
      refetchQueries: [ADMIN_GET_CONFIG_STORE_ITEMS],
    }
  );

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [itemKey, setItemKey] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [itemID, setItemID] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
      <NoticeCard type="error" title="Unable to load configuration items">
        The configuration items for this app couldn't be loaded right now. Try
        again later.
      </NoticeCard>
    );
  }

  return (
    <>
      <FormValidationProvider>
        <Modal
          visible={showEditItemModal}
          title={
            itemID == null
              ? "New configuration item"
              : "Edit configuration item"
          }
          onClose={() => {
            setShowEditItemModal(false);
            setItemKey("");
            setItemValue("");
            setItemID(null);
          }}
          footerContent={
            <>
              <Button
                label="Save item"
                primary
                onClick={async () => {
                  if (itemID == null) {
                    await createNewItem({
                      variables: {
                        key: itemKey,
                        value: itemValue,
                      },
                    });
                  } else {
                    await updateItem({
                      variables: {
                        id: itemID,
                        value: itemValue,
                      },
                    });
                  }

                  setShowEditItemModal(false);
                  setItemKey("");
                  setItemValue("");
                  setItemID(null);
                }}
                disableIfFormValidationFails
                disabled={itemKey.trim() === ""}
                showSpinner={saveItemInProgress || updateInProgress}
              />
            </>
          }
        >
          <TextInput
            label="Key"
            helpText="Type a unique identifier for this configuration item"
            value={itemKey}
            onChange={setItemKey}
            onValidate={(value) =>
              value.trim() != "" ? null : "A key is required."
            }
            focusOnLoad
            disabled={itemID != null}
          />

          <TextArea
            label="Value"
            value={itemValue}
            onChange={setItemValue}
            showLineNumbers
          />
        </Modal>
      </FormValidationProvider>

      <ConfirmationDialog
        visible={showDeleteConfirmation}
        title={`Delete configuration item "${itemKey}"?`}
        message="Are you sure you want to delete this configuration item? This cannot be undone."
        showSpinner={deleteInProgress}
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setItemID(null);
          setItemKey("");
        }}
        onConfirm={async () => {
          if (itemID == null) return;
          await deleteItem({
            variables: {
              id: itemID,
            },
          });

          setShowDeleteConfirmation(false);
          setItemID(null);
          setItemKey("");
        }}
      />

      <Card
        title={`Configuration items (${data.admin_config_store_items.length})`}
        headerRightContent={
          <Button
            label="Add new item"
            size="small"
            subtle
            onClick={() => {
              setShowEditItemModal(true);
            }}
          />
        }
      >
        <Text size="small">
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Key</td>
                <td>Value</td>
                <td>Last modified</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.admin_config_store_items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <code>{item.key}</code>
                  </td>
                  <td>
                    <pre>
                      {item.value.length <= 200
                        ? item.value
                        : `${item.value}...`}
                    </pre>
                  </td>
                  <td>
                    <DateLabel
                      date={new Date(item.modifiedTime)}
                      format="d LLL Y h:m a"
                    />
                  </td>
                  <td>
                    <Button
                      label="Edit"
                      size="small"
                      onClick={() => {
                        setItemID(item.id);
                        setItemKey(item.key);
                        setItemValue(item.value);
                        setShowEditItemModal(true);
                      }}
                    />
                    <Button
                      label="Delete"
                      size="small"
                      onClick={() => {
                        setItemID(item.id);
                        setItemKey(item.key);
                        setShowDeleteConfirmation(true);
                      }}
                    />
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

export default ConfigStoreManagement;
