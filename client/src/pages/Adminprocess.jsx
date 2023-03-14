import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ApplyContext } from '../context/applyContext';
import Table from '../components/Table';

function Adminprocess() {
  const [stage, setStage] = useState('1') || '1';
  const { applications } = useContext(ApplyContext);

  console.log(stage);

  const columns = [
    { label: 'Id', accessor: 'id', sortable: true, sortbyOrder: 'asc' },
    {
      label: 'Namn',
      accessor: 'firstname',
      sortable: true,
    },
    { label: 'Titel', accessor: 'title', sortable: true },
    { label: 'Kategori', accessor: 'cat', sortable: true },
    { label: 'Datum', accessor: 'date', sortable: true },
    { label: 'Mitt betyg', accessor: 'grade', sortable: false },
  ];
  return (
    <div className='table_container'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
          minWidth: '50rem',
        }}
      >
        <h2>Administrera betygsprocess</h2>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link className='link' to={'/admin'}>
            <button style={{ marginRight: '1rem' }}>Betygsätt</button>
          </Link>
          <Link className='link' to={'/adminprocess'}>
            <button>Administrera betygsprocess</button>
          </Link>
        </div>
      </div>
      Förklaring:
      <br />
      Steg 1: Ingen kan sätta betyg.
      <br />
      Steg 2: Alla kan sätta betyg 1-7 på tilldelade ansökningar.
      <br />
      Steg 3: Alla kan sätta finalbetyg (12,10, 8p, osv) på tilldelade
      ansökningar.
      <br />
      <br />
      Du som admin måste själv fördela/omfördela tilldelade ansökningar, detta
      påverkas inte av stegvalet.
      <div style={{ display: 'flex', flexGrow: '1' }}>
        <button
          style={{ flexGrow: '1', marginRight: '1rem' }}
          //   onClick={setStage('1')}
        >
          Steg 1<br />
          Godkänna ansökningar
        </button>
        <button
          style={{ flexGrow: '1', marginRight: '1rem' }}
          //   onClick={setStage('2')}
        >
          Steg 2 <br />
          Betygsätt egna
        </button>
        <button
          style={{ flexGrow: '1' }}
          // onClick={setStage('2')}
        >
          Steg 3 <br />
          Betygsätt finalister
        </button>
      </div>
      {applications ? (
        <Table caption='Ansökningar' data={applications} columns={columns} />
      ) : (
        <h1>Laddar...</h1>
      )}
    </div>
  );
}

export default Adminprocess;
