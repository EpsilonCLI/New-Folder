#!/bin/bash

jq_filter='.title'
niri msg -j focused-window | jq -r "$jq_filter"

niri msg -j event-stream | while read -r line; do
    [[ "$line" =~ Window(OpenedOrChanged|FocusChanged) ]] &&
        niri msg -j focused-window | jq -r "$jq_filter"
done