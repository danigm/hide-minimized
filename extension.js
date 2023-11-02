import { Workspace } from 'resource:///org/gnome/shell/ui/workspace.js'
import {
  GroupCyclerPopup,
  WindowCyclerPopup,
  WindowSwitcherPopup,
} from 'resource:///org/gnome/shell/ui/altTab.js'

// import { UIWindowSelector, UIWindowSelectorWindow } from 'resource:///org/gnome/shell/ui/screenshot.js'
// import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const isOverviewWindow = Workspace.prototype._isOverviewWindow;
const groupGetWindows = GroupCyclerPopup.prototype._getWindows;
const windowGetWindows = WindowCyclerPopup.prototype._getWindows;
const windowSwitcherWindows = WindowSwitcherPopup.prototype._getWindowList;

// const capture = UIWindowSelector.prototype.capture;


function _filterWindows(windows) {
  return windows.filter((w, i, a) => !w.minimized);
}


export default class HideMinimized {
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

    WindowCyclerPopup.prototype._getWindows = function() {
      return _filterWindows(windowGetWindows.bind(this)());
    };

    GroupCyclerPopup.prototype._getWindows = function() {
      return _filterWindows(groupGetWindows.bind(this)());
    };

    WindowSwitcherPopup.prototype._getWindowList = function() {
      return _filterWindows(windowSwitcherWindows.bind(this)());
    };

    /*
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
    WindowCyclerPopup.prototype._getWindows = windowGetWindows;
    GroupCyclerPopup.prototype._getWindows = groupGetWindows;
    WindowSwitcherPopup.prototype._getWindowList = windowSwitcherWindows;
    // UIWindowSelector.prototype.capture = capture;
  }
}
