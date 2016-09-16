#!/bin/bash

temp="$(i2cget -y 2 0x48 00)"
temp2=$((temp))
echo "Current Tempreture (F): "
echo "$temp2 * 1.8 + 32" | bc