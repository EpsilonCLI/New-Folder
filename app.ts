import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./bars/Bar"
import Bottom from "./bars/Bottom"
import Left from "./bars/Left"
//import NotificationPopups from "./items/NotificationPopups"

app.start({
  css: style,
  gtkTheme: "adw-gtk3",
  main() {
    app.get_monitors().map(Bar)
    app.get_monitors().map(Left)
    app.get_monitors().map(Bottom)
    //NotificationPopups()
  },
})
