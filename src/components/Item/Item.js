import React from "react";

const Item = (props) => {
  const DeleteHandler = () => {
    props.onDelete(props.item.id);
  };
  return (
    <div className="flex items-center mb-2 border border-gray-300 p-2 rounded-lg">
      <li className="ml-4">
        {props.item.id + "\t" + props.item.name + "\t" + props.item.category}
      </li>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-10"
        onClick={DeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Item;
