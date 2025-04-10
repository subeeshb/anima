import { NoticeCard, Spinner } from "@prima-materia/ui";
import React, { useEffect } from "react";
import { TodoListItem } from "./TodoListItem";
import { useTodoStore } from "../../data/TodoItem";

const TodoList: React.FC<{}> = () => {
  const { loading, error, loadAllItems, all } = useTodoStore();

  useEffect(() => {
    loadAllItems();
  }, [loadAllItems]);

  if (loading) return <Spinner />;

  if (error != null) {
    console.log(error);
    return (
      <NoticeCard type="error" title="Couldn't get todo list">
        The todo list couldn't be loaded right now.
      </NoticeCard>
    );
  }

  return (
    <>
      {all().map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default TodoList;
