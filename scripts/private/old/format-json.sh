#!/bin/bash

#####
# Helper script for pretty formatting of json files
#####

for file in `ls -a app/data/phones | grep -v \\\.\$`; do
  cat app/data/phones/$file | python -mjson.tool > tmp.json
  rm app/data/phones/$file
  mv tmp.json app/data/phones/$file
done
