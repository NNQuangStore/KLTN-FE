import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../../utils/sessionStorage';
import { escape } from 'lodash';

type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;

export const useToken = () => {
  let token = storage.get('token');
  console.log(token);
  useEffect(() => { 
    token = storage.get('token');
  }, [storage]);

  const shield = (Component: ShieldComponent) => {
    if (!token) return <Navigate to={'/auth/sign-in'} replace />;
    return <Component  />;
  };
  return {shield, token};
};
