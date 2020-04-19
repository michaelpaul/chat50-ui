import React from 'react';
import { Menu } from 'antd';
import { BorderlessTableOutlined } from "@ant-design/icons";

const ChannelList = ({ channels = [], selected, onOpen }) => (
    <Menu theme="dark" mode="inline" selectedKeys={[selected]} onClick={({ key }) => onOpen(key)}>
        {0 === channels.length ? <Menu.Item>Loading channels...</Menu.Item> : '' }
        {channels.map(({key, name}) => (
            <Menu.Item key={key}>
                <BorderlessTableOutlined />
                <span className="nav-text">{name}</span>
            </Menu.Item>
        ))}
    </Menu>
);

export default ChannelList;