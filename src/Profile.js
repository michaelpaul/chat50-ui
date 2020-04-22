import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { UserOutlined } from "@ant-design/icons";

export default class Profile extends React.Component {
    isAuthenticated() {
        return this.props.user ? true : false;
    }

    handleClick = () => {
        if (this.isAuthenticated()) {
            this.props.onLogout();
        } else {
            this.props.onLogin();
        }
    }

    render() {
        const isAuthenticated = this.isAuthenticated();
        return (
            <Row style={{ padding: "12px", height: "64px" }}>
                <Col span={6}>
                    {isAuthenticated ? (
                        <Avatar alt="Avatar" src={this.props.user.picture} />
                    ) : (
                            <Avatar alt="Avatar" icon={<UserOutlined />} />
                        )}
                </Col>
                <Col span={16}>
                    <p style={{ color: "white" }}>
                        {isAuthenticated ? this.props.user.name : "Guest"}
                        <br />
                        <a href="/" onClick={this.handleClick}>{isAuthenticated ? "Logout" : "Login / Sign Up"}</a>
                    </p>
                </Col>
            </Row>
        );
    }
}
