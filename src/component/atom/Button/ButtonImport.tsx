import { Modal, Upload } from 'antd';
import ButtonOutline from './ButtonOutline';
import DataTable from '../../molecule/DataTable';
import { useState } from 'react';
import { BoxPlotOutlined } from '@ant-design/icons';
import { DraggerProps, RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { read, utils } from 'xlsx';

const ButtonImport = () => {

  const [open, setOpen] = useState<boolean>(false);
  const { Dragger } = Upload;

  const template = [
    {
      title: 'Tiêu đề',
    },
    {
      title: 'Ngày gửi',
      valid: (value: string) => {
        const regex = /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/g;
        return value.match(regex);
      }
    },
    {
      title: 'Trạng thái',
    }
  ];

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'Title__c',
      key: 'Title__c',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'SentDay__c',
      key: 'SentDay__c',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status__c',
      key: 'Status__c',
    }
  ];

  const dataSource = [
    {
      Title__c: 'Haha',
      SentDay__c: '2023-12-04',
      Status__c: 'Đã gửi'
    }
  ];

  const props: DraggerProps = {
      accept: '.xlsx',
      name: 'file',
      multiple: false,
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      beforeUpload: (file: RcFile) => {
        
        const reader = new FileReader();
        reader.onload = (e) => {          
          const data = e?.target?.result;
          const workbook = read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = utils.sheet_to_json(worksheet);
          console.log(json);

          // const keys = Object.keys(json[0]);

          // template.forEach(o => {
            // if(keys.find(s => s === o.title)) {
            //   o.valid()
            // }
          // });
        };
        
        reader.readAsArrayBuffer(file);
      },
    };

  return(
    <>
      <ButtonOutline onClick={() => setOpen(true)}>Import</ButtonOutline>
      <Modal 
        open={open}         
        footer={null}
        forceRender>
        <h3>Hãy import theo luồng data sao</h3>
        <DataTable pagination={false} bordered={false} columns={columns} dataSource={dataSource}/>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <BoxPlotOutlined type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default ButtonImport;