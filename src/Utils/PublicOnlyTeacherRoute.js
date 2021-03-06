import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../Services/token-service';

function PublicOnlyTeacherRoute({ component, render, ...props }){
  const Component = component || render
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

export default PublicOnlyTeacherRoute;