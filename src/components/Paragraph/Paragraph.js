import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Paragraph = ({size, className, children, ...props}) => (
    <p
        className={cx(className, {
            'xxxl-500': size === 'xxxl-500',
            'xxl-500': size === 'xxl-500',
            'xl-400': size === 'xl-400',
            'l-400': size === 'l-400',
            'l-500': size === 'l-500',
            'l-500-white': size === 'l-500-white',
            'l-700': size === 'l-700',
            'm-500': size === 'm-500',
            'm-400': size === 'm-400',
            'xs-400': size === 'xs-400',
            'xs-500': size === 'xs-500',
            's-400': size === 's-400',
            's-500': size === 's-500',
        })}
        {...props}
    >
        {children}
    </p>
);

Paragraph.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default Paragraph;
