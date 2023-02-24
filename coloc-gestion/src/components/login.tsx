import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {btoa} from "buffer";
import {setJwt, getJwt} from "../variables/JWT"
import {BrowserRouter, Routes ,Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
export interface formDataInterface {
    username: string,
    password: string
}

export default function Login(props:any) {

    const mounted = useRef<boolean>(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataInterface>({password: "", username: ""});
    const [currentPage, setCurrentPage] = useState('home');
    const [jwt, setjwt] = useState(false)
    const [err, seterr] = useState(false)
    let errorMessage;
    if (err) {      
        errorMessage = <span style={{'color':'red'}}>wrong credentials</span>;    
    }
    useEffect(() => {
        if (!mounted.current) {
            if (getJwt()) {
                setjwt(true);
                navigate('/newcoloc')
            }
        }

        mounted.current = true
    }, [])



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:5656/login', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.text())
            .then(res => {
                if (res === 'wrong') {
                    seterr(true)
                } else {
                    setJwt(res);
                    navigate('/home');
                }
            })
    }
    

    const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=" text-center">
                <input type="text" name="username" placeholder="username" onChange={handleChange} className=" m-1"/>
                <br/>
                <input type="password" name="password" placeholder="password" onChange={handleChange} className=" m-1"/>
                <br/>
                { errorMessage }
                <br/>
                <button type="submit" className=" btn btn-primary m-2">login</button>
                <button  className=" btn btn-warning m-2" onClick={() => navigate('/signup')}>Register Instead</button>
            </form>
        </>
    )
}
