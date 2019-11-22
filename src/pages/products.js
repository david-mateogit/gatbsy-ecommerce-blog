import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../components/layout';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
    netlifyIdentity.on('login', user => this.getProducts(user));
    netlifyIdentity.on('logout', () => this.getProducts());
  }

  getProducts = () => {
    const allProducts = this.props.data.allContentfulProduct.edges;
    const products =
      netlifyIdentity.currentUser() !== null
        ? allProducts
        : allProducts.filter(({ node: product }) => !product.private);

    this.setState({ products });
  };

  render() {
    const { products } = this.state;

    return (
      <Layout>
        <div>
          <h2>Products</h2>
          {products.map(({ node: product }) => (
            <div key={product.id} style={{ marginBottom: '2rem' }}>
              <Link
                to={`/products/${product.slug}`}
                style={{ textDecoration: 'none', color: '#551a8b' }}
              >
                <h3>
                  {product.name} ·{' '}
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      color: '#f60',
                    }}
                  >
                    ${product.price}
                  </span>
                </h3>
              </Link>
              <Img style={{ maxWidth: 200 }} fluid={product.image.fluid} />
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          name
          price
          private
          slug
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export default Products;
