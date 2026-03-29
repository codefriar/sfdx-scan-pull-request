// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * The lightning/toast module displays a toast notification with an icon, label, message, and links. Use a toast
 * notification to convey small pieces of information to the user, such as providing feedback and confirmation after
 * the user takes an action. You can set toast notifications to disappear after a certain duration or until the user
 * clicks the close button.
 */
declare module 'lightning/toast' {
    /** Entry point for programmatically creating toast notifications. */
    export default class Toast {
        /**
         * To show a toast notification, call the function `show(config, comp)` from `lightning/toast` and provide a
         * toast config and a reference to the local component as parameters. The function creates a single page-level
         * toast container if one does not exist.
         *
         * @param config the configuration
         * @param component the parent component
         */
        public static show(
            config: ToastConfig,
            component: LightningElement
        ): void;
    }

    export interface ToastConfig {
        /** Title of the toast. label can contain link placeholders in the form of `{0} ... {N}` (index-based) or `{name} ... {someOtherName}` (name-based). The placeholders are replaced with the links in `labelLinks`. */
        label: string;
        /** `[{url, label}]`, which replaces the `{0} ... {N}` index-based placeholders in label or `{ name: {url, label} }`, which replaces the `{name} ... {someOtherName}` named placeholders in `label`. */
        labelLinks?: ToastConfigUrlLabelPair[] | { [key: string]: ToastConfigUrlLabelPair };
        /** Description of the toast. `message` can contain link placeholders in the form of `{0} ... {N}` (index-based) or `{name} ... {someOtherName}` (name-based). The placeholders are replaced with the links on `messageLinks`. */
        message?: string;
        /** `[{url, label}]`, which replaces the `{0} ... {N}` index-based placeholders in message or `{ name: {url, label} }`, which replaces the `{name} ... {someOtherName}` named placeholders in `message`. */
        messageLinks?: ToastConfigUrlLabelPair[] | { [key: string]: ToastConfigUrlLabelPair };
        /**
         * Appearance of the toast:
         * * `info` - grey color with `utility:info` icon
         * * `success` - green color with `utility:success` icon
         * * `warning` - orange color with `utility:warning` icon
         * * `error` - red color with `utility:error` icon
         */
        variant?: 'info' | 'success' | 'warning' | 'error';
        /**
         * Persistence of the toast:
         * * `dismissible` - The component automatically disappears after a certain duration. The user can dismiss it early by clicking the close button. The time duration for dismissible is 4.8 seconds when the toast doesn't contain a link or 9.6 seconds if the toast contains a link.
         * * `sticky` - The component stays on screen until the user clicks the close button.
         */
        mode?: 'dismissible' | 'sticky';
    }

    export interface ToastConfigUrlLabelPair {
        /** The URL. */
        url?: string;
        /** The label. */
        label?: string;
    }
}

/**
 * Fire and manage a list of toast notification message components, including their position, with
 * lightning/toastContainer for LWR sites. The module creates a container that handles and displays
 * your page-level toast notifications.
 */
declare module 'lightning/toastContainer' {
    /** Container for configuring toast behavior. */
    export default class ToastContainer {
        /** @return the toast container instance */
        public static instance(): ToastContainer;

        /** The maximum number of toasts */
        maxToasts?: number;
        /** The toast position/alignment */
        toastPosition?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    }
}