import PropTypes from "prop-types";
import React from "react";
import Box from "../box/box.jsx";
import {
    defineMessages,
    injectIntl,
    intlShape,
    FormattedMessage,
} from "react-intl";
import {
    isRendererSupported,
    isNewFunctionSupported,
    findIncompatibleUserscripts,
} from "../../lib/tw-environment-support-prober.js";
import { APP_NAME } from "@ampmod/branding";
import * as bowser from "bowser";
import Header from "../amp-header/header.jsx";
import Footer from "../amp-footer/footer.jsx";
import { notScratchDesktop } from "../../lib/isScratchDesktop.js";

import styles from "./browser-modal.css";
import unhappyBrowser from "./unsupported-browser.svg";

const messages = defineMessages({
    browserNotSupported: {
        id: "gui.unsupportedBrowser.label",
        defaultMessage: "Browser is not supported",
        description: "",
    },
    systemNotSupported: {
        id: "tw.browserModal.desktopTitle",
        defaultMessage: "System is not supported",
        description:
            "Title of error message in desktop app when system does not support required API, such as WebGL",
    },
    deviceNotSupported: {
        id: "amp.browserModal.device",
        defaultMessage: "Device is not supported",
        description: "Title of error message when on a mobile device",
    },
});

const noop = () => {};

const BrowserModal = ({ intl, ...props }) => {
    const title =
        bowser.parse(navigator.userAgent).platform.type === "mobile"
            ? messages.deviceNotSupported
            : props.onClickDesktopSettings
              ? messages.systemNotSupported
              : messages.browserNotSupported;
    const incompatibleUserscripts = findIncompatibleUserscripts();
    return (
        <>
            {notScratchDesktop() && !props.isEmbedded && <Header />}
            <div dir={props.isRtl ? "rtl" : "ltr"}>
                <Box className={styles.illustration}>
                    <img src={unhappyBrowser} draggable={false} />
                </Box>

                <Box className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage {...title} />
                    </h2>

                    {/* eslint-disable max-len */}
                    {isNewFunctionSupported() ? null : (
                        // This message should only be seen by website operators, so we don't need to translate it
                        <p>
                            {
                                "Unable to compile JavaScript with new Function(). This is most likely caused by an overly-strict Content-Security-Policy. The CSP must include 'unsafe-eval'."
                            }
                        </p>
                    )}

                    {incompatibleUserscripts.length > 0 && (
                        <React.Fragment>
                            {incompatibleUserscripts.map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                        </React.Fragment>
                    )}

                    {bowser.parse(navigator.userAgent).platform.type ===
                        "mobile" &&
                        !props.isEmbedded && (
                            <React.Fragment>
                                <p>
                                    <FormattedMessage
                                        defaultMessage="{APP_NAME}'s editor is not supported on mobile devices. However, you can still view projects on the AmpMod website."
                                        description="Error message when on mobile."
                                        id="amp.browserModal.mobile"
                                        values={{
                                            APP_NAME,
                                        }}
                                    />
                                </p>
                            </React.Fragment>
                        )}

                    {!isRendererSupported() && (
                        <React.Fragment>
                            <p>
                                <FormattedMessage
                                    defaultMessage="{APP_NAME} requires WebGL, however your computer does not seem to support it. This is often a temporary error that can be fixed by restarting your computer."
                                    description="Error message when browser does not support WebGL."
                                    id="tw.browserModal.webgl1"
                                    values={{
                                        APP_NAME,
                                    }}
                                />
                            </p>

                            {props.onClickDesktopSettings ? (
                                <React.Fragment>
                                    <p>
                                        <FormattedMessage
                                            defaultMessage={
                                                'You can also try toggling the "graphics acceleration" option in desktop settings:'
                                            }
                                            description="Error message when browser does not support WebGL (desktop app version). Consider seeing how Chrome translates 'graphics acceleration' into your language."
                                            id="tw.browserModal.webglDesktop"
                                        />
                                    </p>
                                    <div
                                        className={styles.desktopSettingsOuter}
                                    >
                                        <button
                                            onClick={
                                                props.onClickDesktopSettings
                                            }
                                            className={
                                                styles.desktopSettingsInner
                                            }
                                        >
                                            <FormattedMessage
                                                defaultMessage="Open Desktop Settings"
                                                description="Button in unsupported system modal to open desktop settings"
                                                id="tw.browserModal.desktopSettings"
                                            />
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <p>
                                    <FormattedMessage
                                        defaultMessage={
                                            'Use a recent version of Chrome, Firefox, or Safari, and ensure your graphics drivers are up to date. You can also try toggling the "graphics acceleration" or "hardware acceleration" option in your browser\'s settings.'
                                        }
                                        description="Error message when browser does not support WebGL (browser version). Chrome calls it graphics acceleration and Firefox calls it hardware acceleration; consider seeing how they actually translate these"
                                        id="tw.browserModal.webglBrowser"
                                    />
                                </p>
                            )}
                        </React.Fragment>
                    )}

                    {/* eslint-enable max-len */}
                </Box>
            </div>
            {notScratchDesktop() && !props.isEmbedded && <Footer />}
        </>
    );
};

BrowserModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    isEmbedded: PropTypes.bool,
    onClickDesktopSettings: PropTypes.func,
};

export default BrowserModal;
