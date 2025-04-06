import { Card, SingleColumnPage, Tab, TabContainer } from "@prima-materia/ui";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <SingleColumnPage title="Home">
      <h1>Hello there!!</h1>

      <TabContainer>
        <Tab id="t1" title="Tab 1">
          tab 1
        </Tab>
        <Tab id="t2" title="Tab 2">
          tab 2
        </Tab>
      </TabContainer>

      <Card title="Hello">This app is now using Prima Materia UI!</Card>

      <Card>
        For a sample of some functionality, see the{" "}
        <Link to="/todo">todo list page</Link>.
      </Card>
    </SingleColumnPage>
  );
};

export default HomePage;
