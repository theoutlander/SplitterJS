**Simple Javascript Splitter with no 3rd party dependencies.**

### Usage: Vertical splitter between two divs

    require(['Splitter'], function (Splitter) {
       new Splitter({
            elementOne: left,         // Div to the left of the splitter
            elementTwo: right,        // Div to the right of the splitter
            splitter: centerSplitter, // Splitter div
            orientation: 'vertical',  // Orientation vertical|horizontal
            collapse: 'left'          // Collapse Direction left|right|top|bottom
        }).Render();
    });

**Checkout the Demo folder for functional examples**