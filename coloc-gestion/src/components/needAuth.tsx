import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export function NeedAuth (props:any) {
    let location = useLocation();

    if (props. logged) {
        return props.children
    } else {
        return <Navigate to="/login" state={{from: location}}/>;
    }
}