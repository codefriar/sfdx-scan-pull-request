// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_methods_lightning_utilityBarAPI.htm */
declare module 'lightning/platformUtilityBarApi' {
    /**
     * Toggles modal mode for a utility. While in modal mode, an overlay blocks users from using the console while the
     * utility panel is visible.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_enableModal.htm
     *
     * @param utilityId The ID of the utility for which to toggle modal mode.
     * @param enabled Specifies whether to enable the utility's modal mode.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function enableModal(
        utilityId: string,
        enabled: boolean
    ): Promise<boolean>;

    /**
     * Toggles pop-out mode on a utility. Enabling pop-out mode on a utility displays the utility in a separate child window.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_enablePopout.htm
     *
     * @param utilityId The ID of the utility for which to toggle pop-out mode.
     * @param enabled Specifies whether to enable the utility's modal mode.
     * @param options Optional parameters.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function enablePopout(
        utilityId: string,
        enabled: boolean,
        options?: EnablePopoutOptions
    ): Promise<boolean>;

    export interface EnablePopoutOptions {
        /** Hover text for pop-out button when the utility is not enabled for pop-out mode. */
        disabledText?: string;
    }

    export interface UtilityInfo {
        /** The ID of the utility. */
        id?: string;
        /** Whether the utility is loaded. */
        isLoaded?: boolean;
        /** The label of the utility. */
        utilityLabel?: string;
        /** The SLDS icon ID of the utility's icon. */
        utilityIcon?: string;
        /** The SLDS icon variant of the utility's icon. */
        utilityIconVariant?: string;
        /** Whether the utility is highlighted. */
        utilityHighlighted?: boolean;
        /** Whether the utility is visible. */
        utilityVisible?: boolean;
        /** Whether the utility is popped out. */
        utilityPoppedOut?: boolean;
        /** The label of the utility panel. */
        panelHeaderLabel?: string;
        /** The SLDS icon ID of the utility panel's icon. */
        panelHeaderIcon?: string;
        /** The SLDS icon variant of the utility panel's icon. */
        panelHeaderIconVariant?: string;
        /** The height of the utility panel in pixels. */
        panelHeight?: number;
        /** The width of the utility panel in pixels */
        panelWidth?: number;
    }

    /**
     * Returns the state of all utilities as an array of {@link UtilityInfo} objects.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lightning_getAllUtilityInfo.htm
     *
     * @return a promise that resolves to an array of {@link UtilityInfo} objects. The promise is rejected on error.
     */
    export function getAllUtilityInfo(): Promise<UtilityInfo[]>

    /**
     * Returns the state of the current utility as a {@link UtilityInfo} object.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_getInfo.htm
     *
     * @param utilityId The ID of the utility for which to retrieve the state.
     * @return a promise that resolves to a {@link UtilityInfo} object representing the enclosing utility. The promise is rejected on error.
     */
    export function getInfo(utilityId: string): Promise<UtilityInfo>;

    /**
     * Minimizes a utility.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_minimize.htm
     *
     * @param utilityId The ID of the utility for which to minimize.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function minimize(utilityId: string): Promise<boolean>;

    /**
     * Registers an eventHandler for the utility. This eventHandler is called when the utility is clicked.
     * Consider the following guidelines when working with this method.
     *
     * * The method is supported in Lightning apps with standard and console navigation.
     * * You can use this method to register multiple callbacks per utilityItem when executed sequentially.
     * * You can't remove registered callbacks.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lightning_onUtilityClick.htm
     *
     * @param utilityId The ID of the utility for which to register the callback.
     * @param eventHandler The JavaScript function that's called when the utility is clicked.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function onUtilityClick(
        utilityId: string,
        eventHandler: Function
    ): Promise<boolean>;

    /**
     * Opens a utility. If the utility is already open, this method has no effect. Only one utility can be open at a
     * time. If another utility is already open, open() minimizes the utility.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_open.htm
     *
     * @param utilityId The ID of the utility to open.
     * @param options Optional parameters.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function open(
        utilityId: string,
        options?: OpenOptions
    ): Promise<boolean>;

    export interface OpenOptions {
        /** Specifies whether the utility item to open has focus. */
        autoFocus?: boolean;
    }

    /**
     * Specifies a label and icon on the utility panel, and provides a height and width for the panel.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_updatePanel.htm
     *
     * @param utilityId The ID of the utility panel to update.
     * @param options Optional parameters.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function updatePanel(
        utilityId: string,
        options?: UpdatePanelOptions
    ): Promise<boolean>;

    export interface UpdatePanelOptions {
        /** The label of the utility that's displayed in the panel header. */
        label?: string;
        /**
         * The Lightning Design System (SLDS) name of the icon in the format einstein, where einstein is the name of
         * the SLDS utility icon. The icon is displayed in the utility panel header. See a full list of utility icon
         * keys at the SLDS reference site. SLDS doctype, standard, custom, and action icons aren't supported.
         */
        icon?: string;
        /** The variant changes the color of the utility panel icon. */
        iconVariant?: 'success' | 'warning' | 'error';
        /** The height of the utility panel in pixels. */
        height?: number;
        /**
         * CSS transition for the utility panel's height. Use with height. Pass in these optional arguments:
         * * durationMs — The time in milliseconds. It takes for the height transition to complete. The default value is 0.
         * * timingFunction — The transition timing function that sets the rate for panel height changes. Applies any CSS easing function that's supported by your target browser. The default value is ease.
         * * delayMs — The wait time in milliseconds before the height transition starts. The default value is 0.
         */
        heightTransition?: object;
        /** The width of the utility panel in pixels. */
        width?: number;
        /**
         * CSS transition for the utility panel's width. Use with width. Pass in these optional arguments:
         * * durationMs — The time in milliseconds. It takes for the width transition to complete. The default value is 0.
         * * timingFunction — The transition timing function that sets the rate for panel width changes. Applies any CSS easing function that's supported by your target browser. The default value is ease.
         * * delayMs — The wait time in milliseconds before the width transition starts. The default value is 0.
         */
        widthTransition?: object;
    }

    /**
     * Specifies a label and icon on the utility bar, and sets a utility as highlighted.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_updateUtility.htm
     *
     * @param utilityId The ID of the utility to update.
     * @param options Optional parameters.
     * @return a promise that resolves to true if successful. The promise is rejected on error.
     */
    export function updateUtility(
        utilityId: string,
        options?: UpdateUtilityOptions
    ): Promise<boolean>;

    export interface UpdateUtilityOptions {
        /** The label of the utility that's displayed in the utility bar. */
        label?: string;
        /** The Lightning Design System (SLDS) name of the icon in the format einstein, where einstein is the name of the SLDS utility icon. The icon is displayed in the utility bar. See a full list of utility icon keys at the SLDS reference site. SLDS doctype, standard, custom, and action icons aren't supported. */
        icon?: string;
        /** The variant changes the color of the utility bar. */
        iconVariant?: 'success' | 'warning' | 'error';
        /** Makes a utility more prominent by applying a different background color. */
        highlighted?: boolean;
    }

    /**
     * Determines if the component is within a utility. To obtain the ID of the enclosing utility, use this context
     * wire adapter. If a caller component isn't using the wire adapter inside a panel, the enclosing utility ID is
     * null.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_enclosingUtilityId.htm
     *
     * @return the enclosing utility ID if the caller component is within a utility, or null otherwise.
     */
    import {WireAdapterConstructor} from "lwc";
    export const EnclosingUtilityId: string & WireAdapterConstructor;
}