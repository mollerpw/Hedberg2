import { useNavigate } from 'react-router-dom';

const TableBody = ({ tableData, columns, setState }) => {
  const navigate = useNavigate();
  console.log(tableData);

  const handleOnChange = (id) => {
    const thisData = tableData.filter((e) => e.id === id);
    console.log(thisData[0]);
    if (thisData[0].approved === 'true') {
      thisData[0].approved = 'false';
      tableData = tableData.map((t1) => ({
        ...t1,
        ...thisData.find((t2) => t2.id === t1.id),
      }));
      console.log(tableData);
      setState(tableData);
    } else {
      thisData[0].approved = 'true';
      tableData = tableData.map((t1) => ({
        ...t1,
        ...thisData.find((t2) => t2.id === t1.id),
      }));
      console.log(tableData);
      setState(tableData);
    }
  };

  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr>
            {columns.map(({ accessor }) => {
              if (accessor === 'approved') {
                return (
                  <td onClick={() => handleOnChange(data.id)} key={accessor}>
                    <input
                      style={{
                        marginLeft: '10vh',
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
