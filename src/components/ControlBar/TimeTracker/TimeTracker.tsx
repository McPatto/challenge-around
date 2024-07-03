import { Flex, Typography } from "antd";

export const TimeTracker = ({ elapsedSec, duration }: { elapsedSec: number; duration: number }) => {
  const minutesElapsed = Math.floor(elapsedSec / 60)
    .toString()
    .padStart(2, "0");
  const secondsElapsed = Math.floor(elapsedSec % 60)
    .toString()
    .padStart(2, "0");
  const totalMinutesElapsed = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const totalSecondsElapsed = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");

  return (
    <Flex style={{ marginRight: "auto" }}>
      <Typography style={{ color: "white", fontWeight: "bold" }}>
        {minutesElapsed}:{secondsElapsed} / {totalMinutesElapsed}:{totalSecondsElapsed}
      </Typography>
    </Flex>
  );
};
