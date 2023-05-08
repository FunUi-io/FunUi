import React from 'react'
import Typography from 'funuicss/component/Typography'
import Div from 'funuicss/component/Div'
import Button from 'funuicss/component/Button'
import Container from "funuicss/component/Container"
import RowFlex from "funuicss/component/RowFlex"
import Grid from "funuicss/component/Grid"
import Col from "funuicss/component/Col"


export default function team2() {
  return (
    <Container>

        <Div padding="3rem  2rem">
            <Div maxWidth="600px">
            <Typography
            text="Meet our Leadership"
            heading="h2"
            bold
            block
            />
            <br />
            <Typography
            text="Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper suspendisse."
            heading="h6"
            block
            color="secondary"
            />
            </Div>
            <RowFlex responsiveMedium funcss="margin-top-40" justify="space-between">
                <Div>
                    <RowFlex gap="1.5rem">
                        <Div>
                            <img src='/team/deo.jpg' width={"70px"} height={"70px"} className='avatar' />
                        </Div>
                        <Div>
                        <Typography
                        text="John Micheal Deo"
                        heading="h6"
                         />
                        <Typography
                        text="Co-Founder | CEO"
                        color="primary"
                        block
                        size="small"
                        bold
                         />
                        </Div>
                    </RowFlex>
                </Div>
                <Div>
                    <RowFlex gap="1.5rem">
                        <Div>
                            <img src='/team/deo.jpg' width={"70px"} height={"70px"} className='avatar' />
                        </Div>
                        <Div>
                        <Typography
                        text="John Micheal Deo"
                        heading="h5"
                         />
                        <Typography
                        text="Co-Founder | CEO"
                        color="primary"
                        block
                         />
                        </Div>
                    </RowFlex>
                </Div>
            </RowFlex>
        </Div>
      
    </Container>
  )
}
