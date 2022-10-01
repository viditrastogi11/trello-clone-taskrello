import "../styles/EditButtons.css";

import React from "react";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (
  <div className="Edit-Buttons">
    <Button type="primary" className="Edit-Button" onClick={handleSave}>
      {saveLabel}
    </Button>
    {handleDelete && (
      <Button
        tabIndex="0"
        className="Edit-Button"
        style={{ marginLeft: 0 }}
        onClick={handleDelete}
      >
        Delete
      </Button>
    )}
    <div tabIndex="0" className="Edit-Button-Cancel" onClick={handleCancel}>
      <CloseCircleOutlined name="close" />
    </div>
  </div>
);

export default EditButtons;
