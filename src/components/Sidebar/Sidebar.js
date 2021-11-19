import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Link, useLocation} from 'react-router-dom';
import Paragraph from '../Paragraph';
import useLogIn from '../../hooks/useLogIn';
import {STAKING_PAGE} from '../../config';

const Sidebar = (props) => {
    const location = useLocation();
    const {pathname} = location;
    const {logIn} = useLogIn();

    return (
        <Menu {...props}>
            <a target="_blank" href="https://ambrosus.io/">
                <Paragraph
                    style={{
                        color: pathname === STAKING_PAGE ? '#4A38AE' : '#FFFFFF',
                    }}
                    size="xs-500"
                >
                    Main
                </Paragraph>
            </a>
            <a target="_blank" href="https://explorer.ambrosus.io/">
                <Paragraph size="xs-500">Explorer</Paragraph>
            </a>
            <Link to="/staking" onClick={logIn}>
                <Paragraph
                    style={{
                        color: pathname === STAKING_PAGE ? '#4A38AE' : '#9198BB',
                    }}
                    size="xs-500"
                >
                    Staking
                </Paragraph>
            </Link>
            <a href="https://amb.to/" target="_blank">
                <Paragraph size="xs-500">amb.to</Paragraph>
            </a>
    </Menu>
  );
};
export default Sidebar;
