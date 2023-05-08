import React from 'react'
import Typography from 'funuicss/component/Typography'
import Div from 'funuicss/component/Div'
import Button from 'funuicss/component/Button'
import Container from "funuicss/component/Container"
import RowFlex from "funuicss/component/RowFlex"
import Grid from "funuicss/component/Grid"
import Col from "funuicss/component/Col"

export default function App() {
return (
<div>

<Container>
<Div  padding="4rem 0">
<Div funcss="hr" margin="0 0 3rem 0" padding="0 0 2rem 0">
<Typography
text="From the Blog"
size="big"
block
/>
<br />
<Typography
text="Grow your business with Experts advice and ideas"
heading="h6"
color="secondary"
block
/>
</Div>
<Grid gap funcss="padding-top-20">
<Col sm={12} md={4} lg={4}>
<Div>
<Div>
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/1.jpg' className='round-edge responsive'/>
</Div>
<Div padding="1rem 0">
<RowFlex justify="space-between">
<Typography 
text="15 March 2095"
color="secondary" 
size="small"
bold
/>
<Button
text="Business"
bg="light-success"
small
rounded
/>
</RowFlex>
</Div>
<Div>
<Typography
text="Boost your conversion rate"
heading="h5"
block
/>
</Div>
<Div margin="1rem 0">
<Typography
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
do eiusmod tempor ..."
block
funcss="article"
/>
</Div>
<Div>
<RowFlex gap="0.5rem">
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/deo.jpg' className='avatar' width="40px" height="40px" />
<Div>
<Typography
text="John Micheal Deo"
heading="h6"
/>
<br />
<Typography
text="Founder & CEO"
bold
size="small"
/>
</Div>
</RowFlex>
</Div>
</Div>
</Col> 

<Col sm={12} md={4} lg={4}>
<Div>
<Div>
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/2.jpg' className='round-edge responsive'/>
</Div>
<Div padding="1rem 0">
<RowFlex justify="space-between">
<Typography 
text="15 March 2095"
color="secondary" 
size="small"
bold
/>
<Button
text="Business"
bg="light-success"
small
rounded
/>
</RowFlex>
</Div>
<Div>
<Typography
text="Search engine optimization."
heading="h5"
block
/>
</Div>
<Div margin="1rem 0">
<Typography
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
do eiusmod tempor ..."
block
funcss="article"
/>
</Div>
<Div>
<RowFlex gap="0.5rem">
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/jane.jpg' className='avatar' width="40px" height="40px" />
<Div>
<Typography
text="Jane Billy"
heading="h6"
/>
<br />
<Typography
text="Front-end Developer"
bold
size="small"
/>
</Div>
</RowFlex>
</Div>
</Div>
</Col> 
<Col sm={12} md={4} lg={4}>
<Div>
<Div>
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/3.jpg' className='round-edge responsive'/>
</Div>
<Div padding="1rem 0">
<RowFlex justify="space-between">
<Typography 
text="15 March 2095"
color="secondary" 
size="small"
bold
/>
<Button
text="Business"
bg="light-success"
small
rounded
/>
</RowFlex>
</Div>
<Div>
<Typography
text="Improving customer relation"
heading="h5"
block
/>
</Div>
<Div margin="1rem 0">
<Typography
text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
do eiusmod tempor ..."
block
funcss="article"
/>
</Div>
<Div>
<RowFlex gap="0.5rem">
<img src='https://raw.githubusercontent.com/FunUi-io/images/main/blog/john.jpg' className='avatar' width="40px" height="40px" />
<Div>
<Typography
text="John ragnak"
heading="h6"
/>
<br />
<Typography
text="Product Manager"
bold
size="small"
/>
</Div>
</RowFlex>
</Div>
</Div>
</Col> 


</Grid>
</Div>

</Container>

</div>
)
}
