import React, { Component } from 'react';
import { Table, Modal, Button, Menu, Dropdown, Icon, Tooltip } from 'antd';
import EditForm from './EditForm';
import moment from 'moment';

moment.locale('Ru');

const data = [
  {
    address: "ывап ц4е ывап ывап ывапы вап ывап ывап ывапывап",
    city: "мвыфывафы",
    date: {
      day: "2",
      month: "4",
      year: "1925"
    },
    day: "2",
    month: "4",
    year: "1925",
    fullName: "qwe asdfыв ывап",
    phone: "1234123412",
  },
  {
    address: "ывап ц4е ывап ывап ывапы вап ывап ывап ывапывап",
    city: "мвыфывафы",
    date: {
      day: "2",
      month: "4",
      year: "1925"
    },
    day: "2",
    month: "4",
    year: "1925",
    fullName: "qwe asdfыв ывап",
    phone: "1234123412",
  },
  {
    address: "ывап ц4е ывап ывап ывапы вап ывап ывап ывапывап",
    city: "мвыфывафы",
    date: {
      day: "2",
      month: "4",
      year: "1925"
    },
    day: "2",
    month: "4",
    year: "1925",
    fullName: "qwe asdfыв ывап",
    phone: "1234123412",
  },
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      isModal: false,
      data: JSON.parse(
        localStorage.getItem('usersData')
      ) || data,
      editableUser: {},
    }

    this.columns = [{
      dataIndex: 'fullName',
      key: 'fullName',
      title: 'ФИО',
    }, {
      dataIndex: 'date',
      key: 'date',
      title: 'День рождения',
      render: (birthday, record, index) => moment({
        ...birthday,
        month: +birthday.month - 1,
      }).format('DD MMMM YYYY')
    }, {
      dataIndex: 'address',
      key: 'address',
      title: 'Адрес',
    }, {
      dataIndex: 'city',
      key: 'city',
      title: 'Город',
    }, {
      dataIndex: 'phone',
      key: 'phone',
      title: 'номер телефона',
    }, {
      dataIndex: 'actions',
      key: 'actions',
      title: (<a
        className="ant-dropdown-link"
        onClick={this.showModal}
        ><Tooltip title="Добавить пользователя" placement="left">
          <Icon type="plus" />
        </Tooltip>
      </a>),
      render: (birthday, record, index) => (
        <Dropdown overlay={(<Menu>
          <Menu.Item>
            <a onClick={this.deleteUser(index)}>Удалить</a>
          </Menu.Item>
          <Menu.Item>
            <a onClick={this.editUser(index)}>Редактировать</a>
          </Menu.Item>
        </Menu>)}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="down" />
          </a>
        </Dropdown>
      )
    }]
  }

  deleteUser = (index) => (e) => {
    console.log(index, e);
    const { data } = this.state;
    this.setState({
      data: [
        ...data.slice(0, index),
        ...data.slice(index + 1)
      ]
    }, this.saveData)
  }

  editUser = (index) => (e) => {
    this.setState({
      editableUser: this.state.data[index],
    }, this.showModal)
  }

  showModal = () => {
    this.setState({
      isModal: true,
    })
  }

  saveUser = (user) => {
    console.log(user);
    const { data } = this.state;
    let newData = [...data];
    if (user.id) {
      const index = data.findIndex((obj) => obj.id === user.id)
      if (index !== -1) {
        newData = [
          ...data.slice(0, index),
          user,
          ...data.slice(index + 1),
        ];
      }
    } else {
      newData = [
        ...data,
        {
          ...user,
          id: `id${Math.random()}`
        },
      ];
    }
    this.setState({
      data: newData,
      isModal: false,
      editableUser: {},
    }, this.saveData)
  }

  hideModal = () => {
    this.setState({
      isModal: false,
    })
  }

  saveData = () => {
    localStorage.setItem(
      'usersData',
      JSON.stringify(this.state.data)
    );
  }
  
  render() {
    const { data } = this.state;

    return (
      <div className="app">
        <Modal
          wrapClassName='modal__wraper'
          visible={this.state.isModal}
          footer={null}
          onCancel={this.hideModal}
          title={
            this.state.editableUser.id ?
            'Редактирование данных' :
            'Новый пользователь'
          }
        >
          <EditForm
            saveUser={this.saveUser}
            user={this.state.editableUser}
          />
        </Modal>
        <Table
          pagination={false}
          columns={this.columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default App;
