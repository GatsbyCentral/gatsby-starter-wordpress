import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Tag = props => {
  const { data, pageContext } = props
  const { edges: posts, totalCount } = data.allWordpressPost
  const { title: siteTitle } = data.site.siteMetadata
  const { name: tag } = pageContext
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } with the tag ${tag}`

  return (
    <Layout>
      <Helmet title={`${tag} | ${siteTitle}`} />
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query TagPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
