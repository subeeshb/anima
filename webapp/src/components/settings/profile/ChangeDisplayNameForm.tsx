import {
  Button,
  ButtonContainer,
  FormValidationProvider,
  NoticeCard,
  TextInput,
} from "@prima-materia/ui";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authentication/AuthContext";
import ChangeDisplayNameAPI from "../../../api/endpoints/ChangeDisplayName.api";

const ChangeDisplayNameForm: React.FC = () => {
  const { session, parseSessionFromToken } = useContext(AuthContext);
  const [name, setName] = useState(session?.displayName ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setName(session?.displayName ?? "");
  }, [session]);

  const onSave = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await new ChangeDisplayNameAPI().fetch({
        displayName: name,
      });

      setIsSaving(false);

      if (result.success == false || result.token == null) {
        setError(
          result.error ??
            "Unable to change display name. Please try again later."
        );
      } else {
        setSuccess(true);
        parseSessionFromToken(result.token, true);
      }
    } catch (e: any) {
      setIsSaving(false);
      setError(`Unable to change display name: ${e.message}.`);
    }
  }, [name]);

  return (
    <>
      <FormValidationProvider>
        <TextInput
          label="Display name"
          helpText="This is your name as shown in the app"
          value={name}
          onChange={setName}
          onValidate={(value) =>
            value.trim() !== "" ? null : "Type a non-empty display name"
          }
          disabled={isSaving}
        />

        <ButtonContainer>
          <Button
            label="Save display name"
            onClick={onSave}
            disabled={name.trim() === ""}
            disableIfFormValidationFails
            showSpinner={isSaving}
          />
        </ButtonContainer>

        {error != null && (
          <NoticeCard type="error" title="Couldn't update display name">
            {error}
          </NoticeCard>
        )}

        {success && (
          <NoticeCard type="success" title="Display name saved.">
            Your display name has been successfully changed.
          </NoticeCard>
        )}
      </FormValidationProvider>
    </>
  );
};

export default ChangeDisplayNameForm;
