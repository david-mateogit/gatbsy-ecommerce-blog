const path = require('path');

const PostTemplate = path.resolve('./src/templates/post-template.js');
const BlogTemplate = path.resolve('./src/templates/blog-template.js');
const ProductTemplate = path.resolve('./src/templates/product-template.js');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }

      allContentfulBlogPost {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `);

  const contentfulPost = result.data.allContentfulBlogPost.edges;
  contentfulPost.forEach(({ node: post }) => {
    createPage({
      path: `posts/${post.slug}`,
      component: PostTemplate,
      context: {
        slug: post.slug,
        id: post.id,
      },
    });
  });

  const postsPerPage = 2;
  const totalPages = Math.ceil(contentfulPost.length / postsPerPage);

  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1;
    const isFirstPage = index === 0;
    const isLastPage = currentPage === totalPages;

    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    });
  });

  const products = result.data.allContentfulProduct.edges;
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug,
      },
    });
  });
};
