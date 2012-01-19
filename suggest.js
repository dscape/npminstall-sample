var spell = require('spell')
  , fs    = require('fs')
  , dict  = spell()
  ;

console.log(process.argv[2]);
dict.load(JSON.parse(fs.readFileSync('dict.json', 'utf-8')));
console.log(dict.suggest(process.argv[2]));