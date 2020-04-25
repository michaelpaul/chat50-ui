import React from 'react';
import { Form, Input } from 'antd';

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <Form onFinish={onSubmit}>
        <Form.Item style={{ marginBottom: '0px' }} hasFeedback validateStatus={submitting ? 'validating' : ''}>
            <Input size="large" placeholder="Your message" onChange={onChange} value={value} />
        </Form.Item>
    </Form>
);

export default Editor;