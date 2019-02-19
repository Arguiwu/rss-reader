import Parser from 'rss-parser';

const parser = new Parser();

export interface ISub {
  dispatch: any;
  history: any;
}

export interface IEffects {
  put: any;
  call: any;
}

export default {
  namespace: "app",
  state: {
    selectUrl: '',
    homeTitle: "",
    items: [],
    contentLoading: true,
    listVisible: true,
    currentItem: {},
    editVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }: ISub) {
      history.listen(location => {
        const { query } = location;
        dispatch({
          type: 'queryAll',
          payload: {
            url: query.url || 'https://javascriptweekly.com/rss/2021nfbe',
          }
        })
      })
    },
  },
  effects: {
    * queryAll({ payload }, { put, call }: IEffects) {
      const { url } = payload;
      yield put({
        type: 'updateState',
        payload: {
          contentLoading: true,
          selectUrl: url,
        }
      })
      try {
        const data = yield call(async () => {
          const feed = await parser.parseURL(url);
          return feed;
        })
        yield put({
          type: 'updateState',
          payload: {
            homeTitle: data.title,
            items: data.items,
            contentLoading: false,
          },
        });
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            homeTitle: '',
            items: [],
            contentLoading: false,
          },
        });
      }
    },
  },
  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
