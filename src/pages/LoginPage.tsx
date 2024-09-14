import { useAuth } from "../context/AuthenticationContext";
import { Link, Navigate } from "react-router-dom";
import { formKeys, routesPathName } from "../constants";
import { Button, Form, notification } from "antd";
import { UserLoginResource } from "../types";
import { FormSchema, useFormGenerate } from "../hooks/useFormGenerate";
import { FaUser, FaLock } from "react-icons/fa6";
import { validateEmail } from "../utils";
import MainImage from "../assets/main-img.jpg";

function LoginPage() {
  const formSchema: FormSchema[] = [
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
      rules: [{ required: true, message: "Please enter your password" }],
    },
  ];
  const formItems = useFormGenerate(formSchema);
  const { user, login } = useAuth();
  const [form] = Form.useForm<UserLoginResource>();

  const handleLogin = (formValues: UserLoginResource) => {
    const response = login(formValues);
    if (response === 400) {
      notification.error({
        message: "Authentication failed",
        duration: 4000,
      });
      return;
    }
  };

  if (user) {
    return <Navigate to={routesPathName.todo} />;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <div className="hidden md:flex flex-grow w-full h-full">
        <img src={MainImage} alt="Main" className="w-full h-full" />
      </div>
      <div className="sub-container max-w-[496px]">
        <h6 className="heading">Please Login Here</h6>
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          {formItems}
          <div className="flex items-center gap-x-3">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button
              type="dashed"
              htmlType="reset"
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </div>
        </Form>
        <Link
          to={routesPathName.register}
          className="mt-2 text-[var(--ancent-color-1)]"
        >
          Don't have account?
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
