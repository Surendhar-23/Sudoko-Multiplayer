import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Welcome from "./Welcome";
import SudokoGame from "./sudokoGame";

function App() {
  const [mysocket, setMysocket] = useState(null);
  const [roomId, setRoomId] = useState();
  const [board, setBoard] = useState();
  const [showGame, setShowGame] = useState(false);
  useEffect(() => {
    function makeConnection() {
      const socket = io("ws://localhost:3000");
      setMysocket(socket);
      socket.on("welcome", (arg) => {
        console.log(arg);
      });
      socket.on("gameCreated", (newGameState) => {
        const { roomId, board } = newGameState;

        setRoomId(roomId);
        setBoard(board);
        setShowGame(true);
      });

      socket.on("joinExistingGame", (newGameState) => {
        const { roomId, board } = newGameState;
        setRoomId(roomId);
        setBoard(board);
        setShowGame(true);
      });

      socket.on("gamestateupdated", (newGameState) => {
        const { roomId: changeRoomId, board } = newGameState;
        console.log(newGameState);

        // if (roomId == changeRoomId) {
        //   alert("hhl");
        setBoard([...board]);
        // }
      });

      socket.on("invalidRoom", (infoData) => {
        alert(infoData);
      });
    }
    makeConnection();
  }, []);

  return (
    <>
      {showGame ? (
        <SudokoGame roomId={roomId} gameboard={board} socket={mysocket} />
      ) : (
        <Welcome socket={mysocket} />
      )}
    </>
  );
}

export default App;
