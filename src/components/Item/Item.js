import React from "react";

const Item = (props) => {
  const DeleteHandler = () => {
    props.onDelete(props.item.id);
  };
  return (
    <>
      <li>
        {props.item.id + "\t" + props.item.name + "\t" + props.item.category}
      </li>
      <button onClick={DeleteHandler}>Delete</button>
    </>
  );
};

export default Item;
