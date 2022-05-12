import React from 'react';
import Paragraph from '../../../../components/Paragraph';
import {CONNECT_TEXT, injected, walletconnect} from 'config';
import Modal from '../../../../components/Modal';
import {useModal, useLogIn} from 'hooks';
import ButtonGroup from '../../../../components/ButtonGroup';
import Button from '../../../../components/Button';
import {Header} from 'components/layouts/Header';

export default ({PData, connectBtn}) => {

    const {isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow} =
        useModal();
    const {logIn} = useLogIn();

    return (
        <>
            {' '}
            <Header/>
            <div className="home__top--info" id="home__top--info">
                <div className="back-figure1"/>
                <div className="back-figure2"/>
                <div className="info-text">
                    <Paragraph
                        size="xxxl-500"
                        style={{
                            paddingBottom: 10,
                            fontFamily: 'Halvar Breitschrift,sans-serif',
                        }}
                    >
                        {PData.title}
                    </Paragraph>
                    <Paragraph size="l-500-white">
                        {PData.subheading.slug1}
                        <span style={{color: '#1ACD8C', fontWeight: 600}}>
              {' '}
                            {PData.subheading.slug2}
            </span>{' '}
                        {PData.subheading.slug3}
                    </Paragraph>
                </div>
                <Button
                    buttonStyles={{
                        marginTop: 50,
                        background: '#212121',
                    }}
                    type="black"
                    onclick={toggleLogInMethodShow}
                >
                    <Paragraph style={{fontFamily: ' Neue Machina'}} size="m-500">
            <span
                style={{
                    paddingLeft: 5,
                    fontFamily: ' Neue Machina',
                    whiteSpace: 'nowrap',
                }}
            >
              {connectBtn.connect}
            </span>
                    </Paragraph>
                </Button>
                <Modal
                    isShowing={isLogInMethodShow}
                    hide={toggleLogInMethodShow}
                    modalStyles={{maxWidth: 500}}
                >
                    <ButtonGroup>
                        <Button
                            buttonStyles={{
                                background: '#212121',
                            }}
                            type="black"
                            onclick={() => logIn(injected)}
                        >
                            <Paragraph style={{fontFamily: ' Neue Machina'}} size="m-500">
                <span
                    style={{
                        paddingLeft: 5,
                        fontFamily: ' Neue Machina',
                        whiteSpace: 'nowrap',
                    }}
                >
                                  {connectBtn.metamask}
                </span>
                            </Paragraph>
                        </Button>
                        <Button
                            buttonStyles={{
                                background: '#212121',
                            }}
                            type="black"
                            onclick={() => logIn(walletconnect)}
                        >
                            <Paragraph style={{fontFamily: ' Neue Machina'}} size="m-500">
                <span
                    style={{
                        paddingLeft: 5,
                        fontFamily: ' Neue Machina',
                        whiteSpace: 'nowrap',
                    }}
                >
                                                    {connectBtn.walletconnect}
                </span>
                            </Paragraph>
                        </Button>
                    </ButtonGroup>
                </Modal>
            </div>
        </>
    );
};
