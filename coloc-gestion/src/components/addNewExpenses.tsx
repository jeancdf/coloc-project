import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Container, Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { getJwt } from '../variables/JWT';

export default function AddExpensesForm () {
    const [amount, setAmount] = useState('');
    const [description, setdescription] = useState('');
    const token = getJwt();
    const mounted = useRef<boolean>(false)

    const [hasFlatsharing, sethasFlatsharing] = useState(false)
  
    useEffect(() => {
        if (!mounted.current) {
          fetch('http://localhost:5656/flatsharing/get', {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "authorization" : `${token}`,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(json => {
              json.length > 0 ? sethasFlatsharing(true) : sethasFlatsharing(false) ;
            })
        }
  
        mounted.current = true
    }, [])
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            fetch('http://localhost:5656/expenses/add', {
                method: "POST",
                mode: "cors",
                body: new URLSearchParams({
                    amount: `${amount}`,
                    description: `${description}`
                }),
                credentials: "include",
                headers: new Headers({
                    "Authorization" : `${token}`,
                    "Content-type":  "application/x-www-form-urlencoded"
                })
            })
                .then(data => data.text())
                .then(json => console.log(json))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="d-flex  justify-content-center" style={{ minHeight: '100vh' }}>
           { hasFlatsharing ? 
            <Form  onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="description">description and name:</FormLabel>
                    <FormControl
                        id="description"
                        value={description}
                        onChange={(event) => setdescription(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="amount">Amount:</FormLabel>
                    <FormControl
                        id="amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                </FormGroup>
                <Button type="submit">Add Expense</Button>
            </Form> : <span>Your not in a coloc</span>
            
            }
        </Container>

    );
}
