import { useState } from "react";
import EditButtons from "./EditButtons";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import "../styles/AddList.css";
import { v4 as uuid } from "uuid";
import { addList } from "../store/reducer/boardSlice";
const AddList = (props) => {
  const [title, setTitle] = useState();
  const { toggleAddingList } = props;
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const createList = async (title) => {
    if (title === undefined || title.length === 0) return;
    props.toggleAddingList();
    props.addList({ listId: uuid(), listTitle: title });
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={setTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};
const mapStateToProps = ({ board }) => {
  return {
    lists: board.lists,
  };
};

const mapDispatchToProps = {
  addList,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddList);
