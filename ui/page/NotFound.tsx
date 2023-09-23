import * as React from 'react';
import Button from '../button/Button';
import {PiHouse} from 'react-icons/pi'

interface NotFoundProps {
    header?:React.ReactNode 
    code?:number 
    content?:React.ReactNode 
    action?:React.ReactNode
}

export default function NotFound(
    {
        header , 
        code ,
        content ,
        action
    }:NotFoundProps
) {
  return (
    <div>
      <div>
        <div className="central" style={{ minHeight: "100vh", width: "100%", padding: "4rem 0px" }}>
          <div className="text-center width-600-max">
          {
            code ? 
            code :
            <div className="h2 text-warning round-edge">
            404
          </div>
          }
            <div style={{ margin: "1.4rem 0px" }}>
              {
                header ? header 
                : 
                <div className="text-bigger text-dark300" style={{ display: "block", transition: "all 0.2s linear 0s" }}>
                Page Not Found
              </div>
              }
            </div>
          {
            content ? content :
            <div className="article">
            Sorry, we couldn't find the page you're looking for.
          </div>
          }
            <div style={{ margin: "2rem 0px" }}>
              {
                action ? action :
                <div className="row-flex gap" style={{ justifyContent: "center", gap: "0.4rem" }}>
                <Button raised startIcon={<PiHouse />} bg='primary800' onClick={() => window.location.assign("/")}>
                 Back To Home
                </Button>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
