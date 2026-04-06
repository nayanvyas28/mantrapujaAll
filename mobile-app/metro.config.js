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

// 3. Definitive resolution for @react-native/virtualized-lists
// This specifically points to the nested location inside react-native to fix the resolution error
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@react-native/virtualized-lists') {
    return {
      filePath: path.resolve(projectRoot, 'node_modules/react-native/node_modules/@react-native/virtualized-lists/Lists/VirtualizedList.js'),
      type: 'sourceFile',
    };
  }
  
  // Chain to the default resolver
  return context.resolveRequest(context, moduleName, platform);
};

// 4. Force Metro to resolve (and transform) the app directory correctly
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
