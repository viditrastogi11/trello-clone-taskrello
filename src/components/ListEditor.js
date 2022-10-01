import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import "../styles/ListEditor.css";

const ListEditor = (props) => {
  const { title, handleChangeTitle, deleteList } = props;
  const [nTitle, setNTitle] = useState(title);
  console.log(title);
  const ref = useRef();
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.saveList();
    }
  };
  const handleClick = (e) => {
    const node = ref.current;
    if (node.contains(e.target)) {
      return;
    }
    props.onClickOutside();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return document.removeEventListener("click", handleClick, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="List-Title-Edit" ref={ref}>
        <textarea
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={nTitle}
          onChange={(e) => {
            setNTitle(e.target.value);
          }}
          onBlur={() => props.saveList(nTitle)}
          onKeyDown={onEnter}
          style={{ width: deleteList ? 220 : 245 }}
        />
        {deleteList && (
          <DeleteOutlined style={{ marginLeft: "8px" }} onClick={deleteList} />
        )}
      </div>
    </>
  );
};
export default ListEditor;
