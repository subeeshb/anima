import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "@prima-materia/ui";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute";

const MainPage = lazy(() => import("./pages/MainPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminMainPage = lazy(() => import("./pages/admin/AdminMainPage"));

const requireAuthForRoute = (element: JSX.Element) => {
  return <AuthenticatedRoute>{element}</AuthenticatedRoute>;
};

const App = () => {
  return (
    <Suspense
      fallback={
        <div style={{ width: "6rem", margin: "3rem auto" }}>
          <Spinner size="3rem" color="var(--color-text-p37)" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <AuthenticatedRoute requirePermission="admin">
              <AdminMainPage />{" "}
            </AuthenticatedRoute>
          }
        />

        <Route path="/*" element={requireAuthForRoute(<MainPage />)} />
      </Routes>
    </Suspense>
  );
};

export default App;
