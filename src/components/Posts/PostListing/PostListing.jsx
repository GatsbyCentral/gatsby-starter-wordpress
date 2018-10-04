import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";
import "./PostListing.css";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.slug,
        cover: postEdge.node.cover,
        title: postEdge.node.title,
        date: postEdge.node.date,
        excerpt: postEdge.node.excerpt,
        mainCategory: postEdge.node.categories[0].name,
        project: postEdge.node.project,
        featured_media: postEdge.node.featured_media,
        authorName: postEdge.node.author.name,
        authorAvatarUrl: postEdge.node.author.avatar_urls.wordpress_96
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <PostListContainer key={post.id}>
            <Link className="post-link" to={`/${post.path}`} key={post.title}>
              {post.featured_media ? (
                <Img
                  resolutions={
                    post.featured_media.localFile.childImageSharp.resolutions
                  }
                />
              ) : (
                <div />
              )}
              <h3>{post.title}</h3>
              <h5>
                {post.date} in {post.mainCategory} by {post.authorName}
              </h5>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </PostListContainer>
        ))}
      </div>
    );
  }
}

const PostListContainer = styled.div`
  margin: 50px 0;
  h3 {
    position: relative;
  }
  h3:before {
    content: "";
    width: 50px;
    background-color: #9d7cbf;
    height: 6px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .featured-image {
    width: 600px;
    height: 200px;
    object-fit: cover;
  }

  .post-link {
    background: none !important;
    padding: 0 !important;
  }
`;

export default PostListing;
