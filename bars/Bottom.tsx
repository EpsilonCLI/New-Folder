import { Accessor } from "ags"
import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"

import Appsbar from "../items/Appsbar"
import Mpris from "../items/Mpris"
import ScrollChangeWindows from "../items/ScrollChangeWindows"

import { is_overview } from "./const"

export default function Bottom(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bottom"
      class="bar"
      css={is_overview(a => a?"background-color: #222":"")}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={app}
      height_request={26}
      default_height={26}
    >
      
      <ScrollChangeWindows />
      <centerbox>
        <box $type="start" >
          <Appsbar/>
        </box>

        <box $type="center" >
          
        </box>

        <box $type="end" spacing={2}>
          <Mpris />
        </box>

      </centerbox>
    </window>
    
  )
}