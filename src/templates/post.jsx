import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Link from "gatsby-link";
import kebabCase from "lodash/kebabCase";
import UserInfo from "../components/Accessories/UserInfo/UserInfo";
import Disqus from "../components/Accessories/Disqus/Disqus";
import PostTags from "../components/Posts/PostTags/PostTags";
import SocialLinks from "../components/Accessories/SocialLinks/SocialLinks";
import SEO from "../components/Accessories/SEO/SEO";
import config from "../../data/SiteConfig";
import TopNavigation from "../components/Layout/Navigation/Navigation";

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.wordpressPost;
    if (!postNode.id) {
      postNode.id = slug;
    }
    if (!postNode.category_id) {
      postNode.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${postNode.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <PostContainer>
          <h1>{postNode.title} </h1>
          <MetaSection>
            <img src={postNode.author.avatar_urls.wordpress_96} />
            <div className="info">
              <h4>by {postNode.author.name}</h4>
              <h5>
                {postNode.date} in
                <Link
                  className="cat-link"
                  to={`categories/${kebabCase(postNode.categories[0].name)}`}
                >
                  {postNode.categories[0].name}{" "}
                </Link>
              </h5>
            </div>
          </MetaSection>

          <div dangerouslySetInnerHTML={{ __html: postNode.content }} />
          <div className="tags">
            <h4> More Like This: </h4>
            <PostTags tags={postNode.tags || []} />
          </div>
          <Divider />
          <div className="post-meta">
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          <Disqus postNode={postNode} />
        </PostContainer>
      </div>
    );
  }
}

const PostContainer = styled.div`
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

const Divider = styled.div`
  border-bottom: 1px solid black;
  margin: 30px;
`;

const MetaSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  img {
    width: 96px;
    height: 96px;
  }
  .cat-link {
    font-size: 2rem;
    margin-left: 2px;
  }
`;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query PostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      featured_media {
        source_url
      }
      author {
        name
        avatar_urls {
          wordpress_24
          wordpress_48
          wordpress_96
        }
      }
      date
      slug
      title
      modified
      excerpt
      id
      categories {
        name
      }
      tags {
        name
      }
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
