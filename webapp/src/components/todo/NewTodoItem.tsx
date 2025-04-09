import { TextInput } from "@prima-materia/ui";
import { useContext, useState } from "react";
import { ServerContext } from "../../ServerContext";

const NewTodoItem: React.FC = () => {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const { pb, currentUser } = useContext(ServerContext);

  if (currentUser == null) return null;

  return (
    <>
      <TextInput
        label="New todo item"
        placeholder="What do you want to do?"
        value={title}
        onChange={setTitle}
        onHitEnter={() => {
          setSaving(true);
          pb.collection("todo_item")
            .create({
              title,
              user: [currentUser.id],
              completed: false,
            })
            .then(() => {
              setSaving(false);
            });
        }}
        disabled={saving}
      />
    </>
  );
};

export default NewTodoItem;
