import { Card, Heading, SingleColumnPage } from "@prima-materia/ui";
import NewTodoItem from "../../components/todo/NewTodoItem";
import { useContext } from "react";
import TodoList from "../../components/todo/TodoList";
import { ServerContext } from "../../ServerContext";

const TodoListPage: React.FC = () => {
  const { currentUser } = useContext(ServerContext);

  if (currentUser == null) return null;

  return (
    <SingleColumnPage>
      <Heading type="page-title">{currentUser.displayName}'s todo list</Heading>
      <Card title="Todo list">
        <NewTodoItem />
        <TodoList />
      </Card>
    </SingleColumnPage>
  );
};

export default TodoListPage;
