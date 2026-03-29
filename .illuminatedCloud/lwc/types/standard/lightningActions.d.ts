// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * This module includes CloseActionScreenEvent.
 */
declare module 'lightning/actions' {
    /**
     * When you are using screen actions, you can close the modal by importing the new CloseActionScreenEvent from 'lightning/actions'. When fired this will shut the model window if the user needs to cancel or close the quick action.
     */
    export class CloseActionScreenEvent extends CustomEvent<any> {
        constructor(eventInt?: EventInit);
    }

    /**
     * Close Screen Action Event base class
     */
    export const CloseScreenEventName: string = 'lightning__actionsclosescreen';
}