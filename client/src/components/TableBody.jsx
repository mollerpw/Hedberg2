import { useNavigate } from 'react-router-dom';

const TableBody = ({ tableData, columns }) => {
  const navigate = useNavigate();

  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr onClick={() => navigate(`/post/${data.id}`)} key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : '——';
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
