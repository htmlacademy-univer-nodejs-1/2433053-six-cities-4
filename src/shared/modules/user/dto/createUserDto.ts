import { UserType } from '../../../types/userTypeEnum.js';

export class CreateUserDto {
  public email!: string;
  public name!: string;
  public avatar!: string | null;
  public password!: string;
  public type!: UserType;
}