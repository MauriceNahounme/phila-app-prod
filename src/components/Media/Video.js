import React, { useState } from "react";
import "./media.css";
import ReactPlayer from "react-player";
import CarouselMember from "../Navigation/Member/Carousel";
import Footer from "../Navigation/Member/Footer";
import Topbar from "../Navigation/Member/Topbar";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { BASE_URL } from "../../config";

const Video = () => {
  const [medias, setMedias] = useState([]);
  const [play, setPlay] = useState("https://youtu.be/BBsZcv0Cplc");
  const [reloadPlaylist, setReloadPlaylist] = useState(true);
  const [mediaInfos, setMediaInfos] = useState({});
  const [videos, setVideos] = useState([]);
  // const [width, setWitdh] = (useState = useState(window.innerWidth));

  // const getVideos = () => {
  //   axios({
  //     url: "https://www.googleapis.com/youtube/v3/search",
  //     method: "GET",
  //     data: {
  //       part: "snippet",
  //       chart: "chartUnspecified",
  //       channelId: "UCQHfRuoiaC-sdgT8bNlT23Q",
  //       type: "video",
  //       key: "AIzaSyC5ov-AilBXqCrZ0ArHR22DpokFDRIDYKQ",
  //     },
  //   })
  //     .then((value) => {
  //       console.log("vid", value);
  //       setVideos(value);
  //     })
  //     .catch((err) => {
  //       console.log("er", err);
  //     });
  // };

  // const updateSize = () => setWitdh(window.innerWidth);
  // useEffect(() => (window.onresize = updateSize), []);

  const getMedias = () => {
    axios
      .get(`${BASE_URL}/medias`)
      .then((value) => {
        setMedias(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("mobile", width);

  const startMedia = () => {};

  useEffect(() => {
    getMedias();
    // getVideos();
  }, []);

  return (
    <div>
      <Topbar />
      {/* <CarouselMember /> */}
      <div className="video-contaier col-12">
        <div>
          <ReactPlayer
            className="video col-10"
            width="923px"
            height="521px"
            url={play}
            controls={true}
            loop={true}
            config={{
              youtube: {
                playerVars: { color: "white" },
              },
            }}
            rel="0"
            playing
            onStart={startMedia}
          />
          <div style={{ marginTop: "15px" }}>
            {Object.keys(mediaInfos).length ? (
              <div style={{ width: "640px" }}>
                <h5>
                  <strong>{`${mediaInfos.author} - ${mediaInfos.title}`}</strong>
                </h5>
                <p
                  style={{
                    marginLeft: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#F2F2F2",
                    padding: "15px",
                  }}
                >
                  {mediaInfos.description}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="video-playlist-container col-2">
          <p>Playlist</p>
          {medias
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
            .map((media) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ReactPlayer
                    url={media.url}
                    width="170px"
                    height="95px"
                    style={{ marginTop: "15px" }}
                    playing={false}
                    light={true}
                    muted={true}
                    playIcon=" "
                    rel="0"
                    onClickPreview={(e) => {
                      setPlay(media.url);
                      setReloadPlaylist(true);
                      setMediaInfos(media);
                    }}
                  />

                  {/* <div style={{ position: "relative" }}>
                  <h6>{media.title}</h6>
                  <p>{media.author}</p>
                </div> */}
                </div>
              );
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Video;
