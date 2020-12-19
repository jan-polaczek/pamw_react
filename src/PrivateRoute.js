import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export function PrivateRoute(
    {
        component: Component,
        render,
        children,
        currentUser,
        ...other
    }) {
    let toRender;
    if (Component) toRender = <Component {...other} />;
    else if (render) toRender = render(other);
    else toRender = children;
    return (
        <Route
            {...other}
            render={() => currentUser ? toRender : <Redirect to="/login"/>}
        />
    );

}
