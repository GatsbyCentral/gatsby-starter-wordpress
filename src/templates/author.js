import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

const Author = props => {
  const { data, pageContext } = props
  const { name } = pageContext
  const { edges: posts, totalCount } = data.allWordpressPost
  const { title: siteTitle } = data.site.siteMetadata
  const title = `${totalCount} post${totalCount === 1 ? '' : 's'} by ${name}`

  return (
    <Layout>
      <Helmet title={`${name} | ${siteTitle}`} />
      <PostList posts={posts} title={title} />
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($slug: String!, $limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: { author: { slug: { eq: $slug } } }
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
