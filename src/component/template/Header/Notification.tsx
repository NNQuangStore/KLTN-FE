import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Popover } from 'antd';
import { useState } from 'react';

const Notification = () => {

  const data = [
    {
      title: 'Nguyễn Nhật Quang 1',
    },
    {
      title: 'Nguyễn Nhật Quang 2',
    },
    {
      title: 'Nguyễn Nhật Quang 3',
    },
    {
      title: 'Nguyễn Nhật Quang 4',
    },
  ];

  const [open, setOpen] = useState<boolean>();

  return (
    <Popover
      content={
        <List
          style={{
            width: '400px'
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Nguyễn Hải Nam Là 1 học sinh suất xắc lun đi học đúng giờ là con ngoan trò giỏi"
              />
            </List.Item>
          )}
        />
      }
      placement='bottomRight'
      title="Title"
      trigger="click"
      
      open={open}
      arrow={false}
      onOpenChange={(newValue) => setOpen(newValue)}
    >

      <Badge count={5} size='small'>
        <BellOutlined />
      </Badge>
    </Popover>
  );
};

export default Notification;