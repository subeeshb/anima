import { DelayedButton } from "@prima-materia/ui";
import { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ServerContext } from "../../ServerContext";

type Props = {
  todoID: string;
};

const DeleteTodoItemButton: React.FC<Props> = ({ todoID }) => {
  const { pb } = useContext(ServerContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <DelayedButton
      label={<FaTrashAlt />}
      subtle
      onClick={async () => {
        setDeleting(true);
        await pb.collection("todo_item").delete(todoID);
        setDeleting(false);
      }}
      delaySeconds={2}
      showSpinner={deleting}
    />
  );
};

export default DeleteTodoItemButton;
