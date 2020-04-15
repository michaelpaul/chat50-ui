import React from 'react';
import { Avatar, Comment, List } from 'antd';
import moment from 'moment';

const MessageList = ({ comments }) => {
    return (
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={props => {
                return (
                    <Comment
                        content={props.body}
                        author={props.author}
                        avatar={<Avatar alt={props.author} src={props.avatar} />}
                        datetime={moment(props.datetime).format('LLL')}
                    />
                );
            }}
        />
    );
};

export default MessageList;