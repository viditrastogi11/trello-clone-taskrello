import "../styles/CardEditor.css";
import { useState } from "react";
import EditButtons from "./EditButtons";

const CardEditor = (props) => {
  const [text, setText] = useState(props.text || "");
  const { onSave, onCancel, onDelete, adding } = props;
  const handleChangeText = (event) => setText(event.target.value);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.onSave(text);
    }
  };
  return (
    <div className="Edit-Card">
      <div className="Card">
        <textarea
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};
export default CardEditor;
