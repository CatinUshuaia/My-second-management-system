import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';

const Formsubmitstatistic: React.FC = () => (
    <Row gutter={16}>
        <Col span={8}>
            <Statistic title="Today's submission" value={114514} />
        </Col>
        <Col span={8}>
            <Statistic title="Pending" value={114514}  />
        </Col>
        <Col span={8}>
            <Statistic title="Done" value={114514}  />
        </Col>

    </Row>
);

export default Formsubmitstatistic;