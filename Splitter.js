"use strict";

/**
 * Created by theoutlander on 2/15/14.
 */

define(function () {

	return function (opts) {

		var options = opts || {},
			clicked,
			expandLocation,
			bounds;

		options.orientation = opts.orientation || 'vertical';
		options.collapse = opts.collapse || 'left';

		/*
		 * Event Handlers
		 * */
		var mouseOverHandler = function () {
			if (options.orientation === 'horizontal') {
				options.splitter.style.cursor = 'row-resize';
			}
			else {
				options.splitter.style.cursor = 'col-resize';
			}
		};

		var mouseDownHandler = function () {
			if (options.orientation === 'horizontal') {
				document.body.style.cursor = 'row-resize';
			}
			else {
				document.body.style.cursor = 'col-resize';
			}

			clicked = true;
		};

		var mouseUpHandler = function () {
			if (clicked) {
				clicked = false;
				document.body.style.cursor = '';
			}
		};

		var mouseMoveHandler = function (e) {

			if (clicked) {
				if (options.orientation === 'horizontal') {
					options.elementOne.textContent = "window height: " + window.innerHeight + " Mouse Y coordinate: " + e.y + " = " + (window.innerHeight - e.y) + "px";

					options.elementOne.style.bottom = (window.innerHeight - e.y) + "px";
					options.elementTwo.style.top = options.splitter.style.top = window.innerHeight - (window.innerHeight - e.y) + "px";

					//options.elementOne.style.bottom = options.elementOne.style.height = e.y + "px";

					//options.elementOne.textContent = options.elementOne.style.bottom = (window.innerHeight - e.y) + "px"
					//options.splitter.style.bottom = window.innerHeight - (window.innerHeight - e.y + 8) + "px";

					//options.splitter.style.bottom = (window.innerHeight - e.y - options.splitter.style.height) + "px";;

					//options.elementTwo.style.top =(window.innerHeight - e.y) + "px";
				}
				else {
					options.elementOne.style.right = options.elementOne.style.width = e.x + "px";
					options.elementTwo.style.left = options.splitter.style.left = options.elementOne.style.right;
				}
			}
		};

		var doubleClickHandler = function () {
			if (options.orientation === 'horizontal') {

				if (options.collapse === 'top') {
					if (options.splitter.style.top === '0px') {
						options.elementOne.style.bottom = options.splitter.style.top = options.elementTwo.style.top = expandLocation;
						options.elementOne.style.visibility = 'visible';
					} else {
						expandLocation = options.splitter.style.top;
						options.splitter.style.top = options.elementTwo.style.top = 0;
						options.elementOne.style.visibility = 'hidden';
					}
				} else if (options.collapse === 'bottom') {
					if (options.splitter.getBoundingClientRect().bottom == 0) {
						options.elementOne.style.bottom = options.splitter.style.top = options.elementTwo.style.top = expandLocation;
						//options.elementOne.style.bottom = options.splitter.style.top = options.elementTwo.style.top = options;
						options.elementTwo.style.visibility = 'visible';
					} else {
						expandLocation = options.splitter.style.top;
						options.splitter.style.bottom = options.elementOne.style.bottom = (window.innerHeight - options.elementTwo.getBoundingClientRect().bottom) + "px";
						options.splitter.style.top = '';
						options.elementTwo.style.visibility = 'hidden';
					}
				}
			}
			else {
				if (options.collapse === 'left') {
					if (options.splitter.style.left === '0px') {
						options.elementOne.style.right = expandLocation;
						options.splitter.style.left = expandLocation;
						options.elementTwo.style.left = expandLocation;

						options.elementOne.style.visibility = 'visible';
					} else {
						expandLocation = options.splitter.style.left;
						options.splitter.style.left = options.elementTwo.style.left = 0;
						options.elementOne.style.visibility = 'hidden';
					}
				} else if (options.collapse === 'right') {
					if (options.splitter.style.right === '0px') {
						options.elementOne.style.right = options.splitter.style.left = options.elementTwo.style.left = expandLocation;

						options.elementTwo.style.visibility = 'visible';
					} else {
						expandLocation = options.splitter.style.left;
						options.splitter.style.right = options.elementOne.style.right = 0;
						options.splitter.style.left = '';
						options.elementTwo.style.visibility = 'hidden';
					}
				}
			}
		};

		var registerEvents = function () {
			options.splitter.addEventListener('mouseover', mouseOverHandler);
			options.splitter.addEventListener('mousedown', mouseDownHandler);
			options.splitter.addEventListener('dblclick', doubleClickHandler);
			options.splitter.addEventListener('mouseup', mouseUpHandler);
			options.splitter.addEventListener('mousemove', mouseMoveHandler);

			options.elementOne.addEventListener('mousemove', mouseMoveHandler);
			options.elementTwo.addEventListener('mousemove', mouseMoveHandler);

			document.body.addEventListener('mouseup', mouseUpHandler);
			//document.body.addEventListener('mousemove', mouseMoveHandler);
		};

		var render = function () {

			options.splitter.style.zIndex = 999999;
			options.splitter.style.position = 'absolute';

			bounds = options.elementOne.getBoundingClientRect();

			if (options.orientation === 'vertical') {

				options.splitter.style.top = (options.splitter.style.top || bounds.top) + "px";
				options.splitter.style.bottom = (bounds.bottom - bounds.height) + "px";
				options.splitter.style.left = bounds.right + "px";

			} else {

				options.splitter.style.left = (options.splitter.style.left || bounds.left) + "px";
				options.splitter.style.right = (bounds.right - bounds.width) + "px";
				options.splitter.style.top = bounds.bottom + "px";
			}

			registerEvents();
		};

		return {
			Render: render
		};
	};
});