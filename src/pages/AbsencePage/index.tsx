import { styled } from 'styled-components';
import Filter from '../../component/template/Filter';
import { Tabs, TabsProps } from 'antd';
import LeaveOfAbsence from './widgets/LeaveOfAbsence';
import ListAbsence from './widgets/ListAbsence';

const AbsencePage = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Xin nghĩ phép',
      children: <LeaveOfAbsence />,
    },
    {
      key: '2',
      label: 'Phép chờ duyệt',
      children: <ListAbsence />,
    },
    {
      key: '3',
      label: 'Phép đã được duyệt',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <AbsencePageStyled>
      <Filter>

      </Filter>
      <Tabs defaultActiveKey='1' items={items} />;
    </AbsencePageStyled>
  );
};

export default AbsencePage;

const AbsencePageStyled = styled.div`
`;