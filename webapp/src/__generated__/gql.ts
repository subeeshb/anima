/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query AdminGetConfigStoreItems {\n    admin_config_store_items {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n": types.AdminGetConfigStoreItemsDocument,
    "\n  mutation AdminCreateConfigStoreItem($key: String!, $value: String!) {\n    admin_create_config_store_item(key: $key, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n": types.AdminCreateConfigStoreItemDocument,
    "\n  mutation AdminUpdateConfigStoreItem($id: ID!, $value: String!) {\n    admin_update_config_store_item(id: $id, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n": types.AdminUpdateConfigStoreItemDocument,
    "\n  mutation AdminDeleteConfigStoreItem($id: ID!) {\n    admin_delete_config_store_item(id: $id)\n  }\n": types.AdminDeleteConfigStoreItemDocument,
    "\n  query AdminGetJobs {\n    admin_jobs {\n      name\n      lastRun {\n        status\n        enqueuedTime\n      }\n    }\n  }\n": types.AdminGetJobsDocument,
    "\n  mutation AdminCreateUser($email: String!, $password: String!, $displayName: String!, $permissions: [String!]!) {\n    admin_create_user(email: $email, displayName: $displayName, permissions: $permissions, password: $password) {\n      id\n    }\n  }\n": types.AdminCreateUserDocument,
    "\n  query AdminGetUsers {\n    admin_get_users {\n      id\n      displayName\n      email\n      permissions\n    }\n  }\n": types.AdminGetUsersDocument,
    "\n  mutation AdminDeleteUser($userID: ID!) {\n    admin_delete_user(userID: $userID)\n  }\n": types.AdminDeleteUserDocument,
    "\n  mutation AdminToggleUserLock($userID: ID!) {\n    admin_toggle_user_locked(userID: $userID)\n  }\n": types.AdminToggleUserLockDocument,
    "\n  mutation AdminChangeUserPassword($userID: ID!, $password: String!) {\n    admin_change_user_password(userID: $userID, password: $password)\n  }\n": types.AdminChangeUserPasswordDocument,
    "\n  mutation AdminChangeUserPermissions($userID: ID!, $permissions: [String!]!) {\n    admin_change_user_permissions(userID: $userID, permissions: $permissions)\n  }\n": types.AdminChangeUserPermissionsDocument,
    "\n  mutation DeleteTodo($id: ID!) {\n    deleteTodoItem(id: $id)\n  }\n": types.DeleteTodoDocument,
    "\n  mutation CreateTodo($title: String!) {\n    createTodoItem(title: $title) {\n      id\n      title\n      isCompleted\n    }\n  }\n": types.CreateTodoDocument,
    "\n  query MyTodoList {\n    getTodoItems {\n      id\n      title\n      isCompleted\n    }\n  }\n": types.MyTodoListDocument,
    "\n  mutation UpdateTodo($id: ID!, $is_completed: Boolean!) {\n    changeTodoItemCompletion(id: $id, completed: $is_completed) {\n      id\n      title\n      isCompleted\n    }\n  }\n": types.UpdateTodoDocument,
    "\n  query AdminGetJobDetail($jobName: String!) {\n    admin_get_job(jobName:$jobName) {\n      description\n      cronSchedule\n      enabled\n      runs {\n        id\n        status\n        enqueuedTime\n        startedTime\n        finishedTime\n        logs\n      }\n    }\n  }\n": types.AdminGetJobDetailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AdminGetConfigStoreItems {\n    admin_config_store_items {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"): (typeof documents)["\n  query AdminGetConfigStoreItems {\n    admin_config_store_items {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminCreateConfigStoreItem($key: String!, $value: String!) {\n    admin_create_config_store_item(key: $key, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"): (typeof documents)["\n  mutation AdminCreateConfigStoreItem($key: String!, $value: String!) {\n    admin_create_config_store_item(key: $key, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminUpdateConfigStoreItem($id: ID!, $value: String!) {\n    admin_update_config_store_item(id: $id, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"): (typeof documents)["\n  mutation AdminUpdateConfigStoreItem($id: ID!, $value: String!) {\n    admin_update_config_store_item(id: $id, value: $value) {\n      id\n      key\n      value\n      modifiedTime\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminDeleteConfigStoreItem($id: ID!) {\n    admin_delete_config_store_item(id: $id)\n  }\n"): (typeof documents)["\n  mutation AdminDeleteConfigStoreItem($id: ID!) {\n    admin_delete_config_store_item(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AdminGetJobs {\n    admin_jobs {\n      name\n      lastRun {\n        status\n        enqueuedTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminGetJobs {\n    admin_jobs {\n      name\n      lastRun {\n        status\n        enqueuedTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminCreateUser($email: String!, $password: String!, $displayName: String!, $permissions: [String!]!) {\n    admin_create_user(email: $email, displayName: $displayName, permissions: $permissions, password: $password) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AdminCreateUser($email: String!, $password: String!, $displayName: String!, $permissions: [String!]!) {\n    admin_create_user(email: $email, displayName: $displayName, permissions: $permissions, password: $password) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AdminGetUsers {\n    admin_get_users {\n      id\n      displayName\n      email\n      permissions\n    }\n  }\n"): (typeof documents)["\n  query AdminGetUsers {\n    admin_get_users {\n      id\n      displayName\n      email\n      permissions\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminDeleteUser($userID: ID!) {\n    admin_delete_user(userID: $userID)\n  }\n"): (typeof documents)["\n  mutation AdminDeleteUser($userID: ID!) {\n    admin_delete_user(userID: $userID)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminToggleUserLock($userID: ID!) {\n    admin_toggle_user_locked(userID: $userID)\n  }\n"): (typeof documents)["\n  mutation AdminToggleUserLock($userID: ID!) {\n    admin_toggle_user_locked(userID: $userID)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminChangeUserPassword($userID: ID!, $password: String!) {\n    admin_change_user_password(userID: $userID, password: $password)\n  }\n"): (typeof documents)["\n  mutation AdminChangeUserPassword($userID: ID!, $password: String!) {\n    admin_change_user_password(userID: $userID, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminChangeUserPermissions($userID: ID!, $permissions: [String!]!) {\n    admin_change_user_permissions(userID: $userID, permissions: $permissions)\n  }\n"): (typeof documents)["\n  mutation AdminChangeUserPermissions($userID: ID!, $permissions: [String!]!) {\n    admin_change_user_permissions(userID: $userID, permissions: $permissions)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTodo($id: ID!) {\n    deleteTodoItem(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTodo($id: ID!) {\n    deleteTodoItem(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTodo($title: String!) {\n    createTodoItem(title: $title) {\n      id\n      title\n      isCompleted\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTodo($title: String!) {\n    createTodoItem(title: $title) {\n      id\n      title\n      isCompleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyTodoList {\n    getTodoItems {\n      id\n      title\n      isCompleted\n    }\n  }\n"): (typeof documents)["\n  query MyTodoList {\n    getTodoItems {\n      id\n      title\n      isCompleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTodo($id: ID!, $is_completed: Boolean!) {\n    changeTodoItemCompletion(id: $id, completed: $is_completed) {\n      id\n      title\n      isCompleted\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTodo($id: ID!, $is_completed: Boolean!) {\n    changeTodoItemCompletion(id: $id, completed: $is_completed) {\n      id\n      title\n      isCompleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AdminGetJobDetail($jobName: String!) {\n    admin_get_job(jobName:$jobName) {\n      description\n      cronSchedule\n      enabled\n      runs {\n        id\n        status\n        enqueuedTime\n        startedTime\n        finishedTime\n        logs\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminGetJobDetail($jobName: String!) {\n    admin_get_job(jobName:$jobName) {\n      description\n      cronSchedule\n      enabled\n      runs {\n        id\n        status\n        enqueuedTime\n        startedTime\n        finishedTime\n        logs\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;