// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Enables use of a custom chat header component for chat messages in Service Cloud Embedded Service. The custom chat header can be selected from Embedded Service Chat Setup. Your custom component should specify the lightningSnapin__ChatHeader target in the js-meta.xml configuration file.
 */
declare module 'lightningsnapin/baseChatHeader' {
    import {LightningElement} from 'lwc';

    export class BaseChatHeader extends LightningElement {
    }
}