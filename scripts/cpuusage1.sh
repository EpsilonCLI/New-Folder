#!/bin/bash

get_cpu_usage() {
    # 第一次读取CPU数据
    read -r cpu user nice system idle iowait irq softirq steal guest guest_nice < /proc/stat
    total1=$((user + nice + system + idle + iowait + irq + softirq + steal))
    idle1=$idle

    # 等待1秒
    sleep 1

    # 第二次读取CPU数据
    read -r cpu user nice system idle iowait irq softirq steal guest guest_nice < /proc/stat
    total2=$((user + nice + system + idle + iowait + irq + softirq + steal))
    idle2=$idle

    # 计算CPU使用率
    total_diff=$((total2 - total1))
    idle_diff=$((idle2 - idle1))
    
    if [ $total_diff -eq 0 ]; then
        echo "0"
    else
        usage=$((100 * (total_diff - idle_diff) / total_diff))
        echo "$usage"
    fi
}

echo "  $(get_cpu_usage)%"