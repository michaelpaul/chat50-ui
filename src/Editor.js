import React from 'react';
import { Form, Input } from 'antd';

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <Form.Item style={{ marginBottom: '0px' }} hasFeedback validateStatus={submitting ? 'validating' : ''}>
            <Input size="large" placeholder="Your message" onChange={onChange} value={value} />
        </Form.Item>
    </form>
);

export default Editor;