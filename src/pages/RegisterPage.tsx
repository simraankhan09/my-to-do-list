import { Button, Form, notification } from "antd";
import { useAuth } from "../context/AuthenticationContext";
import { User } from "../types";
import { formKeys, routesPathName } from "../constants";
import { FormSchema, useFormGenerate } from "../hooks/useFormGenerate";
import { FaLock, FaUser, FaAddressBook } from "react-icons/fa6";
import { validateEmail, validatePassword } from "../utils";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import MainImage from "../assets/main-img.jpg";

function RegisterPage() {
  const formSchema: FormSchema[] = [
    {
      fieldtype: "TEXT_STRING",
      name: formKeys.name,
      label: "Name",
      rules: [{ required: true, message: "Please enter your name" }],
      prefix: <FaAddressBook />,
    },
    {
      fieldtype: "TEXT_STRING",
      name: formKeys.email,
      label: "Email",
      type: "email",
      prefix: <FaUser />,
      rules: [
        { required: true, message: "Please enter your email address" },
        {
          message: "Invalid email address",
          validator(rule, value, callback) {
            return new Promise<void>((resolve, reject) => {
              if (!validateEmail(value)) {
                reject("Please enter your email address");
              } else {
                resolve();
              }
            });
          },
        },
      ],
    },
    {
      fieldtype: "TEXT_STRING",
      name: formKeys.password,
      label: "Password",
      type: "password",
      prefix: <FaLock />,
      rules: [
        { required: true, message: "Please enter your password" },
        {
          message: `Must contain at least 
              one number one uppercase
              one lowercase 
              at least 8 characters`,
          validator(rule, value, callback) {
            return new Promise<void>((resolve, reject) => {
              if (!validatePassword(value)) {
                reject(
                  `Must contain at least 
                  one number one uppercase
                  one lowercase 
                  at least 8 characters`
                );
              } else {
                resolve();
              }
            });
          },
        },
      ],
    },
  ];

  const formItems = useFormGenerate(formSchema);
  const { register } = useAuth();
  const [form] = Form.useForm<User>();
  const naviagte = useNavigate();

  const handleRegister = (formValues: User) => {
    const response = register({
      email: formValues.email,
      id: uuidv4(),
      name: formValues.name,
      password: formValues.password,
    });
    if (response === 400) {
      notification.error({
        message: "Authentication failed",
        duration: 4000,
      });
    } else if (response === 201) {
      notification.success({
        message: "User Successfully Registered",
        duration: 4000,
      });
      setTimeout(() => {
        naviagte(routesPathName.todo);
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen max-h-screen">
      <div className="hidden md:flex flex-grow w-full h-full">
        <img src={MainImage} alt="Main" className="w-full h-full" />
      </div>
      <div className="sub-container">
        <h6 className="heading">Please Register Here</h6>
        <Form form={form} layout="vertical" onFinish={handleRegister}>
          {formItems}
          <div className="flex item-center gap-x-3">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="dashed" htmlType="reset">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
