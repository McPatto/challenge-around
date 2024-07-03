import "./ProgressBar.scss";
import { FC, useEffect, useRef } from "react";
import { ProgressBarProps } from "./types";

export const ProgressBar: FC<ProgressBarProps> = ({ handleSeekToPos, videoRef }) => {
  if (!videoRef) return <></>;

  const progressRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      if (progressRef && progressRef.current && duration > 0) {
        progressRef.current.style.width = (video.currentTime / duration) * 100 + "%";
      }
    };

    const handleProgress = () => {
      if (!video?.buffered?.length) return;

      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const duration = video.duration;
      if (bufferRef && bufferRef.current && duration > 0) {
        bufferRef.current.style.width = (bufferedEnd / duration) * 100 + "%";
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("progress", handleProgress);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("progress", handleProgress);
    };
  }, [videoRef]);

  const handleProgressBarCick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickedPos = (e.clientX - left) / width;
    handleSeekToPos(clickedPos);
  };

  return (
    <div className="progress-bar-container">
      <div onClick={handleProgressBarCick} className="progress-bar-invisible" />
      <div className="progress-bar-white" ref={progressRef} />
      <div className="progress-bar-buffer" ref={bufferRef} />
      <div className="progress-bar-default" />
    </div>
  );
};
