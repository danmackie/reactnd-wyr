import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';


const ProtectedRoute = ({ allowed, ...props }) => {

  console.log('PROTECTED ROUTE, ALLOWED = ', allowed)
  console.log('PROTECTED ROUTE, ALLOWED = ', props)

  if (allowed) {
    return (< Route {...props} />)
  } else {
    return (<Redirect to="/login" />)
  }
}

// function ProtectedRoute({ allowed, ...props }) {


//   // return (
//   //   <Route {...rest} render={function (props) {
//   //     return (
//   //       rest.loggedIn
//   //         ? <Component {...props} />
//   //         : <Redirect to={{
//   //           pathname: '/login',
//   //           state: redirect
//   //         }} />
//   //     )
//   //   }
//   //   } />
//   // );
// }

export default withRouter(ProtectedRoute);