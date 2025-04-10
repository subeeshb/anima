import { TextInput } from "@prima-materia/ui";
import { useContext, useState } from "react";
import { ServerContext } from "../../ServerContext";
import { useTodoStore } from "./TodoList";

const NewTodoItem: React.FC = () => {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const { currentUser } = useContext(ServerContext);
  const { createItem } = useTodoStore();

  if (currentUser == null) return null;

  return (
    <>
      <TextInput
        label="New todo item"
        placeholder="What do you want to do?"
        value={title}
        onChange={setTitle}
        onHitEnter={async () => {
          setSaving(true);
          await createItem({
            title,
            user: [currentUser.id],
            completed: false,
          });
          setSaving(false);
          setTitle("");
        }}
        disabled={saving}
      />
    </>
  );
};

export default NewTodoItem;
