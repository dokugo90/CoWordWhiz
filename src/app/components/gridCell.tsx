import { useEffect } from "react";
import { IGridCell } from "../types/interfaces";
import { AnimatePresence, motion, stagger } from "framer-motion";


export default function GridCell({ pos, board, currentY, currentX }: IGridCell) {

  function handleBackgroundColor() {
    if (board[pos.x][pos.y].isCorrectPosition) {
      return "#79b851"
    }

    if (board[pos.x][pos.y].isInWord) {
      return "#f3c237"
    }

    if (board[pos.x][pos.y].hasChar && !board[pos.x][pos.y].isInWord) {
      return "#a4aec4"
    }

    

    if (board[pos.x][pos.y].y == currentY) {
      return "#eaf4ff"
    } else {
      return ""
    }


  }

  

    return (
      <>
      <AnimatePresence>

      {/* {board[pos.x][pos.y].isCorrectPosition && (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    style={{
      scaleY: 0,
      backgroundColor: handleBackgroundColor(),
      border: board[pos.x][pos.y].y === currentY ? "2px solid #478de0" : "",
    }}
    transition={{ duration: 0.3 }}
    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-slate-100 border border-gray-400"
  >
    <motion.span className="text-black text-2xl font-extrabold">
      {board[pos.x][pos.y].char.toUpperCase()}
    </motion.span>
  </motion.div>
)}

      {board[pos.x][pos.y].isInWord && (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    style={{
      scaleY: 0,
      backgroundColor: handleBackgroundColor(),
      border: board[pos.x][pos.y].y === currentY ? "2px solid #478de0" : "",
    }}
    transition={{ duration: 0.3 }}
    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-slate-100 border border-gray-400"
  >
    <motion.span className="text-black text-2xl font-extrabold">
      {board[pos.x][pos.y].char.toUpperCase()}
    </motion.span>
  </motion.div>
)} */}
      
      {board[pos.x][pos.y].char !== "" && (
  <motion.div
    initial={{ scale: 1.15 }}
    animate={{ scale: 1 }}
    style={{
      scale: 1.15,
      backgroundColor: handleBackgroundColor(),
      border: board[pos.x][pos.y].y === currentY ? "2px solid #478de0" : "",
    }}
    transition={{ duration: 0.3 }}
    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-slate-100 border border-gray-400"
  >
    <motion.span className="text-black text-2xl font-extrabold">
      {board[pos.x][pos.y].char.toUpperCase()}
    </motion.span>
  </motion.div>
)}

{board[pos.x][pos.y].char === "" && (
  <motion.div
    style={{
      backgroundColor: handleBackgroundColor(),
      border: board[pos.x][pos.y].y === currentY ? "2px solid #478de0" : "",
    }}
    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-slate-100 border border-gray-400"
  >
    <motion.span className="text-black border-2 text-2xl font-extrabold">
      {board[pos.x][pos.y].char.toUpperCase()}
    </motion.span>
  </motion.div>
)}
      
      </AnimatePresence>
      </>
    );
  };