import { React, useContext, useState, useEffect } from 'react';
import { ApplyContext } from '../context/applyContext';
import { Link } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import Table from '../components/Table';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Admin() {
  const { currentUser } = useContext(AuthContext);
  const [applications, setApplications] = useState() || null;
  const [grades, setGrades] = useState() || null;
  const [show, setShow] = useState() || 'false';
  let approvedApplications = [];
  let shownApplication = [];
  
  let applicationsWithId = null;
  console.log(shownApplication);

  console.log(applications);

  if (applications != null && grades != null) {
    applicationsWithId = applications.map((t1) => ({
      ...t1,
      ...grades.find((t2) => t2.applicationid === t1.id),
    }));
    console.log(applicationsWithId);
    approvedApplications = applicationsWithId.filter(
      (e) => e.approved === 'true'
    );
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

  const handleChange = (e) => {
    if (show === 'false') {
      shownApplication = approvedApplications;
      console.log(shownApplication);
      setShow('true');
    } else {
      shownApplication = applicationsWithId;
      console.log(shownApplication);
      setShow('false');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(applications);
    const inputs = applications.map(({ approved, id }) => ({ approved, id }));
    console.log(inputs);
    try {
      inputs.forEach(async (q) => {
        await axios.put(`/posts/approved`, q);
      });
    } catch (err) {}
  };

  const columns = [
    { label: 'Id', accessor: 'id', sortable: true, sortbyOrder: 'asc' },
    {
      label: 'Namn',
      accessor: 'username',
      sortable: true,
    },
    { label: 'Titel', accessor: 'title', sortable: true },
    // {
    //   label: 'Beskrivning',
    //   accessor: 'desc',
    //   sortable: true,
    //   sortbyOrder: 'desc',
    // },
    { label: 'Kategori', accessor: 'cat', sortable: true },
    { label: 'Datum', accessor: 'date', sortable: true },
    { label: 'Mitt betyg', accessor: 'grade', sortable: false },
  ];
  const columns2 = [
    { label: 'Id', accessor: 'id', sortable: true, sortbyOrder: 'asc' },
    {
      label: 'Namn',
      accessor: 'username',
      sortable: true,
    },
    { label: 'Titel', accessor: 'title', sortable: true },
    // {
    //   label: 'Beskrivning',
    //   accessor: 'desc',
    //   sortable: true,
    //   sortbyOrder: 'desc',
    // },
    { label: 'Kategori', accessor: 'cat', sortable: true },
    { label: 'Datum', accessor: 'date', sortable: true },
    { label: 'Godkänd', accessor: 'approved', sortable: false },
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
      {applications && currentUser.role === 'lawyer' ? (
        <>
          <h1>Adminsida</h1>
          {applicationsWithId ? (
            <>
              <Table
                caption='Ansökningar'
                data={applications}
                columns={columns2}
                setState={setApplications}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '2vh',
                }}
              >
                <button onClick={handleSubmit}>Spara</button>
              </div>
            </>
          ) : (
            <h1>Laddar...</h1>
          )}
        </>
      ) : (
        <>
          <h1>Adminsida</h1>
          {/* <label style={{ marginRight: '2vh' }}>
            Visa endast godkända ansökningar
          </label>
          <input onChange={handleChange} type='checkbox' /> */}
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
