import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';

export default function TitleHeader({chat}) {
    return (
        <div className="title-bar">
            <div className="title-bar-left">
                <div className="title">
                    {chat.title}
                </div>
            </div>
        </div>
    );
}
TitleHeader.propTypes = {
    chat: PropTypes.object.isRequired
};
