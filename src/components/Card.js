import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import "../styles/Card.css";
import { changeCardText, deleteCard } from "../store/reducer/boardSlice";
import { Input, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Card = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const card = props.cards[props.cardId];
  const [cardTitle, setCardTitle] = useState(card?.text);
  const [description, setDescription] = useState(card?.description);
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState(props.title);
  const [hover, setHover] = useState(false);

  const editCard = async (text, description) => {
    props.changeCardText({
      cardId: card.id,
      cardText: cardTitle,
      cardDescription: description,
    });
    setIsEditing(false);
  };
  const deleteCard = async () => {
    const { listId } = props;
    props.deleteCard({ cardId: card.id, listId });
  };
  const { index } = props;

  return (
    <>
      <Draggable draggableId={card?.id} index={index}>
        {(provided, snapshot) => (
          <div
            onClick={() => {
              setIsEditing(true);
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="Card"
          >
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={deleteCard}>
                  <DeleteOutlined></DeleteOutlined>
                </div>
              </div>
            )}
            {card.text}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "10px",
              }}
            >
              {" "}
              {card.created_on}
            </div>
          </div>
        )}
      </Draggable>
      <Modal
        destroyOnClose={true}
        title={title}
        okText="Save"
        onOk={() => editCard(cardTitle, description)}
        open={isEditing}
        onCancel={() => {
          setIsEditing(!isEditing);
        }}
      >
        <label>Title</label>
        <Input
          name="title"
          style={{ marginBottom: "10px" }}
          value={cardTitle}
          onChange={(e) => {
            setCardTitle(e.target.value);
          }}
        ></Input>
        <br />
        <label>Description</label>
        <Input.TextArea
          value={description}
          style={{ marginBottom: "10px" }}
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input.TextArea>
        <div style={{ marginBottom: "10px" }}>
          {" "}
          Created On : {card.created_on}
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ board }) => {
  return {
    cards: board.cards,
  };
};
const mapDispatchToProps = {
  changeCardText,
  deleteCard,
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
