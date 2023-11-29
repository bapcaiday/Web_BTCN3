const Handlebars = require('handlebars');

// Định nghĩa một helper mới cho vòng lặp
Handlebars.registerHelper('loop', function (n, block) {
  let accum = '';

  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

Handlebars.registerHelper('sum', function (a,b) {
  return a+b
});