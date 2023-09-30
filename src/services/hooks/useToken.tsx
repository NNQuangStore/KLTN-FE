import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../../utils/sessionStorage';
import { escape } from 'lodash';

type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;

export const useToken = () => {
  const token = storage.get('token');
  
  useEffect(() => { 
    // const href = window.location.href;
    // const fileNamePart = location?.pathname !== '/' ? href.slice(href.search(location?.pathname)) : '';
    
    
  }, []);

  const shield = (Component: ShieldComponent) => {
    if (!token) return <Navigate to={'/auth/sign-in'} replace />;
    // else if (token) return <Navigate to={'/student'} replace />;
    return <Component  />;
  };
  return {shield, token};
};
