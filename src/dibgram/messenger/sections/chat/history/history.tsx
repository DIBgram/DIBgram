import React from 'react';
import './history.scss';
import ScrollView from '../../../../ui/scroll/scrollbar';
import { Message } from '../../../message/ui/message';
import { connect } from 'react-redux';
import { loadChatHistory } from '../../../message/chat-history';
import processMessageHistory from '../../../message/processHistory';
import TdLib from '../../../../TdWeb/tdlib';
import SponsoredMessage from '../../../message/ui/types/sponsored';
import './history-to-down.scss';
import IconButton from '../../../../ui/elements/icon-button';
import { history_to_down } from '../../../../ui/icon/icons';
import { MessageStoreAction, MessageStoreState } from '../../../message-store';
import { ChatSectionContentProps } from '../chat-section';
import { Dispatch } from 'redux';
import TdApi from '../../../../TdWeb/td_api';
import Scrollbars from 'react-custom-scrollbars-2';

export const ChatHistory= connect<MessageStoreState, unknown, ChatSectionContentProps, MessageStoreState>(({messages}) => ({messages})) (
    function ChatHistory({chat, messages, dispatch }: ChatSectionContentProps & MessageStoreState & {dispatch: Dispatch<MessageStoreAction>}) {
        
        const ref= React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
        const upperEndDetectorRef= React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
        const lowerEndDetectorRef= React.useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
        
        const array= Object.keys(messages).length ? processMessageHistory(messages) : [];
        
        const [sponsoredMessage, setSponsoredMessage]= React.useState<TdApi.td_sponsoredMessage|null>(null);

        const [observer, setObserver]= React.useState<IntersectionObserver|null>(null);
        const [currentlyLoading, setCurrentlyLoading]= React.useState(0);

        const [upperEndDetectorVisible, setUpperEndDetectorVisible]= React.useState(false);
        const [lowerEndDetectorVisible, setLowerEndDetectorVisible]= React.useState(false);
        const [reachedEndTop, setReachedEndTop]= React.useState(false);
        const [reachedEndBottom, setReachedEndBottom]= React.useState(false);
        React.useEffect(() => {
            setCurrentlyLoading(0);
            setUpperEndDetectorVisible(false);
            setLowerEndDetectorVisible(false);
            setReachedEndTop(false);
            setReachedEndBottom(false);
            if(!observer) {
                const ob= new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if(entry.target.classList.contains('upper')) {
                            setUpperEndDetectorVisible(entry.isIntersecting);
                        }
                        else if(entry.target.classList.contains('lower')) {
                            setLowerEndDetectorVisible(entry.isIntersecting);
                        }
                    });
                }, {
                    root: ref.current
                });
                ob.observe(upperEndDetectorRef.current as HTMLDivElement);
                ob.observe(lowerEndDetectorRef.current as HTMLDivElement);
                setObserver(ob);
            }

            if (chat.type['@type'] == 'chatTypeSupergroup' && chat.type.is_channel) {
                TdLib.sendQuery({
                    '@type': 'getChatSponsoredMessage',
                    chat_id: chat.id
                }).then((res)=>(setSponsoredMessage(res as TdApi.td_sponsoredMessage)));
            } else {
                setSponsoredMessage(null);
            }

            return () => {
                observer?.disconnect();
                dispatch({
                    type: 'CLEAR_MESSAGES',
                });
            };
        }, [chat.id]);

        React.useEffect(() => {
            if(currentlyLoading < 1) {
                if(upperEndDetectorVisible && !reachedEndTop) {
                    setCurrentlyLoading(current => current + 1);
                    loadChatHistory(chat.id, array.length ? array[0].id : 0, 50).then((count)=> {
                        (count!=-1) && setCurrentlyLoading(current => current - 1);
                        (count==0) && setReachedEndTop(true);
                    });
                }
            }
        }, [upperEndDetectorVisible, lowerEndDetectorVisible, currentlyLoading]);

        const scrollRef= React.useRef<Scrollbars>() as React.RefObject<Scrollbars>;
        function jumpToDown() {
            (scrollRef.current as any)?.view.scroll({
                top: 0,
                behavior: 'smooth',
            });
        }
        const [jumpToDownVisible, setJumpToDownVisible]= React.useState(false);
        function onScroll(e: React.UIEvent) {
            const visible= (-(e.target as HTMLElement).scrollTop) > 480;
            if (visible != jumpToDownVisible) {
                setJumpToDownVisible(visible);
            }
        }

        return (
            <div className="history" ref={ref}>
                <ScrollView scrollRef={scrollRef} className="scrollbar full-size" scrollBarWidth={6} onScroll={onScroll}>
                    <div className="history-scroll-content">
                        <div className="end-detector upper" ref={upperEndDetectorRef}></div>
                        {array.map(message => <Message key={message.id} message={message} chat={chat}/>)}
                        <div className="end-detector lower" ref={lowerEndDetectorRef}></div>
                        {sponsoredMessage && <SponsoredMessage message={sponsoredMessage} chat_id={chat.id} viewport={ref}/>}
                    </div>
                </ScrollView>
                <IconButton icon={history_to_down} onClick={jumpToDown}
                    className={'history-to-down '+(jumpToDownVisible ? 'visible' : '')}/>
            </div>
        );
    }
);
