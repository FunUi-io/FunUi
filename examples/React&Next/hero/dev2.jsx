import React from 'react'
import Navbar from 'funuicss/component/Navbar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import NavLink from 'funuicss/component/NavLink'
import Icon from 'funuicss/component/Icon'
import IconicInput from 'funuicss/component/IconicInput'
import Input from 'funuicss/component/Input'
import NavLogo from 'funuicss/component/NavLogo'
import SideBar from 'funuicss/component/SideBar'
import SideBarTop from 'funuicss/component/SideBarTop'
import SideBarContent from 'funuicss/component/SideBarContent'
import SideBarFooter from 'funuicss/component/SideBarFooter'
import Button from 'funuicss/component/Button'
import Div from 'funuicss/component/Div'
import {useState , useEffect} from "react"
import Link from "next/link"
export default function Dev() {
    
  return (
    <div>
        <Navbar>
 <NavLogo>
 <Typography heading="h4" text="Fun Ui" color="gradient"/>
 </NavLogo>
 <SidebarTrigger
 content={<Icon icon="fas fa-bars" />}
 />
 <LinkWrapper>
 <NavLink hoverable>
      <Link className="text-secondary" href={"#"}>
          Home
      </Link>
      </NavLink>
      <NavLink hoverable>
      <Link className="text-secondary" href={"#"}>
          Pricing
      </Link>
      </NavLink>
      <NavLink hoverable>
      <Link className="text-secondary" href={"#"}>
          Blog
      </Link>
      </NavLink>
 </LinkWrapper>
 <LinkWrapper>
 <IconicInput 
   position="right" 
   icon={ <Icon icon="fas fa-search" color="primary" size="small"/>}
   input={<Input type="text" label="Search" funcss="width-200-max"  bordered fullWidth />}
    />
 </LinkWrapper>

</Navbar>




    </div>
  )
}
