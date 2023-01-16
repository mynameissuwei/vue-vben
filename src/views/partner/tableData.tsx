import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { validatePhone } from '/@/validate/index';
import { areaRecord } from '/@/api/demo/cascader';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '合作伙伴英文标识',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '代理商简称',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '开始时间',
      width: 150,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      width: 150,
      sorter: true,
      dataIndex: 'endTime',
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 200,
    autoAdvancedLine: 4,
    schemas: [
      {
        field: `field11`,
        label: `合作伙伴英文标识`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `field11`,
        label: `代理商简称`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `field11`,
        label: `代理商名称`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'field8',
        component: 'ApiCascader',
        label: '所在省市',
        colProps: {
          span: 8,
        },
        componentProps: {
          api: areaRecord,
          apiParamKey: 'parentCode',
          dataField: 'data',
          labelField: 'name',
          valueField: 'code',
          initFetchParams: {
            parentCode: '',
          },
          isLeaf: (record) => {
            return !(record.levelType < 3);
          },
        },
      },
      {
        field: `field11`,
        label: `联系人名称`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `field11`,
        label: `联系人电话`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        label: '所属前线 ',
        field: 'remark',
        component: 'Select',
        colProps: {
          xl: 12,
          xxl: 8,
        },
        componentProps: {
          options: [
            {
              label: '通力',
              value: '1',
              key: '1',
            },
            {
              label: '巨人通力',
              value: '2',
              key: '',
            },
          ],
        },
      },
      {
        label: '审核状态  ',
        field: 'remark',
        component: 'Select',
        colProps: {
          xl: 12,
          xxl: 8,
        },
        componentProps: {
          options: [
            {
              label: '待审核',
              value: '1',
              key: '1',
            },
            {
              label: '审核通过',
              value: '2',
              key: '',
            },
            {
              label: '审核未通过',
              value: '2',
              key: '',
            },
          ],
        },
      },
    ],
  };
}

export const accountFormSchema: FormSchema[] = [
  {
    field: 'pwd',
    label: '合作伙伴英文标识',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 6,
    },
  },
  {
    field: 'nickname',
    label: '合作伙伴简称',
    component: 'Input',
    required: true,
  },

  {
    label: '合作伙伴名称 ',
    field: 'email',
    component: 'Input',
    required: true,
  },
  {
    label: '所在省市 ',
    field: 'remark',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    label: '联系人姓名 ',
    field: 'remark',
    component: 'Input',
    componentProps: {
      maxlength: 5,
    },
    required: true,
  },
  {
    label: '联系人电话 ',
    field: 'remark',
    component: 'Input',
    componentProps: {
      maxlength: 11,
    },
    rules: [
      {
        required: true,
      },
      { validator: validatePhone, trigger: 'blur' },
    ],
  },
  {
    label: '所属前线 ',
    field: 'remark',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '',
        },
      ],
    },
  },
];
