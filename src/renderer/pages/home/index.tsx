import { Collapse, Spin } from 'antd';
import { connect } from 'dva';

const Panel = Collapse.Panel;

export interface IProps {
  app: any;
}

function Index({ app }: IProps) {
  const { homeTitle, items, contentLoading } = app;
  return (
    <Spin wrapperClassName="loadingContainer" spinning={contentLoading}>
      <div style={{ padding: '20px 40px' }}>
        {
          homeTitle ? (
            <>
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
            </>
          ) : (
            <h4 style={{textAlign: 'center', marginBottom: 20, fontSize: 20,}}>请求失败或暂无更新</h4>
          )
        }
      </div>
    </Spin>
  );
}

export default connect(({ app }: any) => ({ app }))(Index)
