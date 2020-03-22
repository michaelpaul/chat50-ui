import React from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Layout,
  Menu,
  Form,
  Button,
  Input
} from 'antd';

import { authenticate, getCurrentUser } from './auth';
import Profile from './Profile';
import MessageList from './MessageList';

import {
  BorderlessTableOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import './App.css';

const { Content, Sider, Header, Footer } = Layout;

function makeMessage(body) {
  return {
    author: "Mister Nice Guy",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: body,
    datetime: moment().fromNow()
  };
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form>
      <Form.Item>
        <Row gutter={8}>
          <Col span={22}>
            <Input onChange={onChange} value={value} />
          </Col>
          <Col span={2}>
            <Button
              htmlType="submit"
              type="primary"
              shape="circle"
              icon={<ArrowRightOutlined />}
              loading={submitting}
              onClick={onSubmit}
            />
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </div>
);

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
    isAuthenticated: false,
    user: null
  };

  async componentDidMount() {
    const isAuthenticated = await authenticate();
    if (isAuthenticated) {
      this.setState({
        isAuthenticated: true,
        user: await getCurrentUser()
      });
    }
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    let msg = this.state.value;
    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.state.comments.push(makeMessage(msg));
      this.setState({
        submitting: false,
        value: "",
        comments: this.state.comments
      });
    }, 250);
  };

  handleChange = e => {
    console.log("na mudanca", e.target.value, this);
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div className="App">
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <Profile user={this.state.user} isAuthenticated={this.state.isAuthenticated} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <BorderlessTableOutlined />
                <span className="nav-text">pset1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <BorderlessTableOutlined />
                <span className="nav-text">pset2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <BorderlessTableOutlined />
                <span className="nav-text">pset3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200, height: "100vh" }}>
            <Header style={{ background: "#fff" }}>
              <BorderlessTableOutlined /> pset1
          </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "scroll" }}>
              <div style={{ padding: 24, background: "#fff" }}>
                <MessageList comments={comments} />
              </div>
            </Content>
            <Footer>
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
