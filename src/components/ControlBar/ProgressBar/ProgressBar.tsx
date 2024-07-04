import "./ProgressBar.scss";
import { FC, useRef } from "react";
import { ProgressBarProps } from "./types";
import { useVideo } from "../../../helpers/useVideo";

export const ProgressBar: FC<ProgressBarProps> = ({ handleSeekToPos, videoRef }) => {
  if (!videoRef) return <></>;

  const progressRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);

  const { duration, bufferedEnd, ellapsedTime } = useVideo(videoRef);

  const handleProgressBarCick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickedPos = (e.clientX - left) / width;
    handleSeekToPos(clickedPos);
  };

  return (
    <div className="progress-bar-container">
      <div onClick={handleProgressBarCick} className="progress-bar-invisible" />
      <div className="progress-bar-white" ref={progressRef} style={{ width: (ellapsedTime / duration) * 100 + "%" }} />
      <div className="progress-bar-buffer" style={{ width: `${(bufferedEnd / duration) * 100}%` }} ref={bufferRef} />
      <div className="progress-bar-default" />
    </div>
  );
};
