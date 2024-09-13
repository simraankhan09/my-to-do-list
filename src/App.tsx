import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ToDoPage from "./pages/ToDoPage";
import { routesPathName } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routesPathName.login} element={<LoginPage />} />
          <Route path={routesPathName.register} element={<RegisterPage />} />
          <Route
            path={routesPathName.todo}
            element={
              <ProtectedRoute>
                <ToDoPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
