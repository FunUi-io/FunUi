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

<h3>Using Yarn</h3>
Install the package via NPM

<pre>
yarn add funuicss
</pre>


<h3>Import CSS file</h3>
Import the css file at your entry point to apply our classes,for example: _app.js, _app.jsx, index.js, index,jsx files
<pre>
import 'funuicss/css/fun.css'
</pre>

<h3>Demo Login Form </h3>
<p> 
Create a simple login form with our framework.
</p>

```jsx
import React from 'react'
import Text from 'funuicss/ui/text/Text'
import Input from 'funuicss/ui/input/Input'
import Button from 'funuicss/ui/button/Button'
import Section from 'funuicss/ui/specials/Section'
export default function App() {

return (

<div>
<div className="central height-500-min" >
 <div className='width-300-max fit'>
<div className="margin-bottom-40">
<Text
text='Welcome'
heading='h2'
block
/>
<Text
text='Sign in to continue!'
block
/>
</div>
<Section gap={1.5}>
<Text text="Email" funcss="margin-bottom-10" block size="small" bold color="primary"/>
<Input type="email" fullWidth bordered />
</Section>
<Section gap={1}>
<Text text="Password" funcss="margin-bottom-10" block size="small" bold color="primary"/>
<Input type="password" fullWidth bordered />
</Section>

<div className="section">
  <Link href={"/#"}>
      <Text text='Forgot password!' size='small' underline color='primary'/>
  </Link>
</div>
<div className="section">
  <Button
  text={"Let's go"}
  raised
  fullWidth
  bg='primary800'
  />
</div>

</div>
</div>
</div>

)
}

```

<h3>Simple Buttons </h3>
<p> This is a simple button</p>

```jsx
import React from 'react'
import Button from 'funuicss/ui/button/Button'

export default function App() {
return (
<Button  bg="primary" outlined text="Simple Button"/>
)
}
```


<h3>Simple Input </h3>
<p> This is a simple input</p>

```jsx
import React from 'react'
import Input from 'funuicss/ui/input/Input'

export default function App() {
return (
<>
<Input 
type="text" 
label="This is a simple input" 
funcss="full-width"
/>
<Input 
type="text" 
bordered 
label="This is a bordered" 
funcss="full-width section"
/>
</>
)
}
```
<p>
<h2>Documentaion</h2>
<div>Check our <a href="https://funui.netlify.app"> Documentation </a> for more examples and explanation</div>
<p>
<ul>
<li><a href="https://funui.netlify.app"> Documentation </a></li>
<li><a href="https://funui.netlify.app/gettingstarted"> Installing </a></li>
<li><a href="https://funui.netlify.app/components"> Components </a></li>
<li><a href="https://funui.netlify.app/darkmode"> Dark Mode </a></li>
<li><a href="https://funui.netlify.app/icons"> Icons </a></li>
<li><a href="https://funui.netlify.app/notifications"> Notifications </a></li>
</ul>
</p>
</p>

<p>
<h2>License</h2>
<div> The project is licensed under the terms of  <a href="https://github.com/FunUi-io/FunUi/blob/main/LICENSE.txt"> MIT </a> 
</p>