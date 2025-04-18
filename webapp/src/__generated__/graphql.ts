/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Cat = {
  __typename?: 'Cat';
  name?: Maybe<Scalars['String']['output']>;
};

export type ConfigStoreItem = {
  __typename?: 'ConfigStoreItem';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  modifiedTime: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Job = {
  __typename?: 'Job';
  cronSchedule?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  lastRun?: Maybe<JobRun>;
  name: Scalars['String']['output'];
  runs: Array<JobRun>;
};

export type JobRun = {
  __typename?: 'JobRun';
  enqueuedTime: Scalars['String']['output'];
  finishedTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logs: Scalars['String']['output'];
  startedTime?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  admin_change_user_password: Scalars['Boolean']['output'];
  admin_change_user_permissions: Scalars['Boolean']['output'];
  admin_create_config_store_item?: Maybe<ConfigStoreItem>;
  admin_create_user?: Maybe<UserAdminRecord>;
  admin_delete_config_store_item: Scalars['Boolean']['output'];
  admin_delete_user: Scalars['Boolean']['output'];
  admin_toggle_user_locked: Scalars['Boolean']['output'];
  admin_update_config_store_item?: Maybe<ConfigStoreItem>;
  changeTodoItemCompletion?: Maybe<TodoItem>;
  createTodoItem?: Maybe<TodoItem>;
  deleteTodoItem?: Maybe<Scalars['ID']['output']>;
};


export type MutationAdmin_Change_User_PasswordArgs = {
  password: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationAdmin_Change_User_PermissionsArgs = {
  permissions: Array<Scalars['String']['input']>;
  userID: Scalars['ID']['input'];
};


export type MutationAdmin_Create_Config_Store_ItemArgs = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationAdmin_Create_UserArgs = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};


export type MutationAdmin_Delete_Config_Store_ItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_Delete_UserArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationAdmin_Toggle_User_LockedArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationAdmin_Update_Config_Store_ItemArgs = {
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};


export type MutationChangeTodoItemCompletionArgs = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationCreateTodoItemArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteTodoItemArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  admin_config_store_items: Array<ConfigStoreItem>;
  admin_get_job?: Maybe<Job>;
  admin_get_users: Array<UserAdminRecord>;
  admin_jobs: Array<Job>;
  cats?: Maybe<Array<Maybe<Cat>>>;
  getTodoItems: Array<TodoItem>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryAdmin_Get_JobArgs = {
  jobName: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type TodoItem = {
  __typename?: 'TodoItem';
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

/**
 * GraphQL schema for this app.
 * WARNING: Do not make changes directly to this file. This is an autogenerated file, and changes will be lost.
 * To update, edit the GraphQL methods implemented in the server/src/graphql folder, then run 'npm run build' or 'npm run gen-schema'.
 */
export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type UserAdminRecord = {
  __typename?: 'UserAdminRecord';
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type AdminGetConfigStoreItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetConfigStoreItemsQuery = { __typename?: 'Query', admin_config_store_items: Array<{ __typename?: 'ConfigStoreItem', id: string, key: string, value: string, modifiedTime: string }> };

export type AdminCreateConfigStoreItemMutationVariables = Exact<{
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type AdminCreateConfigStoreItemMutation = { __typename?: 'Mutation', admin_create_config_store_item?: { __typename?: 'ConfigStoreItem', id: string, key: string, value: string, modifiedTime: string } | null };

export type AdminUpdateConfigStoreItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
}>;


export type AdminUpdateConfigStoreItemMutation = { __typename?: 'Mutation', admin_update_config_store_item?: { __typename?: 'ConfigStoreItem', id: string, key: string, value: string, modifiedTime: string } | null };

export type AdminDeleteConfigStoreItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminDeleteConfigStoreItemMutation = { __typename?: 'Mutation', admin_delete_config_store_item: boolean };

export type AdminGetJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetJobsQuery = { __typename?: 'Query', admin_jobs: Array<{ __typename?: 'Job', name: string, lastRun?: { __typename?: 'JobRun', status: string, enqueuedTime: string } | null }> };

export type AdminCreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AdminCreateUserMutation = { __typename?: 'Mutation', admin_create_user?: { __typename?: 'UserAdminRecord', id: string } | null };

export type AdminGetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetUsersQuery = { __typename?: 'Query', admin_get_users: Array<{ __typename?: 'UserAdminRecord', id: string, displayName?: string | null, email: string, permissions: Array<string> }> };

export type AdminDeleteUserMutationVariables = Exact<{
  userID: Scalars['ID']['input'];
}>;


export type AdminDeleteUserMutation = { __typename?: 'Mutation', admin_delete_user: boolean };

export type AdminToggleUserLockMutationVariables = Exact<{
  userID: Scalars['ID']['input'];
}>;


export type AdminToggleUserLockMutation = { __typename?: 'Mutation', admin_toggle_user_locked: boolean };

export type AdminChangeUserPasswordMutationVariables = Exact<{
  userID: Scalars['ID']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminChangeUserPasswordMutation = { __typename?: 'Mutation', admin_change_user_password: boolean };

export type AdminChangeUserPermissionsMutationVariables = Exact<{
  userID: Scalars['ID']['input'];
  permissions: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AdminChangeUserPermissionsMutation = { __typename?: 'Mutation', admin_change_user_permissions: boolean };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodoItem?: string | null };

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodoItem?: { __typename?: 'TodoItem', id: string, title: string, isCompleted: boolean } | null };

export type MyTodoListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTodoListQuery = { __typename?: 'Query', getTodoItems: Array<{ __typename?: 'TodoItem', id: string, title: string, isCompleted: boolean }> };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  is_completed: Scalars['Boolean']['input'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', changeTodoItemCompletion?: { __typename?: 'TodoItem', id: string, title: string, isCompleted: boolean } | null };

export type AdminGetJobDetailQueryVariables = Exact<{
  jobName: Scalars['String']['input'];
}>;


export type AdminGetJobDetailQuery = { __typename?: 'Query', admin_get_job?: { __typename?: 'Job', description?: string | null, cronSchedule?: string | null, enabled?: boolean | null, runs: Array<{ __typename?: 'JobRun', id: string, status: string, enqueuedTime: string, startedTime?: string | null, finishedTime?: string | null, logs: string }> } | null };


export const AdminGetConfigStoreItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetConfigStoreItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_config_store_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedTime"}}]}}]}}]} as unknown as DocumentNode<AdminGetConfigStoreItemsQuery, AdminGetConfigStoreItemsQueryVariables>;
export const AdminCreateConfigStoreItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateConfigStoreItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_create_config_store_item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedTime"}}]}}]}}]} as unknown as DocumentNode<AdminCreateConfigStoreItemMutation, AdminCreateConfigStoreItemMutationVariables>;
export const AdminUpdateConfigStoreItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateConfigStoreItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_update_config_store_item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedTime"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateConfigStoreItemMutation, AdminUpdateConfigStoreItemMutationVariables>;
export const AdminDeleteConfigStoreItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteConfigStoreItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_delete_config_store_item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<AdminDeleteConfigStoreItemMutation, AdminDeleteConfigStoreItemMutationVariables>;
export const AdminGetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetJobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastRun"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"enqueuedTime"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetJobsQuery, AdminGetJobsQueryVariables>;
export const AdminCreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permissions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_create_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}},{"kind":"Argument","name":{"kind":"Name","value":"permissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permissions"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdminCreateUserMutation, AdminCreateUserMutationVariables>;
export const AdminGetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_get_users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}}]}}]} as unknown as DocumentNode<AdminGetUsersQuery, AdminGetUsersQueryVariables>;
export const AdminDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_delete_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}]}}]} as unknown as DocumentNode<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;
export const AdminToggleUserLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminToggleUserLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_toggle_user_locked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}]}}]} as unknown as DocumentNode<AdminToggleUserLockMutation, AdminToggleUserLockMutationVariables>;
export const AdminChangeUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangeUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_change_user_password"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<AdminChangeUserPasswordMutation, AdminChangeUserPasswordMutationVariables>;
export const AdminChangeUserPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangeUserPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permissions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_change_user_permissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"permissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permissions"}}}]}]}}]} as unknown as DocumentNode<AdminChangeUserPermissionsMutation, AdminChangeUserPermissionsMutationVariables>;
export const DeleteTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTodoItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const CreateTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTodoItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<CreateTodoMutation, CreateTodoMutationVariables>;
export const MyTodoListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTodoList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTodoItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<MyTodoListQuery, MyTodoListQueryVariables>;
export const UpdateTodoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTodo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"is_completed"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeTodoItemCompletion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"completed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"is_completed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const AdminGetJobDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetJobDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_get_job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cronSchedule"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"runs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"enqueuedTime"}},{"kind":"Field","name":{"kind":"Name","value":"startedTime"}},{"kind":"Field","name":{"kind":"Name","value":"finishedTime"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetJobDetailQuery, AdminGetJobDetailQueryVariables>;