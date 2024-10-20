import { Input, Row, Col, Button, Layout, Flex, Alert } from "antd";
import React, { useState } from "react";
const { Content } = Layout;

export default function Welcome({ socket }) {
  const [showInputCode, setShowInputCode] = useState(false);
  const [inputRoomId, setInputRoomId] = useState();
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
    socket.emit("createGame", "waiting for new room");
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
        {showInputCode ? (
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
        ) : (
          <Flex gap="18px" style={{ marginBottom: "44px" }}>
            <Button color="default" variant="solid" onClick={createGame}>
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
