import * as React from 'react';

type TableProps = {
  children: React.ReactNode;
  funcss?: string;
  bordered?: boolean;
  stripped?: boolean;
  hoverable?: boolean;
  showTotal?: boolean;
  light?: boolean;
  dark?: boolean;
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
}: TableProps) {
  return (
    <table
      className={`table ${funcss ? funcss : ''} ${bordered ? 'border' : ''} ${
        stripped ? 'stripped' : ''
      } ${hoverable ? 'hoverableTr' : ''} ${light ? 'light' : ''} ${dark ? 'dark' : ''}`}
    >
      {children}

      {showTotal && (
        <tr className="borderless">
          <td className="padding borderless text-bold">Total {React.Children.count(children) - 1}</td>
        </tr>
      )}
    </table>
  );
}
