import { Layout } from 'antd';
import { connect } from 'dva';
import {menus} from '../utils'

const { Header, Sider, Content } = Layout;

export interface IProps {
  children: any;
  app: any;
}

function App({ children, app }: IProps) {
  return (
    <div className="mainWrap">
      <Layout>
        <Header className="mainHead"></Header>
        <Layout className="mainContainer">
          <Sider className="mainSider" width={250}>
            <ul>
              {
                menus.map(item => <li key={item.id}><i>新</i>{item.title}</li>)
              }
            </ul>
          </Sider>
          <Content className="mainContent">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default connect(({ app }: any) => ({ app }))(App)
