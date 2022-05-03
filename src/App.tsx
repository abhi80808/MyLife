import { FC } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { LS_AUTH_TOKEN } from './constants/constants';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import DashboardPage from './pages/Dashboard.page';
import FundsPage from './pages/Funds.page';

interface Props { }

const App: FC<Props> = (props) => {

  const token = localStorage.getItem(LS_AUTH_TOKEN);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LS_AUTH_TOKEN);
    navigate("/login");
  }

  return (
    <div>
      <nav className="flex flex-row bg-teal-600 p-2.5 w-full justify-between">
        <div></div>
        <div className="flex flex-row space-x-2">
          {token ? <></> : <Link className="border px-2 py-0.5 rounded" to="/login">Login</Link>}
          {token ? <></> : <Link className="border px-2 py-0.5 rounded" to="/signup">Signup</Link>}
          {token ? <Link className="border px-2 py-0.5 rounded" to="/funds">Funds</Link> : <></>}
          {token ? <button type="button" className="border px-2 py-0.5 rounded" onClick={handleLogout}>Logout</button> : <></>}
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard"></Navigate> : <LoginPage />}></Route>
        <Route path="/signup" element={token ? <Navigate to="/dashboard"></Navigate> : <SignupPage />}></Route>
        <Route path="/dashboard" element={token ? <DashboardPage></DashboardPage> : <Navigate to="/login"></Navigate>}></Route>
        <Route path="/funds" element={token ? <FundsPage></FundsPage> : <Navigate to="/login"></Navigate>}></Route>
      </Routes>
    </div>
  );
}

export default App;
