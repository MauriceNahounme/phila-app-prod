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
import { useMediaQuery } from "react-responsive";

const Video = () => {
  const [medias, setMedias] = useState([]);
  const [play, setPlay] = useState("https://youtu.be/BBsZcv0Cplc");
  const [reloadPlaylist, setReloadPlaylist] = useState(true);
  const [mediaInfos, setMediaInfos] = useState({});

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });

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
            className="video"
            width={isDesktopOrLaptop ? "923px" : "96%"}
            height={isDesktopOrLaptop ? "521px" : "421px"}
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
                <div>
                  <ReactPlayer
                    url={media.url}
                    width={isTabletOrMobile ? "96%" : "170px"}
                    height={isTabletOrMobile ? "250px" : "95px"}
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

                  <div style={{ marginTop: "15px", marginLeft: "10px" }}>
                    <h6
                      style={{
                        fontSize: "0.9em",
                        marginBottom: "-6px",
                      }}
                    >
                      {media.title}
                    </h6>
                    <span
                      style={{
                        fontSize: "0.6em",
                        // border: "1px solid green",
                        color: "grey",
                      }}
                    >
                      {media.author}
                    </span>
                  </div>
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
