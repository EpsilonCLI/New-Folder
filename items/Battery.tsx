import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "gnim"

import AstalBattery from "gi://AstalBattery"
import AstalPowerProfiles from "gi://AstalPowerProfiles"

import {click_cursor} from "../bars/const" 

export default function Battery() {
  const battery = AstalBattery.get_default()
  const powerprofiles = AstalPowerProfiles.get_default()

  const percent = createBinding(
    battery,
    "percentage",
  )((p) => `${Math.floor(p * 100)}%`)

  const setProfile = (profile: string) => {
    powerprofiles.set_active_profile(profile)
  }

  return (
    <menubutton cursor={click_cursor} visible={createBinding(battery, "isPresent")} class={"items"}>
      <box class={"xxx"}>
        <image iconName={createBinding(battery, "iconName")} />
        <label label={" "} />
        <label label={percent} />
      </box>
      <popover>
        <box orientation={Gtk.Orientation.VERTICAL}>
          {powerprofiles.get_profiles().map(({ profile }) => (
            <button onClicked={() => setProfile(profile)} >
              <label label={profile=="power-saver"?"省电":(profile=="balanced"?"平衡":"性能")} xalign={0} />
            </button>
          ))}
        </box>
      </popover>
    </menubutton>
  )
}