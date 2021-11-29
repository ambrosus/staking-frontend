import React from 'react';
import PropTypes from 'prop-types';
import NotSupported from '../NotSupported';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (error) {
      this.setState({
        hasError: true,
      });
    }
    console.log(error, errorInfo);
  }

  render() {
    return (
      <>
        {this.state.hasError && (
          <NotSupported>
            Network connection failed. Please try again later
          </NotSupported>
        )}
        {this.props.children}
      </>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default ErrorBoundary;
