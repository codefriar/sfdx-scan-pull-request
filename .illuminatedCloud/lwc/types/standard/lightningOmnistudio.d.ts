// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Share data and pass messages between components that don’t have a parent-child relationship using the
 * lightning/omnistudioPubsub module. Using this module, you can register, unregister, and fire events dynamically.
 *
 * https://developer.salesforce.com/docs/component-library/bundle/lightning-omnistudio-pubsub
 */
declare module 'lightning/omnistudioPubsub' {
    export interface OmnistudioPubsub {
        /**
         * Register a set of event handlers to a specific channel.
         *
         * @param eventName The name of the event to register for
         * @param callbackObject The callback object to register
         */
        register(eventName: string, callbackObject: any): void;

        /**
         * Fire an event over a specific channel to all registered handlers. The payload can be any object. However,
         * make sure your handlers expect that particular structure. For example, if you intend to send a JSON object
         * with various keys, your handlers should know what those keys are.
         *
         * @param eventName The name of the event to fire
         * @param action The action to perform
         * @param payload the payload data for the event
         */
        fire(eventName: string, action: string, payload: any): void;

        /**
         * Unregister your set of event handlers from a channel. To avoid memory leaks or potential errors, always
         * unregister event handlers when a component is disposed or disconnected. In addition, to properly unregister
         * event handlers, pass both the channel name and instance of your event handler objects.
         *
         * @param eventName The name of the event to unregister from
         * @param callbackObject The callback object to unregister
         * */
        unregister(eventName: string, callbackObject: any): void;
    }

    // Export an instance of the OmnistudioPubsub interface as the default for this module
    const omnistudioPubsub: OmnistudioPubsub;
    export default omnistudioPubsub;
}