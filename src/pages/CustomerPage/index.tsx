import DataTable from '../../component/molecule/DataTable';
import ModalButton from '../../component/organism/ModalButton';
import Filter from '../../component/template/Filter';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import CustomerForm from './widgets/CustomerForm';
import CustomerDataTable from './widgets/CustomerDataTable';
import InputSearchText from '../../component/atom/Input/InputSearch';

const CustomerPage = () => {


  return (
    <>
      <Filter>
          <ModalButton title={'Customer'} buttonRender={<ButtonPrimary label='Add Customer'/>}>
            <CustomerForm/>
          </ModalButton>
          <InputSearchText/>
        </Filter>
      <CustomerDataTable />
    </>
  );
};

export default CustomerPage;