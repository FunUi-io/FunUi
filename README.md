# FunUi

<p align="center">
  <img src="https://funui.netlify.app/logo.png" width="80px" alt="FunUi Logo">
</p>

<h1 align="center">The React & Next.js UI Library</h1>

<p align="center">
  <em>A modern, modular, and responsive UI framework built for React and Next.js applications</em>
</p>

<p align="center">
  <a href="https://funui.netlify.app">🌐 Documentation</a> •
  <a href="https://funui.netlify.app/components">📦 Components</a> •
  <a href="https://funui.netlify.app/gettingstarted">🚀 Getting Started</a>
</p>

---

## ✨ Why Choose FunUi?

- **🧩 Modular Architecture** - Import only the components you need, keeping your bundle size optimized
- **📱 Responsive Design** - Built with flexbox for seamless adaptation across all screen sizes
- **⚡ Easy Integration** - Get started in minutes with simple installation and CSS import
- **🎨 Customizable** - Extensive theming options and utility classes for complete design control
- **⚛️ React Native** - Designed specifically for React and Next.js ecosystems

## 🚀 Quick Start

### Installation

Choose your preferred package manager:

**npm**
```bash
npm install funuicss
```

**yarn**
```bash
yarn add funuicss
```

**pnpm**
```bash
pnpm add funuicss
```

### Setup

Import the CSS file in your application's entry point (e.g., `_app.js`, `_app.jsx`, `index.js`):

```javascript
import 'funuicss/css/fun.css'
```

## 📚 Usage Examples

### Complete Login Form

Here's a comprehensive example showing multiple FunUi components working together:

```jsx
import React from 'react'
import { Text, Input, Button, Section } from 'funuicss'

export default function LoginForm() {
  return (
    <div className="central height-500-min">
      <div className="width-300-max fit">
        {/* Header Section */}
        <div className="margin-bottom-40">
          <Text
            text="Welcome"
            heading="h2"
            block
          />
          <Text
            text="Sign in to continue!"
            block
          />
        </div>

        {/* Email Field */}
        <Section gap={1.5}>
          <Text 
            text="Email" 
            funcss="margin-bottom-10" 
            block 
            size="small" 
            bold 
            color="primary"
          />
          <Input 
            type="email" 
            fullWidth 
            bordered 
          />
        </Section>

        {/* Password Field */}
        <Section gap={1}>
          <Text 
            text="Password" 
            funcss="margin-bottom-10" 
            block 
            size="small" 
            bold 
            color="primary"
          />
          <Input 
            type="password" 
            fullWidth 
            bordered 
          />
        </Section>

        {/* Forgot Password Link */}
        <div className="section">
          <Link href="/#">
            <Text 
              text="Forgot password!" 
              size="small" 
              underline 
              color="primary"
            />
          </Link>
        </div>

        {/* Submit Button */}
        <div className="section">
          <Button
            text="Let's go"
            raised
            fullWidth
            bg="primary800"
          />
        </div>
      </div>
    </div>
  )
}
```

### Button Components

Create beautiful buttons with various styles:

```jsx
import React from 'react'
import { Button } from 'funuicss'

export default function ButtonExamples() {
  return (
    <div>
      {/* Outlined Button */}
      <Button 
        bg="primary" 
        outlined 
        text="Outlined Button" 
      />
      
      {/* Raised Button */}
      <Button 
        bg="secondary" 
        raised 
        text="Raised Button" 
      />
      
      {/* Full Width Button */}
      <Button 
        bg="success" 
        fullWidth 
        text="Full Width Button" 
      />
    </div>
  )
}
```

### Input Components

Flexible input components for forms:

```jsx
import React from 'react'
import { Input } from 'funuicss'

export default function InputExamples() {
  return (
    <div>
      {/* Basic Input */}
      <Input 
        type="text" 
        label="Basic Input" 
        funcss="full-width"
      />
      
      {/* Bordered Input */}
      <Input 
        type="text" 
        bordered 
        label="Bordered Input" 
        funcss="full-width section"
      />
      
      {/* Email Input */}
      <Input 
        type="email" 
        bordered 
        label="Email Address" 
        funcss="full-width section"
        placeholder="Enter your email"
      />
    </div>
  )
}
```

## 📖 Documentation

Explore comprehensive guides and examples:

- **[📚 Full Documentation](https://funui.netlify.app)** - Complete API reference and guides
- **[🚀 Getting Started](https://funui.netlify.app/gettingstarted)** - Installation and setup instructions
- **[🧩 Components](https://funui.netlify.app/components)** - Browse all available components
- **[🎨 Theming](https://funui.netlify.app/theming)** - Customization and styling guide

## 🌟 Features

### Core Components
- **Button** - Various styles including outlined, raised, and full-width
- **Input** - Form inputs with labels, borders, and validation states  
- **Text** - Typography component with heading support
- **Section** - Layout component for spacing and organization

### Utility Classes
- Responsive layout utilities
- Spacing and margin controls
- Color and theme variants
- Flexbox positioning helpers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the [MIT License](https://github.com/FunUi-io/FunUi/blob/main/LICENSE.txt).

## 🔗 Links

- [Official Website](https://funui.netlify.app)
- [GitHub Repository](https://github.com/FunUi-io/FunUi)
- [NPM Package](https://www.npmjs.com/package/funuicss)

---

<p align="center">
  Made with ❤️ by the FunUi Team
</p>