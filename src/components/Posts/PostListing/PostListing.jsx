import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.slug,
        cover: postEdge.node.cover,
        title: postEdge.node.title,
        date: postEdge.node.date,
        excerpt: postEdge.node.excerpt,
        mainCategory: postEdge.node.categories[0].name,
        project: postEdge.node.project,
        featuredImageUrl:
          postEdge.node.featured_media !== null
            ? postEdge.node.featured_media.source_url
            : "",
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
          <PostListContainer>
            <Link className="post-link" to={`/${post.path}`} key={post.title}>
              {post.featuredImageUrl !== "" ? (
                <img
                  className="featured-image"
                  src={post.featuredImageUrl}
                  alt=""
                />
              ) : (
                <div />
              )}
              <h3>{post.title}</h3>
              <h5>
                {post.date} in {post.mainCategory} by {post.authorName}
              </h5>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            </Link>
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
