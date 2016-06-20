import React from 'react';
import GameBoard from './GameBoard';

//Individual game
class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
	    () => this.handleClick.bind(this);
	    () => this.restartGame.bind(this);
	    
		this.iniState(props);
    }
      
	iniState(props){
		var ticTacToeBoxes = {};
		
		// Build the board's data
		for(var y = 0; y < this.props.size; y++){
			for(var x = 0; x < this.props.size; x++){
		    	ticTacToeBoxes["c" + y + x] = {
		        	x : x,
		        	y : y,
		        	owner : ""
		    	}
			}
		}
	
		this.state = {
			turn: "Player 1",
			board: ticTacToeBoxes, 
			gameOver: false,
			winner: false,
			counter: 0
		};
	}

	restartGame(){
		this.iniState(this.props);
		this.forceUpdate();
	}

    handleClick(x, y) {
	    	    
		if(this.state.gameOver){
			return false;
		}
				
		var winner = false;
				
		//Set cell owner
		var board = this.state.board;
        board["c" +x + y].owner = this.state.turn;
        
        // Check for winners
        if (this.checkWinner(x, y, this.state.turn)) {
            winner = this.state.turn + " wins!";
            this.setState({gameOver: true, winner: winner});
        }

        // Check if it's a draw
        if (this.checkDraw() && winner == false) {
            var winner = "It's a draw!";
            this.setState({gameOver: 'draw', winner: winner});
        }

        // Forces the view to update
        this.setState({
            turn: this.state.turn == "Player 1" ? "Player 2" : "Player 1",
            board: board
        });
        
    }

    checkWinner(x, y, player) {

        var board = this.state.board;
        var size = this.props.size;

        //Winning counter
        var h = 0, v = 0, d = 0, rd = 0;

        for (var lineLength = 0; lineLength < size; lineLength++) {

            //Horizontal
            if (board["c" + lineLength + y].owner == this.state.turn)
            	h++;

            //Vertical
            if (board["c" + x + lineLength].owner == this.state.turn)
            	v++;

            //Diagonal
            if (board["c" + lineLength + lineLength].owner == this.state.turn)
            	d++;

            //Reverse Diagonal
            if (board["c" + lineLength + ((size - 1) - lineLength)].owner == this.state.turn)
            	rd++;

						//First counter to hit size value win
            if(h == size || v == size || d == size || rd == size)
	        	return true;


        }

        return false;
    }

    checkDraw() {
        var counter = this.state.counter + 1;
        this.setState({counter: counter});

        return (counter >= Math.pow(this.props.size, 2));
 
        
    }

    render() {
	    
	    var self = this;
	    var gridClasses = "";
		var stateMessage = "";
        var rows = [];
        
        for (var x = 0; x < this.props.size; x++) {
            var columns = [];
            for (var y = 0; y < this.props.size; y++) {
                columns.push(y)
            }
            rows.push(columns);
        }
		
		gridClasses += this.state.turn.toLowerCase().replace(/ /g,"") + '-turn';

		//Add status + classes game is over
      	if(this.state.gameOver && this.state.winner){
        	gridClasses += " gameOver";
        	stateMessage = this.state.winner;
        	if(this.state.gameOver == 'draw')
        		gridClasses += " gameIsDraw";
		}else{
			stateMessage = this.state.turn + ' turn';
		}

        return (

            <div className={"ticTacToeContainer " + gridClasses}>
                <p className="title_board">TicTacToe {this.props.name}</p>
                <div className="GameBoard">
                    <div className="rTable">
                    	<div className="rTableBody">

	                    {rows.map((row,x) => {
	                        return (
	                            <div key={"row" + x } className="rTableRow">
	                                {columns.map((column,y) => {
										var owner = self.state.board["c" + x + y].owner;
	                                    
	                                    if ( owner === "") {
	                                        return (<div key={"column" + y} className="rTableCell">
	                                                    <a key={"cell" + x + "" + y} onClick={()=>{self.handleClick(x,y)}} className="emptyCell"></a>
	                                                </div>);
	                                    } else {
	                                        var checkedImage = "./img/icon_" + owner.toLowerCase().replace(/ /g,"_") + ".png";
	                                        return (<div key={"column" + y} className="rTableCell">
	                                                    <img src={checkedImage} className="checkedCell" />
	                                                </div>);
	                                    }
	
	                                })}
	                            </div>
	                            );
	                    })}
						
						</div>
						<img className={"size" + self.props.size + " winnerImage"} src={"./img/winner" + self.props.size  + ".gif"} />
						<img className={"size" + self.props.size + " winnerImage drawImage"} src={"./img/draw" + self.props.size  + ".gif"} />
					</div>
                </div>
                <p className="playerturn">{stateMessage}</p>
				{self.state.gameOver ? <a onClick={()=>{self.restartGame(self)}} className="resetBoard">Reset</a> : ''}
            </div>

        );

    }
};

export default TicTacToe;
