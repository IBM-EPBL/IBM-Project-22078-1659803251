import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { user as userAtom } from '../state/state';

const PrivateRoute = () => {
  const user = useRecoilValue(userAtom);
  return user.email !== '' ? <Outlet /> : <Navigate to="/authenticate" />;
};

export default PrivateRoute;