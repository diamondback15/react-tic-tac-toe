import React from 'react';
import TicTacToe from './TicTacToe';

//List multiple TicTacToe board
class GameBoard extends React.Component {
    render() {
        return (
	        <div className="tictactoes">
	        	<TicTacToe size="3" name="#1 3x3" />
	        	<TicTacToe size="4" name="#2 4x4" />
	        	<TicTacToe size="5" name="#3 5x5" />
	        </div>
        );
    }
};

export default GameBoard;
