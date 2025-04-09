import { Checkbox } from "@prima-materia/ui";
import React from "react";
import DeleteTodoItemButton from "./DeleteTodoItemButton";
import { TodoItem } from "./TodoList";

export const TodoListItem: React.FC<{
  item: TodoItem;
}> = ({ item }) => {
  // const [updateTodo, { loading }] = useMutation<{ updateTodo: TodoItem }>(

  // );

  return (
    <Checkbox
      label={
        <>
          {item.title} <DeleteTodoItemButton todoID={item.id} />
        </>
      }
      checked={item.completed}
      // disabled={loading}
      onChange={(status) => {
        // updateTodo({
        //   variables: {
        //     id: item.id,
        //     is_completed: status,
        //   },
        // });
      }}
    />
  );
};
