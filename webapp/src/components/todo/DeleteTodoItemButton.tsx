import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { DelayedButton } from "@prima-materia/ui";
import { FaTrashAlt } from "react-icons/fa";
import { GET_TODOS } from "./TodoList";

type Props = {
  todoID: string;
};

const DELETE_TODO = gql(`
  mutation DeleteTodo($id: ID!) {
    deleteTodoItem(id: $id)
  }
`);

const DeleteTodoItemButton: React.FC<Props> = ({ todoID }) => {
  const [deleteTodo, { loading }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  return (
    <DelayedButton
      label={<FaTrashAlt />}
      subtle
      onClick={() => {
        deleteTodo({
          variables: {
            id: todoID,
          },
        });
      }}
      delaySeconds={2}
      showSpinner={loading}
    />
  );
};

export default DeleteTodoItemButton;
