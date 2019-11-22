import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const Template = ({ data: post }) => {
  console.log(post);
  return (
    <Layout>
      <h1>{post.contentfulBlogPost.title}</h1>
      <h6>
        {post.contentfulBlogPost.body.childMarkdownRemark.timeToRead}{' '}
        {post.contentfulBlogPost.body.childMarkdownRemark.timeToRead > 1
          ? 'minutes'
          : 'minute'}{' '}
        {}
      </h6>

      <div
        dangerouslySetInnerHTML={{
          __html: post.contentfulBlogPost.body.childMarkdownRemark.html,
        }}
      />

      <div>
        Back to
        <Link to="/blog">
          <h3 style={{ display: 'inline-block', paddingLeft: '4px' }}>
            {' '}
            Blog{' '}
          </h3>
        </Link>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      body {
        body
        childMarkdownRemark {
          html
          timeToRead
        }
      }
    }
  }
`;

export default Template;
