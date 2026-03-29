// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Enables customization of the user interface for the minimized state. Your custom component should specify the lightningSnapin__Minimized target in the js-meta.xml configuration file.
 */
declare module 'lightningsnapin/minimized' {
    /**
     * You must call assignHandler for each specific eventName, and you can assign multiple handlers per eventName.
     * @param eventName The name of the event for the minimized chat window. The event names are available in the Embedded Service for Web Developer Guide.
     * @param listener Handles the event when it's fired. When you declare your function handler, you can expect to receive one parameter JSON object that has data about the event in it. Find the attributes for each event data in the Embedded Service for Web Developer Guide.
     */
    export function assignHandler(eventName: string, listener: EventListenerOrEventListenerObject): void;

    /**
     * Triggers the maximized state of the Embedded Service Chat application.
     */
    export function maximize(): void
}