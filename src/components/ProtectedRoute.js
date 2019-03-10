import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';


const ProtectedRoute = ({ allowed, ...props }) => {

  console.log('allowed = ', allowed);
  console.log('props = ', props);

  if (allowed) {
    return (<Route {...props} />)
  } else {
    return (
      <Route {...props} render={function (props) {
        return (
          <Redirect to={{
            pathname: '/login',
            state: props.location.pathname
          }} />
        )
      }
      } />
    )
  }
}

// return (
//   <Route {...props} render={function (props) {
//     return (
//         <Redirect to={{
//           pathname: '/login',
//           state: props.location.pathname
//         }} />
//     )
//   }
//   } />
// );

// return (
//   <Route {...props} render={function (props) {
//     return (
//       allowed
//         ? <Route {...props} />
//         : <Redirect to={{
//           pathname: '/login',
//           state: props.location.pathname
//         }} />
//     )
//   }
//   } />
// );

export default withRouter(ProtectedRoute);