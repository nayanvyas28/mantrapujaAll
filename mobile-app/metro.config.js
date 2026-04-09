const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Set the app root for expo-router
process.env.EXPO_ROUTER_APP_ROOT = 'app';

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 4. Force Metro to resolve (and transform) the app directory correctly
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
