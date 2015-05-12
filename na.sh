#!/bin/sh

echo -n "Your answer> "
read REPLY
if [ $REPLY =~ ^[0-9]+$ ]; then
    echo Numeric
else
    echo Non-numeric
fi
