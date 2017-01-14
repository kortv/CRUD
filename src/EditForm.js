import React from 'react';
import './EditForm.css';
import { Form, Input, Select, Button, Row, Col } from 'antd';
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
        console.log('Received values of form: ', values);
      }
      console.log('Received values of form: ', err);
    });
  }

  const checkName = (rule, value, callback) => {
    if (value && /^\w+\s\w+\s\w+$/.test(value)) {
      callback();
    }
    callback('ФИО должно содержать "Фамилию Имя Отчество"!');
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
      span: 14,
      offset: 6,
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '+7',
  })(
    <Select className="icp-selector">
      <Option value="+7">+7</Option>
    </Select>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label='ФИО'
        hasFeedback
      >
        {getFieldDecorator('fullName', {
          rules: [{
            required: true, message: 'Фамилия Имя Отчество, обязательно!'
          }, {
            validator: checkName,
          }],
        })(
          <Input placeholder='Фамилия Имя Отчество' />
        )}
      </FormItem>
      <Row>
        <Col span={5} />
        <Col span={4}>
          <FormItem {...formItemLayout} label='Год'>
          {getFieldDecorator('year', {
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
          {getFieldDecorator('month', {
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
          {getFieldDecorator('day', {
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
          rules: [{
            required: true, message: 'Заполните Город!'
          }],
        })(
          <Input />
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Phone Number"
      >
        {getFieldDecorator('phone', {
          rules: [{
            required: true, message: 'Введите номер телефона!'
          }, {
            validator: checkPhone,
          }],
        })(
          <Input
            addonBefore={prefixSelector}
            type='phone'
            placeholder='9001234567'
          />
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">Сохранить</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(EditForm);
