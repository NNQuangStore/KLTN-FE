import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const importScoreboard = (body: any) => {
  return fetch({
    method: 'post',
    url: '/score/import',
    body: body,
  });
};

export enum Evalution {
  GIUA_HK_1 = 'Giữa HK 1',
  CUOI_HK_1 = 'Cuối HK 1',
  GIUA_HK_2 = 'Giữa HK 2',
  CUOI_HK_2 = 'Cuối HK 2',
}

export type TScoreboardParamReq = {
  typeEvalution: keyof typeof Evalution
}

const getScoreboard = (body: TScoreboardParamReq) => {
  const classId = storage.get('class_id');
  return fetch({
    method: 'post',
    url: '/score/get-all-class',
    body: {
        classId: classId,
        ...body
    },
  });
};

// api here
const apisScoreboard = {
  importScoreboard,
  getScoreboard
};

export default apisScoreboard;
