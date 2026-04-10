import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"

export default function ScrollChangeWindows() {
    var wstime = true
    return (
        <Gtk.EventControllerScroll flags={Gtk.EventControllerScrollFlags.VERTICAL} onScroll={(event, deltaX, deltaY) => {
            //print(deltaX, deltaY);
            if(wstime){
              wstime = false
              deltaY < 0?execAsync(["niri", "msg", "action", "focus-column-left"]):execAsync(["niri", "msg", "action", "focus-column-right"])
              setTimeout(function(){wstime = true},60)
            }
        }} />
    )
}