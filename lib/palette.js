(function(global, undefined) {

  var Colour = require('Colour');

  /* Constants */

  var version = '0.0.2';


  /* Prototype object */

  // Palette
  var palette = Object.create([]);
  palette._objType = 'Palette';

  palette.hex = function() {
    var arr = this.map(function(c) {
      return c.RGB().hex();
    });
    return arr;
  };

  palette.adjustHue = function(degrees) {
    var arr = this.map(function(c) {
      return c.adjustHue(degrees);
    });
    return createPalette(arr);
  };

  palette.lighten = function(value) {
    var arr = this.map(function(c) {
      return c.lighten(value);
    });
    return createPalette(arr);
  };

  palette.darken = function(value) {
    var arr = this.map(function(c) {
      return c.darken(value);
    });
    return createPalette(arr);
  };

  palette.saturate = function(value) {
    var arr = this.map(function(c) {
      return c.saturate(value);
    });
    return createPalette(arr);
  };

  palette.desaturate = function(value) {
    var arr = this.map(function(c) {
      return c.desaturate(value);
    });
    return createPalette(arr);
  };

  palette.clone = function(value) {
    var arr = this.map(function(c) {
      return c.clone();
    });
    return createPalette(arr);
  };


  /* Factory methods */

  var createPalette = function(arr) {
    var p = Object.create(palette);

    arr.forEach(function(c) {
      p.push(c);
    });

    return p;
  };


  /* Colour theory methods */

  var tints = function(number, colour) {
    var _tints = function(number, colour) {
      var arr = [];
      arr.push(colour.clone());
      for (var i = 1; i < number; i++) {
        arr.push(colour.lighten(0.1 * i));
      }
      return arr;
    }

    if (typeof colour === 'undefined') {
      return function(colour) {
        return _tints(number, colour);
      }
    } else {
      return _tints(number, colour);
    }
  };

  var shades = function(number, colour) {
    var _shades = function(number, colour) {
      var arr = [];
      arr.push(colour.clone());
      for (var i = 1; i < number; i++) {
        arr.push(colour.darken(0.1 * i));
      }
      return arr;
    }

    if (typeof colour === 'undefined') {
      return function(colour) {
        return _shades(number, colour);
      }
    } else {
      return _shades(number, colour);
    }
  };

  var divideHue = function(number, colour) {
    var _divideHue = function(number, colour) {
      var degrees = 360 / number;

      var arr = [];
      arr.push(colour.clone());
      for (var i = 1; i < number; i++) {
        arr.push(colour.adjustHue(degrees * i));
      }

      return arr;
    }

    if (typeof colour === 'undefined') {
      return function(colour) {
        return _divideHue(number, colour);
      }
    } else {
      if (typeof number === 'undefined' || number <= 0) {
        number = 1;
      }
      return _divideHue(number, colour);
    }
  };

  var complementary = divideHue(2);

  var triadic = divideHue(3);

  var tetradic = divideHue(4);

  var analogous = function(colour) {
    var arr = [];

    arr.push(colour.clone());
    arr.push(colour.adjustHue(30));
    arr.push(colour.adjustHue(-30));

    return arr;
  };

  var splitComplementary = function(colour) {
    var arr = [];

    arr.push(colour.clone());
    arr.push(colour.adjustHue(150));
    arr.push(colour.adjustHue(210));

    return arr;
  };


  /* Library */
  var Palette = function(colours) {
    if (typeof colours === 'undefined') {
      return;
    }

    var arr;

    if (Array.isArray(colours)) {
      arr = colours;
    } else {
      arr = [colours];
    }

    return createPalette(arr);
  };

  Palette.Tints = function(colour, number) {
    var n = (typeof number !== 'undefined') ? number : 5;
    var arr = tints(n)(colour);

    return createPalette(arr);
  };

  Palette.Shades = function(colour, number) {
    var n = (typeof number !== 'undefined') ? number : 5;
    var arr = shades(n)(colour);

    return createPalette(arr);
  }

  Palette.Complementary = function(colour) {
    var arr = complementary(colour);
    return createPalette(arr);
  };

  Palette.Triadic = function(colour) {
    var arr = triadic(colour);
    return createPalette(arr);
  };

  Palette.Tetradic = function(colour) {
    var arr = tetradic(colour);
    return createPalette(arr);
  };

  Palette.Analogous = function(colour) {
    var arr = analogous(colour);
    return createPalette(arr);
  };

  Palette.SplitComplementary = function(colour) {
    var arr = splitComplementary(colour);
    return createPalette(arr);
  };

  Palette.Colour = Colour;

  Palette.version = version;


  /* Export section */

  if ('process' in global) {
    module['exports'] = Palette;
  }
  global['Palette' in global ? 'Palette_' : 'Palette'] = Palette;

})((this || 0).self || global);
