import { TextInput } from "@prima-materia/ui";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { GET_TODOS, TodoItem } from "./TodoList";

const CREATE_TODO = gql(`
  mutation CreateTodo($title: String!) {
    createTodoItem(title: $title) {
      id
      title
      isCompleted
    }
  }
`);

const NewTodoItem: React.FC = () => {
  const [title, setTitle] = useState("");
  const [createTodo, { loading }] = useMutation<{
    createTodo: TodoItem;
  }>(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  return (
    <>
      <TextInput
        label="New todo item"
        placeholder="What do you want to do?"
        value={title}
        onChange={setTitle}
        onHitEnter={() => {
          createTodo({
            variables: {
              title,
            },
          })
            .catch((e) => {
              console.log(e);
            })
            .then(() => {
              setTitle("");
            });
        }}
        disabled={loading}
      />
    </>
  );
};

export default NewTodoItem;
