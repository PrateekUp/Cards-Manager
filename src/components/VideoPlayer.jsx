import { Box, DialogContent, DialogTitle } from "@mui/material";

export default function VideoPlayer({ link }) {
  return (
    <div style={{ backgroundColor: "rgb(134, 112, 112)" }}>
      <DialogTitle style={{ color: "white" }}>Video playing...</DialogTitle>
      <DialogContent>
        <Box>
          <iframe
            style={{ width: "100%", aspectRatio: "1.78" }}
            src={link}
            allowFullScreen
          ></iframe>
        </Box>
      </DialogContent>
    </div>
  );
}
