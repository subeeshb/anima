import { createPBCollectionStore } from "../lib/PBCollectionStore";

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  user: string[];
};

export const useTodoStore = createPBCollectionStore<TodoItem>("todo_item");
