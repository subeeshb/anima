import { Center, NoticeCard, Text } from "@prima-materia/ui";
import prima_materia_logo from "../../assets/lib/prima-materia-3-logo.png";

const AdminLanding: React.FC = () => {
  return (
    <div>
      <NoticeCard type="info">
        Use the options on the left to make changes to how this app works.
      </NoticeCard>

      <Center horizontal>
        <div>
          <Text color="subtle">Powered by</Text>
          <br />
          <img
            style={{
              display: "block",
              opacity: 0.5,
              maxHeight: "6rem",
            }}
            src={prima_materia_logo}
            alt="Prima Materia"
          />
        </div>
      </Center>
    </div>
  );
};

export default AdminLanding;
