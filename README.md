# Gatsby v2 WordPress Starter

This starter is forked from the
[gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms)
and modified to use WordPress instead of netlify-cms, using the [gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress) plugin as the data connector.

Demo: https://gatsby-starter-wordpress.netlify.com/

## Use It Now

    gatsby new NAME https://github.com/GatsbyCentral/gatsby-starter-wordpress

* Edit `gatsby-config.js`, change `baseUrl`
  - Make sure you have at least 1 post and 1 page on your WordPress site
  - Make sure at least 1 post has at least 1 tag
* Ensure the permalink structure in your WordPress installation is set to `Post Name` instead of the deafult `Plain`, or else the `gatsby-source-wordpress` plugin won't be able to communicate with WordPress
* Rejoice
  - For more information on the source plugin, check out the [gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress) repository page
  - File any [issues here](https://github.com/GatsbyCentral/gatsby-starter-wordpress/issues)

### Known Limitations

* This is based on the [netlify starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms) which uses [bulma](https://bulma.io). This adds 150KB to every built page.
* Your WordPress site must have at least 1 post with 1 tag, or the starter will crash
* Nested pages / categories will not render with nested pages
  - A WordPress page like `/about/team/` will render on Gatsby as `/team/`
  - Likewise for categories
  - Discussion here https://github.com/GatsbyCentral/gatsby-starter-wordpress/issues/24

## CSS Processing

This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma build would otherwise be ~170K which adds 170K to each of your built HTML pages. However, with purgecss this is reduced 90%.

## WordPress Setup

Check the [gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress) plugin for more information. If you want to copy the demo content, you can grab the [WordPress XML export here](https://wpdemo.gatsbycentral.com/gatsbystarterwordpress.WordPress.2019-09-12.xml) and import it into your WordPress site as a starting point.

## Contributors

This starter was forked from the netlify starter by the
[GatsbyCentral](https://www.gatsbycentral.com/) crew. Additional contributions
were gratefully received from the following folks:

* https://github.com/tomByrer
* https://github.com/dajocarter
