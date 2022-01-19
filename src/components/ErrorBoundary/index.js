import React from 'react';
import PropTypes from 'prop-types';
import { debugLog } from 'utils/helpers';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
    if (this.state.hasError) {
      debugLog('Error :', error);
      debugLog('Error info:', errorInfo);
    }
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default ErrorBoundary;
