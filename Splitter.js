"use strict";

/**
 * Created by theoutlander on 2/15/14.
 */

define(function () {

    return function (opts) {

        var clicked,
            options = opts || {},
            expandLocation = null,
            placeholderSplitter = null,
            topPercent,
            bottomPercent;

        options.collapse = opts.collapse || 'fixed';
        options.draggable = opts.draggable != false ? true : false;
        options.orientation = opts.orientation || 'vertical';
        options.placeholderSplitter = opts.placeholderSplitter != false ? true : false;

        /*
         * Event Handlers
         * */
        var mouseOverHandler = function () {
            if (options.draggable) {
                if (options.orientation === 'horizontal') {
                    options.splitter.style.cursor = 'row-resize';
                }
                else {
                    options.splitter.style.cursor = 'col-resize';
                }
            }
        };

        var mouseDownHandler = function () {
            if (options.draggable) {
                if (options.orientation === 'horizontal') {
                    document.body.style.cursor = 'row-resize';
                }
                else {
                    document.body.style.cursor = 'col-resize';
                }
                clicked = true;
            }
        };

        var mouseUpHandler = function (e) {
            if (options.draggable && clicked) {
                clicked = false;
                document.body.style.cursor = '';

                if (placeholderSplitter != null) {
                    placeholderSplitter.removeEventListener('mousemove', mouseMoveHandler);
                    placeholderSplitter.parentNode.removeChild(placeholderSplitter);
                    placeholderSplitter = null;

                    if (options.orientation === 'horizontal') {
                        bottomPercent = (window.innerHeight - e.y) / window.innerHeight * 100;
                        options.elementOne.style.bottom = bottomPercent + "%";
                        options.elementTwo.style.top = options.splitter.style.top = (100 - bottomPercent) + "%";
                    }
                    else {
                        topPercent = (window.innerWidth - e.x) / window.innerWidth * 100;
                        options.elementOne.style.right = topPercent + "%";
                        options.elementTwo.style.left = options.splitter.style.left = (100 - topPercent) + "%";
                    }
                }
            }
        };

        var mouseMoveHandler = function (e) {

            if (options.draggable && clicked) {
                expandLocation = null;

                if (options.elementTwo.parentNode == null) {
                    options.elementOne.parentNode.appendChild(options.elementTwo);
                }
                else if (options.elementOne.parentNode == null) {
                    options.elementTwo.parentNode.appendChild(options.elementOne);
                }

                if (!options.placeholderSplitter) {
                    if (options.orientation === 'horizontal') {
                        bottomPercent = (window.innerHeight - e.y) / window.innerHeight * 100;
                        options.elementOne.style.bottom = bottomPercent + "%";
                        options.elementTwo.style.top = options.splitter.style.top = (100 - bottomPercent) + "%";
                    }
                    else {
                        topPercent = (window.innerWidth - e.x) / window.innerWidth * 100;
                        options.elementOne.style.right = topPercent + "%";
                        options.elementTwo.style.left = options.splitter.style.left = (100 - topPercent) + "%";
                    }
                }
                else {

                    if (!placeholderSplitter) {
                        placeholderSplitter = options.splitter.cloneNode(true);
                        placeholderSplitter.id = 'placeholderSplitter';
                        placeholderSplitter.addEventListener('mousemove', mouseMoveHandler);
                        options.splitter.parentNode.appendChild(placeholderSplitter);
                    }

                    if (options.orientation === 'horizontal') {
                        placeholderSplitter.style.top = window.innerHeight - (window.innerHeight - e.y) + "px";
                    }
                    else {
                        placeholderSplitter.style.left = window.innerWidth - (window.innerWidth - e.x) + "px";
                    }
                }
            }
        };

        var doubleClickHandler = function () {
            if (options.orientation === 'horizontal') {

                if (options.collapse === 'top') {
                    if (expandLocation != null) {
                        options.elementOne.style.bottom = (window.innerHeight - parseInt(expandLocation)) + "px";
                        options.splitter.style.top = options.elementTwo.style.top = expandLocation;
                        expandLocation = null;
                        options.elementTwo.parentNode.appendChild(options.elementOne);
                    } else {
                        expandLocation = options.splitter.style.top;

                        options.splitter.style.top = options.elementTwo.style.top = ((options.elementOne.getBoundingClientRect().height + options.elementTwo.getBoundingClientRect().height) - options.elementTwo.getBoundingClientRect().bottom) + "px";

                        options.elementOne.style.bottom = (window.innerHeight - parseInt(options.elementTwo.style.top)) + "px";
                        options.elementOne.parentNode.removeChild(options.elementOne);
                    }
                } else if (options.collapse === 'bottom') {
                    if (expandLocation != null) {
                        options.elementOne.style.bottom = (window.innerHeight - parseInt(expandLocation)) + "px";
                        options.splitter.style.top = options.elementTwo.style.top = expandLocation;
                        expandLocation = null;
                        options.elementOne.parentNode.appendChild(options.elementTwo);
                    } else {
                        expandLocation = options.splitter.style.top;
                        options.splitter.style.bottom = options.elementOne.style.bottom = (window.innerHeight - options.elementTwo.getBoundingClientRect().bottom) + "px";
                        options.elementTwo.style.top = (window.innerHeight - parseInt(options.elementOne.style.bottom)) + "px";
                        options.splitter.style.top = '';
                        options.elementTwo.parentNode.removeChild(options.elementTwo);
                    }
                }
            }
            else {
                if (options.collapse === 'left') {
                    if (expandLocation != null) {
                        options.elementOne.style.right = (window.innerWidth - parseInt(expandLocation)) + "px";
                        options.splitter.style.left = options.elementTwo.style.left = expandLocation;
                        expandLocation = null;
                        options.elementTwo.parentNode.appendChild(options.elementOne);
                    } else {
                        expandLocation = options.splitter.style.left;
                        options.splitter.style.left = options.elementTwo.style.left = (options.elementOne.getBoundingClientRect().width + options.elementTwo.getBoundingClientRect().width - options.elementTwo.getBoundingClientRect().right) + "px";
                        options.elementOne.style.right = (window.innerWidth - parseInt(options.elementTwo.style.left)) + "px";
                        options.elementOne.parentNode.removeChild(options.elementOne);
                    }
                } else if (options.collapse === 'right') {
                    if (expandLocation != null) {
                        options.elementOne.style.right = (window.innerWidth - parseInt(expandLocation)) + "px";
                        options.splitter.style.left = options.elementTwo.style.left = expandLocation;
                        expandLocation = null;
                        options.elementOne.parentNode.appendChild(options.elementTwo);
                    } else {
                        expandLocation = options.splitter.style.left;
                        options.splitter.style.right = options.elementOne.style.right = (window.innerWidth - options.elementTwo.getBoundingClientRect().right) + "px";
                        options.elementTwo.style.left = (window.innerWidth - parseInt(options.elementOne.style.right)) + "px";
                        options.splitter.style.left = '';
                        options.elementTwo.parentNode.removeChild(options.elementTwo);
                    }
                }
            }
        };

        var windowResizeHandler = function () {
            var windowResizeBounds = options.elementOne.getBoundingClientRect();

            if (options.orientation === 'vertical') {
                options.splitter.style.top = options.elementOne.clientTop;
                options.splitter.style.bottom = (options.elementOne.parentNode.clientHeight - windowResizeBounds.height) + "px";
                options.splitter.style.left = windowResizeBounds.right + "px";
            } else if (options.orientation === 'horizontal') {
                options.splitter.style.left = options.elementOne.clientLeft;
                options.splitter.style.right = (options.elementOne.parentNode.clientWidth - windowResizeBounds.width) + "px";
                options.splitter.style.top = windowResizeBounds.bottom + "px";
            }
        };

        var registerEvents = function () {
            options.splitter.addEventListener('mouseover', mouseOverHandler);
            options.splitter.addEventListener('mousedown', mouseDownHandler);
            options.splitter.addEventListener('dblclick', doubleClickHandler);
            document.body.addEventListener('mousemove', mouseMoveHandler);
            document.body.addEventListener('mouseup', mouseUpHandler);
            window.addEventListener('resize', windowResizeHandler);
        };

        var render = function () {

            options.splitter.style.zIndex = 999999;
            options.splitter.style.position = 'absolute';

            if (!!options.splitterHeight) {
                options.splitter.style.height = options.splitterHeight;
            }
            else if (!!options.splitterWidth) {
                options.splitter.style.width = options.splitterWidth;
            }

            var renderBounds = options.elementOne.getBoundingClientRect();

            if (options.orientation === 'vertical') {
                options.splitter.style.top = options.elementOne.clientTop;
                options.splitter.style.bottom = (options.elementOne.parentNode.clientHeight - renderBounds.height) + "px";
                options.splitter.style.left = renderBounds.right + "px";
            } else {
                options.splitter.style.left = options.elementOne.clientLeft;
                options.splitter.style.right = (options.elementOne.parentNode.clientWidth - renderBounds.width) + "px";
                options.splitter.style.top = renderBounds.bottom + "px";
            }

            registerEvents();
        };

        return {
            Render: render
        };
    };
});