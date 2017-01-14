import React from 'react';
import './EditForm.css';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import moment from 'moment';
moment.locale('Ru');

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
      <Col span={6} offset={1}>
        {fullName}
      </Col>
      <Col span={3}>
        {moment({ year, month: +month - 1, day}).format('DD MMMM YYYY')}
      </Col>
      <Col span={6}>
        Адрес
      </Col>
      <Col span={3}>
        Город
      </Col>
      <Col span={3}>
        +7{phone}
      </Col>
    </Row>
  )
}

export default UserItem;
