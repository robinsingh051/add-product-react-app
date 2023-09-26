import React from "react";

import Item from "../Item/Item";

const List = (props) => {
  return (
    <>
      <h2>{props.listTitle}</h2>
      {props.items.map((item) => (
        <Item key={item.id} onDelete={props.onDelete} item={item} />
      ))}
    </>
  );
};

export default List;
