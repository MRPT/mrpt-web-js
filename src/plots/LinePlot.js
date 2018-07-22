import CartesianPlane from './CartesianPlane'
/**
 * create LinePlot or trace for LinePlot
 * @example
 * // adding standalone LinePlots to html containers
 * let plot = new MRPTLIB.plots.LinePlot([1, 2, 3],[4, 5, 6],"some-html-container-id");
 *
 * // modifying plot data
 * plot.processData([1, 3, 4, 5], [5, 6, 7, 9]);
 *
 * @example
 * // trace for line plots
 * let plot = new MRPTLIB.plots.CartesianPlane("some-html-container-id", trace0);
 * let trace = new MRPTLIB.plots.LinePlot.processTrace([1, 3, 4],[2, 1, 4]);
 * plot.addTrace(trace);
 */
export default class LinePlot extends CartesianPlane {
  /**
   * @constructor
   * @param {Array<float>} [xs=[]] - x coords of points
   * @param {Array<float>} [ys=[]] - y coords of points
   * @param {string} divID - id of html container, to which lineplot is to be added
   * @param {object} options - with the following keys
   */
  constructor(xs = [], ys = [], divID, options = {})
  {
    let size = options.size || 3;
    let config = { type: 'scatter' };
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
   * in the line plot, also alter the size and color of points
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
    let config = {type: 'scatter' };
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
       * @todo Add code for setting color of line plot
       */
    }
    return trace;
  }
}
