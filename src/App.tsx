import "./App.scss";
import { Flex, Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Credits, VideoComponent } from "./components";

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Flex className="header" align="center" justify="center">
          <Typography.Title style={{ color: "white" }}>Welcome to my challenge :)</Typography.Title>
        </Flex>
      </Header>
      <Content>
        <Flex className="content" align="center" vertical gap="middle">
          <VideoComponent />
          <Credits />
        </Flex>
      </Content>
    </Layout>
  );
}

export default App;
