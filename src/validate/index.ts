import type { Rule } from 'ant-design-vue/es/form';

import { isEmailAddress, isNumber, isPhone } from './validate';

export const validateEmailAddress = async (_rule: Rule, value: number) => {
  if (value && !isEmailAddress(value)) {
    return Promise.reject('格式错误');
  } else {
    return Promise.resolve();
  }
};

export const validateNumber = async (_rule: Rule, value: number) => {
  if (value && !isNumber(value)) {
    return Promise.reject('格式错误');
  } else {
    return Promise.resolve();
  }
};

export const validatePhone = async (_rule: Rule, value: number) => {
  if (value && !isPhone(value)) {
    return Promise.reject('请输入正确的手机号');
  } else {
    return Promise.resolve();
  }
};
