import "./boards.css";
import React, { useState } from "react";
import { boardList } from "../../helpers/boards";

const ProductsPage = () => {
  const [sourceBoard, setSourceBoard] = useState(null);
  const [targetBoard, setTargetBoard] = useState(null);
  const [sourcetItem, setSourceItem] = useState(null);
  const [targetItem, setTargetItem] = useState(null);
  const [boards, setBoards] = useState(boardList);

  const [activeItem, setActiveItem] = useState({});
  const getStyles = (id) => (activeItem[id] ? activeItem[id] : {});

  const onDragOverBoardHandler = (e, board) => {
    e.preventDefault();
    const { classList } = e.target;
    if (classList.contains("board_items")) {
      if (!activeItem[`b-${board.id}`]) {
        setActiveItem({
          [`b-${board.id}`]: { border: "0.2em dashed lightgray" },
        });
      }
    }
  };

  const onDragEndBoardHandler = (e) => {
    setActiveItem({});
    const currentIndex = sourceBoard.items.indexOf(sourcetItem);
    sourceBoard.items.splice(currentIndex, 1);
    if (targetItem) {
      const dropIndex = targetBoard.items.indexOf(targetItem);
      targetBoard.items.splice(dropIndex, 0, sourcetItem);
    } else {
      targetBoard.items.push(sourcetItem);
    }
    setBoards(
      boards.map((b) => {
        if (b.id === targetBoard.id) {
          return targetBoard;
        }
        if (b.id === sourceBoard.id) {
          return sourceBoard;
        }
        return b;
      })
    );
    setTargetBoard(null);
    setTargetItem(null);
  };

  const onDragOverItemHandler = (e, item) => {
    e.preventDefault();
    const { classList } = e.target;
    if (
      classList.contains("board_item_wrapper") ||
      classList.contains("board_item")
    ) {
      if (!activeItem[`i-${item.id}`]) {
        setActiveItem({
          [`i-${item.id}`]: {
            border: "0.2em dashed lightgray",
          },
        });
      }
    }
  };

  return (
    <ul className="boards">
      {boards.map((board) => (
        <li className="board" key={board.id}>
          <div className={"board_header " + board.label}>
            <span className="board_title">{board.title}</span>
            <span className="board_item_count">{board.items.length}</span>
          </div>
          <div className="board_content">
            <ul
              style={getStyles(`b-${board.id}`)}
              draggable={true}
              className="board_items"
              onDragStart={(e) => setSourceBoard(board)}
              onDrop={(e) => setTargetBoard(board)}
              onDragOver={(e) => onDragOverBoardHandler(e, board)}
              onDragEnd={(e) => onDragEndBoardHandler(e)}
            >
              {board.items.map((item, key) => (
                <div
                  draggable={true}
                  className="board_item_wrapper"
                  style={getStyles(`i-${item.id}`)}
                  key={key}
                  onDrop={(e) => setTargetItem(item)}
                  onDragStart={(e) => setSourceItem(item)}
                  onDragOver={(e) => onDragOverItemHandler(e, item)}
                >
                  <li className={"board_item " + board.label} key={key}>
                    {item.title}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;
