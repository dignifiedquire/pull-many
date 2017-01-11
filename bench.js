
var k = 1000, n = 100000

var arrays = new Array(k)
for(var i = 0; i < k; i++)
  arrays[i] = []

for(var i = 0; i < n; i++)
  arrays[~~(Math.random()*k)].push(i)

var pull = require('pull-stream')
var many = require('./')

var start = Date.now()

pull(
  many(arrays.map(function (ary) {
    return pull.values(ary)
  })),
  pull.onEnd(function () {
    console.log(
      'Combined %s streams with %s messages each in %s ms',
      k,
      n,
      Date.now() - start
    )
  })
)
