<p align="center">
<img src="https://funui.netlify.app/logo.png" width="200px">
</p>
<h1 align="center">The React & Next Js Ui Library</h1>

<p>
The framework is easy to integrate, just install the package and import the CSS file
</p>

<h3>Why Choose FunUi </h3>
<ul>
<li>The framework is build in modules, you just need to import the module you want to use</li>
<li>The framework is build with flexbox, which makes it easy to fit all screen sizes</li>
<li>The framework is easy to integrate, just install the package and import the CSS file</li>
</ul>

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

```jsx
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
 <Button text="Sign In" color="primary"> </Button>
 <Button text="Sign Up" bg="primary"  rounded > </Button>
 </LinkWrapper>

</Navbar>
</div>

)
}```
