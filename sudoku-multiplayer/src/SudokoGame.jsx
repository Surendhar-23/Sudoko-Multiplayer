import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Layout, Flex, Typography } from "antd";
const { Title } = Typography;
const { Content } = Layout;

export default function SudokoGame({ roomId, gameboard, socket }) {
  // const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
  console.log(roomId, gameboard);

  const [board, setBoard] = useState(gameboard);

  useEffect(() => {
    setBoard(gameboard);
  }, [gameboard]); // Runs only when gameboard prop changes

  const playerMoves = function (row, col, val) {
    console.log(row, col, val);
    if (val > 0) {
      const newBoard = [...board];
      newBoard[row][col] = val;
      setBoard(newBoard);
      socket.emit("playermove", { roomId, board: newBoard });
    }
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
          // onClick={handleReset}
          style={{ marginTop: "20px" }}
        >
          Reset
        </Button>
      </Content>
    </Layout>
  );
}
