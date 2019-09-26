import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../Services/token-service';

function PublicOnlyRoute({ component, ...props}){
  const Component = component;
  return (
    <Route
    {...props}
    render={componentProps => (
      TokenService.hasAuthToken()
      ? <Redirect to={'/dashboard/teacher'} />
      : <Component {...componentProps} />
    )}
    />
  )
}

export default PublicOnlyRoute;