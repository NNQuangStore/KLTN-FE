import InputText from '../../component/atom/Input/InputText';
import { styled } from 'styled-components';
import FormLayout from '../../component/organism/FormLayout';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import { useSetLoadingPage } from '../../services/UI/LoadingPage';
import apisAuth from './service/apis';
import InputTextPassword from '../../component/atom/Input/InputPassword';

interface AuthForm {
  phone: string,
  password: string
}

const LoginPage = () => {

  const setLoading = useSetLoadingPage();

  const onSubmit = async (values: AuthForm) => {
    console.log(values);
    
    setLoading(true);
    try {
      const res = await apisAuth.login(values);
      console.log(res);
      
    } catch(err) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageStyled>
      <h3>Welcome back!</h3>
      <FormLayout<AuthForm>
        onSubmit={onSubmit}
        renderButton={<ButtonLoginStyled htmlType='submit' label='Login'/>}>

        <InputText label={'Số điện thoại'}/>
        <InputTextPassword label={'Mật Khẩu'} />
        </FormLayout>
    </LoginPageStyled>
  );
};

export default LoginPage;
const LoginPageStyled = styled.div`
  h3 {
    text-align: center;
    font-size: 38px;
  }
`;

const ButtonLoginStyled = styled(ButtonPrimary)`
  width: 100%;
`;