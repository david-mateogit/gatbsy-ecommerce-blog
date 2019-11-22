import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const ProductTemplate = ({ data: { contentfulProduct }, location }) => (
  <Layout>
    <div
      style={{
        marginLeft: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <h2>{contentfulProduct.name} </h2>
      <h6 style={{ color: '#ccc', fontSize: '1rem' }}>
        Added on {contentfulProduct.createdAt}
      </h6>
      <h4>${contentfulProduct.price}</h4>
      <p>{contentfulProduct.description}</p>
      <button
        style={{
          background: 'darkorange',
          color: 'white',
          padding: '0.3em',
          marginBottom: '0.5rem',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        type="button"
        className="snipcart-add-item"
        data-item-id={contentfulProduct.slug}
        data-item-price={contentfulProduct.price}
        data-item-image={contentfulProduct.image.file.url}
        data-item-name={contentfulProduct.name}
        data-item-url={location.pathname}
      >
        {console.log(contentfulProduct)}
        Add to Cart
      </button>
      <div style={{ maxWidth: `200px`, margin: '0 auto' }}>
        <Img
          style={{
            margin: '0 auto',
            maxWidth: 600,
          }}
          fluid={contentfulProduct.image.fluid}
        />
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      slug
      name
      price
      description
      createdAt(formatString: "MMM Do, YY")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`;

export default ProductTemplate;
