"use strict"

require('./css/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './components/GameBoard';


//Adding GameBoard to HTML element
ReactDOM.render(
	<GameBoard />,
	document.getElementById('rGameBoard')
);
