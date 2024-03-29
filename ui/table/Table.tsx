import * as React from 'react';
import TableHead from './Head';
import TableBody from './Body';
import TableRow from './Row';
import TableData from './Data';
import Input from '../input/Input';
import { useState } from "react";
import RowFlex from '../specials/RowFlex';
import Button from '../button/Button';
import { PiDownload } from "react-icons/pi";
import Circle from '../specials/Circle';
import Text from '../text/Text';
import { exportToCSV } from 'react-easy-export';

type TableProps = {
  children?: React.ReactNode;
  funcss?: string;
  bordered?: boolean;
  noStripped?: boolean;
  hoverable?: boolean;
  showTotal?: boolean;
  light?: boolean;
  dark?: boolean;
  data?: { "fields": string[], "data": any[], "titles": string[] };
  head?: React.ReactNode;
  body?: React.ReactNode;
  height?: number;
  pageSize?: number; // New prop for page size
  customColumns?: { title: string; render: (data: any) => React.ReactNode; onClick?: (data: any) => void }[];
};

export default function Table({
  children,
  funcss,
  bordered,
  noStripped,
  hoverable,
  showTotal,
  light,
  dark,
  head,
  body,
  data,
  height,
  pageSize = data ? 10 : 0, // Default page size,
  customColumns,
  ...rest
}: TableProps) {
   // Check if data is null or undefined before accessing its properties
   const [search, setSearch] = useState<string>(data?.data ? "" : "");
   const [currentPage, setCurrentPage] = useState<number>(1);

  // Determine the total number of pages based on data length and page size
  const totalPages = data ? Math.ceil((data?.data?.length || 0) / pageSize) : 0;
  
  // Calculate start and end indices for data pagination
  const startIndex = data ? (currentPage - 1) * pageSize : 0;
  const endIndex = data ? Math.min(startIndex + pageSize, data?.data?.length || 0) : 0;

  // Function to handle page change
  const handleChangePage = (page: number) => {
    if(data) {
      setCurrentPage(page);
    }
  };

  // Filter data based on search input
  const filteredData = data?.data.filter(item => {
    return Object.values(item).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  // Maximum number of visible pages for pagination
  const maxVisiblePages = 5; 

  // Determine which pages to display
  let startPage = data ?  Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)) : 0;
  let endPage = data ? Math.min(startPage + maxVisiblePages - 1, totalPages) : 0;

  // Adjust startPage and endPage if there are not enough pages to fill maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Function to export data to CSV
  const Export = () => {
    exportToCSV(data.data, 'data.csv');
  }

  return (
    <div className={`${funcss ? funcss : ''} roundEdge`}>
      {
        data &&
        <div className="padding bb">
        <RowFlex justify='space-between'>
          {
            data &&
            <div className="col width-200-max">
              <Input fullWidth bordered funcss="text-smaller text-bold height-30" label="Search..." onChange={(e) => setSearch(e.target.value)} />
            </div>
          }
          <div>
            <Button
              small
              bold
              text='Export'
              startIcon={<PiDownload />}
              onClick={Export}
            />
          </div>
        </RowFlex>
      </div>
      }
      <table
        className={`table  ${bordered ? 'border' : ''} ${
          noStripped ? '' : 'stripped'
          } ${hoverable ? 'hoverableTr' : ''} ${light ? 'light' : ''} ${dark ? 'dark' : ''}`}
        style={{
          height: height ? height + "px" : ""
        }}
        {...rest}  >

        { data &&
          data?.titles &&
          <TableHead>
            {
              data.titles.map(mdoc => (
                <th key={mdoc}>{mdoc}</th>
              ))
            }
          </TableHead>
        }
        {
          head && <TableHead>{head}</TableHead>
        }
        {
          body && <TableBody>{body}</TableBody>
        }

        {  data &&
          filteredData.slice(startIndex, endIndex).map((mdoc, index) => (
            <TableRow rowKey={index}>
              {
                data.fields.map(fdoc => (
                  <TableData key={fdoc}>
                    {mdoc[fdoc]}
                  </TableData>
                ))
              }
              {customColumns ?
                customColumns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column.render && column.render(mdoc)}
                    {column.onClick && (
                      <Button onClick={() => column.onClick && column.onClick(mdoc)}>
                        {column.title}
                      </Button>
                    )}
                  </td>
                )) : ""}
            </TableRow>
          ))
        }
        {children ? children : ''}
      </table>
      {
        data && 
        <>
        <div className="padding bt">
        <RowFlex gap={1} justify='space-between'>
          <div className="">
            {
              data &&
              <div className="text-bold">
                Total: {filteredData.length}
              </div>
            }
          </div>
          <div className="pagination">
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
              <Circle
                size={2}
                key={startPage + i}
                onClick={() => handleChangePage(startPage + i)}
                funcss={currentPage === startPage + i ? 'primary pageCircle' : 'dark pageCircle'}
              >
                <Text text={`${startPage + i}`} bold />
              </Circle>
            ))}
          </div>
        </RowFlex>
      </div>
        </>
      }
    </div>
  );
}
