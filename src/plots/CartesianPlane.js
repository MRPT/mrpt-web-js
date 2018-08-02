import Plotly from 'plotly.js-cartesian-dist'
/**
 * @example
 * let trace0 = {
 *   x: [1, 2, 3, 4],
 *   y: [10, 15, 13, 17],
 *   mode: 'lines+markers',
 *   type: 'scatter'
 * };
 *
 * let plot = new MRPTLIB.plots.CartesianPlane("some-html-container-id", trace0);
 *
 * let trace1 = new MRPTLIB.plots.ScatterPlot.processTrace([1, 5, 2],[3, 7, 5],1); // (x coords, y coords, size of points)
 * let trace2 = new MRPTLIB.plots.LinePlot.processTrace([1, 3, 4],[2, 1, 4]);
 *
 * plot.addTrace(trace1);
 * plot.addTrace(trace2);
 *
 */
export default class CartesianPlane {
  /**
   * @param { String } divID - the container id
   * @param { object } ...tracers - array containing different graph traces
   */
  constructor(divID, ...tracers) {
    console.log(divID);
    console.log(tracers);
    this.container = document.getElementById(divID);
    console.log(tracers);
    Plotly.newPlot( this.container, tracers ,{
      margin: { t: 0 }
    });
    this.divID = divID;
  }
  /**
   *  @param { Object } trace - see plotly.js traces
   */
  addTrace(trace) {
    Plotly.addTraces(this.divID, trace);
  }
  /**
   * @param { Number } index - the index of the trace inserted,
   *                         has to separately stored by user
   */
  deleteTrace(index) {
    Plotly.deleteTraces(this.divID, index);
  }
  /**
   * @param { Object } data_update - data to be updated see Plotly.update
   * @param { Object } layout_update - data to be updated see Plotly.update
   * @param { Array } traceIndices - the indices to be updated of existing data see Plotly.update
   *
   */
  update(data_update = {}, layout_update = {}, traceIndices = []) {
    Plotly.update(this.divID, data_update, layout_update, traceIndices);
  }
  /**
   * refersh
   * refreshes the graph in case of update to trace or
   * otherwise
   */
  refresh() {
    Plotly.redraw(this.container);
  }
}
