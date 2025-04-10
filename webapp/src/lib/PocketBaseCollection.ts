import { create } from "zustand";
import PocketBase from "pocketbase";

interface CRUDState<T extends { [key: string]: any } & { id: string }> {
  items: { [id: string]: T };
  loading: boolean;
  error: Error | null;
  listItems: () => Promise<void>;
  createItem: (item: Omit<T, "id" | "created" | "updated">) => Promise<T>;
  updateItem: (id: string, item: Partial<T>) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
  getItemById: (id: string) => Promise<T | null>;
}

const API_HOSTNAME = import.meta.env.VITE_API_SERVER_URL ?? "";
const pb = new PocketBase(API_HOSTNAME);

export function createCRUDStore<
  T extends { [key: string]: any } & { id: string }
>(collectionName: string) {
  const store = create<CRUDState<T>>((set, get) => ({
    items: {},
    loading: false,
    error: null,

    listItems: async () => {
      set({ loading: true });
      try {
        const result = await pb.collection(collectionName).getList<T>();
        set({
          items: result.items.reduce(
            (acc, item) => ({ ...acc, [item.id]: item }),
            {}
          ),
          loading: false,
        });
      } catch (error: any) {
        if (error.isAbort) return;
        set({ error: error as Error, loading: false });
      }
    },

    createItem: async (item) => {
      const newItem = await pb.collection(collectionName).create<T>(item);
      set((state) => ({ items: { ...state.items, [newItem.id]: newItem } }));
      return newItem;
    },

    updateItem: async (id, item) => {
      const updatedItem = await pb
        .collection(collectionName)
        .update<T>(id, item);
      set((state) => ({
        items: { ...state.items, [updatedItem.id]: updatedItem },
      }));
      return updatedItem;
    },

    deleteItem: async (id) => {
      await pb.collection(collectionName).delete(id);
      set((state) => ({
        items: Object.fromEntries(
          Object.entries(state.items).filter(([k]) => k !== id)
        ),
      }));
    },

    getItemById: async (id) => {
      const cachedItem = get().items[id];
      if (cachedItem) {
        return cachedItem;
      }

      try {
        const result = await pb.collection(collectionName).getFullList<T>({
          filter: `id = '${id}'`,
        });
        const item = result[0];
        if (item) {
          set((state) => ({ items: { ...state.items, [item.id]: item } }));
        }
        return item ?? null;
      } catch (error: any) {
        if (error.isAbort) return null;
        console.error("Error fetching item by ID:", error);
        return null;
      }
    },
  }));

  // Initialize realtime subscription
  pb.realtime.subscribe(collectionName, async (e) => {
    const state = store.getState();
    switch (e.action) {
      case "create": {
        const existingItem = await state.getItemById(e.record.id);
        if (existingItem != null) return;

        store.setState((state) => ({
          items: { ...state.items, [e.record.id]: e.record as T },
        }));
        break;
      }
      case "update":
        store.setState((state) => ({
          items: { ...state.items, [e.record.id]: e.record as T },
        }));
        break;
      case "delete":
        store.setState((state) => ({
          items: { ...state.items, [e.record.id]: undefined },
        }));
        // Remove undefined key
        store.setState((state) => ({
          items: Object.fromEntries(
            Object.entries(state.items).filter(([k]) => k !== e.record.id)
          ),
        }));
        break;
    }
  });

  return store;
}
