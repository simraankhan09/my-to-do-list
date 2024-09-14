import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { routesPathName } from "../constants";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      <div className="text-4xl text-center">
        <p>404</p>
        <p>Page Not found!</p>
        <Button
          type="primary"
          onClick={() => {
            navigate(routesPathName.todo);
          }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
