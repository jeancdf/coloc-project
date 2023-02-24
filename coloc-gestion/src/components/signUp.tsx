import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {btoa} from "buffer";
import {BrowserRouter, Routes ,Route, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export interface formDataInterface {
    username: string,
    password: string
}

export default function SignUp() {

    const mounted = useRef<boolean>(false)

    const [formData, setFormData] = useState<formDataInterface>({password: "", username: ""})
    const navigate = useNavigate();
    var state = {
        showMessage: false
      }

    useEffect(() => {
        if (!mounted.current) {

            // fetch("http://localhost:5656")
            //     .then(data => data.json())
            //     .then(json => console.log(json))
        }

        mounted.current = true
    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch('http://localhost:5656/signup', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                // "Authorization" : "Basic amZnbWFpbC5jb206cGFzc3dvcmQ=",
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.text())
            .then(json => console.log(json))
            .then(() =>navigate('/login'))
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
        <form onSubmit={handleSubmit} className=" text-center">
            <input type="text" name="username" placeholder="username" onChange={handleChange} className=" m-1"/>
            <br/>
            <input type="text" name="email" placeholder="email" onChange={handleChange} className=" m-1"/>
            <br/>
            <input type="password" name="password" placeholder="password" onChange={handleChange} className=" m-1"/>
            <br/>
            <button type="submit"  className=" btn btn-primary m-2" >Sign Up</button>
            <br />
            <button type="submit" onClick={() => navigate('/login')}className=" btn btn-danger m-2" >Already have an account ?</button>
        </form>
    )
}
function onButtonClickHandler(arg0: () => void) {
    throw new Error("Function not implemented.");
}
