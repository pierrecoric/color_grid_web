import { JSXElementConstructor, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cells from './Cells.tsx'

function App() {

  let cols: number = 12;
  let rows: number = 12;
  let randomArray: number [][] = [];

  //function to generate the random array
  function generateRandomArray(rows: number, cols: number, maxColors: number): number[][] {
    //create an empty array
    const randomArray: number [][] = [];
    for (let y: number = 0; y < rows; y++) {
      let currentRow: number[] = [];
      for (let x: number = 0; x < cols; x++) {
        let randomValue: number;
        do {
          randomValue = getRandomInt(0,maxColors);
        } while (hasSameNeighbor(randomArray, y, x, randomValue));
        currentRow.push(randomValue);
      }
      randomArray.push(currentRow);
    }
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

  function getRandomInt(min: number, max: number): number {
    // Ensure that min and max are integers
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    // Generate a random integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  randomArray = (generateRandomArray(rows, cols, 5));
  console.log(randomArray);

  let allCells: JSX.Element[] = [];
  for (let y: number = 0; y < rows; y++) {
    for (let x: number = 0; x < cols; x++) {
      allCells.push(
        <Cells key={y*12+x} id={`cells${y*12+x}`} colorClass={`color${randomArray[y][x]}`} text={randomArray[y][x]}
        />
        
      );
    }
  }

  return (
    <>
    <div className='grid grid-cols-8 gap-0'>
      {allCells}
    </div>
    </>
  )
}

export default App
