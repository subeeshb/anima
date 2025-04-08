import { Card, SingleColumnPage, TabContainer, Tab } from "@prima-materia/ui";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import LoginForm from "../components/authentication/LoginForm";
import RegistrationForm from "../components/authentication/RegistrationForm";
import { ServerContext } from "../ServerContext";

const LoginPage: React.FC = () => {
  // TODO
  const { currentUser } = useContext(ServerContext);

  if (currentUser != null) {
    return (
      <Navigate
        to={new URLSearchParams(window.location.search).get("next") ?? "/"}
      />
    );
  }

  return (
    <SingleColumnPage title="Login">
      <div
        style={{
          margin: "0 auto",
          maxWidth: "50vw",
        }}
      >
        <TabContainer>
          <Tab id="login" title="Log in">
            <Card title="Log in to your account">
              <LoginForm />
            </Card>
          </Tab>
          <Tab id="register" title="or create a new account">
            <Card title="Create an account">
              <RegistrationForm />
            </Card>
          </Tab>
        </TabContainer>
      </div>
    </SingleColumnPage>
  );
};

export default LoginPage;
