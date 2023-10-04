import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { Button, Card, Col, Form, Input, Row, Select, SelectProps, Space, Tag } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
type LayoutType = Parameters<typeof Form>[0]['layout'];
interface DataType {
  key: string;
  content:string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}
const columns2: ColumnsType<DataType> = [
  {
    title: 'Năng lực',
    dataIndex: 'content',
    fixed: true,
    width: 200,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    fixed: true,
    width: 80,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    dataIndex: 'tel',
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 4 };
      }
      // These two are merged into above cell
      if (index === 1) {
        return { rowSpan: 0 };
      }
      if (index === 2) {
        return { rowSpan: 0 };
      }
      if (index === 3) {
        return { rowSpan: 0 };
      }

      return {};
    },
  },
];
const columns3: ColumnsType<DataType> = [
  {
    title: 'Phẩm chất',
    dataIndex: 'content',
    fixed: true,
    width: 200,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    fixed: true,
    width: 80,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    dataIndex: 'tel',
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 4 };
      }
      // These two are merged into above cell
      if (index === 1) {
        return { rowSpan: 0 };
      }
      if (index === 2) {
        return { rowSpan: 0 };
      }
      if (index === 3) {
        return { rowSpan: 0 };
      }
      if (index === 4) {
        return { rowSpan: 0 };
      }

      return {};
    },
  },
];
const columns: ColumnsType<DataType> = [
  {
    title: 'Môn học và hoạt động giáo dục',
    dataIndex: 'content',
    rowScope: 'row',
    fixed: true,
    width: 120,
    
  },
  {
    title: 'Mức đạt được',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    fixed: true,
    width: 100,
    
  },
  {
    title: 'Điển KTĐK',
    dataIndex: 'age',
    fixed: true,
    width: 100,
  },
  {
    title: 'Nhận xét',
    colSpan: 2,
    rowSpan:4,
    dataIndex: 'tel',
    fixed: true,
    width: 300,
  },
];

const data: DataType[] = [
  {
    key: '1',
    content:'Tiếng Việt',
    name: '',
    age: 32,
    tel: '',
    phone: 0,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    content:'Toán',
    name: '',
    tel: '',
    phone: 0,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    content:'Khoa học',
    name: '',
    age: 32,
    tel: '0',
    phone: 0,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    content:'LS và ĐL',
    name: '',
    age: 0,
    tel: '',
    phone: 0,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Tiếng Anh',
    name: '',
    age: 0,
    tel: '',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Đạo đức',
    name: '',
    age: 0,
    tel: '',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Âm nhạc',
    name: '',
    age: 0,
    tel: '0',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Mĩ thuật',
    name: '',
    age: 0,
    tel: '0',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Kĩ thuật',
    name: '',
    age: 0,
    tel: '0',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
  {
    key: '5',
    content:'Thể dục',
    name: '',
    age: 0,
    tel: '0',
    phone: 0,
    address: 'Dublin No. 2 Lake Park',
  },
];

const data2: DataType[] = [
  {
    key: '1',
    content:'Chăm học, chăm làm',
    name: '',
    age: 32,
    tel: '',
    phone: 0,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    content:'Tự tin, trách nhiệm',
    name: '',
    tel: '',
    phone: 0,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    content:'Trung thủy, kỉ luật',
    name: '',
    age: 32,
    tel: '',
    phone: 0,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    content:'Đoàn kết yêu thương',
    name: '',
    age: 32,
    tel: '0',
    phone: 0,
    address: 'Sydney No. 1 Lake Park',
  },
  
];

const data3: DataType[] = [
  {
    key: '1',
    content:'Tự phục vụ, tự quản',
    name: '',
    age: 32,
    tel: '',
    phone: 0,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    content:'Hợp tác',
    name: '',
    tel: '0',
    phone: 0,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    content:'Tự học, giải quyết vấn đề',
    name: '',
    age: 32,
    tel: '0',
    phone: 0,
    address: 'Sydney No. 1 Lake Park',
  },
  
];
const EvaluationSheetPage = () => {
  // const classId = storage.get('class_id');
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');
  const[dataSelect1, setDataSelect1]= useState('');
  const[dataSelect2, setDataSelect2]= useState('');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

    const onChange = (value: string) => {
      setDataSelect1(value);
    };

    const onChange2 = (value: string) => {
      setDataSelect2(value);
    };
    
    const onSearch = (value: string) => {
      console.log('search:', value);
    };
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    // hàm xử lý Lọc
    const onFinish = (value: string) =>{ console.log(dataSelect1+' '+dataSelect2);};
    
  return (
    <EvaluationSheetPageStyled>
      <Row gutter={1}>
    <Col >
      <Card title="1. Các môn học và hoạt động giáo dục" bordered={false}>
      <br />
   <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="Tra cứu điểm" name="layout">
      </Form.Item>
      <Form.Item label="Chọn năm">
      <Select
    showSearch
    placeholder="Năm học"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: '2023',
        label: '2023-2024',
      },
      {
        value: '2024',
        label: '2024-2025',
      },
      {
        value: '2025',
        label: '2025-2026',
      },
    ]}
  />
      </Form.Item>
      <Form.Item label="Chọn học kỳ">
      <Select
    showSearch
    placeholder="Học kỳ"
    optionFilterProp="children"
    onChange={onChange2}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'hk1',
        label: 'HK1',
      },
      {
        value: 'hk2',
        label: 'HK2',
      },
      {
        value: 'hk3',
        label: 'HK3',
      },
      {
        value: 'hk4',
        label: 'HK4',
      },
    ]}
  />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">Lọc</Button>
      </Form.Item>
    </Form>
    <br />
      <Table columns={columns} dataSource={data} bordered pagination={false}/>
      </Card>
    </Col>
    <Col >
    <Card title="2. Các năng lực phẩm chất" bordered={false}>
      <br /><br /><br />
      <Table style={{paddingTop:'10px'}} columns={columns2} dataSource={data3} bordered pagination={false}/>
     <br /> <br /> <br />
      <Table columns={columns3} dataSource={data2} bordered pagination={false}/>
      </Card>
    </Col>
   
  </Row>
    </EvaluationSheetPageStyled>
  );
};

export default EvaluationSheetPage;

const EvaluationSheetPageStyled = styled.div`
  height: auto;
  gap: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards {
    display: flex;
    justify-content: center;
    gap: 100px;

    .card-item {
      background-color: ${COLOR_PRIMARY};
      /* white-space: nowrap; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      width: 255px;
      cursor: pointer;
      p {
        font-size: 32px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
    }
  }
`;