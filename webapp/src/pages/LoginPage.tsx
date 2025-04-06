import {
  Card,
  SingleColumnPage,
  TabContainer,
  Tab,
  Button,
} from "@prima-materia/ui";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import LoginForm from "../components/authentication/LoginForm";
import { AuthContext } from "../components/authentication/AuthContext";
import HelloCatAPI from "../api/endpoints/HelloCat.api";
import RegistrationForm from "../components/authentication/RegistrationForm";

const LoginPage: React.FC = () => {
  const { session } = useContext(AuthContext);

  if (session != null) {
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

            <Card>
              <Button
                label="Test"
                onClick={async () => {
                  await new HelloCatAPI().fetch(null);
                }}
              />
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
