import React from 'react'
import Grid from 'funuicss/component/Grid'
import Div from 'funuicss/component/Div'
import Col from 'funuicss/component/Col'
import Blob from 'funuicss/component/Blob'
import Typography from 'funuicss/component/Typography'
import Section from 'funuicss/component/Section'
import RowFlex from 'funuicss/component/RowFlex'
import Icon from 'funuicss/component/Icon'
import Container from "funuicss/component/Container"

// container not imported
export default function Team() {
  return (
    <Div
    padding="4rem 1rem"
    >
    <Container>
        <Div funcss="text-center center bb padding" maxWidth="500px">
            <Typography
            text="Meet Our Team"
            heading="h1"
            block
            />
            <Typography
            text="We thank all these people for devotng their time and work for 
            the success of this project, show your support by checking out their personal profile"
            heading="article"
            />
        </Div>
    <Div padding="5rem 0">
    <Grid gap justify="center">
    <Col sm={12} lg={3} md={3}>
    <Div funcss="text-center"> 
    <Blob
    height={"150px"}
    width="150px"
    shape={"29% 71% 55% 45% / 44% 39% 61% 56%"}
    funcss={"center hover-up"}
    background={"/team/deo.jpg"}
    />
    <Section />
    <Typography
    heading={"h5"}
    text={"Micheal Deo"}
    />
    <Div />
    <Typography
    size={"small"}
    funcss={"opacity-3"}
    bold
    text={"Web Developer"}
    />
    <Section />
    <RowFlex gap={"1rem"} justify="center">
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-facebook" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-github" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-twitter" />
    </Div>
    </RowFlex>
    </Div>
    </Col>
    <Col sm={12} lg={3} md={3}>
    <Div funcss="text-center"> 
    <Blob
    height={"150px"}
    width="150px"
    shape={"30% 70% 62% 38% / 74% 46% 54% 26%"}
    funcss={"center hover-up"}
    background={"/team/jane.jpg"}
    />
        <Section />
    <Typography
    heading={"h5"}
    text={"Micheal Jane"}
    />
    <Div />
    <Typography
    size={"small"}
    funcss={"opacity-3"}
    bold
    text={"UI/UX Designer"}
    />
    <Section />
    <RowFlex gap={"1rem"} justify="center">
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-facebook" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-github" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-twitter" />
    </Div>
 
    </RowFlex>
    </Div>
    </Col>
    <Col sm={12} lg={3} md={3}>
    <Div funcss="text-center"> 
    <Blob
    height={"150px"}
    width="150px"
    shape={"61% 39% 74% 26% / 63% 58% 42% 37%"}
    funcss={"center hover-up"}
    background={"/team/john.jpg"}
    />
<Section />
    <Typography
    heading={"h5"}
    text={"John Micheal"}
    />
    <Div />
    <Typography
    size={"small"}
    funcss={"opacity-3"}
    bold
    text={"Backend Developer"}
    />
    <Section />
    <RowFlex gap={"1rem"} justify="center">
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-facebook" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-github" />
    </Div>
 
    <Div width="2rem" height="2rem" funcss="secondary avatar pointer hoverable">
    <Icon icon="fab fa-twitter" />
    </Div>
    </RowFlex>
    </Div>
    </Col>

    </Grid>

    </Div>
   </Container>
   </Div>
  )
}
