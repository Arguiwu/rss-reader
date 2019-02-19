import { Layout, Modal, Table, Button, Dropdown, Menu, Form, Input, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { menus } from '../utils'

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};

export interface IProps {
  children: any;
  app: any;
  dispatch: any;
  form: any;
}

function App({ children, app, dispatch, form, }: IProps) {
  const { selectUrl, listVisible, editVisible, currentItem } = app;

  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  const clickHandle = (url: string) => {
    router.push(`/home?url=${url}`);
  }

  const listModalProps = {
    visible: listVisible,
    maskClosable: false,
    title: "数据源管理",
    width: 600,
    onOk: () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          listVisible: false,
        }
      })
    },
    onCancel: () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          listVisible: false,
        }
      })
    },
  }
  const editModalProps = {
    visible: editVisible,
    maskClosable: false,
    title: "数据源编辑",
    onOk: () => {
      validateFields((errors: any) => {
        if (errors) {
          return;
        }
        const data = {
          ...getFieldsValue(),
        };
        console.log(data)
        dispatch({
          type: 'app/updateState',
          payload: {
            editVisible: false,
          }
        })
      });
    },
    onCancel: () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          editVisible: false,
        }
      })
    },
  }

  const listClick = (key: number, record: any) => {
    if(key === 1) {
      dispatch({
        type: 'app/updateState',
        payload: {
          currentItem: record,
          editVisible: true,
        }
      })
    }
    if(key === 2) {
      confirm({
        title: '提示',
        content: '是否删除此数据？',
        onOk() {
        }
      });
    }
  }

  const menu = (record: any) => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={() => listClick(1, record)}>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => listClick(2, record)}>删除</a>
        </Menu.Item>
      </Menu>
    )
  }

  const addData = () => {
    dispatch({
      type: 'app/updateState',
      payload: {
        currentItem: {},
        editVisible: true,
      }
    })
  }

  const columns = [
    {
      title: "数据源名称",
      dataIndex: "title",
    },
    {
      title: "数据源地址",
      dataIndex: "url",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text: any, record: any) => {
        return (
          <Dropdown overlay={menu(record)}>
            <Button style={{ border: 'none' }}>
              <Icon style={{ marginRight: 2 }} type="bars" />
              <Icon type="down" />
            </Button>
          </Dropdown>
        )
      }
    },
  ];

  const tableProps = {
    dataSource: menus,
    columns: columns,
    rowKey: (record: any) => record.id
  };

  return (
    <div className="mainWrap">
      <Layout>
        <Header className="mainHead"><Icon type="setting" /></Header>
        <Layout className="mainContainer">
          <Sider className="mainSider" width={250}>
            <ul>
              {
                menus.map((item, index) => {
                  if (selectUrl) {
                    return <li key={item.id} onClick={() => clickHandle(item.url)} className={`${item.url === selectUrl ? 'active' : ''}`}><i>{item.title.slice(0, 1)}</i>{item.title}</li>
                  }
                  return <li key={item.id} onClick={() => clickHandle(item.url)} className={`${index === 0 ? 'active' : ''}`}><i>{item.title.slice(0, 1)}</i>{item.title}</li>
                })
              }
            </ul>
          </Sider>
          <Content className="mainContent">{children}</Content>
        </Layout>
      </Layout>
      <Modal {...listModalProps}>
        <Button type="primary" style={{ marginBottom: 20, }} onClick={addData}>新增数据</Button>
        <Table {...tableProps} className="dataSourceTable" />
      </Modal>
      <Modal {...editModalProps}>
        <Form layout="horizontal">
          <FormItem label="数据源名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator("title", {
              initialValue: currentItem.title,
              rules: [
                {
                  required: true,
                  message: "数据源名称必须填写",
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="数据源地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator("url", {
              initialValue: currentItem.url,
              rules: [
                {
                  required: true,
                  message: "数据源地址必须填写",
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default connect(({ app, dispatch }: any) => ({ app, dispatch }))(Form.create()(App))
