import CartesianPlane from "./CartesianPlane";

export default class ScatterPlot extends CartesianPlane {
  /**
   * @param {Array} xs - array containing x coords
   * @param {Array} ys - array containing y coords
   * @param {String} divID - the id of the container
   * @param {Object} options - with the following keys
   *    @param {Number} size - the size of the point, default is 3
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
  processData(xs = [], ys = []) {
    this.trace.x = xs;
    this.trace.y = ys;
    this.refresh();
  }
}
