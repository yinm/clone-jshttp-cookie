'use strict'

/**
 * Module exports.
 * @public
 */

exports.parse = parse

/**
 * Module variables.
 * @private
 */

const
  decode = decodeURIComponent,
  encode = encodeURIComponent,
  pairSplitRegExp = /; */

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string')
  }

  let obj = {}
  const
    opt = options || {},
    pairs = str.split(pairSplitRegExp),
    dec = opt.decode || decode

  for (let i = 0, length = pairs.length; i < length; i++) {
    let pair = pairs[i]
    let equalIndex = pair.indexOf('=')

    // skip things that don't look like key=value
    if (equalIndex < 0) {
      continue
    }

    let key = pair.substr(0, equalIndex).trim()
    let val = pair.substr(++equalIndex, pair.length).trim()

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1)
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec)
    }
  }

  return obj
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str)
  } catch (e) {
    return str
  }
}
