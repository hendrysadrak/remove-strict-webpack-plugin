const STRICT_STRING      = '"use strict";\n';
const REPLACEMENT_STRING = ';\n';


class DestoryStrict {
  apply( moduleTemplate ) {
    moduleTemplate.plugin( "render", ( moduleSource ) => {
      const index = moduleSource.children.indexOf( STRICT_STRING );

      if ( index > -1 ) {
        moduleSource.children.splice( index, 1, REPLACEMENT_STRING );
      }

      return moduleSource;
    } );
  }
}


class RemoveStrictPlugin {
  apply( compiler ) {
    /*
     * Attach to a hook after "compilation"
     * https://webpack.js.org/api/compiler/#event-hooks
     */
    compiler.plugin( "make", ( compilation, done ) => {
      compilation.moduleTemplate.apply( new DestoryStrict() );

      done();
    } );
  }
}


module.exports = RemoveStrictPlugin;
