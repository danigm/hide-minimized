import { Workspace } from 'resource:///org/gnome/shell/ui/workspace.js'
// import * as AltTab from 'resource:///org/gnome/shell/ui/altTab.js'
// import { UIWindowSelector, UIWindowSelectorWindow } from 'resource:///org/gnome/shell/ui/screenshot.js'
// import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const isOverviewWindow = Workspace.prototype._isOverviewWindow;
// const getWindows = AltTab.getWindows;
// const capture = UIWindowSelector.prototype.capture;

export default class HideMinimized{
  constructor() {
  }

  enable() {
    Workspace.prototype._isOverviewWindow = (win) => {
      const show = isOverviewWindow(win);
      let meta = win;
      if (win.get_meta_window)
        meta = win.get_meta_window()
      return show && !meta.minimized;
    };
    /*
    AltTab.getWindows = (workspace) => {
      const windows = getWindows(workspace);
      return windows.filter((w, i, a) => !w.minimized);
    };
    // Patched version of original function from:
    // https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/screenshot.js
    UIWindowSelector.prototype.capture = function() {
      for (const actor of global.get_window_actors()) {
        let window = actor.metaWindow;
        let workspaceManager = global.workspace_manager;
        let activeWorkspace = workspaceManager.get_active_workspace();
        if (window.is_override_redirect() ||
            !window.located_on_workspace(activeWorkspace) ||
            window.get_monitor() !== this._monitorIndex ||
            window.minimized)
            continue;

        const widget = new UIWindowSelectorWindow(
            actor,
            {
                style_class: 'screenshot-ui-window-selector-window',
                reactive: true,
                can_focus: true,
                toggle_mode: true,
            }
        );

        widget.connect('key-focus-in', win => {
            Main.screenshotUI.grab_key_focus();
            win.checked = true;
        });

        if (window.has_focus()) {
            widget.checked = true;
            widget.toggle_mode = false;
        }

        this._layoutManager.addWindow(widget);
      }
    };
    */
  }

  disable() {
    Workspace.prototype._isOverviewWindow = isOverviewWindow;
    // AltTab.getWindows = getWindows;
    // UIWindowSelector.prototype.capture = capture;
  }
}
