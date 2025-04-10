import { Checkbox } from "@prima-materia/ui";
import React from "react";
import DeleteTodoItemButton from "./DeleteTodoItemButton";
import { TodoItem, useTodoStore } from "./TodoList";

export const TodoListItem: React.FC<{
  item: TodoItem;
}> = ({ item }) => {
  const { updateItem, loading } = useTodoStore();

  return (
    <Checkbox
      label={
        <>
          {item.title} <DeleteTodoItemButton todoID={item.id} />
        </>
      }
      checked={item.completed}
      disabled={loading}
      onChange={(status) => {
        updateItem(item.id, {
          completed: status,
        });
      }}
    />
  );
};
