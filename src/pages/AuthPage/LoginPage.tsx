import InputText from '../../component/atom/Input/InputText';
import { styled } from 'styled-components';
import FormLayout from '../../component/organism/FormLayout';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import { useSetLoadingPage } from '../../services/UI/LoadingPage';
import InputTextPassword from '../../component/atom/Input/InputPassword';
import { useDispatch } from 'react-redux';
import authActions from './service/actions';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import uiSelector from '../../services/UI/selectors';
import storage from '../../utils/sessionStorage';
import { useEffect } from 'react';
import apisAuth from './service/apis';
import { IApiLoginResData } from './service/types/auth';
import uiActions from '../../services/UI/actions';

interface AuthForm {
  phone: string,
  password: string
}

const LoginPage = () => {

  const dispatch = useAppDispatch();
  const loadingPage = uiSelector.getLoadingPage();

  // setLoading(true);
  const navigate = useNavigate();
  // console.log(loadingPage);


  const token = storage.get('token');


  // useEffect(() => {  
  //   console.log(token);
      
  //   if(token) {
  //     navigate('/student');
  //   }
  // },[token]);
  
  const onSubmit = async (values: AuthForm) => {
    // 0333007630
    // ksvchainamtest
    
    try {
      dispatch(uiActions.setLoadingPage(true));
      
      // const res = await dispatch(authActions.login.fetch({
      //   phone: values.phone ?? '0333007630',
      //   password: values.password ?? 'ksvchainamtest'
      // }));
      navigate('/student');

        const res = await apisAuth.login({
          phone: values.phone ?? '0333007630',
          password: values.password ?? 'ksvchainamtest'
        });

        console.log(res);
        

        const resData = res?.data as (IApiLoginResData | null);
        if (!resData) throw 'fail';        

        storage.set('token', resData.token);
        storage.set('user_name', resData.UserName__c);
        storage.set('class_id', resData.Class.Id);
        storage.set('class_name', resData.Class.Name);   
        
        console.log(resData);
        

        dispatch(authActions.login.success(resData));
        

    } catch(err) {

    } finally {
      dispatch(uiActions.setLoadingPage(false));
      navigate('/student');


    }
  };

  return (
    <LoginPageStyled>
      <h3>Welcome back!</h3>
      <FormLayout<AuthForm>
        onSubmit={onSubmit}
        renderButton={<ButtonLoginStyled htmlType='submit' label='Login'/>}>

        <InputText defaultValue='0333007630' value='0333007630' name='phone' label={'Số điện thoại'}/>
        <InputTextPassword defaultValue='ksvchainamtest' value='ksvchainamtest' name='password' label={'Mật Khẩu'} />

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