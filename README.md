**Simple Javascript Splitter with no 3rd party dependencies.**

### Usage: Vertical splitter between two divs

    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <link href="VerticalSplitterDemo.css" rel="stylesheet" type="text/css">
        <script src="http://www.requirejs.org/docs/release/2.1.10/minified/require.js"></script>
    </head>
    <body>

    <div id=leftDiv class="unselectable">Left</div>
    <div id=rightDiv class="unselectable">Right</div>

    <div id=splitterDiv class="verticalsplitter"></div>

    <script>
        require(['../../Splitter'], function (Splitter) {
            new Splitter({
                elementOne: leftDiv,       // Div to the left of the splitter
                elementTwo: rightDiv,      // Div to the right of the splitter
                splitter: splitterDiv,     // Splitter div
                orientation: 'vertical',   // Orientation [vertical | horizontal]
                collapse: 'left',          // Collapse Direction [left | right | top | bottom]
                dummySplitter: true        // Move a dummy splitter instead of refreshing entire content
            }).Render();
        });
    </script>

    </body>
    </html>

