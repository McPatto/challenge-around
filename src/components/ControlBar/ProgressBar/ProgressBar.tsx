import { FC, RefObject, useEffect, useRef } from "react";

export type ProgressBarProps = {
  videoRef: RefObject<HTMLVideoElement>;
  handleSeekToPos: (position: number) => void;
};

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

  return (
    <div style={{ width: "100%", position: "relative", cursor: "pointer" }}>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const { left, width } = e.currentTarget.getBoundingClientRect();
          const clickedPos = (e.clientX - left) / width;
          handleSeekToPos(clickedPos);
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
  );
};
