import {
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
} from "@mui/material";
import { forwardRef } from "react";
const EditCard = forwardRef((props, ref) => (
  <div style={{ backgroundColor: "rgb(134, 112, 112)" }}>
    <DialogTitle style={{ color: "white" }}>Enter Information</DialogTitle>
    <DialogContent>
      <FormGroup sx={{ pt: "1rem", gap: "1rem" }} ref={ref}>
        <TextField helperText="*Video Name" label="Name" required />
        <TextField
          helperText="*Enter link of the video"
          label="link"
          required
        />
      </FormGroup>
    </DialogContent>
  </div>
));

export default EditCard;
