import React from 'react'
import Typography from 'funuicss/component/Typography'
import Div from 'funuicss/component/Div'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import Container from "funuicss/component/Container"
import RowFlex from "funuicss/component/RowFlex"


import Modal from 'funuicss/component/Modal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import {useEffect , useState} from "react"

export default function Modal1() {
    const [modal, setmodal] = useState(true);
useEffect(() => {
 const modal = document.querySelector(".modal")
 const modalclose = document.querySelector(".close-modal")
 window.addEventListener("click" ,(e)=>{
    if(e.target === modal || e.target === modalclose){
      setmodal(false)
    }
 })
})
  return (
    <div>
      
<Div funcss="central fit" minHeight="100vh">
<Button text="open modal" bg="primary" onClick={()=>setmodal(true)} />
</Div>
<Modal 
animation="ScaleUp" 
duration={0.4} 
open={modal}
backdrop
maxWidth="500px"
>

<ModalContent funcss="padding-20">
    <RowFlex gap="2rem">
        <Div funcss="avatar light-danger" width="40px" height="40px">
        <Icon icon="fas fa-info"  />
        </Div>
        <Div>
            <Typography
            text="Deactivate your Account!"
            heading="h6"
            block
            />
            <Typography
            color="secondary"
            text="Are you sure you want to deactivate your account? All of your data will be permanently removed. "
            block
            />
        </Div>

    </RowFlex>
</ModalContent>
<ModalAction funcss="text-right light bottomEdge padding-20">
<Button 
bg="success"
outlined
text="Cancel"
rounded
onClick={()=>setmodal(false)}
/>
<Button 
bg="light-danger"
text="Deactivate"
rounded
onClick={()=>setmodal(false)}
/>
</ModalAction>
</Modal>

    </div>
  )
}
