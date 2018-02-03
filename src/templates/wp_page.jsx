import React, { Component } from 'react'
import TopNavigation from '../components/Layout/Navigation/Navigation'

class wpPage extends Component {
  render() {
    const pageNode = {
      title: this.props.data.wordpressPage.title,
      content: this.props.data.wordpressPage.content,
      id: this.props.data.wordpressPage.id,
      slug: this.props.data.wordpressPage.slug
    }

    console.log(pageNode)

    return (
      <div>
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <h1>{pageNode.title}</h1>
        <main>
          <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
        </main>
      </div>
    )
  }
}

export default wpPage

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query WordpressPage($slug: String) {
    wordpressPage(slug: { eq: $slug }) {
      id
      wordpress_id
      slug
      title
      template
      content
    }
    allWordpressPage {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
  }
`
