import React, { useRef, useEffect } from 'react';
import { Avatar, Comment, List } from 'antd';
import moment from 'moment';

const MessageList = ({ comments }) => {
    const listRef = useRef();

    useEffect(() => {
        if (!listRef.current) {
            return;
        }
        listRef.current.scrollIntoView({
            block: 'end', 
            inline: 'nearest', 
            behavior: 'smooth'
        });
    }, [comments.length]);

    return (
        <div ref={listRef} style={{ padding: 24, background: "#fff" }}>
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
        </div>
    );
};

export default MessageList;