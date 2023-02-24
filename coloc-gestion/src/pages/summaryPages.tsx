import React from 'react';
import Summary from '../components/summary';
import {Match} from '../context/context';

export default function summaryPage () {

    const myMatch = React.useContext(Match);
    return (
    <>
      <h1>Summary</h1>
      {/* <Summary colocId={myMatch.params.colocId} /> */}
    </>
  );
}
