import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { getJwt } from '../variables/JWT';

interface Props{}

const AcceptInvites: React.FC<Props> = () => {

  const mounted = useRef<boolean>(false)

  const [invitations, setinvitations] = useState([]);
  const token = getJwt();
  const [hasFlatsharing, sethasFlatsharing] = useState(false)

  useEffect(() => {
      if (!mounted.current) {
        fetch('http://localhost:5656/participant', {
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
            console.log(json)
            setinvitations(json);
          })
      }
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
    };
    const acceptinvite = (id: any) => {
      try {
        fetch('http://localhost:5656/participant/accept', {
              method: "POST",
              mode: "cors",
              body: new URLSearchParams({
                flatsharing_Id: `${id}`
              }),
              credentials: "include",
              headers: new Headers({
                  "Authorization" : `${token}`,
                  "Content-type":  "application/x-www-form-urlencoded"
              })
          })
              .then(data => data.text())
              .then(json => console.log(json))
      }
       catch (error) {
          console.error(error);
        }
    }

  return (
    <>
      {
        invitations.length > 0 && hasFlatsharing ? 
        invitations.map(invite =>{return (<>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="username">coloc: {invite[0]}</FormLabel>
            <br />
            <span>{invite[1]}</span>
            </FormGroup>
            <Button onClick={() => acceptinvite(invite[0])} type="submit">accept Invite</Button>
          </Form>
          </>)})
        :
        <>
          <span>You can see the invitation either you dont have any invitations  or you are already in a coloc</span>
        </>
      }
    </>
  );
};

export default AcceptInvites;