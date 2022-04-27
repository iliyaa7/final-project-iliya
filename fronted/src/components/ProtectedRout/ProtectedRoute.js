import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, isLoading, ...props }) {
  if (isLoading) {
    return ('')
  }
  return (
    <Route exact {...props}>
      {isLoggedIn ? children : <Redirect to={"/login"} />}
    </Route>
  );
}

export default ProtectedRoute;