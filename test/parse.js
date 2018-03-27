const
  assert = require('assert'),
  cookie = require('..')

suite('parse')

test('argument validation', () => {
  assert.throws(cookie.parse.bind(), /argunemt str must be a string/)
  assert.throws(cookie.parse.bind(null, 42), /argument str must be a string/)
})
