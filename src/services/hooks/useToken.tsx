import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../../utils/sessionStorage';
import authSelectors from '../../pages/AuthPage/service/selectors';

type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;

export const useToken = () => {
  const access_token =  authSelectors.getToken();
  useEffect(() => { 
    // const href = window.location.href;
    // const fileNamePart = location?.pathname !== '/' ? href.slice(href.search(location?.pathname)) : '';
  }, []);

  const shield = (Component: ShieldComponent) => {
    if (!access_token) return <Navigate to={'/auth/sign-in'} replace />;
    // else if (token) return <Navigate to={'/student'} replace />;
    return <Component  />;
  };
  return {shield, access_token};
};
