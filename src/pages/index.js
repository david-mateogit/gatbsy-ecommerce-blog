import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>Welcome to your new homepage.</p>
    <p>
      This is a multipurpose page showcasing some usecases like an e-commerce
      site, a blog or a portfolio. Content is delivered from the headless cms
      Contentful, where we can add products or blogposts and they are linked and
      create their own pages programatically. Hope you enjoy the site.
    </p>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/page-3">Go to the page 3</Link>
  </Layout>
);

export default IndexPage;
