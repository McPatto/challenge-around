import { RefObject } from "react";

export type ProgressBarProps = {
  videoRef: RefObject<HTMLVideoElement>;
  handleSeekToPos: (position: number) => void;
};