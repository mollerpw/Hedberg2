import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable, getDefaultSorting } from "../useSortableTable";

const Table = ({ caption, data, columns, setState }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData, setState }} />
      </table>
    </>
  );
};

export default Table;