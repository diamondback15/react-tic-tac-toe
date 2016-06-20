"use strict"

require('./style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './components/GameBoard';


//Append GameBoard to HTML element
ReactDOM.render(
	<GameBoard />,
	document.getElementById('rGameBoard')
);
