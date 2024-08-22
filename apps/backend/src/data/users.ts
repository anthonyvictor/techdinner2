import { User } from '@td/types/src/user';

export const users: {
  thony: User;
  luz: User;
} = {
  thony: {
    id: '565sa1d',
    createdAt: new Date(),
    email: 'thony@gmail.com',
    fullName: 'Anthony Victor Ramos Costa',
    phoneNumber: '5571984479191',
    role: 'dev',
  },
  luz: {
    id: 'as62d62',
    createdAt: new Date(),
    email: 'luz@gmail.com',
    fullName: 'Luz e Ana Da Silva',
    phoneNumber: '5571988726927',
    role: 'manager',
  },
};
