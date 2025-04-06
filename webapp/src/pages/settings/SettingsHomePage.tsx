import { CollapsibleCard, Heading, SingleColumnPage } from "@prima-materia/ui";
import ChangePasswordForm from "../../components/settings/profile/ChangePasswordForm";
import ChangeDisplayNameForm from "../../components/settings/profile/ChangeDisplayNameForm";

const SettingsHomePage: React.FC = () => {
  return (
    <SingleColumnPage title="Settings">
      <Heading type="page-title">Settings</Heading>

      <CollapsibleCard title="Change password">
        <ChangePasswordForm />
      </CollapsibleCard>

      <CollapsibleCard title="Change display name">
        <ChangeDisplayNameForm />
      </CollapsibleCard>
    </SingleColumnPage>
  );
};

export default SettingsHomePage;
