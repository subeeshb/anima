import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { NoticeCard, Spinner } from "@prima-materia/ui";
import React from "react";
import { TodoListItem } from "./TodoListItem";

export type TodoItem = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export const GET_TODOS = gql(`
  query MyTodoList {
    getTodoItems {
      id
      title
      isCompleted
    }
  }
`);

const TodoList: React.FC<{}> = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <Spinner />;

  if (error || data == null) {
    return (
      <NoticeCard type="error" title="Couldn't get todo list">
        The todo list couldn't be loaded right now.
      </NoticeCard>
    );
  }

  return (
    <>
      {data.getTodoItems.map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default TodoList;
