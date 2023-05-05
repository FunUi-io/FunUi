<center>
<img src="https://funui.netlify.app/logo.png" height="200">
<h1>FunUi For React & Next js Apps </h1>
</center>

<h1>Create Beutiful UI/UX Components</h1>
<h3>Learn how to use the framework at our official website 👎</h3>
https://funui.netlify.app

<h3>Installation</h3>

<h3>Using Npm</h3>
Install the package via NPM

<pre>
npm install funuicss
</pre>

<h3>Import CSS file</h3>
Import the css file at your entry point to apply our classes,for example: _app.js, _app.jsx, index.js, index,jsx files
<pre>
import 'funuicss/css/fun.css'
</pre>


<h3>Simple App NavBar with FunUi </h3>
<p> This is a simple Navbar you just import and use for your project </p>
````
import React from 'react'
import Navbar from 'funuicss/component/Navbar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import Button from 'funuicss/component/Button'
import NavLogo from 'funuicss/component/NavLogo'
export default function App() {
return (

<div>
<Navbar>
 <NavLogo>
 <Typography heading="h4" text="Fun Ui" />
 </NavLogo>

 <LinkWrapper visibleLinks>
 <Button text="Sign In" color="primary"/>
 <Button text="Sign Up" bg="primary"  rounded/>
 </LinkWrapper>

</Navbar>
</div>

)
}
```