'use client'
import * as React from 'react';
import TableHead from './Head';
import TableBody from './Body';
import TableRow from './Row';
import TableData from './Data';
import Input from '../input/Input';
import { useState } from "react";
import RowFlex from '../specials/RowFlex';
import Button from '../button/Button';
import { PiDownload, PiFileCsv} from "react-icons/pi";
import Circle from '../specials/Circle';
import Text from '../text/Text';
import { exportToCSV } from 'react-easy-export';

type TableProps = {
  children?: React.ReactNode;
  funcss?: string;
  title?: string;
  bordered?: boolean;
  noStripped?: boolean;
  hoverable?: boolean;
  showTotal?: boolean;
  light?: boolean;
  isLoading?: boolean;
  hideExport?: boolean;
  dark?: boolean;
  data?: { "fields": string[], "data": any[], "titles": string[] , "funcss": string[]};
  head?: React.ReactNode;
  right?: React.ReactNode;
  body?: React.ReactNode;
  height?: number;
  pageSize?: number; // New prop for page size
  customColumns?: { title: string; render: (data: any) => React.ReactNode; onClick?: (data: any) => void }[];
  filterableFields?: string[]; // New prop for filterable fields
};

export default function Table({
  children,
  funcss,
  bordered,
  noStripped,
  hoverable,
  title,
  showTotal,
  light,
  dark,
  head,
  body,
  data,
  isLoading,
  right,
  hideExport,
  height,
  pageSize = data ? 10 : 0, // Default page size,
  customColumns,
  filterableFields, // New prop
  ...rest
}: TableProps) {
   // Check if data is null or undefined before accessing its properties
  // Replace this in your component
const [search, setSearch] = useState<string | string[]>('');
   const [currentPage, setCurrentPage] = useState<number>(1);

  // Determine the total number of pages based on data length and page size
  const totalPages = data ? Math.ceil((data?.data?.length || 0) / pageSize) : 0;
  
  // Calculate start and end indices for data pagination
  const startIndex = data ? (currentPage - 1) * pageSize : 0;
  const endIndex = data ? Math.min(startIndex + pageSize, data?.data?.length || 0) : 0;

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);



  // Enhanced filter logic:
const normalize = (val: any) => val?.toString().toLowerCase().trim();

const matchesSearch = (item: any) => {
  const searchTerms = Array.isArray(search) ? search : [search];
  return searchTerms.some(term =>
    Object.values(item).some(value =>
      normalize(value).includes(normalize(term))
    )
  );
};





  // Function to handle page change
  const handleChangePage = (page: number) => {
    if(data) {
      setCurrentPage(page);
    }
  };

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
    setSelectedValue(null); // Reset selected value when field changes
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const filteredData = data ? data?.data.filter(item => {
    if (!search && !selectedField && !selectedValue) return true;
    if (selectedField && selectedValue) {
      const value = getNestedValue(item, selectedField);
     if(value){
      return value.toString().toLowerCase() === selectedValue.toString().toLowerCase();
     }
    }
    if (selectedField) {
      const value = getNestedValue(item, selectedField);
      if(value){
      return value.toString().toLowerCase().includes(search.toString().toLowerCase());
      }
    }
    return Object.values(item).some(value => {
      if(value){
        return value.toString().toLowerCase().includes(search.toString().toLowerCase());
      }
    });
  })
  : [];

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
    exportToCSV(filteredData, title ? `${title} ${selectedField ? `_${selectedField}` : ''}.csv` : 'data.csv');
  }

   // Extract the data array
   const dataArray = data ? data.data : []
   
 // Remove duplicate values
const uniqueValues = selectedField
  ? Array.from(new Set(dataArray.map(item => getNestedValue(item, selectedField))))
  : [];

  return (
    <div className={`${funcss ? funcss : ''} roundEdge`}>
      {
        data &&
        <div className="padding bb">
        <RowFlex gap={0.5} justify='space-between'>
        {
          title ? 
          <div>
                 {
              showTotal && data &&
              <div >
                       <Text text='Records: ' size='sm'  />
                        <Text text={filteredData.length} size='h6'/>
              </div>
            }
          {
              title &&
              <div >
                       <Text text={title || ""} size='h4'/>
              </div>

              
            }
         
        </div>
        : 
           <>
                {
              showTotal && data &&
              <div >
                       <Text text='Records: ' size='sm'  />
                        <Text text={filteredData.length} size='h6'/>
              </div>
            }
           </>
        }
        
          {
            data && filterableFields ?
            <div className="col width-200-max">
           <RowFlex gap={0.7}>
           {
            !selectedField && 
              <select 
           className=" input borderedInput roundEdgeSmall smallInput" 
           value={selectedField || ''} 
           onChange={(e) => {
            handleFieldChange(e.target.value)
           }}>
        <option value="">🔍 Filter</option>
        <option value="">All*</option>
        {filterableFields?.map(field => (
          <option key={field} value={field}>{field}</option>
        ))}
      </select>
           }
      {/* {
        selectedField && <div>
        =
      </div>
      } */}
      {selectedField && (
        <select  
        className=" input borderedInput width-200-max  roundEdgeSmall smallInput" 
         value={selectedValue || ''} 
         onChange={(e) => {
        if(e.target.value === 'clear_all'){
          setSelectedField('')
        }else{
            handleValueChange(e.target.value)
          handleChangePage(1)
        }
         }}
         >
          <option value="">All*</option>
          {uniqueValues.map(item => (
           <>
           {
            item &&
            <option key={item} value={item}>
            {item.toString()}
          </option>
           }
           </>
          ))}
             <option value="clear_all">Clear</option>
        </select>
      )}
           </RowFlex>
            </div>
            :''
          }
          <>
          <RowFlex gap={0.5}>
            {
              right && right
            }
         {
          !hideExport &&
           <Button
              small
              bold
              text='Export'
              startIcon={<PiFileCsv />}
              color='gradient'
              onClick={Export}
            />
         }
          </RowFlex>
          </>
        </RowFlex>
      </div>
      }
     <main
     style={{overflow:"auto" , width:"100%"}}>
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
                <th key={mdoc}>
                  <Text text={mdoc} weight={500} funcss='text-secondary'/>
                </th>
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
            <TableRow funcss='animated slide-down' rowKey={index} >
              {
                data.fields.map((fdoc , findex) => (
                  <TableData key={fdoc} funcss={data.funcss ? data?.funcss?.[findex] || '' : ''}>
                    {getNestedValue(mdoc, fdoc)}
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
        {
          isLoading &&
          [1,2,3,4,5,6,7,8,9,10].map(() => (
            <TableRow funcss='skeleton'/>
          ))
        }
        {children ? children : ''}
      </table>
     </main>
      {
        data && 
        <>
        {
            pageSize &&
            <>
            {
              filteredData.length > pageSize &&
              <div className="padding bt">
              <RowFlex gap={1} justify='center'>
             
                <div className="pagination">
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <Circle
                      size={2.5}
                      key={startPage + i}
                      onClick={() => handleChangePage(startPage + i)}
                      funcss={currentPage === startPage + i ? 'primary pageCircle' : 'lighter pageCircle text-primary'}
                    >
                      <Text text={`${startPage + i}`} bold size='sm'/>
                    </Circle>
                  ))}
                </div>
            
              </RowFlex>
            </div>
            }
            </>
        }

        </>
      }
    </div>
  );
}

