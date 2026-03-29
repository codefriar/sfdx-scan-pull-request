// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module 'lightning/messageService' {
// IC2 BEGIN
    /** Marker interface for an imported message channel for strongly-typed development. */
    export interface MessageChannelType {
    }

    /** Marker interface for an imported message context for strongly-typed development. */
    export interface MessageContextType {
    }

    /** Marker interface for an imported message channel subscription for strongly-typed development. */
    export interface MessageChannelSubscription {
    }

    /** Simple enum for allowed subscription scopes for strongly-typed development. */
    export enum SubscriptionScope {
        ApplicationScope
    }

    /** Simple interface for subscriber options passed to subscribe() for strongly-typed development. */
    export interface SubscriberOptions {
        /** The scope that a component is subscribed to. */
        scope?: SubscriptionScope;
    }

// IC2 END

    /**
     * Send a message to listeners subscribed to the channel.
     *
     * @param {MessageContextType} messageContext - The MessageContext object.
     * @param {MessageChannelType} messageChannel - MessageChannel object.
     * @param {Object} message - Optional, serializable object to be sent to subscribers.
     * @param {Object} publisherOptions - Optional, options to influence message delivery.
     */
    export function publish(
        messageContext: MessageContextType,
        messageChannel: MessageChannelType,
        message?: Object,
        publisherOptions?: Object
    ): void;

    /**
     * Subscribes a listener function to be invoked when a message is published on the provided channel.
     *
     * @param {MessageContextType} messageContext - The MessageContext object.
     * @param {MessageChannelType} messageChannel - MessageChannel object.
     * @param {Function} listener - Function to be invoked when messages are published on the channel.
     * @param {SubscriberOptions | Object} subscriberOptions - Optional, options to influence message channel subscription.
     *                                     Current subscriber options:
     *                                       1. 'scope' - the scope that a component is subscribed to.
     *                                          Setting this to 'APPLICATION_SCOPE' subscribes in the application
     *                                          scope. See the 'APPLICATION_SCOPE' export for full documentation.
     * @return {MessageChannelSubscription} - Subscription object used to unsubscribe the listener, if no longer interested.
     */
    export function subscribe(
        messageContext: MessageContextType,
        messageChannel: MessageChannelType,
        listener: Function,
        subscriberOptions?: SubscriberOptions | Object
    ): MessageChannelSubscription;

    /**
     * Unregisters the listener associated with the subscription.
     *
     * @param {MessageChannelSubscription} subscription - Subscription object returned when subscribing.
     */
    export function unsubscribe(subscription: MessageChannelSubscription): void;

    /**
     * Creates a message context for an LWC library.
     *
     * @return {MessageContextType} - MessageContext for use by LWC Library.
     */
    export function createMessageContext(): MessageContextType;

    /**
     * Releases a message context associated with LWC library and
     * unsubscribes all associated subscriptions.
     *
     * @param {MessageContextType} messageContext - MessageContext for use by LWC Library.
     */
    export function releaseMessageContext(messageContext: MessageContextType): void;

    /**
     * A '@wire' adaptor that provides component context for a 'LightningElement'.
     * Annotate a component's property with '@wire(MessageContext)' and pass that
     * context value to the first parameter of the 'subscribe' and 'publish' functions.
     * When subscribing with a '@wire(MessageContext)' context value, all listeners
     * associated with that component get automatically cleaned up on 'disconnectedCallback'.
     */
    import {WireAdapterConstructor} from "lwc";
    export const MessageContext: MessageContextType & WireAdapterConstructor;
    /**
     * When using 'subscribe', 'APPLICATION_SCOPE' is passed in as a value to the 'scope' property of
     * the 'subscriberOptions'. This specifies that the subscriber wants to subscribe to messages on
     * a message channel no matter where the subscriber is in the entire application.
     */
    export const APPLICATION_SCOPE: SubscriptionScope = SubscriptionScope.ApplicationScope;
}

// IC2 BEGIN

// Standard message channel names:
// https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lwc_intro.htm
// https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_lightning_enhanced_messaging_lwc_events.htm

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabclosed.htm */
declare module '@salesforce/messageChannel/lightning__tabClosed' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabClosed: MessageChannelType;
    export default lightning__tabClosed;
}

