# Overview
The MRPT web-js library provides a framework for users to create external interfaces to the robots. This includes web apps, 2d and 3d visualisations, RPC and much more.

Brief description of various modules are:
* Core : Set up websocket connection to remote server (running on robot) and perform service calls (RPC), publish to topics on server and subscribe to receive data from specific topics on server.

* meshes: Module for setting up 3D visualization. Scene, pointclouds, occupancy grid and other commonly used

* plots: Module for 2D visualization using math plots.

Usage:
1. Using the compiled js library
```
<script src="./MRPTLib.umd.js"></script>
var MRPTLIB = MRPTlib.default;
```
Now one can use the various modules present in library MRPTLIB.

2. With node.js
installation:
```
npm install <proposed name: mrpt-web-js>
```
```
import MRPTLIB from 'mrpt-web-js';
```

Examples regarding use of particular modules can be found in their manuals here.
