import React from 'react'
import Typography from 'funuicss/component/Typography'
import Div from 'funuicss/component/Div'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import Container from "funuicss/component/Container"
import Grid from "funuicss/component/Grid"
import Col from "funuicss/component/Col"
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
maxWidth="600px"
>

<ModalContent>
    <Div funcss="text-center"  padding="0 2rem">
        <Div funcss="avatar light-success center" width="40px" height="40px">
        <Icon icon="fas fa-check"  />
        </Div>
        <Div margin="0.5rem 0">
            <Typography
            text="Payment Succesful"
            heading="h6"
            block
            />
            <Typography
            color="secondary"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Eius aliquam laudantium explicabo pariatur iste
             dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis."
            block
            />
        </Div>

    </Div>
</ModalContent>
<ModalAction funcss="text-right bottomEdge padding-20 round-edge">
<Grid gap>
    <Col>
    <Button 
bg="danger"
outlined
text="Cancel"
onClick={()=>setmodal(false)}
fullWidth
/>

    </Col>
    <Col>
    <Button 
bg="primary"
text="Confirmed"
onClick={()=>setmodal(false)}
fullWidth
/>
    </Col>
</Grid>
</ModalAction>
</Modal>

    </div>
  )
}
