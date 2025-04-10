import { NoticeCard, Spinner } from "@prima-materia/ui";
import React, { useEffect, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { createCRUDStore } from "../../lib/PocketBaseCollection";

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  user: string[];
};

export const useTodoStore = createCRUDStore<TodoItem>("todo_item");

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
  // const { pb } = useContext(ServerContext);

  const { items, loading, error, listItems } = useTodoStore();

  useEffect(() => {
    listItems();
  }, [listItems]);

  // const query = useMemo(
  //   () => async () =>
  //     await pb.collection<TodoItem>("todo_item").getFullList<TodoItem>({
  //       requestKey: "todolist",
  //     }),
  //   [pb]
  // );
  // const { loading, error, results } = useCollectionListLoader(query);

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
      {Object.values(items).map((item) => (
        <TodoListItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default TodoList;
