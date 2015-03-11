#!/bin/bash
filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath
find . -print | sed -e 's;[^/]*/;|    ;g;s;    |; |;g' > ./tree.txt