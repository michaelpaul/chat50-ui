import React from 'react';
import { Avatar, Comment, List } from 'antd';

const MessageList = ({ comments }) => {
    let lastAuthor = null;
    return (
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={props => {
                let sameAuthor = props.avatar === lastAuthor;
                lastAuthor = props.avatar;

                return (
                    <Comment
                        content={props.content}
                        author={sameAuthor ? null : props.author}
                        avatar={
                            <Avatar
                                src={props.avatar}
                                style={{ visibility: sameAuthor ? "hidden" : "" }}
                            />
                        }
                        datetime={sameAuthor ? null : props.datetime}
                    />
                );
            }}
        />
    );
};

export default MessageList;