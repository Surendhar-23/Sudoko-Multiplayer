import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Layout, Flex, Typography } from "antd";
const { Title } = Typography;
const { Content } = Layout;

export default function SudokoGame({
  roomId,
  gameboard,
  socket,
  solutionBoard,
  initialBoard,
  onResetCurrentBoardState,
}) {
  // const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(""));

  const [board, setBoard] = useState(gameboard);
  console.log("solution", solutionBoard);
  console.log("initail", initialBoard);

  useEffect(() => {
    setBoard(gameboard);
  }, [gameboard]); // Runs only when gameboard prop changes

  const playerMoves = function (row, col, val) {
    if (initialBoard[row][col] != null) return;
    console.log(row, col, val);
    if (val > 0 || val == "") {
      const newBoard = [...board];
      newBoard[row][col] = val;
      setBoard(newBoard);
      socket.emit("playermove", { roomId, board: newBoard });
    }
  };
  const handleResetBoard = function () {
    const userConfirm = confirm("You want to reset the Board :");
    if (!userConfirm) return;
    socket.emit("playermove", { roomId, board: initialBoard });
    onResetCurrentBoardState();
  };

  const getInputStyle = (rowIndex, colIndex, value) => {
    const initialValue = initialBoard[rowIndex][colIndex];
    const solutionValue = solutionBoard[rowIndex][colIndex];

    if (value === "" || value === null) {
      return { color: "black" }; // Initial empty cell
    }

    if (value !== initialValue) {
      console.log(value, initialValue, solutionValue);

      return { color: value == solutionValue ? "blue" : "red" }; // Mismatched values
    }
    return { color: "black" }; // Initial values
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Flex justify="center">
        <Title
          style={{
            textAlign: "center",
            fontSize: "36px",
            letterSpacing: "8px",
            marginBottom: "-6px",
          }}
        >
          {roomId}
        </Title>
      </Flex>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Sudoku Game</h2>
        {/* {Array.from({ length: size }, (_, row) => renderRow(row))} */}

        {board.map((row, rowindex) => {
          return (
            <Row key={rowindex}>
              {row.map((col, colindex) => {
                return (
                  <Col key={colindex} style={{ padding: "2px" }}>
                    <Input
                      value={board[rowindex][colindex]}
                      maxLength={1}
                      onChange={(e) =>
                        playerMoves(rowindex, colindex, e.target.value)
                      }
                      style={{
                        width: "50px",
                        height: "50px",
                        textAlign: "center",
                        fontSize: "24px",
                        ...getInputStyle(
                          rowindex,
                          colindex,
                          board[rowindex][colindex]
                        ), // Apply dynamic styling
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Button
          type="primary"
          onClick={handleResetBoard}
          style={{ marginTop: "20px" }}
        >
          Reset
        </Button>
      </Content>
    </Layout>
  );
}
