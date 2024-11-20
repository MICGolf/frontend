import { Outlet } from 'react-router-dom';

const ProtectPrivateRoute = () => {
  return <Outlet />;
};

export default ProtectPrivateRoute;
