import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import store from './store';
import LoadingPage from './services/UI/LoadingPage';
import CustomerPage from './pages/CustomerPage';
import LoginPage from './pages/AuthPage/LoginPage';
import AuthLayout from './layout/AuthLayout';
import { PATH } from './utils/paths';
import ScoreboardPage from './pages/ScoreboardPage';
import { useToken } from './services/hooks/useToken';
import TimeTablePage from './pages/TimeTablePage';
import ProfilePage from './pages/ProfilePage';
import ReportCardPage from './pages/ReportCardPage';
import AbsencePage from './pages/AbsencePage';
import StudentPage from './pages/StudentPage';
import ParentLayout from './layout/ParentLayout';
import ParentHomePage from './pages/ParentHomePage';
import ParentReportSessionPage from './pages/ParentReportLession';
import ReportLesionPage from './pages/ReportLesionPage';
import { io } from 'socket.io-client';
import AttendanceCheckPage from './pages/AttendanceCheckPage';
import EvaluationSheetPage from './pages/EvaluationSheetPage';

function AppUI() {
  const { shield, token} = useToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={shield(AppLayout)}>
          <Route index path='dashboards' element={<DashboardPage />} />
          <Route path='customers' element={<CustomerPage />} />
          <Route path='time-table' element={<TimeTablePage />} />
          <Route path={PATH._STUDENT._SCOREBOARD} element={<ScoreboardPage />} />
          <Route path={PATH._STUDENT._INDEX} element={<StudentPage />} />
          <Route path={`${PATH._STUDENT._INDEX}/:id`} element={<ProfilePage/>} />
          <Route path={PATH._REPORT_CARD} element={<ReportCardPage/>} />
          <Route path={PATH._LEAVE_OF_ABSENCE} element={<AbsencePage/>} />
          <Route path={PATH._REPORT_LESION} element={<ReportLesionPage />} />
          <Route path={PATH._ATTENDANCE_PAGE} element={<AttendanceCheckPage />} />
        </Route>
        <Route path='app' element={shield(ParentLayout)}>
          <Route index path='home' element={<ParentHomePage />}/>
          <Route index path='evaluation-sheet' element={<EvaluationSheetPage />}/>
          <Route path='report-session' element={<ParentReportSessionPage />}/>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        </Route>

        <Route path='auth' element={<AuthLayout/>}>
          <Route path='sign-in' element={<LoginPage/>}/>
        </Route>
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppUI />
      <LoadingPage />
    </Provider>
  );
}

export default App;
