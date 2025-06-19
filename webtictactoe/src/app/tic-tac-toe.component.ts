import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css',
})
export class TicTacToeComponent {
  /** 3x3 board, each cell is 'X', 'O', or '' */
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  /** Current turn, 'X' or 'O' */
  currentPlayer: 'X' | 'O' = 'X';

  /** Game status: null, player ('X'/'O') wins, or 'Draw' */
  status: null | 'X' | 'O' | 'Draw' = null;

  /** Show restart button after win or draw */
  get isGameOver(): boolean {
    return !!this.status;
  }

  // PUBLIC_INTERFACE
  makeMove(row: number, col: number): void {
    if (this.status || this.board[row][col]) {
      return; // No move if game over or cell occupied
    }
    this.board[row][col] = this.currentPlayer;
    if (this.checkWinner(this.currentPlayer)) {
      this.status = this.currentPlayer;
    } else if (this.isDraw()) {
      this.status = 'Draw';
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // PUBLIC_INTERFACE
  restart(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.status = null;
  }

  // Checks if the current player has won
  private checkWinner(player: 'X' | 'O'): boolean {
    // Rows, Columns, Diagonals
    return (
      [0,1,2].some(i => this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player) ||
      [0,1,2].some(i => this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) ||
      (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) ||
      (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player)
    );
  }

  // PUBLIC_INTERFACE
  isDraw(): boolean {
    return this.board.flat().every(cell => cell) && !this.status;
  }
}
