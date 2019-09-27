import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../Services/token-service';

function PrivateRoute({ render, ...props}) {
  const Render = render
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Render {...componentProps} />
          : <Redirect
              to={{
                pathname: '/',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}


export default PrivateRoute;