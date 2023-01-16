<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button style="margin-left: 20px" @click="handleExport">导出</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
    <PartnerModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import PartnerModal from './PartnerModal.vue';
  import { demoListApi } from '/@/api/demo/table';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, TableAction, PartnerModal },
    setup() {
      const [registerModal, { openModal }] = useModal();

      const [registerTable, { reload, setLoading }] = useTable({
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleExport() {
        console.log('export');
      }

      function handleEdit(record) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete() {
        setLoading(true);
        // deleteList(record.id)
        //   .then(() => {
        //     setLoading(false);
        //     reload();
        //   })
        //   .catch(() => {
        //     setLoading(false);
        //   });
      }

      function handleSuccess() {
        reload();
      }

      function createActions(record) {
        return [
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '注销',
            popConfirm: {
              title: '是否确认注销',
              confirm: handleDelete.bind(null, record),
            },
          },
        ];
      }

      return {
        registerTable,
        createActions,
        handleCreate,
        handleExport,
        registerModal,
        handleSuccess,
      };
    },
  });
</script>
