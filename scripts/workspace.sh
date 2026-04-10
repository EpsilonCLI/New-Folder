#!/bin/bash

# 获取工作区状态的函数
get_workspace_status() {
    # 初始化10个工作区状态为 -1（未使用）
    status=(0 0 0 0 0 0 0 0 0 0)
    
    # 获取所有工作区信息
    workspaces=$(niri msg -j workspaces)
    activeworkspace=$(hyprctl -j activeworkspace)
    
    # 提取当前聚焦的工作区编号
    focused=$(echo "$activeworkspace" | jq -r '.id')
    
    # 提取所有包含窗口的工作区编号
    occupied=$(echo "$workspaces" | jq -r '.[] | .id')
    
    # 更新聚焦工作区状态为 2
    if [[ -n "$focused" && "$focused" =~ ^[0-9]+$ ]] && ((focused >= 1 && focused <= 10)); then
        status[$((focused-1))]=2
    fi
    
    # 更新包含窗口的工作区状态为 1（跳过已标记为2的聚焦工作区）
    for ws in $occupied; do
        if [[ -n "$ws" && "$ws" =~ ^[0-9]+$ ]] && ((ws >= 1 && ws <= 10)); then
            idx=$((ws-1))
            [[ ${status[$idx]} -ne 2 ]] && status[$idx]=1
        fi
    done
    
    # 输出JSON格式的状态数组
    #echo "${status[@]}" 

    r=""

    for s in "${status[@]}"; do
        r+="$s"
    done

    echo "$r"

}

# 初始状态输出
get_workspace_status


niri msg -j event-stream | while read -r line; do
    
    case "$line" in
        *"WindowOpenedOrChanged"*)
            get_workspace_status
            ;;
    esac
done