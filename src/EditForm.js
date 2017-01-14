import React from 'react';
import get from 'lodash.get';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import './EditForm.css';
const FormItem = Form.Item;
const Option = Select.Option;

const dateNumbers = (fromNum, toNum) => {
  const array = [];
  for (let i = 0; i <= toNum - fromNum; i++) {
    array[i] = <Option key={i} value={`${i + fromNum}`}>{i + fromNum}</Option>
  }
  return array;
}

const EditForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.saveUser(values);
      }
    });
  }

  const checkPhone = (rule, value, callback) => {
    if (value && /^\d{10}$/.test(value)) {
      callback();
    }
    callback('Телефон должен содержать только 10 цифры');
  }
  
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 3,
      offset: 17,
    },
  };
  getFieldDecorator('id', {
    initialValue: get(props, 'user.id')
  })
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label='ФИО'
        hasFeedback
      >
        {getFieldDecorator('fullName', {
          initialValue: get(props, 'user.fullName'),
          rules: [{
            required: true, message: 'Фамилия Имя Отчество, обязательно!'
          }],
        })(
          <Input placeholder='Фамилия Имя Отчество' />
        )}
      </FormItem>
      <Row>
        <Col span={5} />
        <Col span={4}>
          <FormItem {...formItemLayout} label='Год'>
          {getFieldDecorator('date.year', {
            initialValue: get(props, 'user.date.year'),
            rules: [{
              required: true, message: 'Выберите год!'
            }],
          })(
            <Select
              showSearch
              className=""
            >
              {dateNumbers(1920, new Date().getFullYear())}
            </Select>
          )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem {...formItemLayout} label='Месяц'>
          {getFieldDecorator('date.month', {
            initialValue: get(props, 'user.date.month'),
            rules: [{ required: true, message: 'Выберите месяц!' }],
          })(
            <Select className="">
              {dateNumbers(1, 12)}
            </Select>
          )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem {...formItemLayout} label='Число'>
          {getFieldDecorator('date.day', {
              initialValue: get(props, 'user.date.day'),
            rules: [{ required: true, message: 'Выберите день!' }],
          })(
            <Select className="">
              {dateNumbers(1, 31)}
            </Select>
          )}
          </FormItem>
        </Col>
      </Row>

      <FormItem
        {...formItemLayout}
        label='Адрес'
        hasFeedback
      >
        {getFieldDecorator('address', {
          initialValue: get(props, 'user.address'),
          rules: [{
            required: true, message: 'Заполните Адрес!'
          }],
        })(
          <Input />
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label='Город'
        hasFeedback
      >
        {getFieldDecorator('city', {
          initialValue: get(props, 'user.city'),
          rules: [{
            required: true, message: 'Заполните Город!'
          }],
        })(
          <Input />
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Номер телефона"
      >
        {getFieldDecorator('phone', {
          initialValue: get(props, 'user.phone'),
          rules: [{
            required: true, message: 'Введите номер телефона!'
          }, {
            validator: checkPhone,
          }],
        })(
          <Input
            addonBefore='+7'
            type='phone'
            placeholder='9001234567'
          />
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: '100%' }}
        >Сохранить</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(EditForm);
