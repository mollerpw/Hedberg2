import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ApplyContext = createContext();

export const ApplyContexProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        setApplications(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ApplyContext.Provider value={{ applications }}>
      {children}
    </ApplyContext.Provider>
  );
};
