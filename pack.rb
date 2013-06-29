#!/usr/bin/env ruby

# https://github.com/Constellation/crxmake
require 'crxmake'

CrxMake.make(
  :ex_dir => ".",
  :pkey   => "chrome-qrcode.pem",
  :crx_output => "chrome-qrcode.crx",
  :verbose => true,
  :ignorefile => /^\.|\.crx$|\.pem$/,
  :ignoredir => /^\./
)

