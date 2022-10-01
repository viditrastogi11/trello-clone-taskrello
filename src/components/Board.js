import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import List from "./List";
import { connect } from "react-redux";
import "../styles/Board.css";
import { moveCard, moveList } from "../store/reducer/boardSlice";
import { PlusCircleOutlined } from "@ant-design/icons";

const Board = (props) => {
  const [addingList, setAddingList] = useState(false);
  const toggleAddingList = () => setAddingList(!addingList);
  const handleDragEnd = ({ source, destination, type }) => {
    console.log(source, destination, type);

    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        props.moveList({
          oldListIndex: source.index,
          newListIndex: destination.index,
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      props.moveCard({
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        oldCardIndex: source.index,
        newCardIndex: destination.index,
      });
    }
  };
  const { board } = props.board;
  const date = new Date().toLocaleString("en-IN", {
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "short", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
  });
  console.log(date);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className="Board" ref={provided.innerRef}>
            {board.lists.map((listId, index) => {
              return <List listId={listId} key={listId} index={index} />;
            })}

            {provided.placeholder}

            <div className="Add-List">
              {addingList ? (
                <AddList toggleAddingList={toggleAddingList} />
              ) : (
                <div onClick={toggleAddingList} className="Add-List-Button">
                  <PlusCircleOutlined style={{ marginRight: "10px" }} /> Add
                  List
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
const mapStateToProps = ({ board }) => {
  return {
    board: board,
  };
};
const mapDispatchToProps = {
  moveList,
  moveCard,
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);
