import React, { useEffect, useRef, useState} from 'react';
import {BrowserRouter, Routes ,Route, Link, useNavigate} from "react-router-dom";

export function LogOut (props: any) {
    const navigate = useNavigate();
    const logout = ( )=> {
        props.setLogged(false);
        props.setUser(null);
        navigate('/');
    }
    if (props.logged) {
        return(
            <div>
                <p>
                    Hello {props.user}...
                    <button onClick={logout}>Logout</button>
                </p>
            </div>
            )
    } else {
        return <></>}
    }
