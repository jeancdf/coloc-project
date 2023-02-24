import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { getJwt } from '../variables/JWT';

export default function Summary () {
  const mounted = useRef<boolean>(false)
  const token = getJwt();
  const [data, setdata] = useState([])

  useEffect(() => {
      if (!mounted.current) {
        fetch('http://localhost:5656/expenses/get', {
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
            setdata(json)
          })
      }

      mounted.current = true
  }, [])
  
    return (
      <Container>
          <span >Summary</span>
         { data.length > 0 ? 
          data.map(data =>{return (<>
            <Row>
              <Col>
                  <Card>
                    <Card.Header>Expense</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>flatsharing: {data[0]}</ListGroup.Item>
                      <ListGroup.Item>Total cost: {data[1]}</ListGroup.Item>
                      <ListGroup.Item>description and name: {data[2]}</ListGroup.Item>
                      <ListGroup.Item>Date: {data[3]}</ListGroup.Item>
                    </ListGroup>
                    </Card>
              </Col> 
            </Row>
            <br />
          </>)}): 
          <>empty</>
          }
      </Container>
    );
}

  

