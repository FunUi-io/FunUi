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
  customColumns?:React.ReactNode
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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.data?.length || 0) / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data?.data?.length || 0);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = data?.data.filter(item => {
    return Object.values(item).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  const maxVisiblePages = 5; // Maximum number of visible pages

  // Determine which pages to display
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // Adjust startPage and endPage if there are not enough pages to fill maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }


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

        {
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
              {
                customColumns &&
                customColumns
              }
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
