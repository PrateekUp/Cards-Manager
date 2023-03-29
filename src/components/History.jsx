import React, { useState } from "react";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { HistoryRounded } from "@mui/icons-material";
import HistoryCard from "./HistoryCard";
import { selectAllHistory, clearHistory } from "../features/historySlice";
import { useDispatch, useSelector } from "react-redux";

const History = () => {
  const [modalComponent, setModal] = useState("");
  const dispatch = useDispatch();
  const historyArr = useSelector(selectAllHistory);
  const handleClearHistory = () => {
    dispatch(clearHistory());
  };
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        p: "1rem",
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "rgb(255, 180, 180)",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        <Typography variant="h5">
          <HistoryRounded
            sx={{ fontSize: "inherit", verticalAlign: "middle" }}
          />{" "}
          Video History
        </Typography>
        <Button onClick={() => handleClearHistory()}>
          <Typography style={{ textDecoration: "underline", color: "#000" }}>
            Delete History
          </Typography>
        </Button>
      </Toolbar>
      <Grid
        sx={{
          height: "100%",
          mt: "1rem",
          py: "1rem",
          px: "2rem",
          alignContent: "start",
          flexDirection: "column",
        }}
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {historyArr.map((card, index) => {
          return (
            <HistoryCard
              id={card.id}
              index={index}
              key={card.id + index}
              title={card.title}
              link={card.link}
              time={card.now}
              setModal={setModal}
            /> /* TODO: time */
          );
        })}
      </Grid>
      {modalComponent}
    </Box>
  );
};

export default History;
