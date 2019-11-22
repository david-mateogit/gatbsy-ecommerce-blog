import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import gatsbyLogo from '../images/gatsby-icon.png';

const isActive = ({ isCurrent }) => ({
  className: isCurrent ? 'active' : 'navlink',
});

const NavLink = props => <Link getProps={isActive} {...props} />;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      total: 0,
    };
  }

  componentDidMount() {
    if (window.Snipcart) {
      const count = window.Snipcart.api.items.count();

      const cart = window.Snipcart.api.cart.get();
      if (cart) this.updateTotal(count, cart.total);

      window.Snipcart.subscribe('cart.closed', () => {
        const count = window.Snipcart.api.items.count();
        const cart = window.Snipcart.api.cart.get();
        if (cart) this.updateTotal(count, cart.total);
      });

      window.Snipcart.subscribe('cart.ready', data => {
        const count = window.Snipcart.api.items.count();
        const cart = window.Snipcart.api.cart.get();
        if (cart) this.updateTotal(count, cart.total);
      });
    }
  }

  updateTotal = (qty, total) => {
    this.setState({ items: qty, total });
  };

  render() {
    const { siteTitle } = this.props;
    return (
      <>
        <header
          style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: `0 auto`,
              maxWidth: 960,
              padding: `1.45rem 1.0875rem`,
            }}
          >
            {/* Title / Logo */}
            <span style={{ display: 'flex', alignItems: 'center' }}>
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

              <h1 style={{ margin: '0' }}>
                <NavLink to="/">{siteTitle}</NavLink>
              </h1>
            </span>

            <NavLink to="/blog">Blog</NavLink>

            <NavLink to="/products">Store</NavLink>

            {/* Shopping cart summary */}
            <div
              style={{ color: 'white', cursor: 'pointer' }}
              className="snipcart-summary snipcart-checkout"
            >
              <div>
                <strong>My Cart</strong>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }} /> {this.state.items} Items
                in Cart
              </div>
              <div>
                Total Price: <span style={{ fontWeight: 'bold' }} />{' '}
                {this.state.total}
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
