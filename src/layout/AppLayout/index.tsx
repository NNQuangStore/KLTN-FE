import { ConfigProvider, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../../component/template/Header';
import Sidebar from '../../component/template/Sidebar';
import useDetachScreen, { EScreen } from '../../services/hooks/useScreenDetect';

// import { useState } from 'react';
import { useCollapseSidebar } from '../../services/hooks/useCollapseSidebar';
import { COLOR_PRIMARY } from '../../utils/variables/colors';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import storage from '../../utils/sessionStorage';


const AppLayout = () => {
  const token = storage.get('token');
  // const socket = io('https://slldt-server-867d33706c66.herokuapp.com');
  const socket = io('http://localhost:8080');
  useEffect(() => {
    // socket.connect();
    if(token && token !== ''){
      socket.emit('addTeacher', {senderId: token});
    }
    // return () => {
    //   socket.disconnect();
    // };
  },[]);

  //---- hàm nhận tin nhắn từ socket gửi đến ----//
  useEffect(() => {
    socket.on('notify-new-lesson', (data) => {
      console.log('||||||||||||||||||||||||||||||||||||||||||||');
      console.log(data);
      console.log('||||||||||||||||||||||||||||||||||||||||||||');
    });
  }, [socket]);

  const screen = useDetachScreen();

  const LayoutScreen = () => {
    switch(screen) {
      case EScreen.BROWSER:
        return (
          <LayoutAppStyled>
            <Sidebar/>
            <MainLayout>
              <Header />
              <MainStyled>
                <Outlet />
              </MainStyled>
            </MainLayout>
          </LayoutAppStyled>
        );
        case EScreen.TABLET:
        case EScreen.MOBILE:
        default:
          return (
            <LayoutAppStyled>
              <Header />
              <MainLayoutMobile>
                <Sidebar />
                <MainStyled>
                  <Outlet/>
                </MainStyled>
              </MainLayoutMobile>
            </LayoutAppStyled>
          );
    }
  };

  

  return (
    <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Raleway", sans-serif',
            colorPrimary: COLOR_PRIMARY
            
          },
        }}
      >
        <LayoutScreen />
    </ConfigProvider>
    );
};
export default AppLayout;

const LayoutAppStyled = styled.div`
`;
// 80
const MainLayout = ({children} : {children: React.ReactNode}) => {
  const [collapsed] = useCollapseSidebar();
  
  return (
    <MainLayoutBrowserStyled collapsed={collapsed}>
      {children}
    </MainLayoutBrowserStyled>
  );
};

const MainLayoutMobile = ({children} : {children: React.ReactNode}) => {

  return (
    <MainLayoutMobileStyled>
      {children}
    </MainLayoutMobileStyled>
  );
};

const MainLayoutBrowserStyled = styled(Layout)<{collapsed: boolean}>`
  margin-inline-start: ${props => props.collapsed ? '80px' : '250px'};
  transition: margin-inline-start 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
`;

const MainLayoutMobileStyled = styled(Layout)`
  margin-inline-start: 80px;
`;

const MainStyled = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100vh !important;
  padding: 24px 64px;
  background-color: #ecf0fa;
  height: 100%;
`;  

