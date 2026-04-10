#!/bin/bash
fastfetch --structure cpuusage -j | jq -r '.[0].result | (add / length) | round | "  " + tostring + "%"'