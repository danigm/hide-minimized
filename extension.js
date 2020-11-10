const isOverviewWindow = imports.ui.workspace.Workspace.prototype._isOverviewWindow;
const getWindows = imports.ui.altTab.getWindows;

function init() {
}

function enable() {
  imports.ui.workspace.Workspace.prototype._isOverviewWindow = (win) => {
    const show = isOverviewWindow(win);
    let meta = win;
    if (win.get_meta_window)
      meta = win.get_meta_window()
    return show && !meta.minimized;
  };
  imports.ui.altTab.getWindows = (workspace) => {
    const windows = getWindows(workspace);
    return windows.filter((w, i, a) => !w.minimized);
  };
}

function disable() {
  imports.ui.workspace.Workspace.prototype._isOverviewWindow = isOverviewWindow;
  imports.ui.altTab.getWindows = getWindows;
}
