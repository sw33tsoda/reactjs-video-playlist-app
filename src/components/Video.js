import React from 'react';
import classNames from 'classnames';

function Video(props) {
    const {onClick,videoInfo,isPlaying,onClickToDelete} = props;
    return <div className={classNames('video',{playing:isPlaying})} onClick={onClick}>
        <p>{videoInfo.title}</p><button onClick={onClickToDelete}>Delete</button>
    </div>;
}

export default Video;