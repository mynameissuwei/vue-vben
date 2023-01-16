<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button type="primary" @click="handleCreate">新建</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                icon: 'ic:outline-delete-outline',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                color: 'error',
                popConfirm: {
                  title: '你确定要删除该角色吗？',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CreateModal @register="createRegister" @success="handleSuccess" />
    <EditModal @register="editRegister" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './role.data';
  import { getRoleList, deleteList } from '/@/api/role';
  import CreateModal from './CreateRoleModal.vue';
  import EditModal from './EditRoleModal.vue';
  import { useModal } from '/@/components/Modal';
  import { Button } from 'ant-design-vue';

  const [createRegister, { openModal: openCreateModal }] = useModal();
  const [editRegister, { openModal: openEditModal }] = useModal();

  const [registerTable, { reload, setLoading, updateTableDataRecord }] = useTable({
    api: getRoleList,
    useSearchForm: true,
    formConfig: getFormConfig(),
    columns: getBasicColumns(),
    rowKey: 'id',
    canResize: true,
    resizeHeightOffset: 40,
  });

  function handleSuccess({ isUpdate, result }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(result.id, result);
    } else {
      reload();
    }
  }

  function handleEdit(record) {
    openEditModal(true, {
      record,
    });
  }

  function handleCreate() {
    openCreateModal(true);
  }

  function handleDelete(record) {
    setLoading(true);
    deleteList(record.id)
      .then(() => {
        setLoading(false);
        reload();
      })
      .catch(() => {
        setLoading(false);
      });
  }
</script>
