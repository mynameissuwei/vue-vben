<template>
  <BasicModal @register="registerModal" title="编辑角色" @ok="handleSubmit" :width="650">
    <Tabs v-model:activeKey="activeKey">
      <TabPane key="name" tab="角色名称" force-render>
        <BasicForm @register="registerForm" />
      </TabPane>
      <TabPane key="role" tab="角色成员" force-render>
        <div class="transfer-header">
          <span class="transfer-header-left tree-title">系统人员</span>
          <span class="transfer-header-right tree-title">角色成员</span>
        </div>
        <div class="transfer-container">
          <Transfer
            :list-style="{ width: '250px', height: '500px' }"
            v-model:target-keys="targetKeys"
            :data-source="memberList"
            :rowKey="(record) => record.id"
            show-search
            pagination
            :show-select-all="false"
            :render="(item) => item.username"
            @change="handleChange"
          />
        </div>
      </TabPane>
      <TabPane key="permission" tab="权限设置" force-render>
        <Row>
          <Col :span="12">
            <div class="tree-title">WEB端</div>
            <Tree
              style="border: 1px solid #d4d6d9; border-radius: 4px; margin: 0px 20px; height: 240px"
              v-model:selectedKeys="selectedKeysWeb"
              v-model:checkedKeys="checkedKeysWeb"
              checkable
              :fieldNames="fieldNames"
              :height="233"
              :tree-data="treeDataSourceWeb"
            />
          </Col>
          <Col :span="12">
            <div class="tree-title">APP端</div>
            <Tree
              style="border: 1px solid #d4d6d9; border-radius: 4px; margin: 0px 20px; height: 240px"
              v-model:selectedKeys="selectedKeysApp"
              v-model:checkedKeys="checkedKeysApp"
              checkable
              :fieldNames="fieldNames"
              :height="233"
              :tree-data="treeDataSourceApp"
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Tabs, Transfer, Tree, Row, Col } from 'ant-design-vue';
  import { tabsFormSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    editRoleName,
    showAllRoleMembers,
    showRoleMembers,
    saveRoleMember,
    showMenuList,
    saveMenuList,
  } from '/@/api/role';

  const { createMessage } = useMessage();
  const TabPane = Tabs.TabPane;
  const rowId = ref('');
  const emit = defineEmits(['register', 'success']);
  const activeKey = ref('name');
  const targetKeys = ref<string[]>([]);
  const memberList = ref([]);
  const treeDataSourceWeb = ref([]);
  const treeDataSourceApp = ref([]);
  const selectedKeysWeb = ref<string[]>([]);
  const checkedKeysWeb = ref<string[]>([]);
  const selectedKeysApp = ref<string[]>([]);
  const checkedKeysApp = ref<string[]>([]);

  const [registerForm, { validate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 20 },
    schemas: tabsFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const fieldNames = {
    title: 'name',
    key: 'id',
  };

  const handleChange = (keys: string[], direction: string, moveKeys: string[]) => {
    console.log(keys, direction, moveKeys);
  };

  const depthFirstTraversalRecursion = (root, arr = []) => {
    if (!root) return arr;
    const { roleContains, children, id } = root;
    if (roleContains) arr.push(id);
    children.forEach((child) => depthFirstTraversalRecursion(child, arr));
    return arr;
  };

  const flatten = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flatten(arr[i]));
      } else {
        result = result.concat(arr[i]);
      }
    }
    return result;
  };

  const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    rowId.value = data.record.id;
    let allMember = await showAllRoleMembers();
    let roleMember = await showRoleMembers(data.record.id);
    let roleMapMember = roleMember.map((item) => item.id);
    //
    let menuList = await showMenuList(data.record.id);
    //name edit
    setFieldsValue({
      ...data.record,
    });
    //transfer
    memberList.value = allMember;
    targetKeys.value = roleMapMember;
    //web
    treeDataSourceWeb.value = menuList.web;
    let checkKeysWeb = menuList.web.map((item) => depthFirstTraversalRecursion(item));
    selectedKeysWeb.value = flatten(checkKeysWeb);
    checkedKeysWeb.value = flatten(checkKeysWeb);
    //app
    treeDataSourceApp.value = menuList.app;
    let checkKeysApp = menuList.app.map((item) => depthFirstTraversalRecursion(item));
    selectedKeysApp.value = flatten(checkKeysApp);
    checkedKeysApp.value = flatten(checkKeysApp);
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      //edit name
      const values = await validate();
      let result = { ...values, id: rowId.value };
      await editRoleName(result);
      // transfer
      let roleResult = {
        roleId: unref(rowId),
        userIds: unref(targetKeys),
      };
      await saveRoleMember(roleResult);
      //menu
      let menuResult = {
        roleId: unref(rowId),
        menuIds: [...unref(checkedKeysWeb), ...unref(checkedKeysApp)],
      };
      await saveMenuList(menuResult);

      // TODO custom api
      closeModal();
      emit('success', { isUpdate: true, result });
    } catch (error) {
      createMessage.error('请输入角色名称');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  .transfer-header {
    margin-bottom: 10px;

    .transfer-header-left {
      margin-left: 45px;
    }

    .transfer-header-right {
      margin-left: 230px;
    }
  }

  .transfer-container {
    display: flex;
    justify-content: center;
  }

  .tree-title {
    font-weight: 500;
    margin-left: 20px;
    color: #000000;
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>
