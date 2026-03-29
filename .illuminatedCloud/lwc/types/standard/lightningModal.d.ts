// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module 'lightning/alert' {
    export default class LightningAlert {
        /** Creates an alert modal with an error message and "OK" button. Returns a promise that resolves when the user clicks "OK". */
        static open({config}: LightningAlertConfig): Promise<void>;
    }

    export interface LightningAlertConfig {
        /** value to use for header text in "header" variant or aria-label in "headerless" variant */
        label?: string;
        /** text to display in body of modal */
        message?: string;
        /** theme to use when variant is "header"; valid values are based on SLDS themes and are listed in "themeOptions" of interactiveDialogBase.js */
        theme?: 'error' | 'default' | string;
        /** variant to use for alert; may be set to "header" or "headerless" */
        variant?: 'header' | 'headerless';

        // Allows use of other parameters which correspond to @api fields in the dialog
        [key: string]: any;
    }
}

declare module 'lightning/confirm' {
    export default class LightningConfirm {
        /** Creates a headerless confirm modal with two buttons, "OK" and "Cancel". Returns a promise that resolves to true when the user clicks "OK" and false when they click "Cancel." */
        static open({config}: LightningConfirmConfig): Promise<boolean>;
    }

    export interface LightningConfirmConfig {
        /** value to use for header text in "header" variant or aria-label in "headerless" variant */
        label?: string;
        /** text to display in body of modal */
        message?: string;
        /** theme to use when variant is "header"; valid values are based on SLDS themes and are listed in "themeOptions" of interactiveDialogBase.js */
        theme?: 'error' | 'default' | string;
        /** variant to use for alert; may be set to "header" or "headerless" */
        variant?: 'header' | 'headerless';

        // Allows use of other parameters which correspond to @api fields in the dialog
        [key: string]: any;
    }
}

declare module 'lightning/prompt' {
    export default class LightningPrompt {
        /** Creates a prompt modal with a header, message, and two buttons. If the user inputs text and clicks "OK" in the prompt, returns a promise that resolves to the input value, but if the user clicks "Cancel" it resolves to null. */
        static open({config}: LightningPromptConfig): Promise<string | null>;
    }

    export interface LightningPromptConfig {
        /** default value for input */
        defaultValue?: string;
        /** value to use for header text in "header" variant or aria-label in "headerless" variant */
        label?: string;
        /** text to display in modal */
        message?: string;
        /** theme to use when variant is "header" valid values are based on SLDS themes and are listed in "themeOptions" of interactiveDialogBase.js */
        theme?: 'error' | 'default' | string;
        /** variant to use for alert; may be set to "header" or "headerless" */
        variant?: 'header' | 'headerless';

        // Allows use of other parameters which correspond to @api fields in the dialog
        [key: string]: any;
    }
}

/**
 * A lightningModal component overlays a message modal on top of the current app window. A modal interrupts a user's
 * workflow and draws attention to the message.
 */
declare module 'lightning/modal' {
    import {HTMLElementTheGoodPart, ShadowRootTheGoodPart} from "lwc";

    // NOTE: From https://developer.salesforce.com/docs/component-library/bundle/lightning-modal/documentation
    //  "Unlike other components, this component doesn't use a lightning-modal tag or extend LightningElement."
    export default class LightningModal extends HTMLElementTheGoodPart {
        readonly template: ShadowRootTheGoodPart;

        /** The modal's title and assistive device label. */
        label: string;
        /** How much of the viewport width the modal uses. Supported values are small, medium, and large. */
        size?: 'small' | 'medium' | 'large' | 'full';
        /** The modal's accessible description. */
        description?: string;
        /** Prevents closing the modal by normal means like the ESC key, the close button, or .close(). */
        disableClose?: boolean;

        /**
         * Opens a modal and returns a promise that asynchronously resolves with the result of the user's interaction with the modal.
         * @param config the modal configuration
         * @return a promise that resolves with the result of the user's interaction with the modal
         */
        static open({config}: LightningModalConfig): Promise<any>;

        /**
         * Closes the modal.
         *
         * @param result a result string indicating how the modal was closed.
         * */
        close(result?: string): void;
    }

    export interface LightningModalConfig {
        /** Sets the modal's title and assistive device label. If the modal has a header, set label in the lightning-modal-header component. If the modal doesn't have a header, set the label property when opening the modal. */
        label?: string;
        /** Determines how much of the viewport width the modal uses. Supported values are small, medium, large, and full. You can set the size attribute when you open the modal. Default value is medium. The height of the modal is determined by the amount of content in the lightning-modal-body component, and the size value. */
        size?: 'small' | 'medium' | 'large' | 'full';
        /** Sets the modal's accessible description. It uses the aria-description attribute where supported, or falls back to aria-describedby. If you set a custom description value, include the label name at the beginning of your description, because some screen readers only read the description, and not the label. */
        description?: string;
        /** Prevents closing the modal by normal means like the ESC key, the close button, or .close(). For example, you could briefly set disableClose to true while a completed form is saving, so the user doesn't dismiss the modal early. */
        disableClose?: boolean;

        // Allows use of other parameters which correspond to @api fields in the dialog
        [key: string]: any;
    }
}