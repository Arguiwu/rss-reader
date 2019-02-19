import { Collapse } from 'antd';
import { connect } from 'dva';

const Panel = Collapse.Panel;

export interface IProps {
  app: any;
}

function Index({ app }: IProps) {
  const { homeTitle, items } = app;
  return (
    <div style={{ padding: '20px 40px' }}>
      <h4 style={{textAlign: 'center', marginBottom: 20, fontSize: 20,}}>{homeTitle}</h4>
      <Collapse accordion>
        {
          items.map((item: any) => {
            return (
              <Panel header={item.title} key={item.title}>
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </Panel>
            )
          })
        }
      </Collapse>
    </div>
  );
}

export default connect(({ app }: any) => ({ app }))(Index)
