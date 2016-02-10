#!/bin/bash

echo "Start copying code coverage Files" &&

rm -rf objects test-reports
mkdir -p objects test-reports &&

derivedDataDirectory=$(cat ./derivedDataDirectory) &&
echo "  derivedData dir: $derivedDataDirectory"
cp -a $derivedDataDirectory/. objects/ &&

echo "Start CodeCoverage" &&
gcovr -r . --object-directory=objects --xml -o test-reports/coverage.xml &&
gcovr -r . --object-directory=objects --html -o test-reports/coverage.html

