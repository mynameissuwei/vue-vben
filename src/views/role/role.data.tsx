import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色成员',
      dataIndex: 'roleUser',
      customRender: ({ value }) => {
        if (value) return value + '...';
        else return '无';
      },
    },
    {
      title: '操作',
      width: 160,
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
      flag: 'ACTION',
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'roleName',
        label: '角色名称',
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
    ],
  };
}

export const roleCreateFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    required: true,
  },
];

export const tabsFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    required: true,
  },
];
