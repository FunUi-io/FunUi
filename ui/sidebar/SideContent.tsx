import React from 'react'
interface NotFoundProps {
    header?:React.ReactNode 
    code?:number 
    content?:React.ReactNode 
    action?:React.ReactNode 
    sidebarWidth?:number
}

export default function SideContent(
    {
        content ,
        sidebarWidth
    }:NotFoundProps
) {
  return (
    <main className="fun_main_content" 
    style={{
        width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : "100%"
    }}
    >
      {content && <div>{content}</div>} 
    </main>
  );
}
