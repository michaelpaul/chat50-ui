import React from 'react';
import { Avatar, Comment, List } from 'antd';

const MessageList = ({ comments }) => {
    let lastAuthor = null;
    return (
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={props => {
                let sameAuthor = props.author === lastAuthor;
                lastAuthor = props.author;

                return (
                    <Comment
                        content={props.body}
                        author={sameAuthor ? null : props.author}
                        avatar={
                            <Avatar
                                alt="Author Avatar"
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