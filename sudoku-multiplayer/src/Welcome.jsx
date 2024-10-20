import { Input, Row, Col, Button, Layout, Flex, Alert, Slider } from "antd";
import React, { useState } from "react";
const { Content } = Layout;

export default function Welcome({ socket }) {
  const [showInputCode, setShowInputCode] = useState(false);
  const [showDifficultyRange, setShowDifficultyRange] = useState(false);
  const [inputRoomId, setInputRoomId] = useState();
  const [diffcultyvalue, setDiffcultyValue] = useState(10);
  const [alertVisible, setAlertVisible] = useState(false);
  const joinGame = function () {
    console.log(inputRoomId);
    if (inputRoomId.length == 6 && /^\d+$/.test(inputRoomId)) {
      socket.emit("joinGame", inputRoomId);

      setAlertVisible(false);
    } else {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };

  const createGame = function () {
    socket.emit("createGame", diffcultyvalue);
  };

  const sliderTooltip = {
    10: <span style={{ fontSize: "14px", color: "#1890ff" }}>Easy</span>,
    30: <span style={{ fontSize: "14px", color: "#1890ff" }}>Medium</span>,
    45: <span style={{ fontSize: "14px", color: "#1890ff" }}>Hard</span>,
    60: <span style={{ fontSize: "14px", color: "#1890ff" }}>Very Hard</span>,
  };
  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {alertVisible && (
          <Alert
            message="Error"
            description="Room ID must be 6 digits long and contain only numbers."
            type="error"
            showIcon
            style={{ marginBottom: "20px" }} // Add some space below the alert
          />
        )}

        {/* Join game */}
        {showInputCode && (
          <>
            <Input
              placeholder="Enter Room Id"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              style={{ width: "450px", marginBottom: "36px" }}
            />
            <Flex gap="18px" style={{ marginBottom: "44px" }}>
              <Button
                color="default"
                variant="filled"
                onClick={() => setShowInputCode(false)}
              >
                cancel
              </Button>
              <Button
                color="default"
                variant="solid"
                onClick={() => joinGame()}
              >
                Join Game
              </Button>
            </Flex>
          </>
        )}

        {/* Create Game */}
        {showDifficultyRange && (
          <>
            <Slider
              min={10}
              max={60}
              value={diffcultyvalue}
              onChange={setDiffcultyValue}
              marks={sliderTooltip}
              step={null}
              style={{ width: "250px", marginBottom: "64px" }}
            />
            <Flex gap="18px" style={{ marginBottom: "44px" }}>
              <Button
                color="default"
                variant="filled"
                onClick={() => setShowDifficultyRange(false)}
              >
                cancel
              </Button>
              <Button
                color="default"
                variant="solid"
                onClick={() => createGame()}
              >
                Create Game
              </Button>
            </Flex>
          </>
        )}
        {!showInputCode && !showDifficultyRange && (
          <Flex gap="18px" style={{ marginBottom: "44px" }}>
            <Button
              color="default"
              variant="solid"
              onClick={() => setShowDifficultyRange(true)}
            >
              Create Game
            </Button>
            <Button
              color="default"
              variant="filled"
              onClick={() => setShowInputCode(true)}
            >
              Join Game
            </Button>
          </Flex>
        )}
      </Content>
    </Layout>
  );
}
