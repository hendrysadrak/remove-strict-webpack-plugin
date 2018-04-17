# remove-strict-webpack-plugin

Removes "use strict" from transpiled es6->es5 code.

**This module should not be used in production environment. You should fix your strict errors not disable strict mode.**


## Usage

```javascript
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );

// webpack.config.js
module.exports = {
  plugins: [
    new RemoveStrictPlugin()
  ]
}
```
