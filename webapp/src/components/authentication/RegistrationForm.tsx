import {
  TextInput,
  ButtonContainer,
  Button,
  NoticeCard,
  FormValidationProvider,
  FormValidationSummary,
} from "@prima-materia/ui";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmailAddress } from "../../utils/StringUtils";
import { ServerContext } from "../../ServerContext";

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { pb, setLoginSession } = useContext(ServerContext);

  const onRegister = useCallback(async () => {
    try {
      setErrorMessage(null);
      setIsSaving(true);

      await pb.collection("users").create({
        password: newPassword,
        passwordConfirm: confirmNewPassword,
        email: email,
        emailVisibility: false,
        verified: false,
        name: displayName,
        permissions: "[]",
      });

      const loginResult = await pb
        .collection("users")
        .authWithPassword(email, newPassword);

      setSuccessMessage(
        `Your account has been created successfully. You'll be logged in in a few seconds.`
      );
      window.setTimeout(() => {
        setLoginSession(
          {
            id: loginResult.record.id,
            displayName: loginResult.record.name ?? "",
            isVerified: loginResult.record.verified ?? false,
            permissions: loginResult.record.permissions ?? [],
          },
          loginResult.token
        );

        navigate(
          new URLSearchParams(window.location.search).get("next") ?? "/"
        );
      }, 3000);
    } catch (e: any) {
      setIsSaving(false);
      setErrorMessage(e?.message);
    }
  }, [
    email,
    displayName,
    newPassword,
    confirmNewPassword,
    pb,
    setLoginSession,
  ]);

  return (
    <>
      <FormValidationProvider>
        <TextInput
          label="Email address"
          value={email}
          onChange={setEmail}
          focusOnLoad
          disabled={isSaving}
          onValidate={(value) =>
            isValidEmailAddress(value) ? null : "Type a valid email address"
          }
        />

        <TextInput
          label="Display name"
          value={displayName}
          onChange={setDisplayName}
          disabled={isSaving}
          onValidate={(value) =>
            value.trim() !== "" ? null : "Type a display name"
          }
        />

        <TextInput
          label="New password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          disabled={isSaving}
          onValidate={(value) =>
            value.trim() !== "" ? null : "Type your password"
          }
        />

        <TextInput
          label="Confirm new password"
          type="password"
          value={confirmNewPassword}
          onChange={setConfirmNewPassword}
          disabled={isSaving}
          onValidate={(value) =>
            value === newPassword ? null : "Passwords do not match"
          }
          onHitEnter={() => {
            if (
              email.trim() === "" ||
              newPassword.trim() === "" ||
              displayName.trim() === ""
            ) {
              return;
            }

            onRegister();
          }}
        />

        <ButtonContainer>
          <Button
            label="Sign up"
            onClick={onRegister}
            disableIfFormValidationFails
            disabled={
              email.trim() === "" ||
              newPassword.trim() === "" ||
              displayName.trim() === ""
            }
            showSpinner={isSaving}
          />
        </ButtonContainer>

        <FormValidationSummary />

        {errorMessage && (
          <NoticeCard type="error" title="Couldn't sign up">
            {errorMessage}
          </NoticeCard>
        )}
        {successMessage && (
          <NoticeCard type="success" title="Account created!">
            {successMessage}
          </NoticeCard>
        )}
      </FormValidationProvider>
    </>
  );
};

export default RegistrationForm;
