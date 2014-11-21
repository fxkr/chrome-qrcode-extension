#!/usr/bin/env ruby

# https://github.com/Constellation/crxmake
require 'crxmake'

CrxMake.make(
  :ex_dir => ".",
  :pkey   => "chrome-qrcode.pem",
  :crx_output => "chrome-qrcode.crx",
  :verbose => true,
  :ignorefile => /^((?!(icon-.*\.png|manifest\.json|.*\.(css|html|js))).)*$/,
  :ignoredir => /^\./
)

exit if !ARGV.include? '--zip'

CrxMake.zip(
  :ex_dir => ".",
  :pkey   => "chrome-qrcode.pem",
  :zip_output => "chrome-qrcode.zip",
  :verbose => true,
  :ignorefile => /^((?!(icon-.*\.png|manifest\.json|.*\.(css|html|js))).)*$/,
  :ignoredir => /^\./
)

