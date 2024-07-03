import { Collapse, Typography } from "antd";

const ITEM = [
  {
    key: "0",
    label: "Credits:",
    children: (
      <>
        <Typography>By Patricio Mc. Allister</Typography>
        <hr />

        <img style={{ width: "100%" }} src="graphicDesign.png" />
      </>
    ),
  },
];

export const Credits = () => {
  return <Collapse style={{ width: "800px" }} items={ITEM} />;
};
