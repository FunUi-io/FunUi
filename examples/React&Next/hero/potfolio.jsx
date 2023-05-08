import React from 'react'
import Navbar from 'funuicss/component/Navbar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import Div from 'funuicss/component/Div'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import NavLogo from 'funuicss/component/NavLogo'
import Container from "funuicss/component/Container"
import RowFlex from "funuicss/component/RowFlex"
import Grid from "funuicss/component/Grid"
import Col from "funuicss/component/Col"
import Card from "funuicss/component/card/Card"
import Input from "funuicss/component/Input"
export default function Home() {
return (
<div>
<Div customStyle={{
padding:"1rem 10%",
minHeight:"90vh"
}}>
<Navbar>
<NavLogo>
<Typography heading="h4" color="gradient" text="My PortFolio" />
</NavLogo>
<SidebarTrigger
content={<Icon icon="fas fa-bars" />}
/>

<LinkWrapper>
<Div funcss="light-success avatar hoverable pointer" width="30px" height="30px">
<Icon icon="fab fa-youtube"  />
</Div>
<Div funcss="light avatar hoverable pointer" width="30px" height="30px">
<Icon icon="fab fa-twitter"  />
</Div>
<Div funcss="light-success avatar hoverable pointer" width="30px" height="30px">
<Icon icon="fab fa-instagram"  />
</Div>
</LinkWrapper>
</Navbar>

<Container funcss="text-center padding-top-90">
<Typography
text="Full Stack developer, Designer and Creator"
heading="h2"
color="secondary"
block
/>
<Typography
text="I create websites and other great content"
heading="h6"
color="secondary"
/>
<Div padding="2rem 0">
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/portfolio/avatar.png'  className='fit width-200-max'/>
<RowFlex funcss="padding-top-20" justify="center" alignItems="center">
<Button text="My projects" bg="secondary" />
<Button text="Contact me" bg="light"/>
</RowFlex>
</Div>
<Div>
<Typography
heading="h6"
text="@Micheal John Deo"
color="secondary"
/>
</Div>
</Container>
</Div>

<Div>
<Container >
<Typography
text="My Projects"
heading="h1"
color="secondary"
funcss="text-center"
block
/>
<Typography
text="Check Some Of my Projects"
color="secondary"
funcss="text-center"
block
/>


<Grid gap funcss="padding-top-20">
<Col sm="12" md="4" lg="4">
<Card funcss="padding-20 round-edge hover-up">
<RowFlex gap="1rem">
<Div funcss="light-success avatar hoverable pointer" width="70px" height="70px">
<Icon 
icon="fas fa-chalkboard"  
size="big"
/>
</Div>
<Div>
<Typography
text="Frontend"
heading="h4"
color="secondary"
block
/>
<Typography
text="Check out some of my frontend projects for good designs"
color="secondary"
bold
size="small"
/>
</Div>
</RowFlex>
</Card>
</Col>
<Col sm="12" md="4" lg="4">
<Card funcss="padding-20 round-edge hover-up">
<RowFlex gap="1rem">
<Div funcss="light-warning avatar hoverable pointer" width="70px" height="70px">
<Icon 
icon="fas fa-laptop"  
size="big"
/>
</Div>
<Div>
<Typography
text="Full-Stack"
heading="h4"
color="secondary"
block
/>
<Typography
text="Check out some of my full projects for good designs"
color="secondary"
bold
size="small"
/>
</Div>
</RowFlex>
</Card>
</Col>
<Col sm="12" md="4" lg="4">
<Card funcss="padding-20 round-edge hover-up">
<RowFlex gap="1rem">
<Div funcss="light avatar hoverable pointer" width="70px" height="70px">
<Icon 
icon="fab fa-youtube"  
size="big"
/>
</Div>
<Div>
<Typography
text="My Course"
heading="h4"
color="secondary"
block
/>
<Typography
text="Check out some of my Udemy Courses for web development"
color="secondary"
bold
size="small"
/>
</Div>
</RowFlex>
</Card>
</Col>


</Grid>
</Container>
</Div>

<Div>
<Container funcss="padding-top-80">
<Typography
text="Send Message"
heading="h2"
color="secondary"
funcss="text-center"
block
/>
<Typography
text="Send me a message through my mail"
color="secondary"
funcss="text-center"
block
/>

<Div maxWidth="500px" padding="2rem 0" funcss="center">
    
<Grid gap >
    <Col sm="12" md={6} lg={6}>
    <Input 
    rounded 
    type="text" 
    fullWidth 
    bordered 
    label="Full Name"
    funcss="light"
    borderless
    />
    </Col>
    <Col sm="12" md={6} lg={6}>
    <Input 
    rounded 
    type="email" 
    fullWidth 
    bordered 
    label="Email"
    funcss="light"
    />
    </Col>
    <Col sm="12" md={12} lg={12}>
    <Input 
    multiline
    rows={5}
    fullWidth 
    bordered 
    label="Message"
    funcss="light"
    />
    </Col>
    <Col sm="12" md={6} lg={6}>
    <Button rounded  bg="secondary" text="Send Message" fullWidth/>
    </Col>
</Grid>
</Div>

</Container>
</Div>


<Div padding="10rem 0 3rem 0">
<Container>
<RowFlex justify="space-between">
<Div>
<Button
text="@iddrisabdulwahab 2025"
bg="light"
small
rounded
/>
</Div>
<Div>
<Button
text="Privacy"
bg="light-success"
small
rounded
/>
<Button
text="FAQs"
bg="light-success"
small
rounded
/>
<Button
text="Supports"
bg="light-success"
small
rounded
/>
</Div>
</RowFlex>
</Container>
</Div>


</div>
)
}
