var spell = require('spell')
  , fs    = require('fs')
  , dict  = spell()
  ;

// load dict.json
dict.load(JSON.parse(fs.readFileSync(__dirname + '/dict.json', 'utf-8')));
console.log(dict.suggest(process.argv[2], "0123456789kenizrscalpxdgt-obhwufyjmv_.q".split("")));