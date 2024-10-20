import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Welcome from "./Welcome";
import SudokuGame from "./SudokuGame";
import { socket_url } from "../apiConfig";

function App() {
  const [mysocket, setMysocket] = useState(null);
  const [roomId, setRoomId] = useState();
  const [board, setBoard] = useState();
  const [solutionBoard, setSolutionBoard] = useState();
  const [showGame, setShowGame] = useState(false);
  const [initialBoard, setInitialBoard] = useState();

  function makeConnection() {
    const socket = io(socket_url, {
      transports: ["websocket"],
    });
    setMysocket(socket);
    socket.on("welcome", (arg) => {
      console.log(arg);
    });
    socket.on("gameCreated", (newGameState) => {
      const {
        roomId,
        board: { initialBoard, solutionBoard, currentBoardState },
      } = newGameState;

      setRoomId(roomId);
      setBoard(currentBoardState);
      setSolutionBoard(solutionBoard);
      setInitialBoard(initialBoard);
      setShowGame(true);
    });

    socket.on("joinExistingGame", (newGameState) => {
      const {
        roomId,
        board: { initialBoard, solutionBoard, currentBoardState },
      } = newGameState;

      setRoomId(roomId);
      setBoard(currentBoardState);
      setSolutionBoard(solutionBoard);
      setInitialBoard(initialBoard);
      setShowGame(true);
    });

    socket.on("gamestateupdated", (newGameState) => {
      const {
        roomId,
        board: { currentBoardState },
      } = newGameState;

      setBoard([...currentBoardState]);
    });

    socket.on("invalidRoom", (infoData) => {
      alert(infoData);
    });
  }

  // Only for reset current socket board state gamestateupdated not trigger for current socket so board not updated
  // Manual reset state
  const resetCurrentBoardState = function () {
    setBoard([...initialBoard]);
  };

  return (
    <>
      {showGame ? (
        <SudokuGame
          roomId={roomId}
          gameboard={board}
          socket={mysocket}
          solutionBoard={solutionBoard}
          initialBoard={initialBoard}
          onResetCurrentBoardState={resetCurrentBoardState}
        />
      ) : (
        <Welcome socket={mysocket} makeConnection={makeConnection} />
      )}
    </>
  );
}

export default App;
