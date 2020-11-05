(function(f, g, h) {
  var a = f.createElement(g);
  a.src = h[0];
  a.async = 1;

  var b = f.createElement(g);
  b.src = h[1];

  f.body.appendChild(a);
  f.body.appendChild(b);
})(document, 'script', ['./vendor~main.js', './main.js']);