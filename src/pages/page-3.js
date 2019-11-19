import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const getImageData = graphql`
  {
    allFile {
      edges {
        node {
          id
          relativePath
          size
          extension
          absolutePath
          birthTime(formatString: "MMM Do, YYYY")
        }
      }
    }
  }
`;

const ThirdPage = () => {
  const { allFile } = useStaticQuery(getImageData);
  return (
    <Layout>
      <SEO title="Page three" />
      <h1>Hello from Page 3</h1>
      <h3>Image File Data</h3>
      <table>
        <thead>
          <tr>
            <th>Relative Path</th>
            <th>Size of Image</th>
            <th>Extension</th>
            <th>Birthtime</th>
          </tr>
        </thead>
        <tbody>
          {allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.relativePath}</td>
              <td>{node.size} bytes</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Image Extension: {allFile.edges[0].node.extension}</p>
      <Link to="/">Go back to the homepage</Link>
      <br />
      <Link to="/page-2">Go back to the page 2</Link>
    </Layout>
  );
};
export default ThirdPage;
