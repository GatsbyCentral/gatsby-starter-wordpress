import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const AuthorTemplate = ({ name, description, posts }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                Posts by {name}
              </h2>
              <p className="content">{description}</p>
              {posts &&
                posts.map(post => (
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
                          __html: post.excerpt.replace(
                            /<p class="link-more.*/,
                            ''
                          ),
                        }}
                      />
                      <Link className="button is-small" to={post.slug}>
                        Keep Reading →
                      </Link>
                    </div>
                  </div>
                ))}
              {!posts && (
                <p className="content">
                  This author has not posted any content.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AuthorTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
}

const Author = ({ data }) => {
  const { wordpressWpUsers: author } = data

  return (
    <Layout>
      <AuthorTemplate
        name={author.name}
        description={author.description}
        posts={author.authored_wordpress__POST}
      />
    </Layout>
  )
}

Author.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Author

export const authorQuery = graphql`
  query AuthorById($id: String!) {
    wordpressWpUsers(id: { eq: $id }) {
      name
      description
      authored_wordpress__POST {
        id
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`
