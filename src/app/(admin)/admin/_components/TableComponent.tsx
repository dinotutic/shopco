import { ReactNode, HTMLAttributes } from "react";
import { TableHeader } from "../../../types/shared.types";

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  rowIndex: number;
  colIndex: number;
  totalRows: number;
  totalCols: number;
  className?: string;
}

const TableCell = ({
  children,
  rowIndex,
  colIndex,
  totalRows,
  totalCols,
}: TableCellProps) => {
  const baseClasses = "px-4 border-b border-r";
  const firstColumnClass = colIndex === 0 ? "border-l" : "";
  const lastColumnClass = colIndex === totalCols - 1 ? "border-r" : "";

  const isLastRow = rowIndex === totalRows - 1;
  const isFirstColumn = colIndex === 0;
  const isLastColumn = colIndex === totalCols - 1;

  const lastRowClass = isLastRow
    ? isFirstColumn
      ? "rounded-bl-lg"
      : isLastColumn
      ? "rounded-br-lg"
      : ""
    : "";

  return (
    <td
      className={`${baseClasses} ${firstColumnClass} ${lastColumnClass} ${lastRowClass}`}
    >
      <div className="truncate max-w-72">{children}</div>
    </td>
  );
};

const TableRow = ({
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr className="hover:bg-gray-100" {...props}>
      {children}
    </tr>
  );
};

interface TableHeaderProps {
  headers: TableHeader[];
}

const TableHeaders = ({ headers }: TableHeaderProps) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <th
          className={`py-2 px-4 border-r border-t ${
            index === 0 ? "border-l rounded-tl-lg" : ""
          } ${
            index === headers.length - 1 ? "rounded-tr-lg" : ""
          } border-gray-300 text-start`}
          key={header.id}
        >
          {header.label}
        </th>
      ))}
    </tr>
  );
};

interface TableComponentProps {
  data: any[];
  headers: TableHeader[];
}

const TableComponent = ({ data, headers }: TableComponentProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gray-200">
          <TableHeaders headers={headers} />
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={row.id}>
              {headers.map((header, colIndex) => (
                <TableCell
                  key={header.id}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  totalRows={data.length}
                  totalCols={headers.length}
                >
                  {header.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
