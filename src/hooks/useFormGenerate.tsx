import { InputProps, Input, Form } from "antd";
import { Rule } from "antd/es/form";

const { TextArea } = Input;

export interface FormSchema extends InputProps {
  fieldtype: "TEXT_STRING" | "TEXT_AREA";
  name: string;
  label: string;
  rules?: Rule[];
  textAreaRows?: number;
  textAreaCols?: number;
}

export const useFormGenerate = (schema: FormSchema[]) => {
  const formFields = schema.map((item) => {
    switch (item.fieldtype) {
      case "TEXT_STRING":
        return (
          <Form.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
          >
            <Input {...item} />
          </Form.Item>
        );

      case "TEXT_AREA":
        return (
          <Form.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
          >
            <TextArea rows={item.textAreaRows} cols={item.textAreaCols} />
          </Form.Item>
        );

      default:
        return <></>;
    }
  });
  return formFields;
};
