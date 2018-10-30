import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { posts } = this.props

    return (
      <div>
        {posts.map(({ node: post }) => (
          <div
            className="content"
            style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
            key={post.id}
          >
            <p>
              <Link className="has-text-primary" to={post.slug}>
                {post.title}
              </Link>
              <span> &bull; </span>
              <small>{post.date}</small>
            </p>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                }}
              />
              <Link className="button is-small" to={post.slug}>
                Keep Reading →
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
