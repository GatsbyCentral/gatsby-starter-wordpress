const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
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
      let pages = result.data.allWordpressPage.edges
      // Only create pages for published content in production
      if (process.env.NODE_ENV === 'production') {
        pages = pages.filter(({ node }) => node.status === 'publish')
      }

      pages.forEach(({ node }) => {
        createPage({
          path: `/${node.slug}/`,
          component: pageTemplate,
          context: {
            id: node.id,
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
                status
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
      let posts = result.data.allWordpressPost.edges
      // Only create pages for published content in production
      if (process.env.NODE_ENV === 'production') {
        posts = posts.filter(({ node }) => node.status === 'publish')
      }
      // Iterate over the array of posts
      posts.forEach(({ node }) => {
        // Create the Gatsby page for this WordPress post
        createPage({
          path: `/${node.slug}/`,
          component: postTemplate,
          context: {
            id: node.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressCategory(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
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

      const categoriesTemplate = path.resolve(`./src/templates/category.js`)

      result.data.allWordpressCategory.edges.forEach(({ node }) => {
        createPage({
          path: `/categories/${node.slug}/`,
          component: categoriesTemplate,
          context: {
            name: node.name,
            slug: node.slug,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressTag(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
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

      const tagsTemplate = path.resolve(`./src/templates/tag.js`)

      result.data.allWordpressTag.edges.forEach(({ node }) => {
        createPage({
          path: `/tags/${node.slug}/`,
          component: tagsTemplate,
          context: {
            name: node.name,
            slug: node.slug,
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
