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
    homeTitle: "",
    items: [],
  },
  subscriptions: {
    setup ({ dispatch, history }: ISub) {
      history.listen(() => {
        dispatch({
          type: 'queryAll',
        })
      })
    },
  },
  effects: {
    * queryAll ({}, { put, call }: IEffects) {
      const data = yield call( async () => {
        const feed = await parser.parseURL('https://efe.baidu.com/atom.xml');
        return feed;
      })
      yield put({
        type: 'updateState',
        payload: {
          homeTitle: data.title,
          items: data.items,
        },
      })
    },
  },
  reducers: {
    updateState (state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
