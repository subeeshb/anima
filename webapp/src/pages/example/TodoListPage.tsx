import { Button, Card, Heading, SingleColumnPage } from "@prima-materia/ui";
// import TodoList from "../../components/todo/TodoList";
import NewTodoItem from "../../components/todo/NewTodoItem";
import { useContext } from "react";
import HelloCatAPI from "../../api/endpoints/HelloCat.api";
import { AuthContext } from "../../components/authentication/AuthContext";
import TodoList from "../../components/todo/TodoList";

const TodoListPage: React.FC = () => {
  const { session } = useContext(AuthContext);

  if (session == null) return null;

  return (
    <SingleColumnPage>
      <Heading type="page-title">{session.displayName}'s todo list</Heading>
      <Card title="Todo list">
        <NewTodoItem />
        <TodoList />
      </Card>
      <Card>
        <Button
          label="Test"
          onClick={async () => {
            await new HelloCatAPI().fetch(null);
          }}
        />
      </Card>
    </SingleColumnPage>
  );
};

export default TodoListPage;
