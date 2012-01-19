var spell      = require('spell')
  , clarinet   = require('clarinet')
  , fs         = require('fs')
  , npmstream  = clarinet.createStream()
  , dict       = spell()
  , stackLevel = 0
  , isName     = false
  ;

// hate. camelCase. i hate you.uuu.uu.
npmstream.on('closeobject', function () { stackLevel--; });

npmstream.on('openobject', function (name) {
  stackLevel++;
  if( name === 'name' ) isName=true; 
});

npmstream.on('key'       , function (name) { 
  if( name === 'name' ) isName=true; 
});

npmstream.on('value'     , function (value) { 
  if(isName) {
    isName=false;
    if(stackLevel===2) dict.add_word(value); 
  } 
});

npmstream.on('end', function () {
  var exported         = dict['export']()
    , npm_alphabet_map = {}
    , npm_alphabet     = []
    ;
  for(var k in exported.corpus) {
    var i          = 0
      , c          = k.charAt[0]
      ;

    // collect all letters
    while(c) {
      console.log(c)
      npm_alphabet_map[c] = 0;
      c = k.charAt(i++);
    }
  }
  for(var k in npm_alphabet_map) {
    npm_alphabet.push(k);
  }
  fs.writeFileSync(__dirname + '/dict.json', 
    JSON.stringify(exported, null, 2));
  fs.writeFileSync(__dirname + '/alpha.json',
    JSON.stringify(npm_alphabet));
  console.log('done');
});

// in reality the needs to pull from npmjs and
// use incremental udpates with changes feed
fs.createReadStream(__dirname + '/node_modules/clarinet/samples/npm.json')
  .pipe(npmstream);