import React, { Component } from "react";
import styled from "styled-components";
import TopNavigation from "../components/Layout/Navigation/Navigation";

class wpPage extends Component {
  render() {
    const pageNode = {
      title: this.props.data.wordpressPage.title,
      content: this.props.data.wordpressPage.content,
      id: this.props.data.wordpressPage.id,
      slug: this.props.data.wordpressPage.slug
    };

    return (
      <div>
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <Container>
          <h1>{pageNode.title}</h1>
          <main>
            <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
          </main>
        </Container>
      </div>
    );
  }
}

export default wpPage;

const Container = styled.div`
  max-width: 900px;
  margin: 100px auto;

  .tags {
    display: flex;
    flex-flow: row;
    margin-top: 50px;
    h4 {
      width: 200px;
    }
  }
`;

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
`;
