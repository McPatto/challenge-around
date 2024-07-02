import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Dropdown, Flex, Layout, MenuProps, Select, Slider, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { CaretRightOutlined, ExpandOutlined, MutedFilled, PauseOutlined, SoundFilled, XFilled } from "@ant-design/icons";

function App() {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;
  const bufferRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState(0);
  const [ellapsedSec, setEllapsedSec] = useState(0);

  useEffect(() => {
    if (!video) return;
    const handleTimeUpdate = () => {
      const duration = video.duration;
      setDurationSec(duration);
      setEllapsedSec(video.currentTime);
      if (progressRef && duration > 0) {
        progressRef.current!.style.width = (video.currentTime / duration) * 100 + "%";
      }
    };

    const handleProgress = () => {
      if (!video) return;
      if (!video.buffered) return;

      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const duration = video.duration;
      if (bufferRef && duration > 0) {
        bufferRef.current!.style.width = (bufferedEnd / duration) * 100 + "%";
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("progress", handleProgress);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("progress", handleProgress);
    };
  }, [video]);

  const handlePlayButton = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    if (!isPlaying) videoRef.current.play();
    return setIsPlaying((currState) => !currState);
  };

  const handleChangeSpeed = (speed: number) => {
    if (!video) return;
    video.playbackRate = speed;
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

  const volumeDropdownItem: MenuProps["items"] = [
    {
      label: <Slider onChange={handleChangeVolume} defaultValue={100} style={{ height: 90 }} vertical />,
      key: "0",
    },
  ];

  const speedDropdownItems = [
    {
      label: "1x",
      value: 1,
    },
    {
      label: "2x",
      value: 2,
    },
    {
      label: "4x",
      value: 4,
    },
    {
      label: "8x",
      value: 8,
    },
    {
      label: "16x",
      value: 16,
    },
  ];

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

  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "white" }}>Welcome to my challenge :)</Typography.Title>
      </Header>
      <Content>
        <Flex align="center" vertical style={{ width: 800, position: "relative", margin: "auto" }}>
          <Flex
            vertical
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: "100%",
              zIndex: 2,
              bottom: 0,
              padding: 16,
            }}
            align="center"
            gap="small"
          >
            <div style={{ width: "100%", position: "relative", cursor: "pointer" }}>
              <div
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  const { left, width } = e.currentTarget.getBoundingClientRect();
                  console.log({ left, width, clientX: e.clientX });
                  const clickedPos = (e.clientX - left) / width;
                  seekToPosition(clickedPos);
                }}
                style={{
                  height: 4,
                  position: "absolute",
                  zIndex: 3,
                  width: "100%",
                }}
              />
              <div
                style={{
                  height: 4,
                  background: "#FFF",
                  position: "absolute",
                  zIndex: 2,
                }}
                ref={progressRef}
              />
              <div
                style={{
                  height: 4,
                  background: "#C1C1C1",
                  position: "absolute",
                  zIndex: 1,
                }}
                ref={bufferRef}
              />
              <div style={{ height: 4, background: "#8f8f8f" }} />
            </div>
            <Flex align="center" gap="small" style={{ width: "100%" }}>
              <Button onClick={handlePlayButton} icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} shape="circle" />
              <Button onClick={handleStopButton} icon={<XFilled />} shape="circle" />
              <Flex style={{ marginRight: "auto" }}>
                <Typography style={{ color: "white" }}>
                  {ellapsedSec} / {durationSec}
                </Typography>
              </Flex>
              <Dropdown menu={{ items: volumeDropdownItem }} arrow placement="top">
                <Button onClick={handleMuteVideo} icon={isVideoMuted ? <MutedFilled /> : <SoundFilled />} shape="circle" />
              </Dropdown>
              <Select defaultValue={1} style={{ width: 70 }} onChange={handleChangeSpeed} options={speedDropdownItems} placement="topLeft" />
              <Button type="text" shape="circle" icon={<ExpandOutlined style={{ color: "white" }} onClick={() => video?.requestFullscreen()} />} />
            </Flex>
          </Flex>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 1,
              boxShadow: "inset 0px -106px 40px -46px rgba(0,0,0,0.8)",
            }}
          />
          <video ref={videoRef} style={{ maxWidth: "100%" }}>
            <source src="videoExample.mp4" type="video/mp4" />
          </video>
        </Flex>
      </Content>
    </Layout>
  );
}

export default App;