/** Indicates that a tab has been closed. */
declare interface LightningTabClosed {
    /** The ID of the closed tab. */
    tabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabcreated.htm */
declare module '@salesforce/messageChannel/lightning__tabCreated' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabCreated: MessageChannelType;
    export default lightning__tabCreated;
}

/** Indicates that a tab has been created successfully. */
declare interface LightningTabCreated {
    /** The ID of the new tab. */
    tabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabfocused.htm */
declare module '@salesforce/messageChannel/lightning__tabFocused' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabFocused: MessageChannelType;
    export default lightning__tabFocused;
}

/** Indicates a tab was focused. */
declare interface LightningTabFocused {
    /** The ID of the previously focused tab. */
    previousTabId?: string;
    /** The ID of the currently focused tab. */
    currentTabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabrefreshed.htm */
declare module '@salesforce/messageChannel/lightning__tabRefreshed' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabRefreshed: MessageChannelType;
    export default lightning__tabRefreshed;
}

/** Indicates that a tab has been refreshed. */
declare interface LightningTabRefreshed {
    /** The ID of the refreshed tab. */
    tabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabreplaced.htm */
declare module '@salesforce/messageChannel/lightning__tabReplaced' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabReplaced: MessageChannelType;
    export default lightning__tabReplaced;
}

/** Indicates that a tab has been replaced successfully. */
declare interface LightningTabReplaced {
    /** The ID of the replaced tab. */
    tabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_tabupdated.htm */
declare module '@salesforce/messageChannel/lightning__tabUpdated' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__tabUpdated: MessageChannelType;
    export default lightning__tabUpdated;
}

/** Indicates that a tab has been updated successfully. */
declare interface LightningTabUpdated {
    /** The ID of the updated tab. */
    tabId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_messaging_lwc_conversationagentsend.htm */
declare module '@salesforce/messageChannel/lightning__conversationAgentSend' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__conversationAgentSend: MessageChannelType;
    export default lightning__conversationAgentSend;
}

/**
 * Messaging event triggered when an agent sends a message through the Salesforce console. This method intercepts the
 * message before it’s sent to the chat visitor. This event is also triggered when using Enhanced Messaging channels.
 * To work with Enhanced Messaging channels, the session must be active and the Enhanced Conversation Component must be
 * visible on the page.
 */
declare interface LightningConversationAgentSend {
    /** The ID of the work record that’s associated with the current conversation. */
    recordId?: string;
    /** The text of the message in the conversation log. */
    content?: string;
    /** The name of the agent who is attempting to send the message. This name matches the agent name displayed in the conversation log. */
    name?: string;
    /** The date and time that the agent attempted to send the message. */
    timestamp?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_messaging_lwc_conversationchatended.htm */
declare module '@salesforce/messageChannel/lightning__conversationEnded' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__conversationEnded: MessageChannelType;
    export default lightning__conversationEnded;
}

/**
 * Messaging event triggered when an active chat ends or an agent leaves a chat conference. This event is also triggered
 * when using Enhanced Messaging channels. To work with Enhanced Messaging channels, the session must be active and the
 * Enhanced Conversation Component must be visible on the page.
 */
declare interface LightningConversationEnded {
    /** The ID of the work record that’s associated with the current chat. */
    recordId?: string;
}

/** https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_events_messaging_lwc_conversationendusermessage.htm */
declare module '@salesforce/messageChannel/lightning__conversationEndUserMessage' {
    import {MessageChannelType} from "lightning/messageService";
    const lightning__conversationEndUserMessage: MessageChannelType;
    export default lightning__conversationEndUserMessage;
}

/**
 * Messaging event triggered when the customer sends a new message. In Enhanced Messaging channels, this event is
 * triggered only for text messages. This event is not triggered for messages with files or rich content. To work with
 * Enhanced Messaging channels, the session must be active and the Enhanced Conversation Component must be visible on
 * the page.
 */
declare interface LightningConversationEndUserMessage {
    /** The ID of the work record that’s associated with the current conversation. */
    recordId?: string;
    /** The message sent by the customer. */
    content?: string;
    /** The name of the user who sent the message. This name matches the username displayed in the conversation log. */
    name?: string;
    /** The date and time the message was received. */
    timestamp?: string;
}

// IC2 END