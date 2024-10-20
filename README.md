
# Sudoku Multiplayer Game

This project is a multiplayer **Sudoku game** built using **React** and **Socket.io**, where players can join a room and collaboratively solve a Sudoku puzzle in real time. The application allows multiple users to join a game room via a unique room ID and play the game together.

## Features

- **Multiplayer Sudoku**: Multiple players can join the same room and solve the Sudoku puzzle together.
- **Real-time Updates**: All players in the room see live updates as others fill in the puzzle cells.
- **Error Handling**: If a player makes an incorrect move (e.g., entering an invalid number), an error message is displayed.
- **Create & Join Game Rooms**: Users can create a new game room or join an existing one using a 6-digit room ID.
- **Auto-hide Alerts**: Error alerts disappear automatically after 5 seconds or when the user clicks anywhere on the screen.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Socket.io**: WebSocket library for real-time, bidirectional communication between the client and the server.
- **Ant Design (AntD)**: UI component library for styling and responsive layout.
- **Node.js**: Backend for managing game logic and WebSocket connections.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **NPM** or **Yarn**: Package manager to install dependencies.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Surendhar-23/Sudoko-Multiplayer.git
    cd sudoku-multiplayer
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the application**:
    ```bash
    npm start
    ```

4. **Run the backend server** (if using a custom backend with Socket.io):
    ```bash
    cd server
    npm install
    npm start
    ```

### Running the App

1. Open the application in your browser:
   ```
   http://localhost:3000
   ```
2. **Create a new game** by clicking "Create Game" or **Join an existing game** by entering the room ID.
3. Once a game room is joined, start solving the Sudoku puzzle collaboratively.

## Game Flow

1. **Create a game** or **Join a game** using a 6-digit room ID.
2. Once connected, a partially filled Sudoku board is generated.
3. Players can collaboratively fill in the missing numbers in real-time.
4. If an incorrect number is entered, an error message will be shown.
5. Players can keep solving the puzzle until it's completed.

## Contributing

Feel free to contribute to this project by opening a pull request, reporting bugs, or suggesting improvements. Follow the standard Git workflow for contributions:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit: `git commit -m "Add some feature"`
4. Push your branch: `git push origin feature-branch-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License.
