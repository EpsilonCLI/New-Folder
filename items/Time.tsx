import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"

import {time, click_cursor} from "../bars/const" 

export default function Time() {
    
    return (
        <menubutton cursor={click_cursor} class={"items"}>
          <box class={"xxx"}>
          <label label={time} class={""} />
          </box>
          <popover>
            <box spacing={2} class={""}>
              <box></box>
              <Gtk.Calendar />
            </box>
          </popover>
        </menubutton>
    )

}