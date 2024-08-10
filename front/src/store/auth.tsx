import { atom } from 'recoil';


export const userIdState = atom<boolean>({
  key: 'userIdState',
  default: false,
});

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
});

export const userEmailState = atom<string>({
  key: 'userEmailState',
  default: '',
});

export const userLoggedInState = atom<boolean>({
  key: 'userLoggedInState',
  default: false,
});