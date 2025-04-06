import {
  PageWithLeftSidebar,
  Sidebar,
  NavLink,
  Spinner,
} from "@prima-materia/ui";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import UserOptionsButton from "../../components/authentication/UserOptionsButton";

import AdminLanding from "../../components/admin/AdminLanding";

const Error404Page = lazy(() => import("../Error404Page"));
const AdminUsersPage = lazy(() => import("./AdminUsersPage"));
const AdminConfigPage = lazy(() => import("./AdminConfigPage"));
const AdminJobsPage = lazy(() => import("./AdminJobsPage"));
const AdminJobDetailPage = lazy(() => import("./AdminJobDetailPage"));

const AdminMainPage: React.FC = () => {
  return (
    <PageWithLeftSidebar
      title="Admin"
      sidebar={
        <Sidebar
          appName="Admin panel"
          homeHref="/admin"
          footerContent={
            <>
              <NavLink href="/" label="Back to app" />
              <UserOptionsButton />
            </>
          }
        >
          <NavLink href="/admin/users" label="Users" />
          <NavLink href="/admin/config" label="Configuration" />
          <NavLink href="/admin/jobs" label="Jobs" />
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
          <Route path="/" element={<AdminLanding />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/config" element={<AdminConfigPage />} />
          <Route path="/jobs/detail" element={<AdminJobDetailPage />} />
          <Route path="/jobs" element={<AdminJobsPage />} />

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Suspense>
    </PageWithLeftSidebar>
  );
};

export default AdminMainPage;
