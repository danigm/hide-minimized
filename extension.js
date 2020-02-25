const isOverviewWindow = imports.ui.workspace.Workspace.prototype._isOverviewWindow;
const getWindows = imports.ui.altTab.getWindows;

function init() {
}

function enable() {
  imports.ui.workspace.Workspace.prototype._isOverviewWindow = (win) => {
    const show = isOverviewWindow(win);
    return show && !win.get_meta_window().minimized;
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
