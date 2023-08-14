import DataTable from '../../component/molecule/DataTable';
import Filter from '../../component/template/Filter';

const DashboardPage = () => {

  const data: any[] = [];

  // const columns: ColumnDef<any>[]= [
  //   {
  //     header: 'id',
  //     accessorKey: 'id'
  //     footer
  //   }
  // ];

  // const table = useReactTable({data, columns}); 

  const onSubmit = (values: any) => {
    console.log(values);
    
  };

  return (
    <>
      <Filter>
       
      </Filter>
      <DataTable />
    </>
  );
};

export default DashboardPage;