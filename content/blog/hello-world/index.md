---
title: Top Navbar for Gatsby
date: "2020-02-26"
description: "Hello World. It's a sunny day!"
featuredImage: hello-world/salty_egg.jpg
---

My first post on my new blog :confetti_ball::congratulations:  

This blog is initialized with [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/).  
Do you like the navigation bar at the top of this page?  
In this post, I introduce how to make a title bar with a background image and navigation menu.

The default blog should look like [this](https://templates.netlify.com/template/gatsby-starter-blog/).

![](2020-02-26-12-30-40.png)

Too simple? Let's beautify it :fire::fire:  

First, install [gatsby-background-image](https://www.gatsbyjs.org/packages/gatsby-background-image/) and declare it in `gatsby-config.js` as described in the document.

```bash
npm install --save gatsby-background-image
```

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    ...
    {
      resolve: 'gatsby-background-image',
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
      },
    },
    ...
   ],
};
```