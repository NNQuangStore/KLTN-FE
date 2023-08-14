
type IKeyStore = 'token' | 'merchantCode' | 'merchantId' | 'mid' | 'tid' | 'pathname' | 'merchantName';

const session = {
  set: (keyValue: IKeyStore, value: string) => {
    return sessionStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return sessionStorage.getItem(keyValue);
  },
};

const local = {
  set: (keyValue: IKeyStore, value: string) => {
    return localStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return localStorage.getItem(keyValue);
  },
};

const genGetSetKeyLocal = (key: IKeyStore) => ({
  get: () => local.get(key) ?? '',
  set: (value: string) => local.set(key, value),
});

const genGetSetKeySession = (key: IKeyStore) => ({
  get: () => session.get(key) ?? '',
  set: (value: string) => session.set(key, value),
});

const storage = {
  get: session.get,
  set: session.set,
  token: genGetSetKeyLocal('token'),
  merchantCode: genGetSetKeyLocal('merchantCode'),
  merchantId: genGetSetKeyLocal('merchantId'),
  merchantName: genGetSetKeyLocal('merchantName'),
  mid: genGetSetKeyLocal('mid'),
  tid: genGetSetKeyLocal('tid'),
  pathname: genGetSetKeySession('pathname'),
};

export default storage;
