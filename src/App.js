import React from 'react';
import { Layout } from 'antd';

import { configureClient, Auth } from './auth';
import Profile from './Profile';
import MessageList from './MessageList';
import ChannelList from './ChannelList';
import Editor from './Editor';
import { postMessage } from "./api";

import { BorderlessTableOutlined } from "@ant-design/icons";
import './App.css';

const { Content, Sider, Header, Footer } = Layout;

class App extends React.Component {
  state = {
    channels: [],
    currentChannel: null,
    comments: [],
    submitting: false,
    value: "",
    isAuthenticated: false,
    user: null,
    auth: null
  };

  async componentDidMount() {
    const client = await configureClient();
    const auth = new Auth(client);
    const isAuthenticated = await auth.authenticate();
    this.setState({ auth });
    if (isAuthenticated) {
      this.setState({
        isAuthenticated: true,
        user: await auth.getCurrentUser()
      });
    }
  }

  handleLogin = async () => {
    await this.state.auth.login();
  }

  handleLogout = async () => {
    await this.state.auth.logout();
  }

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    await postMessage(this.state.value, await this.state.auth.getAuthToken());
    
    this.setState({
      submitting: false,
      value: ""
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const currentChannel = this.state.channels.filter((c) => c.key === this.state.currentChannel);

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
            <Profile user={this.state.user} isAuthenticated={this.state.isAuthenticated} onLogin={this.handleLogin} onLogout={this.handleLogout} />
            <ChannelList channels={this.state.channels} />
          </Sider>
          <Layout style={{ marginLeft: 200, height: "100vh" }}>
            <Header style={{ background: "#fff" }}>
              <BorderlessTableOutlined /> { currentChannel.length ? currentChannel.name : 'Select a channel from the sidebar' }
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
