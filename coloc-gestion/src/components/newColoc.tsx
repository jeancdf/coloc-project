import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Form, FormControl, Button, Alert, Row, Col } from 'react-bootstrap';
import {setJwt, getJwt} from "../variables/JWT"

const NewColoc = () => {
  const mounted = useRef<boolean>(false)

  const [hasFlatsharing, sethasFlatsharing] = useState(false)
  const token = getJwt();
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');
  const [error, setError] = useState('');

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
    if (hasFlatsharing) {
      try {
        fetch('http://localhost:5656/participant/invite', {
              method: "POST",
              mode: "cors",
              body: new URLSearchParams({
                name: `${participants}`
              }),
              credentials: "include",
              headers: new Headers({
                  "Authorization" : `${token}`,
                  "Content-type":  "application/x-www-form-urlencoded"
              })
          })
              .then(data => data.text())
              .then(json => {window.location.reload()})
      }
       catch (error) {
          console.error(error);
          setError('Error creating coloc');
        }
    } else {
      try {
        fetch('http://localhost:5656/flatsharing/create', {
              method: "POST",
              mode: "cors",
              body: new URLSearchParams({
                name: `${name}`
              }),
              credentials: "include",
              headers: new Headers({
                  "Authorization" : `${token}`,
                  "Content-type":  "application/x-www-form-urlencoded"
              })
          })
              .then(data => data.text())
              .then(() => {window.location.reload()})
      }
       catch (error) {
          console.error(error);
          setError('Error creating coloc');
        }
    }
    };
    return (
        <Row className="justify-content-md-center">
      <Col xs={12} md={8}>
         <Form onSubmit={handleSubmit}>
          {error && <Form.Text>{error}</Form.Text>}
          {
            hasFlatsharing ? 
            <>
            <Form.Group>
              <Form.Label>Participant :</Form.Label>
              <FormControl value={participants} onChange={(event) => setParticipants(event.target.value)} />
              <Button className="m-3"type="submit">invite to coloc</Button>
            </Form.Group>
            </> : 
            <>
            <Form.Group>
              <Form.Label>Coloc Name:</Form.Label>
              <FormControl value={name} onChange={(event) => setName(event.target.value)} />
              <Button className="m-3"type="submit">Create coloc</Button>
            </Form.Group>
            </>
          }
        </Form>
      </Col>
    </Row>
    );
  };
  
  export default NewColoc;