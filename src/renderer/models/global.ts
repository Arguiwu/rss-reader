import Parser from 'rss-parser';

import { db } from '../utils'

const getAllData = () => new Promise(resolve => {
  db.find({}, (err: any, docs: any) => {
    resolve(docs)
  })
})
const parser = new Parser({
  defaultRSS: 2.0,
});

export interface ISub {
  dispatch: any;
  history: any;
}

export interface IEffects {
  put: any;
  call: any;
}

export interface IQueryUrlData {
  url: string
}

export interface IQueryUrl {
  payload: IQueryUrlData
}

export default {
  namespace: "app",
  state: {
    selectUrl: '',
    homeTitle: "",
    items: [],
    newItems: [],
    contentLoading: true,
    listVisible: false,
    currentItem: {},
    editVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }: ISub) {
      history.listen((location: any) => {
        const { query } = location;
        dispatch({
          type: 'queryUrl',
          payload: {
            url: query.url || 'https://javascriptweekly.com/rss/2021nfbe',
          }
        })
        dispatch({
          type: 'queryAllData',
        })
      })
    },
  },
  effects: {
    * queryAllData({}, { put, call }: IEffects) {
      const allData = yield call(() => getAllData())
      yield put({
        type: 'updateState',
        payload: {
          newItems: allData,
        }
      })
    },
    * queryUrl({ payload }: IQueryUrl, { put, call }: IEffects) {
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
