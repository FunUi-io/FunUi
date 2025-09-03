import React from 'react'
interface NotFoundProps {
    content?:React.ReactNode 
}

export default function SideContent(
    {
        content ,
    }:NotFoundProps
) {
  return (
    <main className="fun_main_content">
      {content && <div>{content}</div>} 
    </main>
  );
}
