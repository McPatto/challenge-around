import { BackwardOutlined, PauseOutlined, CaretRightOutlined, XFilled, MutedFilled, SoundFilled } from "@ant-design/icons";
import { Flex, Button, Dropdown, Select, MenuProps, Slider } from "antd";
import { TimeTracker } from "./TimeTracker/TimeTracker";
import { ProgressBar, ProgressBarProps } from "./ProgressBar/ProgressBar";
import { FC, RefObject, useEffect, useState } from "react";
import { SPEED_DROPDOWN_ITEMS } from "./constants";

type ControlBarProps = ProgressBarProps & {
  videoRef: RefObject<HTMLVideoElement>;
  handleRewind: () => void;
  handlePlayButton: () => void;
  handleStopButton: () => void;
  handleMuteVideo: () => void;
  handleChangeSpeed: (speed: number) => void;
  handleChangeVolume: (volume: number) => void;
  isPlaying: boolean;
  isVideoMuted: boolean;
  playbackSpeed: number;
};

export const ControlBar: FC<ControlBarProps> = ({
  videoRef,
  handleRewind,
  handlePlayButton,
  handleStopButton,
  handleMuteVideo,
  handleChangeSpeed,
  handleChangeVolume,
  handleSeekToPos,
  isPlaying,
  isVideoMuted,
  playbackSpeed,
}) => {
  const [ellapsedTime, setEllapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setDuration(video.duration);
      setEllapsedTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  const volumeDropdownItem: MenuProps["items"] = [
    {
      label: <Slider onChange={handleChangeVolume} defaultValue={100} style={{ height: 90 }} vertical />,
      key: "0",
    },
  ];

  return (
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
      <ProgressBar videoRef={videoRef} handleSeekToPos={handleSeekToPos} />
      <Flex align="center" gap="small" style={{ width: "100%" }}>
        <Button onClick={handleRewind} shape="circle" icon={<BackwardOutlined />} />
        <Button onClick={handlePlayButton} icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} shape="circle" />
        <Button onClick={handleStopButton} icon={<XFilled />} shape="circle" />
        <TimeTracker elapsedSec={ellapsedTime} duration={duration} />
        <Dropdown menu={{ items: volumeDropdownItem }} arrow placement="top">
          <Button onClick={handleMuteVideo} icon={isVideoMuted ? <MutedFilled /> : <SoundFilled />} shape="circle" />
        </Dropdown>
        <Select defaultValue={1} style={{ width: 70 }} onChange={handleChangeSpeed} value={playbackSpeed} options={SPEED_DROPDOWN_ITEMS} placement="topLeft" />
      </Flex>
    </Flex>
  );
};
