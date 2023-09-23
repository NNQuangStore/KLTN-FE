import { styled } from 'styled-components';
import AvatarSidebar from '../../component/molecule/AvatarSidebar';
import FormLayout from '../../component/organism/FormLayout';
import InputText from '../../component/atom/Input/InputText';
import InputPhone from '../../component/atom/Input/InputPhone';
import { Card } from 'antd';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import FormBlock from '../../component/organism/FormLayout/FormBlock';
import FormRow from '../../component/organism/FormLayout/FormRow';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

  const {id} = useParams();

  // const id = searchParams.get('id'); 
  

  return (
   <ProfilePageStyled>
      <Card className='profile-avatar'>
        <AvatarSidebar collapsed={false} />

        {/* <h3>About</h3> */}
        {/* <p>Là một giáo viên có kiến thức chuyên môn vững vàng mà còn là một người mang trong mình niềm đam mê mãnh liệt với việc dạy và hướng dẫn học sinh.</p> */}
      </Card>
      <Card className='profile-content'>
        <FormLayout<any>
          onSubmit={(values) => console.log(values)}>

              <FormBlock label='Thông tin cơ bản'>
                <InputText
                  name={'full_name'} 
                  label='Tên đầy đủ' 
                  rules={[
                    {required: true}]}/>
                <FormRow>
                  <>
                    <InputPhone name={'phone'} label='Số điện thoại' />
                    <InputText
                      name={'email'} 
                      label='Email' 
                      rules={[
                        {required: true}]}/>
                  </>
                </FormRow>
              </FormBlock>

              <FormBlock label='Thông tin chi tiết'>
                <FormRow>
                  <>
                    <InputText
                      name={'email'} 
                      label='Địa chỉ' 
                      rules={[
                        {required: true}]}/>
                    <InputText
                      name={'email'} 
                      label='Quê quán' 
                      rules={[
                        {required: true}]}/>
                  </>
                </FormRow>
              </FormBlock>
              {/* <InputDatePicker/>
              <InputCurrency/>
              <InputSelectRange/> */}
        </FormLayout>
      </Card>
   </ProfilePageStyled>
  );
};

export default ProfilePage;

const ProfilePageStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  .profile-avatar {
    width: 30%;

    h3 {
      color: ${COLOR_PRIMARY};
    }
  }
  .profile-content {
    width: 50%;
  }
`;