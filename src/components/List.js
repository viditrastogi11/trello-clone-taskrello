import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import ListEditor from "./ListEditor";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import "../styles/List.css";
import {
  addCard,
  deleteList,
  changeListItem,
} from "../store/reducer/boardSlice";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { getCurrentDateInFormatString } from "../utils";
import { PlusCircleOutlined } from "@ant-design/icons";

const List = (props) => {
  const { index } = props;
  const list = props.lists[props.listId];
  const [editingTitle, setEditingTitle] = useState();
  const [addingCard, setAddingCard] = useState();
  const [title, setTitle] = useState(list.title);
  const [cardTitle, setCardTitle] = useState("");
  const [description, setDescription] = useState("");
  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async (cardText, cardDescription) => {
    console.log(cardText, cardDescription);
    const { listId } = props;
    toggleAddingCard();
    const cardId = uuid();
    const cardDate = getCurrentDateInFormatString();
    props.addCard({ cardText, cardDescription, cardDate, cardId, listId });
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async (title) => {
    const { listId } = props;
    toggleEditingTitle();
    props.changeListItem({ listId, listTitle: title });
  };

  const deleteList = async () => {
    const { listId } = props;
    props.deleteList({ listId, cards: props.lists[listId] });
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={list.title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="List-Title" onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}

          <Droppable droppableId={list.id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      title={title}
                      cardId={cardId}
                      index={index}
                      listId={list.id}
                    />
                  ))}

                {provided.placeholder}

                <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                  <PlusCircleOutlined style={{ marginRight: "10px" }} /> Add
                  Task
                </div>
              </div>
            )}
          </Droppable>
          <Modal
            destroyOnClose={true}
            title={title}
            okText="Add Task"
            onOk={() => addCard(cardTitle, description)}
            open={addingCard}
            onCancel={toggleAddingCard}
          >
            <label>Title</label>
            <Input
              name="title"
              onChange={(e) => {
                setCardTitle(e.target.value);
              }}
            ></Input>
            <br />
            <label>Description</label>
            <Input.TextArea
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Input.TextArea>
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({ board }) => {
  return {
    lists: board.lists,
  };
};

const mapDispatchToProps = {
  deleteList,
  addCard,
  changeListItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
