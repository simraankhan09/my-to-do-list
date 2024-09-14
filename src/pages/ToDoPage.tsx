import { useAuth } from "../context/AuthenticationContext";
import { Button, Checkbox, Modal, notification, Table, Tag } from "antd";
import { useTodo } from "../hooks/useTodo";
import { ColumnsType } from "antd/es/table";
import { ToDo } from "../types";
import { FaPlus, FaPowerOff } from "react-icons/fa6";
import ToDoForm from "../components/ToDoForm";
import { v4 as uuidv4 } from "uuid";

function ToDoPage() {
  const { logout, user } = useAuth();
  const {
    todos,
    visibleCreateModal,
    mode,
    selectedTodo,
    visibleDeleteConfirmModal,
    setMode,
    onCloseModal,
    onOpenModal,
    handleSaveToDo,
    handleDeleteToDo,
    handleUpdateToDo,
    setTigger,
    setSelectedTodo,
    setVisibleDeleteConfirmModal,
  } = useTodo();

  const handleToDo = (formData: ToDo) => {
    if (mode === "create") {
      handlSave(formData);
    } else {
      handleUpdate(formData);
    }
  };

  const handlSave = (formData: ToDo) => {
    const response = handleSaveToDo({
      description: formData.description,
      title: formData.title,
      status: "IN_COMPLETED",
      id: uuidv4(),
    });
    if (response === 201) {
      notification.success({
        message: "New todo added to the list",
        duration: 4000,
      });
      onCloseModal();
      setTigger((prev) => prev + 1);
    } else {
      notification.error({
        message: "Something went wrong!",
        duration: 4000,
      });
    }
  };

  const handleUpdate = (formData: ToDo) => {
    const response = handleUpdateToDo({
      description: formData.description,
      title: formData.title,
      id: selectedTodo!.id,
      status: selectedTodo!.status,
    });
    if (response === 200) {
      notification.success({
        message: "Todo updated successfully",
        duration: 4000,
      });
      onCloseModal();
      setTigger((prev) => prev + 1);
    } else {
      notification.error({
        message: "Something went wrong!",
        duration: 4000,
      });
    }
  };

  const handleDelete = () => {
    const response = handleDeleteToDo(selectedTodo!.id);
    if (response === 200) {
      notification.success({
        message: "Todo deleted successfully",
        duration: 4000,
      });
      setVisibleDeleteConfirmModal(false);
      setTigger((prev) => prev + 1);
    } else {
      notification.error({
        message: "Something went wrong!",
        duration: 4000,
      });
    }
  };

  const columns: ColumnsType<ToDo> = [
    {
      dataIndex: "checkCompleted",
      key: "checkCompleted",
      title: "",
      render(value, record, index) {
        return (
          <Checkbox
            checked={record.status === "COMPLETED"}
            onChange={(e) => {
              const response = handleUpdateToDo({
                description: record.description,
                id: record.id,
                status: e.target.checked ? "COMPLETED" : "IN_COMPLETED",
                title: record.title,
              });
              if (response === 200) {
                setTigger((prev) => prev + 1);
              }
            }}
          ></Checkbox>
        );
      },
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render(value, record, index) {
        return (
          <Tag color={record.status === "COMPLETED" ? "green" : "red"}>
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render(value, record, index) {
        return (
          <div className="flex items-center gap-x-2">
            <Button
              type="link"
              onClick={() => {
                setSelectedTodo(record);
                setMode("update");
                onOpenModal();
              }}
            >
              Update
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                setSelectedTodo(record);
                setVisibleDeleteConfirmModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-end mb-3 gap-x-3">
        <div>Welcome, {user?.name}</div>
        <Button icon={<FaPowerOff />} onClick={logout} />
      </div>
      <h6 className="heading text-center">Manage Your Todo List Here</h6>
      <div className="flex items-end justify-end">
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => {
            setMode("create");
            onOpenModal();
          }}
        >
          Add New ToDo
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        className="w-full mt-5"
        dataSource={todos}
      />
      <Modal
        title={`${mode === "create" ? "Add New To Do" : "Update To Do"}`}
        open={visibleCreateModal}
        onCancel={onCloseModal}
        footer={[]}
        maskClosable={false}
        closable
        width="60%"
        destroyOnClose
        centered
      >
        <ToDoForm mode={mode} handleToDo={handleToDo} todo={selectedTodo} />
      </Modal>
      <Modal
        title="Confirmation"
        open={visibleDeleteConfirmModal}
        onCancel={() => setVisibleDeleteConfirmModal(false)}
        maskClosable={false}
        closable
        width="60%"
        destroyOnClose
        centered
        onClose={() => {
          setVisibleDeleteConfirmModal(false);
        }}
        onOk={handleDelete}
      >
        <div className="flex items-center">
          <p className="font-[500]">
            Are you sure you want to delete this todo item?
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default ToDoPage;
