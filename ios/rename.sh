#!/bin/sh

OLDNAME=$1
NEWNAME=$2

echo "Renaming project from $OLDNAME to $NEWNAME"

echo "\tRenaming folder hierarchy..."
for d in $(find . -depth -name "*$OLDNAME*" -type d)
do
    newd="$(echo $d | sed "s/$OLDNAME/$NEWNAME/g")"

    if [ $d != $newd ] ; then
        echo "\t\tRenaming $d to $newd" 
        mv $d $newd
    fi
done

echo "\tRenaming files..."
for f in $(find . -depth -name "*$OLDNAME*" -type f)
do
    newf="$(echo $f | sed "s/$OLDNAME/$NEWNAME/g")"
    if [ $f != $newf ] ; then
        echo "\t\tRenaming $f to $newf" 
        mv $f $newf
    fi
done

echo "\tPatching files ..."
for f in $(find $NEWNAME $NEWNAME.xcodeproj -depth -type f -name "*.pbxproj" -o -name "*.xcworkspacedata" -o -name "*.h" -o -name "*.m" -o -name "*.xcscheme" -o -name "*.pch")
do
    echo "\t\tPatching $f ..."
    sed -i '' "s/$OLDNAME/$NEWNAME/g" $f
done

