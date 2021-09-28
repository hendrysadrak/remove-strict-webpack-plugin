const { Compilation, sources } = require('webpack');

class RemoveStrictPlugin {
  // eslint-disable-next-line
  apply(compiler) {  
    compiler.hooks.make.tap('RemoveStrictPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'Replace',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        () => {
          Object.keys(compilation.assets).forEach((key) => {
            const file = compilation.getAsset(key);
            const source = file.source.source();
            const updatedSource = source.replace(/"use strict";\n/g, ';\n');

            compilation.updateAsset(key, new sources.RawSource(updatedSource));
          });
        },
      );
    });
  }
}

module.exports = RemoveStrictPlugin;
