import { NoticeCard, Spinner } from "@prima-materia/ui";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { ServerContext } from "../../ServerContext";

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

const useCollectionListLoader = <TModel,>(query: () => Promise<TModel[]>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<TModel[]>([]);

  useEffect(() => {
    setLoading(true);

    query()
      .then((res) => {
        setResults(res);
        setLoading(false);
      })
      .catch((e) => {
        if (e.isAbort) return;

        console.log(e);
        setError(true);
        setLoading(false);
      });
  }, [query]);

  return { loading, error, results };
};

const TodoList: React.FC<{}> = () => {
  const { pb } = useContext(ServerContext);

  const query = useMemo(
    () => async () =>
      await pb.collection<TodoItem>("todo_item").getFullList<TodoItem>({
        requestKey: "todolist",
      }),
    [pb]
  );
  const { loading, error, results } = useCollectionListLoader(query);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <NoticeCard type="error" title="Couldn't get todo list">
        The todo list couldn't be loaded right now.
      </NoticeCard>
    );
  }

  return (
    <>
      {results.map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default TodoList;
