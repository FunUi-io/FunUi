import Typography from 'funuicss/component/Typography'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import Div from 'funuicss/component/Div'
import Grid from "funuicss/component/Grid"
import Col from "funuicss/component/Col"
import Section from "funuicss/component/Section"
import Container from "funuicss/component/Container"
import IconicInput from 'funuicss/component/IconicInput'
import Input from 'funuicss/component/Input'
import RowFlex from "funuicss/component/RowFlex"
import Card from "funuicss/component/card/Card"
import Link from "next/link"
export default function Starter() {
 
  
  return (
    <Div
    padding="4rem 1rem"
    >
    <Container>
    <Div maxWidth="800px">
    <Typography
    text="Fun Ui @2.0.0"
    heading="h6"
    block
    bold
    />
    <Typography
    text="React & Next Js Ui Component Library"
    size="big"
    color="gradient"
    block
    />
    <Section />
    <Section />
    <Typography
    color="secondary"
    funcss="article"
    heading="h6"
    text="Create your website with fewer lines of code, use prebuild components to 
    boost your development. Build with flexbox which makes your website much more 
    responsive and fit all screen types.
    "
    block
    />
    <Section />
    <Typography color="secondary" funcss="article">
      Comes with components like 
      <Typography color="primary text-bold">`Inputs`, </Typography>
      <Typography color="primary text-bold">`Navbars`, </Typography>
      <Typography color="primary text-bold">`Sidebar`, </Typography>
      <Typography color="primary text-bold">`buttons`, </Typography>
      <Typography color="primary text-bold">`Breadcrumbs`, </Typography>
      <Typography color="primary text-bold">`Alerts`, </Typography>
      <Typography color="primary text-bold">`Modals`, </Typography>
      <Typography color="primary text-bold">`Progress`, </Typography>
      <Typography color="primary text-bold">`Tooltips`, </Typography>
      and other standard features like  
      <Typography color="primary text-bold">`helpers` </Typography>
      and
      <Typography color="primary text-bold"> `Blob generator` </Typography>
    </Typography>
    <Section />
    <Section />

    <RowFlex>
    <Div>
   <Link href={"https://funui.netlify.app"}>
   <Button 
    bg="primary" 
    text="Visit FunUi"
    endIcon={<Icon icon="fas fa-angle-right"  />}
    />
   </Link>
    </Div>
    <Div>
    <IconicInput 
    funcss="section full-width" 
    position="right" 
    icon={ <Icon icon="far fa-copy" funcss="pointer" color="primary" />}
    input={
    <Input 
    type="text" 
    value="npm i funuicss@latest" 
    funcss="full-width light width-200-min" 
    bordered />}
     />
    </Div>
    </RowFlex>

    </Div>

<Grid funcss="padding-top-40" gap>
<Col sm={12} md={6} lg={4}>
<Link href="https://funui.netlify.app/gettingstarted">
<Card funcss="padding round-edge hover-up">
  <RowFlex gap> 
 <Div funcss="padding">
 <Icon 
 icon="fas fa-bolt"  
 size="big"
 color="gradient"
 />
 </Div>
  <Div>
<Typography
text="Getting Started"
heading="h5"
color="primary"
/>
<Div />
<Typography
color="secondary"
text={"Check out how to install and use the framework"}
funcss={"opacity-5 text-bold"}
size="small"
/>
</Div>
</RowFlex>
</Card>
</Link>
</Col>
<Col sm={12} md={6} lg={4}>
<Link href="https://www.npmjs.com/package/funuicss">
<Card funcss="padding round-edge hover-up">
  <RowFlex gap> 
 <Div funcss="padding">
 <Icon 
 icon="fab fa-npm"  
 size="big"
 color="gradient"
 />
 </Div>
  <Div>
<Typography
text="Check Package"
heading="h5"
color="primary"
/>
<Div />
<Typography
color="secondary"
text={"Check out the package and all stabel versions @npm"}
funcss={"opacity-5 text-bold"}
size="small"
/>
</Div>
</RowFlex>
</Card>
</Link>
</Col>
<Col sm={12} md={6} lg={4}>
<Link href="https://funui.netlify.app/components">
<Card funcss="padding round-edge hover-up">
  <RowFlex gap> 
 <Div funcss="padding">
 <Icon 
 icon="fab fa-buffer"  
 size="big"
 color="gradient"
 />
 </Div>
  <Div>
<Typography
text="Components"
heading="h5"
color="primary"
/>
<Div />
<Typography
color="secondary"
text={"Check out our pre build components and Ui you can simply use"}
funcss={"opacity-5 text-bold"}
size="small"
/>
</Div>
</RowFlex>
</Card>
</Link>
</Col>

</Grid>
    </Container>
    </Div>
  )
}
