import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from '../components/VideoPlayer.js';
import Search from '../components/Search.js';
import VideoList from '../components/VideoList.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import searchYouTube from '../lib/searchYouTube.js';

// var App = (props) => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video={props.entry}/>
//       </div>
//       <div className="col-md-5">
//         <VideoList videos={props.entry}/>
//       </div>
//     </div>
//   </div>
// );


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };

    this.clickOnTitle = this.clickOnTitle.bind(this);

    this.fakes = {
      key: YOUTUBE_API_KEY,
      query: 'dogs',
      max: 5
    };
  }


  acquireYoutube () {
    return this.props.searchYouTube(this.fakes, data => {
      this.setState({
        videos: data,
        currentVideo: data[0]
      });
    });
  }

  componentDidMount () {
    this.acquireYoutube();
  }


  //setState on click, update currentVideo which clicked video in list
  clickOnTitle(clickedVideo) {
    this.setState({
      currentVideo: clickedVideo//data of the video we clicked
    });
  }




  render() {
    return <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList click={this.clickOnTitle} videos={this.state.videos}/>
        </div>
      </div>
    </div>;
  }
}



// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;