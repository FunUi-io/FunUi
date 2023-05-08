import Typography from 'funuicss/component/Typography'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import Div from 'funuicss/component/Div'
import Section from "funuicss/component/Section"
import Container from "funuicss/component/Container"
import BreadCrumb from 'funuicss/component/BreadCrumb'
import Navbar from 'funuicss/component/Navbar'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import NavLogo from 'funuicss/component/NavLogo'

export default function Home() {
  return (
    <div style={{
      background:"url('/codebg.jpg')",
      backgroundSize:"cover",
      minHeight:"100vh"
    }}>


      <Div
    padding="4rem 1rem"    
    funcss="darken-7 absolute fit central"
    >
    <Container>
      {/* Navbar */}

    <Navbar fixedTop>
<NavLogo>
<Typography heading="h4" text="Fun Ui" color="gradient"/>
</NavLogo>
<SidebarTrigger
content={<Icon icon="fas fa-bars" color="white"/>}
/>
<LinkWrapper>
<Button text="Sign In" color="primary"/>
<BreadCrumb type="straight" funcss="text-white"/>
<Button 
text="Sign Up" 
bg="primary" 
rounded
endIcon={<Icon icon="far fa-user" /> }
/>
</LinkWrapper>

</Navbar>
    <Div 
    maxWidth="900px"
    funcss="text-center text-white center"
    >
     <Typography
      text="Code"
      size="jumbo"
      color="gradient"
      />
      <Typography
      text=" with FunUi"
      size="bigger"
      />
      <Section />
     <Div maxWidth="500px" funcss="center">
     <Typography
      funcss="article"
      text="Learn HTML, CSS and JavaScript in one place, Learn to also create
      an awesome landing page like this with FunUi and save time while coding"
      />
      <Section />
      <Section />
      <Button  
      bg="primary" 
      outlined
      text="Start Now"
      endIcon={<Icon icon="fas fa-angle-right"  />}
      />
     <Button 
     outlined
     bg="secondary" 
     endIcon={<Icon icon="fab fa-buffer"  />}
     text="Check Our Docs"
     />
 
     </Div>
   </Div>
    </Container>
    </Div>
    </div>
  )
}
