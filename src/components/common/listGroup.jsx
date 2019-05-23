import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    selectedItem,
    onItemSelect,
    valueProperty
  } = props;

  return (
    <ul className="list-group">
      {items.map(i => (
        <li
          onClick={() => onItemSelect(i)}
          key={i[valueProperty]}
          className={
            i === selectedItem
              ? " clickable list-group-item active"
              : "clickable list-group-item"
          }
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//defult propraty

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
