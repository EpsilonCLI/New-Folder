import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, For, With } from "gnim"
import Pango from 'gi://Pango'

import {appsbar, niri, click_cursor} from "../bars/const" 

export default function Appsbar() {
  return (
    <box spacing={2}>
      <For each={appsbar}>{(app) => 
          {
            const isnotActivate = createBinding(niri, "focusedWindow").as(
                      (app2) => {
                        return app2 !== app;
                      },
                    )
            const appid = app.app_id.toString()
            const apptitle = createBinding(app,"title")
            return(
              <button cursor={click_cursor} class={isnotActivate((yn) => {return yn?"items":"items focused"})} onClicked={() => {app.focus(app.id)}}>
                <box class={"xxx"} spacing={5}>
                  <image iconName={appid} />
                  <label tooltipText={apptitle} label={apptitle} ellipsize={Pango.EllipsizeMode.END} maxWidthChars={15} widthChars={15} halign={Gtk.Align.CENTER}></label>
                  
                </box>
              </button>
            )
          }
        }</For>
    </box>
  )
}