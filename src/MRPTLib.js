
import {WS,Topic,Message,Param,Service,ServiceRequest,ServiceResponse} from './core';
const MRPTLIB = {"version": "1.0"};
Object.assign(MRPTLIB, require('./core'));
Object.assign(MRPTLIB, require('./math'));
export default MRPTLIB;
