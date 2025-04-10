import { DelayedButton } from "@prima-materia/ui";
import { FaTrashAlt } from "react-icons/fa";
import { useTodoStore } from "../../data/TodoItem";

type Props = {
  todoID: string;
};

const DeleteTodoItemButton: React.FC<Props> = ({ todoID }) => {
  const { deleteItem } = useTodoStore();

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
