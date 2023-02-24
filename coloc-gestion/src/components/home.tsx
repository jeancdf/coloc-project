import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { getJwt } from '../variables/JWT';


const Home = () => {

  const mounted = useRef<boolean>(false)
  const token = getJwt();
  const [hasFlatsharing, sethasFlatsharing] = useState(false)
  const [data, setdata] = useState([])

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
            setdata(json)
          })
      }

      mounted.current = true
  }, [])
  
    const leaveFlatsharing = () => {
      try {
        fetch('http://localhost:5656/participant/decline', {
              method: "POST",
              mode: "cors",
              body: new URLSearchParams({
                flatsharing_Id: `${data?.[0]?.[0]}`
              }),
              credentials: "include",
              headers: new Headers({
                  "Authorization" : `${token}`,
                  "Content-type":  "application/x-www-form-urlencoded"
              })
          })
              .then(data => data.text())
              .then(json => sethasFlatsharing(false))
      }
       catch (error) {
          console.error(error);
        }
    }
    return (
      <div>
        {
          hasFlatsharing ?
          <div>
          <span>My coloc</span>
          <br />
          <span>{data?.[0][1] || ''}</span>
          <br />
          <button onClick={leaveFlatsharing}>Leave</button>
          </div> :
          <div>
            <span>Empty</span>
          </div>
        }

      </div>
    );
  };
  
  export default Home;