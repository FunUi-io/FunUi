import * as React from 'react';

type TableHeadProps = {
  children?: React.ReactNode;
  funcss?: string;
};

export default function TableHead({ children, funcss }: TableHeadProps) {
  return <thead className={`${funcss ? funcss : ''}`}>{children}</thead>;
}
