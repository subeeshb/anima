import {
  Button,
  ButtonContainer,
  NoticeCard,
  TextInput,
} from "@prima-materia/ui";
import { useCallback, useState } from "react";
import ChangePasswordAPI from "../../../api/endpoints/ChangePassword.api";

const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [didSucceed, setDidSucceed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChangePassword = useCallback(async () => {
    setIsSaving(true);
    setErrorMessage(null);
    setDidSucceed(false);

    try {
      const result = await new ChangePasswordAPI().fetch({
        currentPassword,
        newPassword,
      });

      if (result.success) {
        setDidSucceed(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setErrorMessage(
          result.error ?? "Unable to change password. Please try again later."
        );
      }

      setIsSaving(false);
    } catch (e: any) {
      setIsSaving(false);
      setErrorMessage(
        `Unable to change password: ${e.message ?? "Unknown error"}.`
      );
    }
  }, [currentPassword, newPassword]);

  return (
    <>
      <TextInput
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={setCurrentPassword}
        disabled={isSaving}
      />
      <TextInput
        label="New password"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        disabled={isSaving}
      />
      <TextInput
        label="Confirm new password"
        type="password"
        value={confirmNewPassword}
        onChange={setConfirmNewPassword}
        disabled={isSaving}
      />

      <ButtonContainer>
        <Button
          label="Change password"
          onClick={onChangePassword}
          disabled={
            currentPassword.trim() === "" ||
            newPassword.trim() === "" ||
            newPassword !== confirmNewPassword
          }
          showSpinner={isSaving}
        />
      </ButtonContainer>

      {errorMessage && (
        <NoticeCard type="error" title="Couldn't change password">
          {errorMessage}
        </NoticeCard>
      )}

      {didSucceed && (
        <NoticeCard type="success" title="Password changed">
          Your password has been successfully changed. Please use your new
          password the next time you log in.
        </NoticeCard>
      )}
    </>
  );
};

export default ChangePasswordForm;
