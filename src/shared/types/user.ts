type UserType = 'Base' | 'Pro'
export type User = {
    name: string;
    email: string;
    avatarPath?: string;
    password: string;
    type: UserType;
  }
  