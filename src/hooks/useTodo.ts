import { useEffect, useRef, useState } from "react";
import { ToDo } from "../types";
import { deleteTodo, getAllToDos, saveTodo, updateTodo } from "../service";

export const useTodo = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [trigger, setTigger] = useState(0);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleDeleteConfirmModal, setVisibleDeleteConfirmModal] =
    useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [selectedTodo, setSelectedTodo] = useState<ToDo>();

  const initFetchRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initFetchRef.current) {
      setTodos(getAllToDos());
      initFetchRef.current = true;
    }

    if (trigger) {
      setTodos(getAllToDos());
    }
  }, [trigger]);

  const handleSaveToDo = (payload: ToDo) => {
    return saveTodo(payload).responseCode;
  };

  const handleUpdateToDo = (payload: ToDo) => {
    return updateTodo(payload).responseCode;
  };

  const handleDeleteToDo = (toDoId: string) => {
    return deleteTodo(toDoId).responseCode;
  };

  const onOpenModal = () => {
    setVisibleCreateModal(true);
  };

  const onCloseModal = () => {
    setVisibleCreateModal(false);
  };

  return {
    todos,
    visibleCreateModal,
    mode,
    selectedTodo,
    visibleDeleteConfirmModal,
    setTigger,
    handleSaveToDo,
    handleUpdateToDo,
    handleDeleteToDo,
    onOpenModal,
    onCloseModal,
    setMode,
    setSelectedTodo,
    setVisibleDeleteConfirmModal,
  };
};
