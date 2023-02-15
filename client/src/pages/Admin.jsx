import { React, useContext } from 'react';
import { ApplyContext } from '../context/applyContext';
import { Link } from 'react-router-dom';

function Admin() {
  const { applications } = useContext(ApplyContext) || null;

  console.log(applications);

  return (
    <div>
      Adminsida <br />
      <br />
      {applications.map((application) => (
        <Link
          key={application.id}
          className='link'
          to={`/post/${application.id}`}
        >
          <h1>
            {application.title} {application.username}
          </h1>
        </Link>
      ))}
    </div>
  );
}

export default Admin;
