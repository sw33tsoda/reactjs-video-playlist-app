import React from 'react';

function NowPlaying(props) {
    return <iframe width="100%" height="100%" src={props.nowPlaying + props.videoSetting} frameBorder="0" allowFullScreen></iframe>
}

export default NowPlaying;