import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

const Blog = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext;
  const contentful = data.allContentfulBlogPost;

  const nextPage = `/blog/${String(currentPage + 1)}`;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`;
  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1px solid' }}>
          Gatsby Personal Blog
        </h1>
        <h4>{contentful.totalCount} Posts</h4>

        {contentful.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              <Link to={`/posts/${node.slug}`}>{node.title} </Link>
              <span style={{ color: '#bbb', fontSize: '16px' }}>
                - {node.createdAt}
              </span>{' '}
            </h3>
            <p>{node.body.childMarkdownRemark.excerpt}</p>
          </div>
        ))}

        {/* Pagination links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 300,
            margin: '0 auto',
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Blog;

export const query = graphql`
  query($skip: Int!, $limit: Int) {
    allContentfulBlogPost(
      skip: $skip
      limit: $limit
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          body {
            body
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
          id
          slug
          title
          tags
          createdAt(formatString: "MMM Do, YYYY")
        }
      }
      totalCount
    }
  }
`;
