import React from "react";
import { Navbar, Nav } from 'react-bootstrap'
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/home"
import NewColoc from "./components/newColoc"
import Summary from "./components/summary"
import AcceptInvites from "./components/acceptInvite"
import AddNewExpenses from "./components/addNewExpenses"
import Login from "./components/login"
import SignUp from "./components/signUp";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {setJwt, getJwt, deleteJwt} from "./variables/JWT"

export default function App() {

    const mounted = useRef<boolean>(false)

    const [jwt, setjwt] = useState(false)

    useEffect(() => {
        if (!mounted.current) {
            if (getJwt()) {
                setjwt(true)
            }

        }

        mounted.current = true
    }, [])

    return (

        <BrowserRouter>
            <div>
              {jwt && (
          <Navbar className="p-2 mb-3" bg="dark" variant="dark">
            <Navbar.Brand>Tricount App</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/expenselist">Expense List</Nav.Link>
              <Nav.Link as={Link} to="/addnewexpenses">New Expenses</Nav.Link>
              <Nav.Link as={Link} to="/newcoloc">New Coloc</Nav.Link>
              <Nav.Link as={Link} to="/summary">Summary</Nav.Link>
              <Nav.Link as={Link} to="/acceptinvites">Invitations</Nav.Link>
              <button onClick={deleteJwt}>Logout</button>
            </Nav>
          </Navbar>
        )}

                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/addnewexpenses" element={<AddNewExpenses/>}/>
                    <Route path="/newcoloc" element={<NewColoc/>}/>
                    <Route path="/summary" element={<Summary/>}/>
                    <Route path="/acceptinvites" element={<AcceptInvites/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signup/login" element={<Login/>}/>
                    <Route path="/login/signup" element={<SignUp/>}/>

                </Routes>
            </div>
            

        </BrowserRouter>

    );
}