import { ValidateIf, ValidationOptions } from 'class-validator';

export function IsOptional(validationOptions?: ValidationOptions) {
  return ValidateIf((obj, value) => {
    return value !== null && value !== undefined && value !== '';
  }, validationOptions);
}

export const roles = {
  createPost: 'create-post',
  updatePost: 'update-post',
  deletePost: 'delete-post',

  createAccount: 'create-account',

  createCategory: 'create-category',

  createNews: 'create-news',
  updateNews: 'update-news',
  deleteNews: 'delete-news',
};

export enum EStatusAccount {
  ACTIVE = 'ACTIVE',
  LOCK = 'LOCK',
}

export const formatNumberMoney = (value: number | string) => {
  let valueNumber = value;
  if (typeof value !== 'string') {
    valueNumber = Number(value);
  }
  const formatter = new Intl.NumberFormat('vi-VN');
  return formatter.format(valueNumber as number).split(',')[0];
};

export const filterAccount = (user: any) => {
  return {
    id: `${user._id ?? user.id}`,
    roles: user.roles,
  };
};

export const randomNumberCustomLength = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  );
};

export const saltOrRounds = 10;
