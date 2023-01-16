<template>
  <BasicModal @register="registerModal" title="新增角色" @ok="handleSubmit" :min-height="50">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleCreateFormSchema } from './role.data';
  import { addRoleList } from '/@/api/role';

  const emit = defineEmits(['register', 'success']);

  const [registerModal, { closeModal, setModalProps }] = useModalInner();
  const [registerForm, { validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 21 },
    schemas: roleCreateFormSchema,
    showActionButtonGroup: false,
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      // TODO custom api
      console.log(values);
      await addRoleList(values);
      closeModal();
      emit('success', {});
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
