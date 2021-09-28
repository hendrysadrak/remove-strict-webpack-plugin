const { Compilation, sources } = require('webpack');

const STRICT_STRING      = '"use strict";\n';
const REPLACEMENT_STRING = ';\n';

class RemoveStrictPlugin {
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

            compilation.updateAsset(
              key,
              new sources.RawSource(file.source.source().replace(STRICT_STRING, REPLACEMENT_STRING))
            );
          });
        }
      );
    });
  }
}

module.exports = RemoveStrictPlugin;
