### Features
* Plug-n-Play
* Horizontal | Vertical
* Fixed | Collapsible
* Drag actual splitter or placeholder splitter
* Responsive
* Functional demos of Complex Layouts
* Zero dependencies
* < 1KB Minified (TODO)

### Usage:

	require(['Splitter'], function (Splitter) {
		new Splitter({
			elementOne: contentContainer,   // Div to the left of the splitter
			elementTwo: bottomDiv,          // Div to the right of the splitter
			splitter: bottomsplitter,       // Splitter div
			orientation: 'horizontal',      // Orientation [vertical | horizontal]
			collapse: 'bottom',             // Collapse Direction [left | right | top | bottom | fixed]
			placeholderSplitter: false,     // Drag a placeholder splitter
			splitterHeight: '5px'           // Control the thickness of the splitter
		}).Render();
	});

### Vertical splitter:
![25_screenshot 2014-02-16 15 56 47](https://f.cloud.github.com/assets/749084/2181793/f97e0612-9766-11e3-8bd4-97827cabe685.png)

http://jsfiddle.net/theoutlander/dCwS9/

***

### Simple Layout
![25_screenshot 2014-02-16 15 52 22](https://f.cloud.github.com/assets/749084/2181794/f97e1ba2-9766-11e3-945a-377a03e36c61.png)

http://jsfiddle.net/theoutlander/9NQ8g/

***

### Complex Layout

![23_screenshot 2014-02-16 15 51 10](https://f.cloud.github.com/assets/749084/2181792/f97da154-9766-11e3-9017-9b0b750a3f78.png)

http://jsfiddle.net/theoutlander/ULFWP/

***

**Additional examples can be found in the Demo folder of the repository** 
