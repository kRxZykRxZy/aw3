import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { connect } from "react-redux";

import check from "../../lib/assets/icon--success.svg";
import {
    GUI_MAP,
    GUI_AMP_LIGHT,
    GUI_LIGHT,
    GUI_DARK,
    GUI_AMOLED,
    GUI_HIGH_CONTRAST,
    Theme,
} from "../../lib/themes/index.js";
import { closeSettingsMenu } from "../../reducers/menus.js";
import { setTheme } from "../../reducers/theme.js";
import { persistTheme } from "../../lib/themes/themePersistance.js";
import {
    openGuiThemeMenu,
    guiThemeMenuOpen,
    closeGuiThemeMenu,
} from "../../reducers/menus.js";
import styles from "./welcome.css";

const options = defineMessages({
    [GUI_AMP_LIGHT]: {
        defaultMessage: "Light",
        description: "Light theme option",
        id: "amp.gui.light",
    },
    [GUI_LIGHT]: {
        defaultMessage: "Light (Classic)",
        description: "Light theme option",
        id: "amp.gui.lightClassic",
    },
    [GUI_DARK]: {
        defaultMessage: "Dark",
        description: "Dark theme option",
        id: "amp.gui.dark",
    },
    [GUI_AMOLED]: {
        defaultMessage: "AMOLED (Beta)",
        description: "AMOLED theme option with true black",
        id: "amp.gui.amoled",
    },
    [GUI_HIGH_CONTRAST]: {
        defaultMessage: "High Contrast (Alpha)",
        description: "High contrast theme option",
        id: "amp.gui.highContrast",
    },
});

const GuiIcon = ({ id }) => (
    <>
        <div
            className={styles.themeSelectorIconOuter}
            style={{
                backgroundColor:
                    GUI_MAP[id].guiColors["ui-primary"] ||
                    GUI_MAP["light"].guiColors["ui-primary"],
            }}
        >
            <div
                className={styles.themeSelectorIconMenubar}
                style={{
                    borderBottomColor:
                        GUI_MAP[id].guiColors["high-contrast-border"] ||
                        "transparent",
                    backgroundColor:
                        GUI_MAP[id].guiColors["menu-bar-background"] ||
                        GUI_MAP["light"].guiColors["menu-bar-background"],
                }}
            />
            <div
                className={styles.themeSelectorIconFakeBlocks}
                style={{
                    borderColor: GUI_MAP[id].guiColors["ui-black-transparent"],
                    backgroundColor:
                        GUI_MAP[id].blockColors["workspace"] || "#fff",
                }}
            />
        </div>
    </>
);

GuiIcon.propTypes = {
    id: PropTypes.string,
};

const GuiThemeItem = ({ id, isSelected, onClick }) => (
    <button
        type="button"
        className={styles.themeSelectorButton}
        aria-pressed={isSelected}
        onClick={onClick}
    >
        <GuiIcon id={id} />
        <span className={styles.themeSelectorLabel}>
            <FormattedMessage {...options[id]} />
        </span>
    </button>
);

GuiThemeItem.propTypes = {
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

const GuiThemeMenu = ({ isOpen, isRtl, onChangeTheme, onOpen, theme }) => {
    return (
        <div className={styles.themeSelectorRow}>
            {[
                GUI_AMP_LIGHT,
                GUI_LIGHT,
                GUI_DARK,
                GUI_AMOLED,
                GUI_HIGH_CONTRAST,
            ].map(id => (
                <GuiThemeItem
                    key={id}
                    id={id}
                    isSelected={theme.gui === id}
                    onClick={() => onChangeTheme(theme.set("gui", id))}
                />
            ))}
        </div>
    );
};

GuiThemeMenu.propTypes = {
    theme: PropTypes.instanceOf(Theme),
    isRtl: PropTypes.bool,
    onOpen: PropTypes.func,
    onChangeTheme: PropTypes.func,
};

const mapStateToProps = state => ({
    isOpen: guiThemeMenuOpen(state),
    theme: state.scratchGui.theme.theme,
    isRtl: state.locales.isRtl,
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
    onOpen: () => dispatch(openGuiThemeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuiThemeMenu);
