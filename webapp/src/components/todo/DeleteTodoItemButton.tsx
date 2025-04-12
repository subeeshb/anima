import { DelayedButton } from "@prima-materia/ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTodoItemStore } from "../../data/TodoItem";

type Props = {
  todoID: string;
};

const DeleteTodoItemButton: React.FC<Props> = ({ todoID }) => {
  const { deleteItem } = useTodoItemStore();

  return (
    <DelayedButton
      label={<FaTrashAlt />}
      subtle
      onClick={async () => {
        deleteItem(todoID);
      }}
      delaySeconds={2}
    />
  );
};

export default DeleteTodoItemButton;
