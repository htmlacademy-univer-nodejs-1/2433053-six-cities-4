import { Container } from 'inversify';
import { UserService } from './userServiceInterface.js';
import { DefaultUserService } from './defaultUserService.js';
import { Component } from '../../types/componentEnum.js';
import { UserEntity, UserModel } from './userEntity.js';
import { types } from '@typegoose/typegoose';


export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}