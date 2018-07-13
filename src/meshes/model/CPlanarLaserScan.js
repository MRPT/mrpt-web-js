import * as THREE from 'three'
export default class CPlanarLaserScan extends THREE.Group {
  /**
   *
   * @param {Object} options - with the following keys
   * @param n - the number of points
   * @param xs - array containing the x coords of points
   * @param ys - arrau containing the y coords of points
   * @param zs - array containing the z coords of points
   * @param enable_line - boolean to enable line in the planar scan
   * @param enable_points - boolean to enable points in the planar scan
   * @param enable_surface - boolean to enable surface in the planar scan
   * @param line_width - default: 1, set the line width
   * @param points_width - default: 1, set the points width
   * @param line_color - default: {r:1.0,g:0.0,b:0.0,a:0.5}, set the line color
   * @param points_color - default: {r:1.0,g:0,b:0,a:1}, set the points color
   * @param surface_color - default: {r:0.01,g:0.01,b:0.6,a:0.6}, set the surface color
   *                        and transparency
   */
  constructor(options={}) {
    super();
    this.xs = options.xs || [];
    this.ys = options.ys || [];
    this.zs = options.zs || [];
    this.n = Math.max(this.xs.length, this.ys.length, this.zs.length);
    this.enable_line = true;
    this.enable_points = true;
    this.enable_surface = true;
    this.line_width = 1;
    this.points_width = 0.05;
    this.line_color = {r:1.0,g:0.0,b:0.0,a:0.6};
    this.points_color = {r:1.0,g:1,b:0,a:1};
    this.surface_color = {r:0.01,g:0.01,b:0.6,a:0.3};
    this.setConfiguration(options, false);
    this.render();
  }
  /**
   * The functions renders the planar scan
   * based on the parameters and configurations currenltly
   * set
   */
  render()
  {
    let n = this.n;
    // LINES
    if ( n > 1 && this.enable_line)
    {
      let geometry = new THREE.Geometry();
      let color = new THREE.Color();
      let c = this.line_color;
      color.setRGB(c.r,c.g,c.b);
      let material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: this.line_width,
      });
      for (let i = 0; i < n; i++)
      {
        geometry.vertices.push(
          new THREE.Vector3((this.xs[i] || 0), (this.ys[i] || 0), (this.zs[i] || 0))
        );
      }
      if (this.line_scan !== undefined)
      {
        this.remove(this.line_scan);
      }
      this.line_scan = new THREE.Line(geometry, material);
      this.add(this.line_scan);
    }
    // POINTS
    if ( n > 0 && this.enable_points)
    {
      let geometry = new THREE.Geometry();
      let color = new THREE.Color();
      let c = this.points_color;
      color.setRGB(c.r,c.g,c.b);
      let material = new THREE.PointsMaterial({
        color: color,
        size: this.points_width,
        opacity: this.points_color.a
      });
      for (let i = 0; i < n; i++)
      {
        geometry.vertices.push(
          new THREE.Vector3((this.xs[i] || 0), (this.ys[i] || 0), (this.zs[i] || 0))
        );
      }
      if (this.points_scan !== undefined)
      {
        this.remove(this.points_scan);
      }
      this.points_scan = new THREE.Points(geometry, material);
      this.add(this.points_scan);
    }
    // SURFACE
    if ( n > 2 && this.enable_surface)
    {
      let geometry = new THREE.Geometry();
      let color = new THREE.Color();
      let c = this.surface_color;
      color.setRGB(c.r,c.g,c.b);
      let material = new THREE.MeshBasicMaterial({
        color: color,
        opacity: this.surface_color.a
      })
      for (let i = 0; i < n; i++)
      {
        geometry.vertices.push(
          new THREE.Vector3((this.xs[i] || 0), (this.ys[i] || 0), (this.zs[i] || 0))
        );
      }
      geometry.vertices.push(
        new THREE.Vector3((this.xs[0] || 0), (this.ys[0] || 0), (this.zs[0] || 0))
      );
      for (let i = 1; i < n-1; i++)
      {
        geometry.faces.push(new THREE.Face3(0, i, i+1));
      }
      // geometry.computeFaceNormals();
      // geometry.computeVertexNormals();
      if (this.surface_scan !== undefined)
      {
        this.remove(this.surface_scan);
      }
      this.surface_scan = new THREE.Mesh(geometry, material);
      this.add(this.surface_scan);
    }
  }
  /**
   *
   * @param {*} options  - options contain the parameters (points)
   *    and configurations (line_width, points_color,enable_line)
   * @param {boolean} isRender - default true,
   *    will render the object after setting the options
   * @param n - the number of points
   * @param xs - array containing the x coords of points
   * @param ys - arrau containing the y coords of points
   * @param zs - array containing the z coords of points
   */
  setAll(options, isRender = true)
  {
    this.setParameters(options, false);
    this.setConfiguration(options, false);
    if (isRender) {
      this.render();
    }
  }
  /**
   * @param {boolean} isRender - default true,
   *    will render the object after setting the options
   * @param {Object} options - with the following keys
   *
   */
  setParameters(options, isRender = true)
  {
    this.xs = options.xs || [];
    this.ys = options.ys || [];
    this.zs = options.zs || [];
    this.n = Math.max(this.xs.length, this.ys.length, this.zs.length);
    console.log("n",this.n, "options", options);
    if (isRender) {
      this.render();
    }
  }
  /**
   * @param {boolean} isRender - default true,
   *    will render the object after setting the options
   * @param {*} options - with the following keys
   * @param enable_line - boolean to enable line in the planar scan
   * @param enable_points - boolean to enable points in the planar scan
   * @param enable_surface - boolean to enable surface in the planar scan
   * @param line_width - default: 1, set the line width
   * @param points_width - default: 1, set the points width
   * @param line_color - default: {r:1.0,g:0.0,b:0.0,a:0.5}, set the line color
   * @param points_color - default: {r:1.0,g:0,b:0,a:1}, set the points color
   * @param surface_color - default: {r:0.01,g:0.01,b:0.6,a:0.6}, set the surface color
   *                        and transparency
   */
  setConfiguration(options, isRender = true)
  {
    // color and width configurations with default values
    if(options.enable_line !== undefined)
    {
      this.enable_line = options.enable_line;
    }
    if(options.enable_points !== undefined)
    {
      this.enable_points = options.enable_points;
    }
    if(options.enable_surface !== undefined)
    {
      this.enable_surface = options.enable_surface;
    }
    this.line_width = options.line_width || this.line_width;
    this.points_width = options.points_width || this.points_width;
    this.line_color = options.line_color || this.line_color;
    this.points_color = options.points_color || this.points_color;
    this.surface_color = options.surface_color || this.surface_color;
    if (isRender) {
      this.render();
    }
  }
  /**
   *
   * @param {Object} message - with the following keys
   * @param n - the number of points
   * @param xs - array containing the x coords of points
   * @param ys - arrau containing the y coords of points
   * @param zs - array containing the z coords of points
   * @param enable_line - boolean to enable line in the planar scan
   * @param enable_points - boolean to enable points in the planar scan
   * @param enable_surface - boolean to enable surface in the planar scan
   * @param line_width - default: 1, set the line width
   * @param points_width - default: 1, set the points width
   * @param line_color - default: {r:1.0,g:0.0,b:0.0,a:0.5}, set the line color
   * @param points_color - default: {r:1.0,g:0,b:0,a:1}, set the points color
   * @param surface_color - default: {r:0.01,g:0.01,b:0.6,a:0.6}, set the surface color
   *                        and transparency
   * if n is set as negative then the arrays xs,ys,zs of the object
   * remain unchanged
   */
  processMessage(message, isRender = true)
  {
    this.setAll(message, isRender);
  }
}
