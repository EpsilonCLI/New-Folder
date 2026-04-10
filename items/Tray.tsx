import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, For } from "gnim"
import AstalTray from "gi://AstalTray"


import {tray, click_cursor} from "../bars/const" 

export default function Tray() {
  
  const items = createBinding(tray, "items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }

  return (
    <box class={"items"}>
      <box class={"xxx tray"} spacing={10}>
      <For each={items}>
        {(item) => (
          <menubutton cursor={click_cursor} $={(self) => init(self, item)}>
            <image gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
      </box>
    </box>
  )
}