import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetRoleList = '/ums/permission/role/list',
  AddRoleList = '/ums/permission/role',
  DeleteRoleList = '/ums/permission/role/',
  EditRoleName = '/ums/permission/role',
  ShowAllRoleMembers = '/ums/permission/user/all',
  ShowRoleMembers = '/ums/permission/role/allRoleUsers/',
  SaveRoleMember = '/ums/permission/role/saveRoleUsers',
  ShowMenuList = '/ums/permission/role/listRoleMenu/',
  SaveMenuList = '/ums/permission/role/saveRoleMenu',
}

export const getRoleList = (data) => {
  return defHttp.post({ url: Api.GetRoleList, data });
};

export const addRoleList = (data) => {
  return defHttp.post({ url: Api.AddRoleList, data });
};

export const deleteList = (id) => {
  return defHttp.delete({ url: Api.DeleteRoleList + id });
};

export const editRoleName = (data) => {
  return defHttp.post({ url: Api.EditRoleName, data });
};

export const showAllRoleMembers = () => {
  return defHttp.post({ url: Api.ShowAllRoleMembers });
};

export const showRoleMembers = (id: string) => {
  return defHttp.get({ url: Api.ShowRoleMembers + id });
};

export const saveRoleMember = (data) => {
  return defHttp.post({ url: Api.SaveRoleMember, data });
};

export const showMenuList = (id) => {
  return defHttp.get({ url: Api.ShowMenuList + id });
};

export const saveMenuList = (data) => {
  return defHttp.post({ url: Api.SaveMenuList, data });
};
