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
    const [headerDoc] = useSinglePrismicDocument("header-type");
    const HEADER_DATA = headerDoc && [
        {
            type: "submenu",
            name: headerDoc.data.name1[0].text,
            data: [
                {
                  name: headerDoc.data.company[0].text,
                    link: headerDoc.data.company_link.url,
                },
                {
                  name: headerDoc.data.team[0].text,
                    link: headerDoc.data.team_link.url,
                },
                {
                  name: headerDoc.data.roadmap[0].text,
                    link: headerDoc.data.roadmap_link.url,
                },
            ],
        },
        {
            type: "submenu",
            name: headerDoc.data.name2[0].text,
            data: [
                {
                  name: headerDoc.data.enterprise[0].text,
                    link: headerDoc.data.enterprise_link.url,
                },
                {
                  name: headerDoc.data.defi[0].text,
                    link: headerDoc.data.defi_link.url,
                },
            ],
        },
        {
            type: "submenu",
            name: headerDoc.data.name3[0].text,
            data: [
                {
                  name: headerDoc.data.get_involvedt[0].text,
                    link: headerDoc.data.get_involved_link.url,
                },
                {
                  name: headerDoc.data.forum_s[0].text,
                    link: headerDoc.data.forum_link.url,
                },
            ],
        },
        {
            type: "link",
            name: headerDoc.data.developers_s[0].text,
            link: headerDoc.data.developers_link.url,
        },
        {
            type: "submenu",
            name: headerDoc.data.name5[0].text,
            data: [
                {
                  name: headerDoc.data.use_amb_s[0].text,
                    link: headerDoc.data.use_amb.url,
                },
                {
                  name: headerDoc.data.wallet_s[0].text,
                    link: headerDoc.data.wallet.url,
                },
                {
                  name: headerDoc.data.staking_s[0].text,
                    link: headerDoc.data.staking.url,
                },
                {
                  name: headerDoc.data.network_explorer_s[0].text,
                    link: headerDoc.data.network_explorer.url,
                },
                {
                  name: headerDoc.data.amb_asset_exploer[0].text,
                    link: headerDoc.data.amb_to.url,
                },
                {
                  name: headerDoc.data.amb_money_s[0].text,
                    link: headerDoc.data.amb_money.url,
                },
                {
                  name: headerDoc.data.network_explorer_beta_s[0].text,
                    link: "#",
                },
            ],
        },
    ];
const addText = headerDoc && headerDoc.data.add_ambrosus[0].text;
const addTextMobile = headerDoc && headerDoc.data.add_ambrosus_mobile[0].text;
    return (
        <>
            <HeaderLayout
                {...{
                    toggleMenu,
                    isOpen,
                }}
                data={HEADER_DATA}
                addText={addText}
            />
            <MobileMenu
                {...{
                    isOpen,
                    toggleMenu,
                }}
                data={HEADER_DATA}
                addText={addTextMobile}
            />
        </>
    );
};

const HeaderLayout = ({
                          data = [{}],
                          isOpen = false,
                          toggleMenu = () => {
                          },
                          addText,
                      }) => {
    const {account, deactivate} = useWeb3React();
    const isSmall = useMedia("(max-width: 899px)");
    const history = useHistory();
    const location = useLocation();
    const [isMainPage, setIsMainPage] = useState(location.pathname !== "/");

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
                {!isMainPage &&
                data.map((menuItem) => {
                    if (menuItem.type === "submenu") {
                        return (
                            <div key={menuItem.link + menuItem.name}>
                                <Submenu addText={addText} name={menuItem.name} data={menuItem.data}/>
                            </div>
                        );
                    }
                    if (menuItem.type === "link") {
                        return (
                            <a
                                key={menuItem.link + menuItem.name}
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

const Submenu = ({name = "", data = [{}],addText}) => (
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
                    <p>{addText}</p>
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

