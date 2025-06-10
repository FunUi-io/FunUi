'use client'
import * as React from 'react';
import Button from '../button/Button';
import {PiArrowLeft} from 'react-icons/pi'
import Text from '../text/Text';

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
                <div className="text-big text-bold text-dark300" style={{ display: "block", transition: "all 0.2s linear 0s" }}>
                Page not found 🤔
              </div>
              }
            </div>
          {
            content ? content :
            <div className="article">
            <Text article text={`Don't worry, it happens to the best of us 😅. We'll help you find what you're looking for.`} color="dark300" block/>
          </div>
          }
            <div style={{ margin: "2rem 0px" }}>
              {
                action ? action :
                <div className="row-flex gap" style={{ justifyContent: "center", gap: "0.4rem" }}>
                <Button raised rounded startIcon={<PiArrowLeft />} bg='primary' onClick={() => {
                    window.history.back()
                  }}>
                 Take me back 🏠
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

