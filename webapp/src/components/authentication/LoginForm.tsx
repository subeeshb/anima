import {
  TextInput,
  ButtonContainer,
  Button,
  NoticeCard,
  FormValidationProvider,
} from "@prima-materia/ui";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmailAddress } from "../../utils/StringUtils";
import LoginAPI from "../../api/endpoints/Login.api";
import { AuthContext } from "./AuthContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { parseSessionFromToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogin = useCallback(async () => {
    setErrorMessage(null);
    setIsLoading(true);
    const response = await new LoginAPI().fetch({
      email,
      password,
    });
    setIsLoading(false);

    if (response.error != null) {
      setErrorMessage(response.error);
    } else {
      if (response.success == false || response.token == null) {
        setErrorMessage("Unable to log you in. Please try again later.");
      } else {
        parseSessionFromToken(response.token, true);
        navigate(
          new URLSearchParams(window.location.search).get("next") ?? "/"
        );
      }
    }
  }, [email, password]);

  return (
    <>
      <FormValidationProvider>
        <TextInput
          label="Email"
          value={email}
          onChange={setEmail}
          disabled={isLoading}
          focusOnLoad
          onValidate={(value) =>
            isValidEmailAddress(value)
              ? null
              : "Please type a valid email address"
          }
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          disabled={isLoading}
          onHitEnter={onLogin}
          onValidate={(value) =>
            value.trim() !== "" ? null : "Please type your password"
          }
        />

        <ButtonContainer>
          <Button
            primary
            label="Log in"
            onClick={onLogin}
            showSpinner={isLoading}
            disableIfFormValidationFails
            disabled={email.trim() === "" || password.trim() === ""}
          />
        </ButtonContainer>
      </FormValidationProvider>

      {errorMessage && (
        <NoticeCard type="error" title="Login failed">
          {errorMessage}
        </NoticeCard>
      )}
    </>
  );
};

export default LoginForm;
