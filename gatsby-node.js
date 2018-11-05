const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const config = require('./gatsby-config.js')

// NOTE: In Gatsby Commit 2235bf9 normalisation of the base URL was added. This
// change adds support for base URLs including a protocol. In our processing of
// the base URL here, this is not supported. We might need to address this at
// some point.
// https://github.com/gatsbyjs/gatsby/commit/2235bf991d908c562fc7a6d2dccefc842599bc76

// Get the WordPress base URL from the config file
const wpConfigOptions = _.chain(config)
  .get('plugins')
  .find({
    resolve: 'gatsby-source-wordpress',
  })
  .get('options')
  .value()
const wpBaseUrl = `${_.get('baseUrl', wpConfigOptions)}://${_.get(
  'baseUrl',
  wpConfigOptions
)}`

/**
 * Create nested paths
 * e.g., /grandparent/parent/node-slug
 * and add to node
 */
exports.sourceNodes = ({ getNodes, actions }) => {
  const { createNodeField } = actions

  // Grag all page nodes
  const pageNodes = getNodes().filter(
    node => node.internal.type === 'wordpress__PAGE'
  )
  // Build each node's path
  pageNodes.forEach(node => {
    const nestedSlug = `/${node.link.replace(wpBaseUrl, '')}/`
    // Add full path to node -- available at node.fields.path
    createNodeField({
      node,
      name: `path`,
      value: nestedSlug,
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            fields {
              path
            }
            status
            template
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/page.js`)

      _.each(result.data.allWordpressPage.edges, edge => {
        createPage({
          path: edge.node.fields.path,
          component: pageTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                slug
                modified
                tags {
                  name
                  slug
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const postTemplate = path.resolve(`./src/templates/post.js`)

      // Build a list of categories and tags
      const categories = []
      const tags = []

      // Iterate over the array of posts
      _.each(result.data.allWordpressPost.edges, edge => {
        // Add this post's categories and tags to the global list
        _.each(edge.node.tags, tag => {
          tags.push(tag)
        })
        _.each(edge.node.categories, category => {
          categories.push(category)
        })

        // Create the Gatsby page for this WordPress post
        createPage({
          path: `/${edge.node.slug}/`,
          component: postTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      const tagsTemplate = path.resolve(`./src/templates/tag.js`)
      const categoriesTemplate = path.resolve(`./src/templates/category.js`)

      // Create a unique list of categories and tags
      const uniqueCategories = _.uniqBy(categories, 'slug')
      const uniqueTags = _.uniqBy(tags, 'slug')

      // For each category and tag, create a Gatsby page
      _.each(uniqueCategories, cat => {
        createPage({
          path: `/categories/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug,
          },
        })
      })
      _.each(uniqueTags, tag => {
        createPage({
          path: `/tags/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpUsers {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const authorTemplate = path.resolve(`./src/templates/author.js`)

      _.each(result.data.allWordpressWpUsers.edges, edge => {
        createPage({
          path: `/author/${edge.node.slug}`,
          component: authorTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
