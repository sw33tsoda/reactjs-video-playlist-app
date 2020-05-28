import React, { Component } from 'react';
import Video from './Video';
import NowPlaying from './NowPlaying';
import '../VideoPlayer.css';
import uniqid from 'uniqid';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPlaying:{},
            videos : [
                {id:23124,url:'https://www.youtube.com/embed/2zTrA5Krbqg',title:'Keymaster - Saint Row 4'},
                {id:2324,url:'https://www.youtube.com/embed/vWMIW3qTtQs',title:'He knows my name - Yiruma'},
            ],
        }
        this.titleInput = null;
        this.urlInput = null;
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            nowPlaying: this.state.videos[0],
        })
    }

    changeVideo(video) {
        return () => {
            let temp = this.state;
            temp.nowPlaying = video;
            this.setState({ ...temp });
        }
    }

    addVideo = () => {
        const title = this.titleInput.value;
        const url = this.urlInput.value;
        
        if (title && url) {
            let temp_url;
            if (url.indexOf('=') === -1) {
                temp_url = url.split('/');
                temp_url = temp_url[temp_url.length-1];
            } else temp_url = url.split('=')[1].split('&')[0];
            const final_url = `https://www.youtube.com/embed/${temp_url}`;
            
            const {videos} = this.state;

            videos.unshift({
                id:uniqid(),
                url:final_url,
                title:title,
            })
            
            this.setState({
                ...this.state,
                videos:videos,
            }); 
        }
    }

    deleteVideo(video) {
        return async () => {
            const {videos : videos_temp} = this.state;
            const videos = await videos_temp.filter((vid,index) => videos_temp.indexOf(video) !== index);
            await this.setState({
                ...this.state,
                videos:videos,
            })
        }
    }

    render() {
        const {videos,nowPlaying} = this.state;
        const videoSetting ='?autoplay=0&showinfo=0&controls=1';

        return <div id="video-player">
            <div id="video-nowplaying">
                <NowPlaying videoSetting={videoSetting} nowPlaying={nowPlaying.url}/>
            </div>

            <div id="video-add">
                <div className="form-box">
                    <input type="text" placeholder="Title" ref={ (event) => {this.titleInput = event} }/>
                    <input type="text" placeholder="Url" ref={ (event) => this.urlInput = event } />
                </div>
                <div className="form-box">
                    <button id="add-button" onClick={this.addVideo}>Add</button>
                </div>
            </div>

            <div id="video-playlist">
                {videos.map((video,index) => <Video key={index} videoInfo={video} isPlaying={nowPlaying.id === video.id && true} onClick={this.changeVideo(video)} onClickToDelete={this.deleteVideo(video)} />)}
            </div>
            </div>;
    }
}

export default VideoPlayer;