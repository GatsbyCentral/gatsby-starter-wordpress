<div align="center">
    <img src="static/logos/logo-1024.png" alt="Logo" width='100px' height='100px'/>
</div>

# Gatsby WordPress Starter

A starter skeleton that leveraged the WordPress API for [Gatsby](https://github.com/gatsbyjs/gatsby/).

#### This Project was forked from [Gatsby Advanced Starter](https://github.com/Vagr9K/gatsby-advanced-starter)

### [Demo](https://gatsby-wordpress-starter.netlify.com/)

## Features

<div align="center">
    <img src="http://res.cloudinary.com/ericwindmill/image/upload/v1517695916/Screen_Shot_2018-02-03_at_2.09.53_PM_ja7idb.png" alt="Logo" width='800px' />
</div>

### New Features

* [WordPress plugin for Gatsby](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress)
* Configured to work with WordPress Advanced Custom Fields
* Auto generated Navigation for your Wordpress Pages
* Minimal UI and Styling -- highly customizable
* Styled Components

### Plus these features from [Gatsby Advanced Starter](https://github.com/Vagr9K/gatsby-advanced-starter),

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

---

<div align="center">
    <img src="http://res.cloudinary.com/ericwindmill/image/upload/v1517695916/Screen_Shot_2018-02-03_at_2.10.06_PM_lbntvz.png" alt="Logo" width='800px' />
</div>

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

* Update GraphQL queries to match your WordPress Content. This is the query currently on the index page. You either need to add ACF's in your WordPress to match the query (in this case Project and Date), or you need to remove those aspects of the query. The featured_media isn't a problem -- it'll work even if you have posts without featured images.

```javascript
allWordpressPost {
      edges {
        node {
          featured_media {
            source_url
          }
          author {
            name
            avatar_urls {
              wordpress_24
              wordpress_48
              wordpress_96
            }
          }
          date
          slug
          title
          modified
          excerpt
          id
          acf {
            project
            date
          }
          categories {
            name
          }
          tags {
            name
          }
          content
        }
      }
    }
```

* Finally, you'll probably want to update the SiteConfig to match your info, becuase right now it has mine. 🤠
* Suggestions:
  * Use the Prism WP Plugin to pass code blocks down.
  * If you give an ACF to a single post, you must give it to EVERY post, or GraphQL gets confused.

### Notes

[Ruben Harutyunyan](https://github.com/Vagr9K) did most of the hard work with [Gatsby Advanced Starter](https://github.com/Vagr9K/gatsby-advanced-starter).
The rest of the credit is due to [Gatsby](https://github.com/gatsbyjs/gatsby/).

WARNING: Make sure to edit `static/robots.txt` to include your domain for the sitemap!
