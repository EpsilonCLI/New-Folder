import { Accessor } from "ags"
import { Gtk } from "ags/gtk4"
import { createBinding, For, With } from "gnim"
import {workspaces, niri, click_cursor, is_overview} from "../bars/const"
import { execAsync } from "ags/process"


export default function Workspaces() {
    return (
      <button class={is_overview(a => a?"items focused":"items")} onClicked={toggleOverview} cursor={click_cursor}>
        <ScrollChangeWorkspaces />
        <box class={"xxx"} spacing={6}>
        <For each={workspaces}>{(ws) => 
          {
            const isnotActivate = createBinding(niri, "focusedWorkspace").as(
                      (focusedWorkspace) => {
                        return focusedWorkspace !== ws;
                      },
                    )
            return(<button valign={Gtk.Align.CENTER} class={isnotActivate((yn) => {return yn?"ws":"ws2"})} >
              
            </button>)
          }
        }</For>
        </box>
      </button>
    )

}

function ScrollChangeWorkspaces() {
    var wstime = true
    return (
        <Gtk.EventControllerScroll flags={Gtk.EventControllerScrollFlags.VERTICAL} onScroll={(event, deltaX, deltaY) => {
            //print(deltaX, deltaY);
            if(wstime){
              wstime = false
              deltaY < 0?execAsync(["niri", "msg", "action", "focus-workspace-up"]):execAsync(["niri", "msg", "action", "focus-workspace-down"])
              setTimeout(function(){wstime = true},200)
            }
        }} />
        
    )
}

function toggleOverview() {
  execAsync(["niri", "msg", "action", "toggle-overview"])
}