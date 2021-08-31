const isOverviewWindow = imports.ui.workspace.Workspace.prototype._isOverviewWindow;
const { Workspace } = imports.ui.workspace;
const { altTab } = imports.ui;
const { getWindows } = altTab;

function init() {
}

function enable() {
  Workspace.prototype._isOverviewWindow = (win) => {
    const show = isOverviewWindow(win);
    let meta = win;
    if (win.get_meta_window)
      meta = win.get_meta_window()
    return show && !meta.minimized;
  };
  altTab.getWindows = (workspace) => {
    const windows = getWindows(workspace);
    return windows.filter((w, i, a) => !w.minimized);
  };
}

function disable() {
  Workspace.prototype._isOverviewWindow = isOverviewWindow;
  altTab.getWindows = getWindows;
}
