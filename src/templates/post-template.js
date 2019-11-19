import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const Template = ({ data: post }) => (
  <Layout>
    <h1>{post.markdownRemark.frontmatter.title}</h1>
    <h6>
      {post.markdownRemark.timeToRead}{' '}
      {post.markdownRemark.timeToRead > 1 ? 'minutes' : 'minute'} {}
    </h6>
    <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
