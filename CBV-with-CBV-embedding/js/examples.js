// var fact_prog =
//   'let fact = rec f. λx.\n'
// + '  if (x <= 1)\n'
// + '  then 1\n'
// + '  else (x * (f (x - 1)))\n'
// + 'in\n'
// + '\n'
// + 'fact 4';

var fact_prog =
  'bind x = 5 in new y = 6 in bind z = PLUS(x,y) in PLUS(z,z)';
