const MRPTLIB = {"version": "1.0"};
import * as plots from './plots/index'
Object.assign(MRPTLIB, require('./core'));
Object.assign(MRPTLIB, require('./math'));
Object.assign(MRPTLIB, require('./meshes'));
Object.assign(MRPTLIB, { plots });

export default MRPTLIB;
