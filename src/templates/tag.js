import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

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
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query TagPage($slug: String!, $limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: { categories: { slug: { eq: $slug } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
