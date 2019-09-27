import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../Services/token-service';

function PublicOnlyStudentRoute({ component, ...props }){
  const Component = component
  return (
    <Route
    {...props}
    render={componentProps => (
      TokenService.hasAuthToken()
      ? <Redirect to={'/dashboard/student'} />
      : <Component {...componentProps} />
    )}
    />
  )
}

export default PublicOnlyStudentRoute;