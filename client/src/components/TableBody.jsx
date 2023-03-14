import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TableBody = ({ tableData, columns, setState }) => {
  const [currentData, setCurrentData] = useState(tableData);
  useEffect(() => {
    setCurrentData(tableData);
  }, [tableData]);
  const navigate = useNavigate();

  const handleOnChange = (id) => {
    const thisData = currentData.filter((e) => e.id === id);
    if (thisData[0].approved === 'true') {
      thisData[0].approved = 'false';
      currentData = currentData.map((t1) => ({
        ...t1,
        ...thisData.find((t2) => t2.id === t1.id),
      }));
      setState(currentData);
    } else {
      thisData[0].approved = 'true';
      currentData = currentData.map((t1) => ({
        ...t1,
        ...thisData.find((t2) => t2.id === t1.id),
      }));
      console.log(currentData);
      setState(currentData);
    }
  };

  return (
    <tbody>
      {currentData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              if (accessor === 'approved') {
                return (
                  <td onClick={() => handleOnChange(data.id)} key={accessor}>
                    <input
                      style={{
                        marginLeft: '1.5rem',
                      }}
                      defaultChecked={data[accessor] === 'true'}
                      type='checkbox'
                    />
                  </td>
                );
              } else {
                const tData = data[accessor] ? data[accessor] : '——';
                return (
                  <td
                    onClick={() => navigate(`/post/${data.id}`)}
                    key={accessor}
                  >
                    {tData}
                  </td>
                );
              }
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
