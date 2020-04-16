import React from 'react';
import { Layout } from 'antd';
import io from 'socket.io-client';

import { configureClient, Auth } from './auth';
import Profile from './Profile';
import MessageList from './MessageList';
import ChannelList from './ChannelList';
import Editor from './Editor';
import * as api from "./api";

import { BorderlessTableOutlined } from "@ant-design/icons";
import './App.css';

const { Content, Sider, Header, Footer } = Layout;

class App extends React.Component {
  state = {
    channels: [],
    currentChannel: null,
    messages: [],
    submitting: false,
    value: "",
    isAuthenticated: false,
    user: null,
    auth: null
  }

  async componentDidMount() {
    const client = await configureClient();
    const auth = new Auth(client);
    const socket = io('http://localhost:5000');
    const channels = await api.getChannels();

    this.setState({ auth, socket, channels });

    const [first] = channels;
    if (first) {
      this.handleOpenChannel(first.key);
    }

    socket.on('chat50.message', this.onChatMessage);

    if (await auth.authenticate()) {
      api.login(await this.state.auth.getAuthToken());
      this.setState({
        isAuthenticated: true,
        user: await auth.getCurrentUser()
      });
    }
  }

  onChatMessage = (message) => {
    const { currentChannel } = this.state;
    if (!currentChannel || message.channel !== currentChannel.key) {
      return;
    }

    this.setState({
      messages: [...this.state.messages, message]
    });
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

    await api.postMessage(
      this.state.currentChannel.key,
      this.state.value,
      await this.state.auth.getAuthToken()
    );

    this.setState({
      submitting: false,
      value: ""
    });
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  handleOpenChannel = (key) => {
    const [currentChannel] = this.state.channels.filter(it => it.key === key);
    if (!currentChannel) {
      return;
    }
    api.getMessages(currentChannel.key).then(messages => {
      this.state.socket.emit('chat50.join', { channel: currentChannel.key });
      this.setState({ currentChannel, messages });
    });
  }

  render() {
    const { currentChannel, messages, submitting, value } = this.state;

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
            <ChannelList channels={this.state.channels} onOpen={this.handleOpenChannel} />
          </Sider>
          <Layout style={{ marginLeft: 200, height: "100vh" }}>
            <Header style={{ background: "#fff" }}>
              <BorderlessTableOutlined /> {currentChannel ? currentChannel.name : 'Select a channel from the sidebar'}
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "scroll" }}>
                <MessageList comments={messages} />
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
