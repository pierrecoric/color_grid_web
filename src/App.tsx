import { JSXElementConstructor, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cells from './Cells.tsx'

function App() {
  //defining the amount of columns and rows + the max amount of colors
  let cols: number = 8;
  let rows: number = 12;
  let amountColors: number = 6;
  //declaring an empty array
  let randomArrayCells: number [][] = [];
  let randomArrayCircles: number [][] = [];

  //function to generate the random array
  function generateRandomArray(rows: number, cols: number, maxColors: number): number[][] {
    //make locally an empty array
    const randomArray: number [][] = [];
    //initialize all the cells to zero
    for (let y: number = 0; y < rows; y++) {
      let currentRow: number[] = [];
      for (let x: number = 0; x < cols; x++) {
        currentRow.push(0);
      }
      randomArray.push(currentRow);
    }
    //generate random numbers while checking that the neigboring cells don't have the same value
    for (let y: number = 0; y < rows; y++) {
      for (let x: number = 0; x < cols; x++) {
        let randomValue: number;
        do {
          randomValue = getRandomInt(0,maxColors);
        } while (hasSameNeighbor(randomArray, y, x, randomValue));
        randomArray[y][x] = randomValue;
      }
    }
    //return the random array
    return randomArray;
  }

  // Function to check if a cell has the same neighbor
  function hasSameNeighbor(array: number[][], row: number, col: number, value: number): boolean {
    const neighbors: number[][] = [
      [row - 1, col], // Top
      [row + 1, col], // Bottom
      [row, col - 1], // Left
      [row, col + 1]  // Right
    ];
    // Check if one of the neighbors has the same value
    for (const neighbor of neighbors) {
      const r: number = neighbor[0];
      const c: number = neighbor[1];
      // Check if the neighbor coordinates are within bounds and have the same value
      if (r >= 0 && r < array.length && c >= 0 && c < array[0].length && array[r][c] === value) {
        return true; // Value is the same as a neighbor
      }
    }
    return false; // No neighbor has the same value
  }

  //generate random integer between two values
  function getRandomInt(min: number, max: number): number {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    // Generate a random integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  function generateDifferentNumber(initial: number): number {
    let result: number = initial;
    do {
      result = getRandomInt(0, amountColors);
    } while (result == initial);
    return result
  }

  randomArrayCells = (generateRandomArray(rows, cols, amountColors));
  randomArrayCircles = (generateRandomArray(rows, cols, amountColors));

  for (let y: number = 0; y < rows; y++) {
    for (let x: number = 0; x < cols; x++) {      
      randomArrayCircles[y][x] = generateDifferentNumber(randomArrayCells[y][x]);
    }
  }


  //generate all the cells 
  let allCells: JSX.Element[] = [];
  for (let y: number = 0; y < rows; y++) {
    for (let x: number = 0; x < cols; x++) {
      allCells.push(
        <Cells 
          key={y*12+x} 
          id={`cells${y*12+x}`} 
          colorClass={`color${randomArrayCells[y][x]}`} 
          insideColorClass={`color${randomArrayCircles[y][x]}`}
          text={randomArrayCells[y][x]}
        />
      );
    }
  }

  return (
    <>
    <div className={`grid grid-cols-${cols} gap-0`}>
      {allCells}
    </div>
    </>
  )
}

export default App
