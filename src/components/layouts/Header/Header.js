import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import {useHistory} from "react-router";
import PropTypes from "prop-types";
import Logo from "../../../assets/svg/header-logo.svg";
import {MobileMenu} from "./MobileMenu";
import LogoutIcon from "../../../assets/svg/logout.svg";
import {useMedia} from "../../../hooks";
import {ReactSVG} from "react-svg";
import greenLightIcon from "assets/svg/green-light-icon.svg";
import Paragraph from "components/Paragraph";
import {ReactComponent as MetamaskIcon} from "../../../assets/svg/metamask-menu-icon.svg";
import {ethereum, MAIN_PAGE} from "config";
import {changeNetwork} from "utils/helpers";
import {useSinglePrismicDocument} from "@prismicio/react";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <HeaderLayout
                {...{
                    toggleMenu,
                    isOpen,
                }}
            />
            <MobileMenu
                {...{
                    isOpen,
                    toggleMenu,
                }}
            />
        </>
    );
};

const HeaderLayout = ({
                          isOpen = false,
                          toggleMenu = () => {
                          },
                      }) => {
    const {account, deactivate} = useWeb3React();
    const isSmall = useMedia("(max-width: 899px)");
    const history = useHistory();
    const location = useLocation();
    const [isMainPage, setIsMainPage] = useState(location.pathname !== "/");
    const [headerDoc] = useSinglePrismicDocument("header-type");
    const data = headerDoc?.data && [
        {
            type: "submenu",
            name: headerDoc?.data.first_submenu_name,
            data: [
                {
                    name: headerDoc?.data.first_submenu_items[0].name[0].text,
                    link: headerDoc?.data.first_submenu_items[0].link.url
                },
                {
                    name: headerDoc?.data.first_submenu_items[1].name[0].text,
                    link: headerDoc?.data.first_submenu_items[1].link.url
                },
                {
                    name: headerDoc?.data.first_submenu_items[2].name[0].text,
                    link: headerDoc?.data.first_submenu_items[2].link.url
                },
            ],
        },
        {
            type: "submenu",
            name: headerDoc?.data.second_item_name,
            data: [

                {
                    name: headerDoc?.data.second_submenu_items[0].name[0].text,
                    link: headerDoc?.data.second_submenu_items[0].link.url
                },
                {
                    name: headerDoc?.data.second_submenu_items[1].name[0].text,
                    link: headerDoc?.data.second_submenu_items[1].link.url
                },
            ],
        },
        {
            type: "submenu",
            name: headerDoc?.data.third_submenu_name,
            data: [
                {
                    name: headerDoc?.data.third_submenu_items[0].name[0].text,
                    link: headerDoc?.data.third_submenu_items[0].link.url
                },
                {
                    name: headerDoc?.data.third_submenu_items[1].name[0].text,
                    link: headerDoc?.data.third_submenu_items[1].link.url
                },
            ],
        },
        {
            type: "link",
            name: headerDoc?.data.fourth_item_name,
            link: headerDoc?.data.fourth_item_link.url
        },
        {
            type: "submenu",
            name: headerDoc?.data.fifth_submenu_name,
            data: [
                {
                    name: headerDoc?.data.fifth_submenu_items[0].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[0].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[1].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[1].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[2].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[2].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[3].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[3].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[4].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[4].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[5].name[0].text,
                    link: headerDoc?.data.fifth_submenu_items[5].link.url
                },
                {
                    name: headerDoc?.data.fifth_submenu_items[6].name[0].text,
                    link:'#'
                },
            ],
        },
    ];
    useEffect(() => {
        if (location.pathname !== "/") {
            setIsMainPage(location.pathname !== "/");
        }
    }, [history, location.pathname]);

    const logout = () => {
        history.push("/");
        deactivate();
    };

    return (
        <header className="header">
            <div className="header-container header__content">
                <Link to="/" className="header__logo-wrapper">
                    <img src={Logo} alt="logo" className="header__logo"/>
                </Link>
                {!isMainPage  && data !== undefined &&
                data.map((menuItem,i) => {
                    if (menuItem.type === "submenu") {
                        return (
                            <div key={menuItem.link + menuItem.name + i}>
                                <Submenu name={menuItem.name} data={menuItem.data}/>
                            </div>
                        );
                    }
                    if (menuItem.type === "link") {
                        return (
                            <a
                                key={menuItem.link + menuItem.name + i}
                                href={menuItem.link}
                                className="header__link"
                            >
                                {menuItem.name}
                            </a>
                        );
                    }
                    return null;
                })}

                {account
                    ? !isSmall &&
                    isMainPage && (
                        <>
                            <div className="wallet-connect">
                                {account && <ReactSVG src={greenLightIcon} wrapper="span"/>}
                                {account && (
                                    <Paragraph size="xs-400">
                                        {account
                                            ? ` ${account.substr(0, 9)}...${account.slice(32)}`
                                            : "..."}
                                    </Paragraph>
                                )}
                            </div>

                            <button type="button" onClick={logout} className="logout">
                                <img
                                    src={LogoutIcon}
                                    alt="wallet icon"
                                    className="logout__icon"
                                />
                                <span className="logout__text">LOG OUT</span>
                            </button>
                        </>
                    )
                    : null}

                <div
                    role="presentation"
                    className={`burger-icon ${isOpen ? "burger-icon_open" : ""}`}
                    onClick={toggleMenu}
                >
                    <span className="burger-icon__first-line burger-icon__line"/>
                    <span className="burger-icon__second-line burger-icon__line"/>
                    <span className="burger-icon__third-line burger-icon__line"/>
                </div>
            </div>
        </header>
    );
};

HeaderLayout.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isOpen: PropTypes.bool,
    toggleMenu: PropTypes.func,
};

const Submenu = ({name = "", data = [{}]}) => (
    <div className="submenu">
        <p className="submenu__name">
            {name}
            <svg viewBox="0 0 15 8" className="submenu__arrow" fill="none">
                <path
                    d="M14.2031 1L7.53644 7L0.869791 0.999999"
                    stroke="currentColor"
                />
            </svg>
        </p>
        <div
            className="submenu__items"
            style={{
                "--items-amount": name === "Use AMB" ? data.length + 2 : data.length,
                right: name === "Use AMB" ? 0 : "auto",
                left: name === "Use AMB" ? "auto" : "-1rem",
            }}
        >
            {name === "Use AMB" && ethereum && (
                <button
                    type="button"
                    className="connect-metamask-btn submenu__item"
                    onClick={() => changeNetwork()}
                >
                    <div>
                        <MetamaskIcon/>
                    </div>
                    <p>Add Ambrosus Network to Metamask</p>
                </button>
            )}

            {data.map(({name: itemName, link}) => (
                <a href={link} key={link + itemName} className="submenu__item">
                    {itemName}
                </a>
            ))}
        </div>
    </div>
);

Submenu.propTypes = {
    name: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
};

