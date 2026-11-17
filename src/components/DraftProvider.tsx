"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { useEffect, useState } from "react";
type Draft = {
  owner: string;
  equipment: string;
  quantity: number;
  start: string;
  end: string;
  updated: number;
};
const initial: Draft = {
  owner: "",
  equipment: "",
  quantity: 1,
  start: "",
  end: "",
  updated: 0,
};
const slice = createSlice({
  name: "draft",
  initialState: initial,
  reducers: {
    save: (_s, a: PayloadAction<Draft>) => a.payload,
    clear: () => initial,
  },
});
const storage = {
  getItem: async (k: string) =>
    typeof window === "undefined" ? null : sessionStorage.getItem(k),
  setItem: async (k: string, v: string) => {
    if (typeof window !== "undefined") sessionStorage.setItem(k, v);
  },
  removeItem: async (k: string) => {
    if (typeof window !== "undefined") sessionStorage.removeItem(k);
  },
};
function makeStore() {
  return configureStore({
    reducer: {
      draft: persistReducer(
        { key: "rental-draft", storage, version: 1 },
        slice.reducer,
      ),
    },
    middleware: (get) => get({ serializableCheck: false }),
  });
}
export function useDraft() {
  return {
    draft: useSelector((s: { draft: Draft }) => s.draft),
    dispatch: useDispatch(),
    save: slice.actions.save,
    clear: slice.actions.clear,
  };
}
export default function DraftProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(makeStore);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const p = persistStore(store, undefined, () => setReady(true));
    return () => p.pause();
  }, [store]);
  return (
    <Provider store={store}>
      {ready ? children : <p role="status">Preparing form…</p>}
    </Provider>
  );
}
