import CartesianPlane from "./CartesianPlane";
/**
 * create ScatterPlot or trace for ScatterPlot
 * @example
 * // adding standalone ScatterPlots to html containers
 * let plot = new MRPTLIB.plots.ScatterPlot([1, 2, 3],[4, 5, 6],"some-html-container-id");
 *
 * // modifying plot data
 * plot.processData([1, 3, 4, 5], [5, 6, 7, 9], 2); // third parameter is the size of points
 *
 * @example
 * // trace for line plots
 * let plot = new MRPTLIB.plots.CartesianPlane("some-html-container-id", trace0);
 * let trace = new MRPTLIB.plots.ScatterPlot.processTrace([1, 3, 4],[2, 1, 4]);
 * plot.addTrace(trace); */
export default class ScatterPlot extends CartesianPlane {
  /**
   * @constructor
   * @param {Array<float>} [xs=[]] - array containing x coords
   * @param {Array<float>} [ys=[]] - array containing y coords
   * @param {string} divID - the id of the container
   * @param {object} options - with the following keys
   * @param {number} [options.size = 3] - the size of the point, default is 3
   */
  constructor(xs = [], ys = [], divID, options = {})
  {
    let size = options.size || 3;
    let config = { mode: 'markers', marker: {size}, type: 'scatter' };
    let trace = {
      x: xs,
      y: ys,
      ...config
    };
    super(divID, trace);
    this.trace = trace;
  }
  /**
   * processData : processes new points an replaces them
   * in the scatter plot, also alter the size and color of points
   * @param {Array<float>} xs
   * @param {Array<float>} ys
   * @param {?number} size - sets the marker size
   * @param {?*} color
   */
  processData(xs = [], ys = [], size = null, color = null) {
    this.trace.x = xs;
    this.trace.y = ys;
    if (size) {
      this.trace.marker.size = size;
    }
    if (color) {
      /**
       * @todo Add code for setting color of points
       */
    }
    this.refresh();
  }
  static processTrace(xs = [], ys = [], size = null, color = null) {
    let config = { mode: 'markers', marker: {size}, type: 'scatter' };
    let trace = {
      x: xs,
      y: ys,
      ...config
    };
    if (size) {
      trace.marker.size = size;
    }
    if (color) {
      /**
       *
       * @todo Add code for setting color of points
       */
    }
    return trace;
  }
}
