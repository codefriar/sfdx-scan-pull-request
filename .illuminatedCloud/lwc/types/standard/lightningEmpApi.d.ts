// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * The lightning/empApi module provides access to methods for subscribing to a streaming channel and listening to
 * event messages. All streaming channels are supported, including channels for platform events, PushTopic events,
 * generic events, and Change Data Capture events. This component requires API version 44.0 or later.
 *
 * The lightning/empApi module uses a shared CometD connection, enabling you to run multiple streaming apps in a single
 * browser session. The connection is not shared among multiple user sessions.
 */
declare module 'lightning/empApi' {
    /** Response to a subscribe call. */
    export interface SubscribeResponse {
        /** The value MUST be /meta/unsubscribe */
        channel?: string;
        /** A boolean indicating the success or failure of the subscribe */
        successful?: boolean;
        /** A channel name or a channel pattern or an array of channel names and channel patterns. */
        subscription?: string;
        /** A string with the description of the reason for the failure */
        error?: string;
        /** The advice object */
        advice?: any;
        /** The extension object */
        ext?: any;
        /** The client ID returned in the handshake response */
        clientId?: string;
        /** The same value as the request message ID */
        id?: string;
    }

    /**
     * Subscribes to a given channel and returns a promise that holds a subscription object, which you use to
     * unsubscribe later.
     *
     * @param channel The channel name to subscribe to.
     * @param replayId Indicates what point in the stream to replay events from. Specify -1 to get new events from the
     * tip of the stream, -2 to replay from the last saved event, or a specific event replay ID to get all saved and
     * new events after that ID.
     * @param onMessageCallback A callback function that's invoked for every event received.
     */
    export function subscribe(
        channel: string,
        replayId: number,
        onMessageCallback: Function
    ): Promise<SubscribeResponse>;

    /** Response to a unsubscribe call. */
    export interface UnsubscribeResponse {
        /** The value MUST be /meta/unsubscribe */
        channel?: string;
        /** A boolean indicating the success or failure of the unsubscribe operation */
        successful?: boolean;
        /** A string with the description of the reason for the failure */
        error?: string;
        /** The advice object */
        advice?: any;
        /** The extension object */
        ext?: any;
        /** The client ID returned in the handshake response */
        clientId?: string;
        /** The same value as the request message ID */
        id?: string;
    }

    /**
     * Unsubscribes from the channel using the given subscription object and returns a promise. The result of this
     * operation is passed in to the callback function. The result object holds the successful boolean field which
     * indicates whether the unsubscribe operation was successful. The result fields are based on the CometD protocol
     * for the unsubscribe operation.
     *
     * @param subscription Subscription object that the subscribe call returned.
     * @param callback A callback function that's called with a server response for the unsubscribe call.
     */
    export function unsubscribe(
        subscription: Object,
        callback?: Function
    ): Promise<UnsubscribeResponse>;

    /**
     * Registers a listener to errors that the server returns.
     *
     * @param callback A callback function that's called when an error response is received from the server for
     * handshake, connect, subscribe, and unsubscribe meta channels.
     */
    export function onError(callback: Function);

    /**
     * Set to true or false to turn console logging on or off respectively.
     *
     * @param flag Set to true or false to turn console logging on or off respectively.
     */
    export function setDebugFlag(flag: boolean);

    /**
     * Returns a promise that holds a Boolean value. The value is true if the EmpJs Streaming API library can be used
     * in this context; otherwise false.
     */
    export function isEmpEnabled(): Promise<boolean>;
}