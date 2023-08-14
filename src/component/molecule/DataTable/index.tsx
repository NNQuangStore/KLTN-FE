import { Table, TableProps } from 'antd';
import { styled } from 'styled-components';
import ActionTable from './ActionTables';
import { UserAddOutlined } from '@ant-design/icons';

interface Props<T> extends TableProps<T> {

}

const DataTable = <T extends {}>({
  ...props
} : Props<T>) => {


  return (
    <DataTableStyled>
      <TableStyled
        rowKey={(item) => item.id}
        size='small'
        {...props}
        scroll={{
          x: 100
        }}
        // pagination={{
        //   defaultCurrent: Number(page?.page ?? 1),
        //   total: data?.pagination?.total_record,
        //   defaultPageSize: 10,
        //   current: Number(params.page || ''),
        //   onChange: (pageChange, sizeChange) => {
        //     const params: any = {
        //       page: pageChange == 0 ? 1 : pageChange,
        //       per_page: sizeChange,
        //       keyword: searchParams.get('keyword')
        //     };
        //     dispatch(customerActions.setCustomerListParams(params));
        //   },
        //   showSizeChanger: true,
        //   showTotal(total) {
        //     return `Total ${total} items`;
        //   },
        // }}
      />
    </DataTableStyled>
  );
};

export default DataTable;

const DataTableStyled = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 12px 0px;
`;

const TableStyled = styled(Table)`
  width: 100%;
  .ant-table-thead {
    tr {
      th {
        background-color: white;
        text-wrap: nowrap;
      }
      th::before {
        content: none !important;
      }
    }
  }
`;