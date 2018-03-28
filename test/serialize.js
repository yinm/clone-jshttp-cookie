// builtin
const
  assert = require('assert'),
  cookie = require('..')

suite('serialize')

test('basic', () => {
  assert.equal('foo=bar', cookie.serialize('foo', 'bar'))
  assert.equal('foo=bar%20baz', cookie.serialize('foo', 'bar baz'))
  assert.equal('foo=', cookie.serialize('foo', ''))
  assert.throws(cookie.serialize.bind(cookie, 'foo\n', 'bar'), /argument name is invalid/)
  assert.throws(cookie.serialize.bind(cookie, 'foo\u280a', 'bar'), /argument name is invalid/)
  assert.throws(cookie.serialize.bind(cookie, 'foo', 'bar', {encode: 42}), /option encode is invalid/)
})
