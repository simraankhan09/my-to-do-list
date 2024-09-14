import { FormSchema, useFormGenerate } from "../hooks/useFormGenerate";
import { formKeys } from "../constants";
import { Button, Form } from "antd";
import { ToDo } from "../types";
import { useEffect } from "react";

interface ToDoFormProps {
  mode: "create" | "update";
  todo?: ToDo;
  handleToDo: (formData: ToDo) => void;
}

const ToDoForm = (props: ToDoFormProps) => {
  const { handleToDo, todo, mode } = props;
  const formSchema: FormSchema[] = [
    {
      fieldtype: "TEXT_STRING",
      label: "Title",
      name: formKeys.title,
      rules: [{ required: true, message: "Please enter the title" }],
    },
    {
      fieldtype: "TEXT_AREA",
      label: "Description",
      name: formKeys.description,
      rules: [{ required: true, message: "Please enter the description" }],
      textAreaRows: 5,
    },
  ];

  const [form] = Form.useForm<ToDo>();
  const formItems = useFormGenerate(formSchema);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleToDo}
      initialValues={mode === "update" ? todo : undefined}
    >
      {formItems}
      <div className="flex items-center justify-end gap-x-3">
        <Button type="primary" htmlType="submit">
          {mode === "create" ? "Add" : "Update"}
        </Button>
        <Button type="dashed" htmlType="reset">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default ToDoForm;
