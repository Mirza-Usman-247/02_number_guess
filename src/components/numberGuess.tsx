"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NumberGuessing {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

const NumberGuess = () => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [gamePause, setGamePause] = useState<boolean>(false);
  const [numberGuess, setNumberGuess] = useState(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  const handleStartGame = () => {
    setGameStart(true);
    setGameEnd(false);
    setGamePause(false);
    setAttempts(0);
  };

  useEffect(() => {
    if (gameStart && !gamePause) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1;
      setNumberGuess(randomNumber);
    }
  }, [gameStart, gamePause]);
  const handlePauseGame = () => {
    setGamePause(true);
  };
  const handleResumeGame = () => {
    setGamePause(false);
  };
  const handleGuess = () => {
    if (typeof userGuess === "number" && userGuess === numberGuess) {
      setGameEnd(true);
    } else {
      setAttempts(attempts + 1);
    }
  };
  const handleTryAgain = () => {
    setGameStart(false);
    setAttempts(0);
    setGameEnd(false);
    setUserGuess("");
  };
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };
  return (
    <div className="flex items-center justify-center bg-gray-300 h-screen">
      <Card>
        <CardContent>
          <CardHeader>
            <h1 className="text-center font-bold text-2xl mb-3">
              Number Guessing Game
            </h1>
          </CardHeader>
          <p className="text-center text-black mb-5 text-lg">
            Try to guess the number between 1 and 10!
          </p>
          {!gameStart && (
            <div className="flex justify-center">
              <Button onClick={handleStartGame}>Start</Button>
            </div>
          )}
          {gameStart && !gameEnd && (
            <div>
              <div className="flex justify-between gap-5">
                <Input
                  placeholder="Enter your guess number..."
                  type="number"
                  value={userGuess}
                  onChange={handleUserGuessChange}
                  className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                />
                <Button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleGuess}
                >
                  Guess
                </Button>
              </div>
              <div className="text-center text-black my-3 text-md font-semibold">
                <p>Attempts: {attempts}</p>
              </div>
              {gamePause ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-md py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-md py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
          )}
          {gameEnd && (
            <div>
              <div className="text-center mb-4 text-black">
                <h2 className="text-2xl font-bold">Game Over!</h2>
                <p>You guessed the number in {attempts} attempts.</p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleTryAgain}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberGuess;
