import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (index) => {
    if (!gameOver && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setGameOver(true);
        setWinner(gameWinner);
      }
    }
  };

  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
  };

  const renderSquare = (index) => {
    const squareValue = board[index];
    const squareStyle =
      squareValue === 'X'
        ? [styles.square, styles.redSquare]
        : squareValue === 'O'
        ? [styles.square, styles.blueSquare]
        : styles.square;

    return (
      <TouchableOpacity
        style={squareStyle}
        onPress={() => handleSquareClick(index)}
      >
        <Text style={styles.squareText}>{squareValue}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
        source={require('../src/bgs/tic-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.header,
            winner === 'X' ? styles.redText : winner === 'O' ? styles.blueText : null,
          ]}
        >
          {winner ? `Ganador: ${winner}` : 'X y O'}
        </Text>
      </View>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      {gameOver && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => resetGame()}
        >
          <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
        </TouchableOpacity>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(200, 250, 178, 0.85)',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    color: 'white',
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'column',
    backgroundColor: 'rgba(80, 231, 196, 0.85)',
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redSquare: {
    backgroundColor: 'red',
  },
  blueSquare: {
    backgroundColor: 'blue',
  },
  squareText: {
    fontSize: 40,
    color: 'white',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#CDAFAF',
    padding: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 18,
  },
});

export default TicTacToe;
