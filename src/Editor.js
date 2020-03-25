import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Input
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form>
            <Form.Item>
                <Row gutter={8}>
                    <Col span={22}>
                        <Input placeholder="Your message" onChange={onChange} value={value} />
                    </Col>
                    <Col span={2}>
                        <Button
                            title="Send"
                            htmlType="submit"
                            type="primary"
                            shape="circle"
                            icon={<ArrowRightOutlined />}
                            loading={submitting}
                            onClick={onSubmit}
                        />
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    </div>
);

export default Editor;