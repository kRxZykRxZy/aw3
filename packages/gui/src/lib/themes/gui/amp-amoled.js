import { guiColors as darkGuiColors } from "./dark";

const guiColors = {
    ...darkGuiColors,
    "ui-primary": "#000000",
    "ui-secondary": "#000000",
    "ui-tertiary": "#222222",

    "ui-white": "#000000",

    "assets-background": "#000000",

    "input-background": "#0a0a0a",

    "popover-background": "#0a0a0a",

    "fullscreen-background": "#000000",
    "fullscreen-accent": "#000000",

    "page-background": "#000000",
};
const blockColors = {
    insertionMarker: "#cccccc",
    workspace: "#000000",
    toolboxSelected: "#0a0a0a",
    toolboxText: "#cccccc",
    toolbox: "#000000",
    flyout: "#000000",
    scrollbar: "#666666",
    valueReportBackground: "#000000",
    valueReportBorder: "#222222",
    valueReportForeground: "#eeeeee",
    contextMenuBackground: "#000000",
    contextMenuBorder: "#ffffff26",
    contextMenuForeground: "#eeeeee",
    contextMenuActiveBackground: "#121212",
    contextMenuDisabledForeground: "#666666",
    flyoutLabelColor: "#cccccc",
    checkboxInactiveBackground: "#000000",
    checkboxInactiveBorder: "#c8c8c8",
    buttonBorder: "#c6c6c6",
    buttonActiveBackground: "#111111",
    buttonForeground: "#cccccc",
    zoomIconFilter: "invert(100%) grayscale(100%) brightness(140%)",
    gridColor: "#333333",
};
export { guiColors, blockColors };
