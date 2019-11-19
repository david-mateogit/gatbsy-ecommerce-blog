import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import gatsbyLogo from '../images/gatsby-icon.png';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {/* Title / Logo */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <img
          src={gatsbyLogo}
          alt="Gatsby Garb Logo"
          style={{
            margin: '0 5px',
            border: '3px solid orange',
            borderRadius: '50%',
            width: '50px',
          }}
        />

        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <h3 style={{ margin: '0 0 0 20px' }}>
          <Link
            to="/blog"
            style={{
              color: `white`,
              textDecoration: `none`,
              justifySelf: 'flex-end',
            }}
          >
            Blog
          </Link>
        </h3>
      </span>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
