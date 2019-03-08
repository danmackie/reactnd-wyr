import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';


const ProtectedRoute = ({ allowed, ...props }) => {
  if (allowed) {
    return (< Route {...props} />)
  } else {
    return (<Redirect to="/login" />)
  }
}

export default withRouter(ProtectedRoute);