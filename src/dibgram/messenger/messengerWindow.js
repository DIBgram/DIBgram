import React from 'react';
import PropTypes from 'prop-types';
import ChatFoldersList from './sections/navigation-menu/chat-folders';
import ChatListBar from './sections/navigation-menu/chat-list-bar';
import chatStore from './chat-store';
import { connect, Provider } from 'react-redux';
import './messengerWindow.scss';
import HamburgerMenu from './sections/navigation-menu/hamburger-menu/menu';
import {Resizable} from 're-resizable';
import { ChatSection } from './sections/chat/chat-section';
import NavAnimation from '../ui/elements/nav-animation';

/**
 * Renders the messenger screen
 */
export const MessengerWindow= connect(({rtl})=>({rtl})) (function MessengerWindow ({rtl}) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [useSingleLayout, setUseSingleLayout] = React.useState(false);
    const ref= React.useRef();
    React.useEffect(()=> {
        function check() {
            const wid= ref.current?.clientWidth;
            setUseSingleLayout(wid < (380 + 260));
        }
        window.addEventListener('resize', check);
        check();
    }, []);

    return (
        <div id="messenger-screen" className={useSingleLayout? 'single-column' : ''}>
            <Provider store={chatStore}>
                <HamburgerMenu visible={isMenuOpen} onClose={()=> setIsMenuOpen(false)}/>
                <ChatFoldersList onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
                <div className="responsive-container" ref={ref}>
                    <div>
                        {useSingleLayout? (
                            <SingleLevel setIsMenuOpen={setIsMenuOpen}/>
                        ):(<>
                            <Resizable defaultSize={{width: 260}} minWidth={260}
                                className="chat-list-bar-container" handleClasses={{right: 'chat-list-bar-resize-handle', left: 'chat-list-bar-resize-handle'}}
                                enable={{top: false, right: !rtl, bottom: false, left: rtl, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false}}>
                                <ChatListBar onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
                            </Resizable>
                            <div id="chat-container">
                                <ChatSection/>
                            </div>
                        </>)}
                    </div>
                </div>
            </Provider>
        </div>
    );
});

const SingleLevel=connect(({selectedChat})=>({selectedChat}))(
    function SingleLevel({selectedChat, setIsMenuOpen}) {
        return (
            <NavAnimation mode="slide-over" state={selectedChat==-1? 'closing' : 'open'}
                innerScreen={<ChatSection singleColumnLayout/>}>
                <ChatListBar onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
            </NavAnimation>
        );
    }
);
SingleLevel.propTypes= {
    setIsMenuOpen: PropTypes.func
};