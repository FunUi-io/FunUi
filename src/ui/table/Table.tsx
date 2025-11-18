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
import { PiDownload, PiEmpty, PiExportThin, PiFileCsv, PiMagnifyingGlass, PiX, PiXThin} from "react-icons/pi";
import Circle from '../specials/Circle';
import Text from '../text/Text';
import { exportToCSV } from 'react-easy-export';
import View from '../view/View';
import ScrollInView from '../ScrollInView/ScrollInView';
import Select from '../select/Select';
import { ExportData } from './Export';
import ToolTip from '../tooltip/ToolTip';
import Tip from '../tooltip/Tip';
import Flex from '../flex/Flex';
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from 'react-icons/io5';
import {  getAdvancedFilteredData } from './Query';
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
  filterOnchange?: (filter?:any , value?:any , totals?:number) => {} ,
  clearSearch?: boolean,
  head?: React.ReactNode;
  right?: React.ReactNode;
  body?: React.ReactNode;
  height?: number;
  pageSize?: number; // New prop for page size
  emptyResponse?:{icon?:React.ReactNode , title?:React.ReactNode , subtitle:React.ReactNode}
  customColumns?: { title: string; render: (data: any) => React.ReactNode; onClick?: (data: any) => void }[];
  filterableFields?: string[]; // New prop for filterable fields
  prioritizeSearchFields?: string[];
  onRowClick?: (data: any) => void;
};

export default function Table({
  children,
  funcss,
  bordered,
  noStripped,
  hoverable,
  title = "",
  showTotal,
  light,
  dark,
  head,
  body,
  data,
  isLoading= false,
  right,
  hideExport,
  height,
  pageSize = data ? 10 : 0, // Default page size,
  customColumns,
  filterableFields, // New prop
  emptyResponse,
  filterOnchange,
  clearSearch,
  prioritizeSearchFields = [],
  onRowClick,
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
  const [showSearch, setshowSearch] = useState(true)
  const [searchQuery, setsearchQuery] = useState("")



  React.useEffect(() => {
   if(clearSearch){
    setsearchQuery("")
   }
  }, [clearSearch])
  



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
    ExportData(filteredData, title, selectedField);
  }

   // Extract the data array
   const dataArray = data ? data.data : []
   
 // Remove duplicate values
const uniqueValues = selectedField
  ? Array.from(new Set(dataArray.map(item => getNestedValue(item, selectedField))))
  : [];



  React.useEffect(() => {
    if (filterOnchange) {
      filterOnchange(selectedField, selectedValue, filteredData.length);
    }
  }, [selectedField, selectedValue]);
  



  
 

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
                        <Text text={filteredData.length} weight={600}/>
              </div>
            }
          {
              title &&
              <div >
                       <Text text={title || ""} size='h6'/>
              </div>

              
            }
         
        </div>
        : 
           <>
                {
              showTotal && data &&
              <div >
                       <Text text='Records: ' size='sm'  />
                        <Text text={filteredData.length} weight={600} color='primary'/>
              </div>
            }
           </>
        }
        
          {
            data  ?
            <div >
           <Flex width='100%' wrap='nowrap' alignItems='center' gap={0.7}>
        {
          !selectedField && !showSearch && filterableFields &&
          <div>
           <Select
          fullWidth
          searchable
          funcss='min-w-300 w-full'
          rounded
        value={selectedField || ''}
        onChange={(e:string) => handleFieldChange(e)}
        options={[
        { text: '🔍 Filter', value: '' },
        { text: 'All*', value: '' },
        ...(filterableFields || []).map(field => ({
        text: field,
        value: field
        }))
        ]}
        />
         </div>
        }

      {selectedField && !showSearch && filterableFields && (
     <div className=''>
      <Select
     rounded
     searchable
            funcss='min-w-300 w-full'
fullWidth
     value={selectedValue || ''}
     onChange={(e:string) => {
       if (e === 'clear_all') {
         setSelectedField('');
       } else {
         handleValueChange(e);
         handleChangePage(1);
       }
     }}
     options={[
       { text: 'All*', value: '' },
       ...uniqueValues
         .filter(Boolean) // remove null/undefined/empty
         .map(item => ({
           text: item.toString(),
           value: item
         })),
       { text: 'Clear', value: 'clear_all' }
     ]}
   />
     </div>
   
      )}

 
       {
  showSearch ? 
   <Flex gap={0.5} wrap='nowrap' alignItems='center'>
 <div className='animated slide-up'>
   <Input 
  borderless  
  funcss='min-w-300'     
  fullWidth
  rounded
  value={searchQuery}
  onChange={(e) => setsearchQuery(e.target.value)}
  label="Search..."
  />
 </div>
 <div className='animated fade-in'>
   <div onClick={() => setshowSearch(false)}>
<ToolTip>
  {
    filterableFields ? <IoFilterOutline className='pointer'/>
    : 
<PiXThin className='pointer' size={23} onClick={() => setshowSearch(false)}/>

  }
<Tip tip="bottom" animation="Opacity" duration={1} content={filterableFields ? "Filter" : "Close Search"}/>
</ToolTip>
  </div>
 </div>
  </Flex>
  :   
  <div className='animated fade-in'>
    <ToolTip>
  <CiSearch  className='pointer' size={23} onClick={() => setshowSearch(true)}/>
  <Tip tip="bottom" animation="Opacity" duration={1} content="Search Data"/>
  </ToolTip>
  </div>
  }
            
     
           </Flex>
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
          <div  className='animated slide-up'>
  <ToolTip>
              <Circle bg='lighter' bordered  onClick={Export}>
            <PiExportThin />
              </Circle>
            <Tip tip="bottom" animation="Opacity" duration={1} content="Export Data"/>
            </ToolTip>
          </div>
          
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
          height: height ? height + "px" : "",
          position: 'relative',
          zIndex:1
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
{data &&
  (() => {
    const results = getAdvancedFilteredData(filteredData, searchQuery, data, getNestedValue, prioritizeSearchFields);
    const shouldSlice = !searchQuery || results.length > 10;
    
    return (shouldSlice ? results.slice(startIndex, endIndex) : results)
      .map((mdoc, index) => (
        <tr className='animated slide-up' key={index} onClick={onRowClick ? () => onRowClick(mdoc) : undefined}>
          {
            data.fields.map((fdoc, findex) => (
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
        </tr>
      ))
  })()
}
        {
          isLoading &&
          [1,2,3,4,5,6,7,8,9,10].map(() => (
            <TableRow funcss='skeleton'/>
          ))
        }
        {children ? children : ''}
      </table>

      {
        (filteredData.length === 0 && !isLoading && !children) &&
       <ScrollInView>
         <View funcss='max-w-400 p-4 text-center center'>
          <div>{ emptyResponse?.icon || <PiEmpty size={30} className='text-error' />}</div>
          <div>
           {
            emptyResponse?.title || 
            <Text 
            text="No Record Found!"
            size='xl'
            />
           }
          </div>
          <div>
            {
              emptyResponse?.subtitle || 
              <Text 
            text="You can try reloading the page or check your query"
            />
            }
          </div>
        </View>
       </ScrollInView>
      }
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

