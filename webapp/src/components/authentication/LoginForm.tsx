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
import { ServerContext } from "../../ServerContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { pb, setLoginSession } = useContext(ServerContext);
  const navigate = useNavigate();

  const onLogin = useCallback(async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await pb
        .collection("users")
        .authWithPassword(email, password);

      setLoginSession(
        {
          id: result.record.id,
          displayName: result.record.name ?? "",
          isVerified: result.record.verified ?? false,
        },
        result.token
      );

      setIsLoading(false);
      navigate(new URLSearchParams(window.location.search).get("next") ?? "/");
    } catch (e: any) {
      setIsLoading(false);
      setErrorMessage(
        e?.message ?? "Unable to log in right now. Try again later."
      );
    }

    // const response = await new LoginAPI().fetch({
    //   email,
    //   password,
    // });
    // setIsLoading(false);

    // if (response.error != null) {
    //   setErrorMessage(response.error);
    // } else {
    //   if (response.success == false || response.token == null) {
    //     setErrorMessage("Unable to log you in. Please try again later.");
    //   } else {
    //     parseSessionFromToken(response.token, true);
    //     navigate(
    //       new URLSearchParams(window.location.search).get("next") ?? "/"
    //     );
    //   }
    // }
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
