#!/usr/bin/env python

import sys
import struct
import json
import shutil
import os

def get_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('=I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode("utf-8")
    return json.loads(message)

jushiryo = "C:\\path\\to\\仕分け先フォルダ"
msg =get_message()
kamoku =jushiryo + "\\" + msg['kamoku']
name   = msg['name']

# ディレクトリがない場合、作成する
if not os.path.exists(kamoku):
    os.makedirs(kamoku)
    shutil.move(name,kamoku)
else:
    shutil.move(name,kamoku)



