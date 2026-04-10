#!/bin/bash
#fastfetch --structure memory -j | jq -r '.[0].result | (.used / .total * 100 | round) | "  " + tostring + "%"'

get_memory_usage() {
    # 从 /proc/meminfo 读取内存信息
    local mem_total=$(grep "MemTotal:" /proc/meminfo | awk '{print $2}')
    #local mem_free=$(grep "MemFree:" /proc/meminfo | awk '{print $2}')
    local available=$(grep "MemAvailable:" /proc/meminfo | awk '{print $2}')
    #local cached=$(grep "^Cached:" /proc/meminfo | awk '{print $2}')
    
    # 计算实际使用的内存（单位：KB）
    local mem_used=$((mem_total - available))
    
    # 计算使用百分比
    local usage_percent=$((100 * mem_used / mem_total))
    
    echo "$usage_percent"
}

echo "  $(get_memory_usage)%"