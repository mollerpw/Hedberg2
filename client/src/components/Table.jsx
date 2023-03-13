import TableBody from './TableBody';
import TableHead from './TableHead';
import { useSortableTable, getDefaultSorting } from '../useSortableTable';
import { useEffect, useState } from 'react';

const Table = ({ caption, data, columns, setState }) => {
  const [data2, setData2] = useState(data) || data;
  const [tableData, handleSorting] = useSortableTable(data2, columns);
  useEffect(() => {
    setData2(data);
  }, [data]);

  return (
    <>
      <table className='table'>
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData, setState }} />
      </table>
    </>
  );
};

export default Table;
