import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: {
    name: '',
    email: '',
    token: '',
    currency: 'INR',
  },
});

export const values = atom({
  key: 'values',
  default: {
    availableBalance: 0,
    income: 0,
    expense: 0,
  }
})

export const transaction = atom<[{ date: string, amount: string, type: string, description: string  }]>({
  key: 'transaction',
  default: [{
    date: '',
    amount: '',
    type: '',
    description: '',
  }],
})