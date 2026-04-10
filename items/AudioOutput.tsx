import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "gnim"

import AstalWp from "gi://AstalWp"

import { click_cursor } from "../bars/const"

export default function AudioOutput() {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!
  const volume = createBinding(speaker, "volume")
  return (
    <menubutton class={"items"} cursor={click_cursor}>
      <box class={"xxx audio"}>
        <label label={volume((a) => {return "󰕾  " + Math.floor(a*100).toString() + "%"})} />
      </box>
      <popover>
        <box>
          <slider
            orientation={Gtk.Orientation.VERTICAL}
            heightRequest={260}
            inverted
            onChangeValue={({ value }) => speaker.set_volume(value)}
            value={volume}
          />
        </box>
      </popover>
    </menubutton>
  )
}