import {
  PageWithLeftSidebar,
  Sidebar,
  NavLink,
  Spinner,
} from "@prima-materia/ui";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import UserOptionsButton from "../components/authentication/UserOptionsButton";
import { FaLock } from "react-icons/fa6";
import PermissionGate from "../components/authentication/PermissionGate";

const HomePage = lazy(() => import("./HomePage"));
const SettingsHomePage = lazy(() => import("./settings/SettingsHomePage"));
const TodoListPage = lazy(() => import("./example/TodoListPage"));
const Error404Page = lazy(() => import("./Error404Page"));

const MainPage: React.FC = () => {
  return (
    <PageWithLeftSidebar
      sidebar={
        <Sidebar
          appName="My app"
          homeHref="/"
          footerContent={
            <>
              <PermissionGate permissionName="admin">
                <NavLink href="/admin" label="Admin" icon={<FaLock />} />
              </PermissionGate>
              <UserOptionsButton />
            </>
          }
        >
          <NavLink href="/" label="Home" />
          <NavLink href="/todo" label="Todo" />
        </Sidebar>
      }
    >
      <Suspense
        fallback={
          <div style={{ width: "6rem", margin: "3rem auto" }}>
            <Spinner size="3rem" color="var(--color-text-p37)" />
          </div>
        }
      >
        <Routes>
          <Route path="/todo" element={<TodoListPage />} />

          <Route path="/settings" element={<SettingsHomePage />} />

          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Suspense>
    </PageWithLeftSidebar>
  );
};

export default MainPage;
