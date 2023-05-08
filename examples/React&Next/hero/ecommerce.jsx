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
export default function Home() {
  return (
    <div>
    <Div customStyle={{
        padding:"1rem 10%",
        minHeight:"90vh"
    }}>
    <Navbar>
    <NavLogo>
    <Typography heading="h4" color="gradient" text="Tiny Store" />
    </NavLogo>
    <SidebarTrigger
    content={<Icon icon="fas fa-bars" />}
    />

    <LinkWrapper>
    <Button text="Sign Up" bg="secondary" />
    <Button text="Log in" bg="light"/>
    </LinkWrapper>
    </Navbar>

    <Container funcss="text-center padding-top-90">
        <Typography
        text="A minimal store for your shopify Lite plan"
        heading="h4"
        color="secondary"
        />
        <Div padding="2rem 0">
        <img src='https://raw.githubusercontent.com/FunUi-io/images/main/ecommerce/home.png' className='fit width-400-max'/>
        <RowFlex funcss="padding-top-20" justify="center" alignItems="center">
        <Button text="Try For Free" bg="secondary" />
        <Button text="Live Demo" bg="light"/>
        </RowFlex>
        </Div>
        <Div>
            <Typography
            heading="h6"
            text="14 days free Trial"
            color="secondary"
            />
        </Div>
    </Container>
    </Div>
    <Div>
        <Container>
            <RowFlex justify="space-between">
                <Div>
                  <Button
                  text="Tiny store 2024"
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
