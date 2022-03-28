import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn, isLoading, ...props }) {
  if (isLoading) {
    return ('')
  }
  !loggedIn && props.handleOpenPopupSignin()
  return (
    <Route exact {...props}>
      {loggedIn ? children : <Redirect to={"/"} />}
    </Route>
  );
}

export default ProtectedRoute;