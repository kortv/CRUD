import React from 'react';
import './EditForm.css';
import { Form, Input, Select, Button, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const UserItem = ({
  address,
  city,
  day,
  fullName,
  month,
  phone,
  prefix,
  year,
}) => {
  return (
    <Row>
      <Col span={4}>
        {fullName}
      </Col>
      <Col span={4}>
        {fullName}
      </Col>
      <Col span={4}>
        {fullName}
      </Col>
      <Col span={4}>
        {fullName}
      </Col>
    </Row>
  )
}

export default UserItem;
