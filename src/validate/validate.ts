//匹配电子邮件地址
export const isEmailAddress = (value) => {
  return (
    /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ||
    /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(value)
  );
};

//匹配数字
export const isNumber = (value) => /^[0-9-]+$/g.test(value);

//匹配手机号
export const isPhone = (value) =>
  /^((00){1}[1-9]{1}[0-9]{1,3}|86|\+86|886|\+886|852|\+852|853|\+853)?1[3456789]\d{9}$/g.test(
    value,
  );
