import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(err) {
    if (err) {
      console.log('ErrorBoundary', err);
      this.setState({
        hasError: true,
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    if (error) {
      console.log('ErrorBoundary errorInfo', errorInfo);
      console.log('ErrorBoundary error', error);
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.hasError && alert('Error')}
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
