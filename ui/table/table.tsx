import * as React from 'react';
import TableHead from './Head';
import TableBody from './Body';

type TableProps = {
  children: React.ReactNode;
  funcss?: string;
  bordered?: boolean;
  stripped?: boolean;
  hoverable?: boolean;
  showTotal?: boolean;
  light?: boolean;
  dark?: boolean;
  head?:React.ReactNode
  body?:React.ReactNode
};

export default function Table({
  children,
  funcss,
  bordered,
  stripped,
  hoverable,
  showTotal,
  light,
  dark,
  head,
  body
}: TableProps) {
  return (
    <table
      className={`table ${funcss ? funcss : ''} ${bordered ? 'border' : ''} ${
        stripped ? 'stripped' : ''
      } ${hoverable ? 'hoverableTr' : ''} ${light ? 'light' : ''} ${dark ? 'dark' : ''}`}
    >
      {
        head && <TableHead>{head}</TableHead>
      }
      {
        body && <TableBody>{body}</TableBody>
      }
      {children ? children : ''}

      {showTotal && (
        <tr className="borderless">
          <td className="padding borderless text-bold">Total {React.Children.count(children) - 1}</td>
        </tr>
      )}
    </table>
  );
}
