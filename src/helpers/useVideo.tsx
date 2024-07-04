import { RefObject, useEffect, useState } from "react";

export const useVideo = (videoRef: RefObject<HTMLVideoElement>) => {
  const [duration, setDuration] = useState(0);
  const [ellapsedTime, setEllapsedTime] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setDuration(video.duration);
      setEllapsedTime(video.currentTime);
    };

    const handleProgress = () => {
      if (!video?.buffered?.length) return;

      setBufferedEnd(video.buffered.end(video.buffered.length - 1));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("progress", handleProgress);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("progress", handleProgress);
    };
  }, [videoRef]);

  return {
    duration,
    ellapsedTime,
    bufferedEnd,
  };
};
