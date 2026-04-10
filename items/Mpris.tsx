import { Accessor } from "ags"
import { Gtk, Gdk } from "ags/gtk4"
import { createBinding, For } from "gnim"
import AstalMpris from "gi://AstalMpris"

import {players, click_cursor} from "../bars/const" 

export default function Mpris() {


  return (
    <menubutton cursor={click_cursor} class={"items"}>
      <box class={"xxx music"} spacing={5}>
        <image iconName={"folder-music-symbolic"} />
        <For each={players}>
          {(player) => {
            //const [app] = apps.exact_query(player.entry)
            //return <image visible={!!app.iconName} iconName={app?.iconName} />
            //const name = 1
            return <label label={createBinding(player, "title")} />
          }}
        </For>
      </box>
      <popover>
        <box spacing={4} orientation={Gtk.Orientation.VERTICAL}>
          <For each={players}>
            {(player) => (
              <box spacing={4} widthRequest={300}>
                <box overflow={Gtk.Overflow.HIDDEN} css="border-radius: 4px;">
                  <image
                    pixelSize={128}
                    file={createBinding(player, "coverArt")}
                  />
                </box>
                <box widthRequest={150} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
                <box
                  valign={Gtk.Align.CENTER}
                  orientation={Gtk.Orientation.VERTICAL}
                >
                  <label xalign={0} label={createBinding(player, "title")} />
                  <label xalign={0} label={createBinding(player, "artist")} />
                </box>
                <box valign={Gtk.Align.CENTER} halign={Gtk.Align.END}>
                  <button
                    onClicked={() => player.previous()}
                    visible={createBinding(player, "canGoPrevious")}
                  >
                    <image pixelSize={32} iconName="media-seek-backward-symbolic" />
                  </button>
                  <button
                    onClicked={() => player.play_pause()}
                    visible={createBinding(player, "canControl")}
                  >
                    <box>
                      <image 
                        pixelSize={32}
                        iconName="media-playback-pause-symbolic"
                        visible={createBinding(
                          player,
                          "playbackStatus",
                        )((s) => s === AstalMpris.PlaybackStatus.PLAYING)}
                      />
                      <image 
                        pixelSize={32}
                        iconName="media-playback-start-symbolic"
                        visible={createBinding(
                          player,
                          "playbackStatus",
                        )((s) => s !== AstalMpris.PlaybackStatus.PLAYING)}
                      />
                    </box>
                  </button>
                  <button
                    onClicked={() => player.next()}
                    visible={createBinding(player, "canGoNext")}
                  >
                    <image pixelSize={32} iconName="media-seek-forward-symbolic" />
                  </button>
                </box>
                </box>
              </box>
            )}
          </For>
        </box>
      </popover>
    </menubutton>
  )
}