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

// 3. Definitive resolution for monorepo packages
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle @react-native/virtualized-lists
  if (moduleName === '@react-native/virtualized-lists') {
    return {
      filePath: path.resolve(projectRoot, 'node_modules/react-native/node_modules/@react-native/virtualized-lists/index.js'),
      type: 'sourceFile',
    };
  }

  // Handle expo-router/entry resolution which often fails in monorepo native builds
  if (moduleName === 'expo-router/entry' || moduleName.includes('expo-router/entry')) {
    return {
      filePath: path.resolve(projectRoot, 'node_modules/expo-router/entry.js'),
      type: 'sourceFile',
    };
  }

  // Chain to the default resolver
  return context.resolveRequest(context, moduleName, platform);
};

// 4. In monorepos, hierarchical lookup should often be false to force nodeModulesPaths,
// but if we have resolution issues, setting it to false is correct as long as nodeModulesPaths are exhaustive.
config.resolver.disableHierarchicalLookup = false;

module.exports = config;
