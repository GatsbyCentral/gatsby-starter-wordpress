<div align="center">
    <img src="static/logos/logo-1024.png" alt="Logo" width='100px' height='100px'/>
</div>

# Gatsby v2

This starter is for Gatsby v1, check out the [beta v2 starter](https://github.com/GatsbyCentral/gatsby-starter-wordpress/tree/v2).

# Gatsby WordPress Starter

A starter skeleton that leveraged the WordPress API for [Gatsby](https://github.com/gatsbyjs/gatsby/).

### [Demo](https://gatsby-starter-wordpress.netlify.com/)

## Features

* [WordPress plugin for Gatsby](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress)
* Configured to work with WordPress Advanced Custom Fields
* Auto generated Navigation for your Wordpress Pages
* Minimal UI and Styling -- highly customizable
* Styled Components

## Requirements

Your WordPress site must meet the following requirements:

* At least 1 post must have at least 1 tag
* At least 1 post must have a featured image

---

### Instructions:

Using this starter requires:

* A Wordpress acct.
* Configuring the gatsby-config.js file. You really only need to change BaseUrl, and hostingWPCOM if you're using WP.com rather than WP.org

```javascript
{
  resolve: 'gatsby-source-wordpress',
  options: {
    // The base url to your WP site.
    baseUrl: 'YOUR_WORDPRESS_URL',
    // WP.com sites set to true, WP.org set to false
    hostingWPCOM: false,
    // The protocol. This can be http or https.
    protocol: 'http',
    // Use 'Advanced Custom Fields' Wordpress plugin
    useACF: true,
    auth: {},
    // Set to true to debug endpoints on 'gatsby build'
    verboseOutput: false
  }
},
```

* Finally, you'll probably want to update the SiteConfig to match your info, because right now it has mine. 🤠
* Suggestions:
  * Use the Prism WP Plugin to pass code blocks down.
  * If you give an ACF to a single post, you must give it to EVERY post, or GraphQL gets confused.

## Credits

This starter was first created by [Eric Windmill](https://ericwindmill.com) and
is currently maintained by [GatsbyCentral](https://www.gatsbycentral.com).

[Ruben Harutyunyan](https://github.com/Vagr9K) did most of the hard work with
[Gatsby Advanced Starter](https://github.com/Vagr9K/gatsby-advanced-starter).
The rest of the credit is due to [Gatsby](https://github.com/gatsbyjs/gatsby/).

WARNING: Make sure to edit `static/robots.txt` to include your domain for the
sitemap!

### Upstream Features

These features are included from the [Gatsby Advanced
Starter](https://github.com/Vagr9K/gatsby-advanced-starter):

* Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
* Separate components for everything
* High configurability:
  * User information
  * User social profiles
  * Copyright information
  * More!
* Author segment
  * Name
  * Location
  * Description
  * Links
  * Follow Me button
* Posts in Markdown
  * Code syntax highlighting
  * Embed YouTube videos
  * Embed Tweets
* Tags
  * Separate page for posts under each tag
* Categories
  * Separate page for posts under each category
* Disqus support
  * Notifications about new disqus comments
* Google Analytics support
* NPM scripts for GitHub Pages deployment
* Social features
  * Twitter tweet button
  * Facebook share/share count
  * Reddit share/share count
  * Google+ share button
  * LinkedIn share button
  * Telegram share button
* SEO
  * Sitemap generation
  * robots.txt
  * General description tags
  * Schema.org JSONLD (Google Rich Snippets)
  * OpenGraph Tags (Facebook/Google+/Pinterest)
  * Twitter Tags (Twitter Cards)
* RSS feeds
* Loading progress for slow networks
* Offline support
* Web App Manifest support
* Development tools
  * ESLint for linting
  * Prettier for code style
  * Remark-Lint for linting Markdown
  * write-good for linting English prose
  * gh-pages for deploying to GitHub pages
  * CodeClimate configuration file and badge
