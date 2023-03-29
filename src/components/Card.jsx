import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, updateCard, addCard } from "../features/bucketSlice";
import { ItemTypes } from "../features/dragTypes";
import { useDrag } from "react-dnd";
import VideoPlayer from "./VideoPlayer";
import Modal from "./Modal";
import { addToHitory } from "../features/historySlice";
import EditCard from "./EditCard.jsx";
import { useRef } from "react";
import MenuList from "./MenuList";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CardComp({
  title,
  link,
  cardIndex,
  bucketIndex,
  setModal,
  rerenderOnce,
  cardId,
}) {
  const disPatch = useDispatch();
  const id = cardIndex;
  const editCardRef = useRef();

  /*Move card logic */
  const moveCardFrom = () => {
    disPatch(deleteCard({ cardIndex, bucketIndex }));
    rerenderOnce(true);
  };

  const moveCardTo = (bucketIndex) => {
    disPatch(addCard({ bucketIndex, title, link }));
  };

  /* modal logic */
  const handleClick = () => {
    setModal(
      <Modal
        onClose={() => {
          setModal("");
        }}
        open={true}
        content={<VideoPlayer link={link} />}
        action={() => {}}
      />
    );
    const historyObject = {
      cardId,
      title,
      link,
    };
    disPatch(addToHitory(historyObject));
  };

  const handleEdit = () => {
    setModal(
      <Modal
        onClose={() => {
          setModal("");
        }}
        open={true}
        content={<EditCard ref={editCardRef} bucketIndex={bucketIndex} />}
        action={() => {
          const inputs = editCardRef.current.querySelectorAll("input");
          let title = inputs[0].value;
          let link = inputs[1].value;
          disPatch(updateCard({ title, link, bucketIndex, cardIndex }));
          rerenderOnce(true);
        }}
        actionText="Submit"
      />
    );
  };

  /* DnD Drop Source */
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { cardIndex, title, link },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      style={{
        marginLeft: "10px",
        marginTop: "1rem",
        position: "relative",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "240px",
        backgroundColor: "rgb(134, 112, 112)",
        color: "white",
      }}
      sx={{
        maxWidth: "320px",
        height: "min-content",
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={drag}
    >
      <CardContent style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
        <Button onClick={handleClick}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ color: "white" }}
          >
            {title}
          </Typography>
        </Button>
        <MenuList
          moveCardTo={moveCardTo}
          moveCardFrom={moveCardFrom}
          style={{ color: "white" }}
        />
      </CardContent>

      <CardActions
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ color: "white" }}
          onClick={() => {
            disPatch(deleteCard({ bucketIndex, cardIndex }));
            rerenderOnce(true);
          }}
          size="small"
        >
          {" "}
          <DeleteIcon />{" "}
        </Button>
        <Button size="small" onClick={handleEdit} style={{ color: "white" }}>
          {" "}
          <EditIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
