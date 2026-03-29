// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Enables customization of the user interface for chat messages in Service Cloud Embedded Service. Embedded Service is supported in Lightning Out, Communities, and Essentials. Your custom chat message component must import the lightningsnapin-base-chat-message module and specify the lightningSnapin__ChatMessage target in the js-meta.xml configuration file.
 */
declare module 'lightningsnapin/baseChatMessage' {
    import {LightningElement} from 'lwc';

    export class BaseChatMessage extends LightningElement {
    }
}