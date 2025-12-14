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
import { PiDownload, PiEmpty, PiExportThin, PiFileCsv, PiMagnifyingGlass, PiPlus, PiSpinnerGap, PiX, PiXThin} from "react-icons/pi";
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
import Empty from '../empty/Empty';

type ColumnConfig = {
  field: string;
  title: string;
  width?: string | number; // '150px', 'auto', '1fr', 150
  minWidth?: string | number;
  maxWidth?: string | number;
  className?: string;
  cellClassName?: string;
  textWrap?: boolean; // true = wrap text, false = truncate
  headerClassName?: string;
};

type TableProps = {
  children?: React.ReactNode;
  funcss?: string;
  trCss?: string;
  title?: string;
  bordered?: boolean;
  noStripped?: boolean;
  hoverable?: boolean;
  showTotal?: boolean;
  light?: boolean;
  isLoading?: boolean;

  hideExport?: boolean;
  dark?: boolean;
  data?: { 
    "fields": string[], 
    "data": any[], 
    "titles": string[], 
    "funcss": string[],
    "columns"?: ColumnConfig[] 
  };
  filterOnchange?: (filter?:any , value?:any , totals?:number) => {},
  clearSearch?: boolean,
  head?: React.ReactNode;
  right?: React.ReactNode;
  body?: React.ReactNode;
  height?: number;
  pageSize?: number; // New prop for page size
  emptyResponse?:{
    icon?:React.ReactNode , 
    title?:React.ReactNode , 
    subtitle:React.ReactNode ,  
    ctaText?:string,
    ctaIcon?:React.ReactNode | string,
    showCta?:boolean,
    ctaOnClick?:() => void
    }
  customColumns?: { title: string; render: (data: any) => React.ReactNode; onClick?: (data: any) => void }[];
  filterableFields?: string[]; // New prop for filterable fields
  prioritizeSearchFields?: string[];
  onRowClick?: (data: any) => void;
  // New columns prop for explicit column configuration
  columns?: ColumnConfig[];
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
  trCss,
  columns, // New columns prop
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
  
  // Helper function to get column configuration for a specific index
  const getColumnConfig = (index: number): ColumnConfig | undefined => {
    if (columns && columns[index]) {
      return columns[index];
    }
    if (data?.columns && data.columns[index]) {
      return data.columns[index];
    }
    return undefined;
  };

  // Helper function to generate grid template columns
  const generateGridTemplateColumns = () => {
    // First, try to use the explicit columns prop
    if (columns && columns.length > 0) {
      return columns.map(col => 
        typeof col.width === 'number' ? `${col.width}px` : 
        col.width || '1fr'
      ).join(' ');
    }
    
    // Then, try to use columns from data
    if (data?.columns && data.columns.length > 0) {
      return data.columns.map(col => 
        typeof col.width === 'number' ? `${col.width}px` : 
        col.width || '1fr'
      ).join(' ');
    }
    
    // For custom columns, we need to add their widths too
    if (customColumns && customColumns.length > 0) {
      const totalColumns = (data?.fields?.length || 0) + customColumns.length;
      return Array(totalColumns).fill('1fr').join(' ');
    }
    
    // Default fallback
    if (data?.fields) {
      return data.fields.map(() => '1fr').join(' ');
    }
    
    return '1fr';
  };

  // Helper function to get column width for a specific index
  const getColumnWidth = (index: number): string => {
    const col = getColumnConfig(index);
    if (col?.width) {
      return typeof col.width === 'number' ? `${col.width}px` : col.width;
    }
    return 'auto';
  };

  // Helper function to get column min-width for a specific index
  const getColumnMinWidth = (index: number): string => {
    const col = getColumnConfig(index);
    if (col?.minWidth) {
      return typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth;
    }
    return '80px';
  };

  // Helper function to get column max-width for a specific index
  const getColumnMaxWidth = (index: number): string => {
    const col = getColumnConfig(index);
    if (col?.maxWidth) {
      return typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth;
    }
    return 'none';
  };

  // Generate grid template columns string
  const gridTemplateColumns = generateGridTemplateColumns();

  return (
    <div className={`${funcss ? funcss : ''} roundEdge`}>
      {
        data &&
        <div className="pr-4 pl-4 pt-2 pb-2 lighter tableHeader mb-2" style={{overflow:"show"}}>
        <RowFlex gap={0.5} justify='space-between'>
        {
          title ? 
          <div>
                 {
              showTotal && data &&
              <div >
                       <Text text={`${filteredData.length} Records`} size='sm' weight={500}/>
              </div>
            }
          {
              title &&
              <div >
                       <Text text={title || ""} size='h6' lineHeight='0.8'/>
              </div>

              
            }
         
        </div>
        : 
           <>
                {
              showTotal && data &&
              <div >
                        <Text text={`${filteredData.length} Records`} size='sm' weight={500}/>
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
          funcss='min-w-300 w-full bg'
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
            funcss='min-w-300 w-full bg'
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
  funcss='min-w-300 bg'     
  fullWidth
  rounded
  value={searchQuery}
  onChange={(e) => setsearchQuery(e.target.value)}
  label="Search..."
  />
 </div>
 <div>
   <div onClick={() => setshowSearch(false)}>
<ToolTip>
  {
    filterableFields ? <IoFilterOutline className='pointer'/>
    : 
<PiXThin className='pointer' size={23} onClick={() => setshowSearch(false)}/>

  }
<Tip tip="top" animation="Opacity" duration={1} content={filterableFields ? "Filter" : "Close Search"}/>
</ToolTip>
  </div>
 </div>
  </Flex>
  :   
  <div>
    <ToolTip>
  <CiSearch  className='pointer' size={23} onClick={() => setshowSearch(true)}/>
  <Tip tip="top" animation="Opacity" duration={1} content="Search Data"/>
  </ToolTip>
  </div>
  }
            
     
           </Flex>
            </div>
            :''
          }

    
          <>
        { (right || !hideExport) &&
            <RowFlex gap={0.5}>
            {
              right && right
            }
         {
          !hideExport &&
          <div >
  <ToolTip>
              <Circle bg='lighter' bordered  onClick={Export}>
            <PiExportThin />
              </Circle>
            <Tip tip="top" animation="Opacity" duration={1} content="Export Data"/>
            </ToolTip>
          </div>
          
         }
          </RowFlex>
        }
          </>
        </RowFlex>
      </div>
      }
  <main style={{ overflow: "auto", width: "100%" }}>
  <div
    className={`table-grid ${bordered ? 'bordered' : ''} ${
      noStripped ? '' : 'stripped'
    } ${hoverable ? 'hoverableTr' : ''} ${light ? 'light' : ''} ${dark ? 'dark' : ''}`}
    style={{
      height: height ? height + "px" : "",
      position: 'relative',
      zIndex: 1,
      // Set grid template columns on the main container for consistency
      gridTemplateColumns: gridTemplateColumns
    }}
    {...rest}
  >
    {/* Table Head */}
    {data && data?.titles && (
      <div 
        className="table-head"
        style={{
          // Match the grid template columns
          gridTemplateColumns: gridTemplateColumns
        }}
      >
        {data.titles.map((mdoc, index) => {
          const colConfig = getColumnConfig(index);
          return (
            <div
              key={mdoc}
              className={`table-header text-secondary ${
                colConfig?.headerClassName || ''
              } ${
                index === 0 ? "first_table_data" : ""
              } ${index === data.titles.length - 1 ? "last_table_data" : ""}`}
              data-label={mdoc}
              style={{
                // Apply column-specific styles
                minWidth: getColumnMinWidth(index),
                maxWidth: getColumnMaxWidth(index),
                width: getColumnWidth(index),
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              {mdoc}
            </div>
          );
        })}
      </div>
    )}

    {head && <div className="table-head">{head}</div>}

    {/* Table Body */}
    <div 
      className="table-body"
      style={{
        // Match the grid template columns
        gridTemplateColumns: gridTemplateColumns
      }}
    >
      {body && body}
      
      {data &&
        (() => {
          const results = getAdvancedFilteredData(
            filteredData,
            searchQuery,
            data,
            getNestedValue,
            prioritizeSearchFields
          );
          const shouldSlice = !searchQuery || results.length > 10;

          return (shouldSlice ? results.slice(startIndex, endIndex) : results).map(
            (mdoc, index) => (
              <div
                className={`table-row animated slide-up ${trCss}`}
                key={index}
                onClick={onRowClick ? () => onRowClick(mdoc) : undefined}
                style={{
                  // Match the grid template columns
                  gridTemplateColumns: gridTemplateColumns
                }}
              >
                {data.fields.map((fdoc, findex) => {
                  const colConfig = getColumnConfig(findex);
                  const cellContent = getNestedValue(mdoc, fdoc);
                  
                  return (
                    <div
                      key={fdoc}
                      className={`table-cell ${
                        data.funcss ? data?.funcss?.[findex] || "" : ""
                      } ${colConfig?.cellClassName || ''} ${
                     'wrap' 
                      }`}
                      data-label={data.titles?.[findex] || fdoc}
                      style={{
                        overflow: "visible",
                        // Apply column-specific styles to match header
                        minWidth: getColumnMinWidth(findex),
                        maxWidth: getColumnMaxWidth(findex),
                        width: getColumnWidth(findex),
                        // Text handling based on column config
                        whiteSpace:  'normal' ,
                        overflowWrap: 'break-word' ,
                        textOverflow: 'clip'
                      }}
                    >
                      {cellContent}
                    </div>
                  );
                })}

                {customColumns
                  ? customColumns.map((column, columnIndex) => {
                      // Calculate index for custom column (after regular data fields)
                      const colIndex = (data?.fields?.length || 0) + columnIndex;
                      return (
                        <div
                          key={columnIndex}
                          className="table-cell wrap"
                          data-label={column.title || "Action"}
                          style={{
                            position: "relative",
                            overflow: "visible",
                            // Apply column-specific styles
                            minWidth: getColumnMinWidth(colIndex),
                            maxWidth: getColumnMaxWidth(colIndex),
                            width: getColumnWidth(colIndex) ,
                        whiteSpace:  'normal' ,
                        overflowWrap: 'break-word' ,
                        textOverflow: 'clip'
                          }}
                        >
                            {column.render && column.render(mdoc)}

                          {column.onClick && (
                            <Button
                              onClick={() => column.onClick && column.onClick(mdoc)}
                            >
                              {column.title}
                            </Button>
                          )}
                        </div>
                      );
                    })
                  : ""}
              </div>
            )
          );
        })()}

      {/* Loading Skeleton - UPDATED to match column widths */}
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <Flex 
            key={index} 
            className="table-row skeleton"
            style={{
              // Match the grid template columns
              gridTemplateColumns: gridTemplateColumns
            }}
          >
            {data?.fields.map((_, cellIndex) => {
              return (
                <div 
                  key={cellIndex} 
                  className="table-cell"
                  style={{
                    // Apply column-specific styles to match headers
                    minWidth: getColumnMinWidth(cellIndex),
                    maxWidth: getColumnMaxWidth(cellIndex),
                    width: getColumnWidth(cellIndex)
                  }}
                ></div>
              );
            })}
            
            {/* Add skeleton cells for custom columns if they exist */}
            {customColumns && customColumns.map((_, customIndex) => {
              const colIndex = (data?.fields?.length || 0) + customIndex;
              return (
                <div 
                  key={`skeleton-custom-${customIndex}`}
                  className="table-cell"
                  style={{
                    minWidth: getColumnMinWidth(colIndex),
                    maxWidth: getColumnMaxWidth(colIndex),
                    width: getColumnWidth(colIndex)
                  }}
                ></div>
              );
            })}
          </Flex>
        ))}

      {children ? children : ""}
    </div>

    {/* Empty State */}
    {filteredData.length === 0 && !isLoading && !children && (
      <div >
        {/* <div className="empty-icon">
          {emptyResponse?.icon || <PiEmpty size={30} className="text-error" />}
        </div>
        <div>
          {emptyResponse?.title || (
            <Text text="No Record Found!" size="xl" />
          )}
        </div>
        <div>
          {emptyResponse?.subtitle || (
            <Text text="You can try reloading the page or check your query" />
          )}
        </div> */}
        <Empty 
        ctaIcon={emptyResponse?.ctaIcon || <PiSpinnerGap />}
        title={emptyResponse?.title || 'No Record Found!'}
        description={emptyResponse?.subtitle || 'You can try reloading the page or check your query'}
        ctaText={emptyResponse?.ctaText || 'Reload'}
        showCta={emptyResponse?.showCta || false}
        ctaOnClick={() => emptyResponse?.ctaOnClick ? emptyResponse?.ctaOnClick() : window.location.reload}
        />
      </div>
    )}
  </div>
</main>

{
  data && pageSize && filteredData.length > pageSize && (
    <div className="padding bt">
      <RowFlex gap={1} funcss='pointer' justify="center">
          {/* First Page Button */}
          <div
            className={`pagination-nav ${currentPage === 1 ? 'pagination-nav-disabled' : ''}`}
            onClick={() => currentPage > 1 && handleChangePage(1)}
            title="First page"
          >
            <Text text="««" />
          </div>
          
          {/* Previous Page Button */}
          <div
            className={`pagination-nav p ${currentPage === 1 ? 'pagination-nav-disabled' : ''}`}
            onClick={() => currentPage > 1 && handleChangePage(currentPage - 1)}
            title="Previous page"
          >
            <Text text="‹" />
          </div>

          {/* Page Numbers */}
          <Flex>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const pageNumber = startPage + i;
              const isActive = currentPage === pageNumber;
              
              return (
               <div key={pageNumber}>
                 <div
                  className={`pagination-item text-xs ${isActive ? 'pagination-item-active primary' : ''}`}
                  onClick={() => handleChangePage(pageNumber)}
                >
       {`${pageNumber}`}
                </div>
               </div>
              );
            })}
          </Flex>

          {/* Next Page Button */}
          <div
            className={`pagination-nav p ${currentPage === totalPages ? 'pagination-nav-disabled' : ''}`}
            onClick={() => currentPage < totalPages && handleChangePage(currentPage + 1)}
            title="Next page"
          >
            <Text text="›" />
          </div>
          
          {/* Last Page Button */}
          <div
            className={`pagination-nav ${currentPage === totalPages ? 'pagination-nav-disabled' : ''}`}
            onClick={() => currentPage < totalPages && handleChangePage(totalPages)}
            title="Last page"
          >
            <Text text="»»" />
          </div>
      </RowFlex>
    </div>
  )
}
    </div>
  );
}