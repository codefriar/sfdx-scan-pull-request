// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module 'lightning/platformWorkspaceApi' {
    import {PageReference} from 'lightning/uiAppsApi';

    /** The focused tab ID */
    export const FOCUSED_TAB_ID: string;

    /**
     * Information about a workspace tab, with nested arrays of information on each subtab:
     * https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lightning_getAllTabInfo.htm?q=tabinfo
     */
    export interface TabInfo {
        tabId?: string;
        url?: string;
        pinned?: boolean;
        closeable?: boolean;
        title?: string;
        icon?: string;
        iconAlt?: string;
        customTitle?: string;
        customTitleAlt?: string;
        highlighted?: boolean;
        pageReference?: PageReference;
        // TODO: I'm not sure which of these is correct. It's documented above as 'isSubtab' but is shown in examples as 'isSubTab'
        isSubtab?: boolean;
        isSubTab?: boolean;
        parentTabId?: string;
        subtabs?: TabInfo[];
        focused?: boolean;
        recordId?: string
    }

    /**
     * Closes the tab or workspace with the specified ID.
     * @param tabId ID of the workspace tab or subtab to close.
     * @return Returns a Promise. Success resolves to true. The promise will be rejected on error.
     */
    export function closeTab(tabId: string): Promise<boolean>;

    /**
     * Enables or disables close for the tab or workspace with the specified ID.
     * @param tabId ID of the workspace tab or subtab to disable tab close for.
     * @param disabled Specifies whether to disable tab close.
     * @return Returns a Promise. Success resolves to a tabInfo object. The promise will be rejected on error.
     */
    export function disableTabClose(
        tabId: string,
        disabled: boolean
    ): Promise<TabInfo>;

    /**
     * Focuses the tab or workspace with the specified ID.
     * @param tabId ID of the workspace tab or subtab on which to focus.
     * @return Returns a Promise. Success resolves to true. The Promise will be rejected on error.
     */
    export function focusTab(tabId: string): Promise<boolean>;

    /**
     * Returns an array of all tab info.
     * @return Returns a Promise. Success resolves to an array of tabInfo objects. The Promise will be rejected on error.
     */
    export function getAllTabInfo(): Promise<TabInfo[]>;

    /**
     * Returns the focused tab info.
     * @return Returns a Promise. Success resolves to a tabInfo object. The Promise will be rejected on error.
     */
    export function getFocusedTabInfo(): Promise<TabInfo>;

    /**
     * Returns tab info for the tab or workspace with the specified ID.
     * @param tabId ID of the tab for which to retrieve the information.
     * @return Returns a Promise. Success resolves to a tabInfo object. The Promise will be rejected on error.
     */
    export function getTabInfo(tabId: string): Promise<TabInfo>;

    /**
     * Opens a new subtab.
     * @param parentTabId ID of the workspace tab within which the new subtab should open.
     * @param options options for how the sub-tab should be opened
     * @return Returns a Promise. Success resolves to the tabId of the subtab. The Promise will be rejected on error.
     */
    export function openSubtab(
        parentTabId: string,
        options?: OpenSubtabOptions
    ): Promise<string>;

    export interface OpenSubtabOptions {
        /** A PageReference representing the content of the new subtab. */
        pageReference?: PageReference,
        /** A record ID representing the content of the new subtab. */
        recordId?: string,
        /** The URL representing the content of the new subtab. URLs can be either relative or absolute. */
        url?: string,
        /** Specifies whether the new subtab has focus. */
        focus?: boolean,
        /** The icon of the subtab. An SLDS icon key. See a full list of icon keys on the SLDS reference site. */
        icon?: string,
        /** Alternative text for the icon. */
        iconAlt?: string,
        /** The label of the subtab. */
        label?: string
    }

    /**
     * Opens a new tab.
     * @param options options for how the tab should be opened
     * @return Returns a Promise. Success resolves to the tabId of the workspace. The Promise will be rejected on error.
     */
    export function openTab(options?: OpenTabOptions): Promise<string>;

    export interface OpenTabOptions {
        /** A PageReference representing the content of the new tab. */
        pageReference?: PageReference,
        /** A record ID representing the content of the new tab. */
        recordId?: string,
        /** The URL representing the content of the new tab. URLs can be either relative or absolute. */
        url?: string,
        /** Specifies whether the new tab has focus. */
        focus?: boolean,
        /** The icon of the tab. An SLDS icon key. See a full list of icon keys on the SLDS reference site. */
        icon?: string,
        /** Alternative text for the icon. */
        iconAlt?: string,
        /** The label of the tab. */
        label?: string
        /** Specifies whether to override nav rules when opening the new tab. */
        overrideNavRules?: boolean;
    }

    /**
     * Refreshes the tab or workspace with the specified ID.
     * @param tabId ID of the workspace tab or subtab to refresh.
     * @param options options for how the tab should be refreshed
     * @return Returns a Promise. Success resolves to true. The Promise will be rejected on error.
     */
    export function refreshTab(tabId: string, options?: RefreshTabOptions): Promise<boolean>;

    export interface RefreshTabOptions {
        /** If the tabId corresponds to a workspace tab, all subtabs within that workspace are refreshed. The default is true. Keep in mind that the first subtab has the same tabId as the workspace tab. */
        includeAllSubtabs?: boolean;
    }

    /**
     * Sets the icon of the tab or workspace with the specified ID.
     * @param tabId The ID of the tab for which to set the icon.
     * @param icon An SLDS icon key. See a full list of icon keys on the SLDS reference site.
     * @param options options for how the tab icon should be set.
     * @return Returns a Promise. Success resolves to a tabInfo object of the modified tab. The Promise will be rejected on error.
     */
    export function setTabIcon(tabId: string, icon: string, options?: SetTabIconOptions): Promise<TabInfo>;

    export interface SetTabIconOptions {
        /** Alternative text for the icon. */
        iconAlt?: string;
    }

    /**
     * Sets the label of the tab or workspace with the specified ID.
     * @param tabId The ID of the tab for which to set the label.
     * @param label The label of the workspace tab or subtab.
     * @return Returns a Promise. Success resolves to a tabInfo object of the modified tab. The Promise will be rejected on error.
     */
    export function setTabLabel(tabId: string, label: string): Promise<TabInfo>;

    /**
     * Sets whether the tab or workspace with the specified ID is highlighted.
     * @param tabId The ID of the tab for which to highlight.
     * @param highlighted Specifies whether the new tab should be highlighted.
     * @param options options for how the tab should be highlighted
     * @return Returns a Promise. Success resolves to a tabInfo object of the modified tab. The Promise will be rejected on error.
     */
    export function setTabHighlighted(tabId: string, highlighted: boolean, options?: SetTabHighlightedOptions): Promise<TabInfo>;

    export interface SetTabHighlightedOptions {
        /** If true, causes two colors to alternate in a smooth animation. */
        pulse?: boolean;
        /** Changes the tab color. Available types are success (green), warning (yellow), and error (red). */
        state?: 'success' | 'warning' | 'error';
    }

    // Wire adapters

    import {WireAdapterConstructor} from "lwc";

    /** Returns the enclosing tab ID if the caller component is within a tab, null, otherwise. */
    export const EnclosingTabId: string & WireAdapterConstructor;

    /** Returns true if console navigation is present, false otherwise. */
    export const IsConsoleNavigation: boolean & WireAdapterConstructor;
}