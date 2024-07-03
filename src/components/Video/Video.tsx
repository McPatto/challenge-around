import "./Video.scss";
import { forwardRef, LegacyRef } from "react";

export const Video =
  // eslint-disable-next-line react/display-name
  forwardRef((_props, ref: LegacyRef<HTMLVideoElement>) => (
    <video loop ref={ref} className="video-container">
      <source src="videoExample.mp4" type="video/mp4" />
    </video>
  ));
