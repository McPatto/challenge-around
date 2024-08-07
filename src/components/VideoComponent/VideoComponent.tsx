import "./VideoComponent.scss";
import { Flex } from "antd";
import { ControlBar } from "../ControlBar/ControlBar";
import { Video } from "../Video";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export const VideoComponent = () => {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [rewind, setRewind] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (!video) return;

    video.playbackRate = playbackSpeed <= 16 && !rewind ? playbackSpeed : 1;

    let intervalRewindId: NodeJS.Timer;
    let intervalId: NodeJS.Timer;

    if (rewind) {
      if (video?.currentTime === 0) return setRewind(false);
      intervalRewindId = setInterval(() => {
        video.currentTime = video.currentTime - 0.049 * playbackSpeed;
      }, 50);
    }

    if (playbackSpeed > 16) {
      const intervalFinish = 1000 / playbackSpeed;
      intervalId = setInterval(() => {
        if (!video.paused && !video.ended) {
          video.currentTime += 1;
        }
      }, intervalFinish);
    }

    return () => {
      clearInterval(intervalRewindId);
      clearInterval(intervalId);
    };
  }, [playbackSpeed, rewind]);

  const handlePlayButton = () => {
    if (!videoRef.current) return;
    setRewind(false);
    if (isPlaying) videoRef.current.pause();
    if (!isPlaying) videoRef.current.play();
    return setIsPlaying((currState) => !currState);
  };

  const handleChangeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleChangeVolume = (value: number) => {
    if (!video) return;
    if (value !== 0) setIsVideoMuted(false);
    video.volume = value / 100;
  };

  const handleMuteVideo = () => {
    if (!video) return;
    setIsVideoMuted((currState) => {
      video.volume = currState ? 1 : 0;
      return !currState;
    });
  };

  const handleStopButton = () => {
    if (!video) return;
    video.pause();
    setIsPlaying(false);
    handleChangeSpeed(1);
    return (video.currentTime = 0);
  };

  const seekToPosition = (pos: number) => {
    if (pos < 0 || pos > 1) return;
    if (!video) return;

    const duration = video.duration || 0;

    const newElapsedSec = duration * pos;
    video.currentTime = newElapsedSec;
  };

  const handleRewind = () => {
    if (!video) return;
    handlePlayButton();
    setRewind((currState) => !currState);
  };

  const handleShowControls = () => {
    setShowControls(true);
  };

  const handleHideControls = () => {
    setShowControls(false);
  };

  return (
    <Flex className="video-component-container" align="center" vertical onMouseOver={handleShowControls} onMouseLeave={handleHideControls}>
      <div
        className={clsx("controls-container", {
          hide: !showControls,
        })}
      >
        <div className="video-shadow" />
        <ControlBar
          videoRef={videoRef}
          handleRewind={handleRewind}
          handlePlayButton={handlePlayButton}
          handleStopButton={handleStopButton}
          handleMuteVideo={handleMuteVideo}
          handleChangeSpeed={handleChangeSpeed}
          handleSeekToPos={seekToPosition}
          handleChangeVolume={handleChangeVolume}
          isPlaying={isPlaying}
          isVideoMuted={isVideoMuted}
          playbackSpeed={playbackSpeed}
        />
      </div>
      <Video ref={videoRef} />
    </Flex>
  );
};
