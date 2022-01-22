import React from 'react';
import ChatFoldersList from './sections/navigation-menu/chat-folders';
import ChatListBar from './sections/navigation-menu/chat-list-bar';
import chatStore, { ChatStoreState } from './chat-store';
import { connect, Provider } from 'react-redux';
import './messengerWindow.scss';
import HamburgerMenu from './sections/navigation-menu/hamburger-menu/menu';
import {Resizable} from 're-resizable';
import { ChatSection } from './sections/chat/chat-section';
import NavAnimation from '../ui/elements/nav-animation';
import { ThemeStoreState } from '../ui/themes/theme';

/**
 * Renders the messenger screen
 */
export const MessengerWindow= (connect<{rtl:boolean}, unknown, Record<string,never>, ThemeStoreState>(({rtl})=>({rtl})) (function MessengerWindow ({rtl}) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [useSingleLayout, setUseSingleLayout] = React.useState(false);
    const ref= React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    React.useEffect(()=> {
        function check() {
            const wid= ref.current?.clientWidth || Infinity;
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
                            <Resizable defaultSize={{width: 260} as any} minWidth={260}
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
}) as unknown as React.FunctionComponent<Record<string, never>>);

type SingleLevelProps= {
    setIsMenuOpen: (isOpen:boolean)=> void;
}

const SingleLevel=(connect<{selectedChat: number}, unknown, SingleLevelProps, ChatStoreState>(({selectedChat})=>({selectedChat}))(
    function SingleLevel({selectedChat, setIsMenuOpen}: SingleLevelProps & {selectedChat: number}) {
        return (
            <NavAnimation mode="slide-over" state={selectedChat==-1? 'closing' : 'open'}
                innerScreen={(
                    <div id="chat-container">
                        <ChatSection singleColumnLayout/>
                    </div>)
                }>
                <ChatListBar onHamburgerMenuOpened={()=> setIsMenuOpen(true)}/>
            </NavAnimation>
        );
    }
)) as unknown as React.ComponentType<SingleLevelProps>;