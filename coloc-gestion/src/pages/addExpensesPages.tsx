import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNewExpenses from '../components/addNewExpenses';
import Summary from '../components/summary';

export default function AddExpensePage () {
    const [tricount, setTricount] = useState({});
  const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/api/tricounts/${match.params.colocId}`);
//         setTricount(response.data);
//       } catch (error) {
//         console.error(error);
//         setError('Error loading tricount');
//       }
//     };
//     fetchData();
//   }, [match.params.tricountId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Add Expense</h1>
      {/* <AddNewExpenses colocId={match.params.colocId} participants={coloc.participants} />
      <Summary colocId={match.params.tricountId} /> */}
    </>
  );
}

