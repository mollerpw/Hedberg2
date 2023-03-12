import { React, useContext, useState, useEffect } from 'react';
import { ApplyContext } from '../context/applyContext';
import { Link } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import Table from '../components/Table';
import axios from 'axios';

function Admin() {
  const [applications, setApplications] = useState() || null;
  const [grades, setGrades] = useState() || null;
  let applicationsWithId = null;
  if (applications != null && grades != null) {
    applicationsWithId = applications.map((t1) => ({
      ...t1,
      ...grades.find((t2) => t2.applicationid === t1.id),
    }));
    console.log(applicationsWithId);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/grades?userid=${'4'}`);
        setGrades(res.data);
        console.log(res.data);
        const res2 = await axios.get(`/posts`);
        setApplications(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
    // {
    //   label: 'Beskrivning',
    //   accessor: 'desc',
    //   sortable: true,
    //   sortbyOrder: 'desc',
    // },
    { label: 'Kategori', accessor: 'cat', sortable: true, sortbyOrder: 'desc' },
    { label: 'Datum', accessor: 'date', sortable: true },
    { label: 'Mitt betyg', accessor: 'grade', sortable: false },
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
          {applicationsWithId ? (
            <Table
              caption='Ansökningar'
              data={applicationsWithId}
              columns={columns}
            />
          ) : (
            <h1>Laddar...</h1>
          )}
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
