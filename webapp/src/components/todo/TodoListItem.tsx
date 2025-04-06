import { Checkbox } from "@prima-materia/ui";
import React from "react";
import DeleteTodoItemButton from "./DeleteTodoItemButton";
import { TodoItem } from "./TodoList";
import { gql, useMutation } from "@apollo/client";

const UPDATE_TODO_COMPLETION = gql`
  mutation UpdateTodo($id: ID!, $is_completed: Boolean!) {
    changeTodoItemCompletion(id: $id, completed: $is_completed) {
      id
      title
      isCompleted
    }
  }
`;

export const TodoListItem: React.FC<{
  item: TodoItem;
}> = ({ item }) => {
  const [updateTodo, { loading }] = useMutation<{ updateTodo: TodoItem }>(
    UPDATE_TODO_COMPLETION
  );

  return (
    <Checkbox
      label={
        <>
          {item.title} <DeleteTodoItemButton todoID={item.id} />
        </>
      }
      checked={item.isCompleted}
      disabled={loading}
      onChange={(status) => {
        updateTodo({
          variables: {
            id: item.id,
            is_completed: status,
          },
        });
      }}
    />
  );
};
