import React from "react";

import Item from "../Item/Item";

const List = (props) => {
  return (
    <>
      <h2 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {props.listTitle}
      </h2>
      {props.items.length === 0 ? (
        <p className="ml-12 mb-2">No item found</p>
      ) : (
        props.items.map((item) => (
          <Item key={item.id} onDelete={props.onDelete} item={item} />
        ))
      )}
    </>
  );
};

export default List;
