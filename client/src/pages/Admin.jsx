import { React, useContext } from 'react';
import { ApplyContext } from '../context/applyContext';
import { Link } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import Table from '../components/Table';

function Admin() {
  const { applications } = useContext(ApplyContext) || null;

  console.log(applications);
  const columns = [
    { label: 'Id', accessor: 'id', sortable: true },
    {
      label: 'Namn',
      accessor: 'username',
      sortable: true,
      sortbyOrder: 'desc',
    },
    { label: 'Titel', accessor: 'title', sortable: true, sortbyOrder: 'desc' },
    {
      label: 'Beskrivning',
      accessor: 'desc',
      sortable: true,
      sortbyOrder: 'desc',
    },
    { label: 'Kategori', accessor: 'cat', sortable: true, sortbyOrder: 'desc' },
    { label: 'Datum', accessor: 'date', sortable: true },
  ];
  return (
    // <div>
    //   Adminsida <br />
    //   <br />
    //   <table>
    //     <tr key={'header'}>
    //       {Object.keys(applications[0]).map((key) => (
    //         <th>{key}</th>
    //       ))}
    //     </tr>
    //     {applications.map((application) => (
    //       <tr key={application.id}>
    //         {Object.values(application).map((val) => (
    //           <td>{val}</td>
    //         ))}
    //         <Link
    //           className='read-more-button'
    //           key={application.id}
    //           to={`/post/${application.id}`}
    //         >
    //           Se mer
    //         </Link>
    //       </tr>

    <div className='table_container'>
      {applications && (
        <>
          <h1>Adminsida</h1>
          <Table caption='Ansökningar' data={applications} columns={columns} />
        </>
      )}
    </div>
  );
}
// <Link
//   key={application.id}
//   className='link'
//   to={`/post/${application.id}`}
// >
//   <h1>
//     {application.title} {application.username}
//   </h1>
// </Link>
//     ))}
//   </table>
// </div>
//   );
// }

export default Admin;
