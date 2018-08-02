# 2D Visualization
The module is to used to create math plots for robot visualisation like position, map, orientation etc.

* Note: trace refers to a plot that can be added to cartesian plot (plotting area).

* Setting up plot for adding traces
```
var plotArea = new MRPTLIB.plot.CartesianPlane("some-html-container-id", trace0);
plotArea.addTrace(trace1);
plotArea.addTrace(trace2);
```

* Creating traces from data points
```
var trace1 = new MRPTLIB.plots.ScatterPlot.processTrace([1, 5, 2], [3, 7, 5], 1); // (x coords, y coords, size of points)
var trace2 = new MRPTLIB.plots.LinePlot.processTrace([1, 3, 4], [2, 1, 4]);
```

For more information refer to the following in references:
1. CartesianPlane
2. LinePlot
3. ScatterPlot
