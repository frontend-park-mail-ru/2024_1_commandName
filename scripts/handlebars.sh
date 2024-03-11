#!/bin/bash

handlebars_files=$(find src/Components -name "*.hbs")

for file in $handlebars_files
do
    precompiled_file="${file/.hbs/.precompiled.js}"
    handlebars "$file" -f "$precompiled_file"
    
    echo "Compiled $file to $precompiled_file"
done

echo "All Handlebars files compiled successfully"