// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Update the data for a specific hierarchy of components (a "view"), without reloading an entire page.
 */
declare module 'lightning/refresh' {
    import {LightningElement} from 'lwc';

    /** The refresh process was not able to run on descendant refresh handler nodes. */
    export const REFRESH_ERROR = 0;
    /** Default. The refresh process has completed on all descendant refresh handler nodes. */
    export const REFRESH_COMPLETE = 1;
    /** The refresh process has completed on descendant refresh handler nodes, but some children have reported an error. */
    export const REFRESH_COMPLETE_WITH_ERRORS = 2;

    /**
     * An event that is sent when a module signals a refresh to a container. This event bubbles, propagates outside
     * the template in which it was dispatched, and has default behavior that can't be canceled. You can call
     * preventDefault() on this event.
     */
    export class RefreshEvent extends Event {
        constructor();
    }

    /**
     * Registers a container to receive the dispatched refresh event and begin the refresh process when the event is received. To use the RefreshView API, there must be a component somewhere on the page that registers to receive RefreshEvent.
     *
     * @param contextElement An HTMLElement representing the container to receive a refresh event.
     * @param providerMethod A Function identifying the callback method to be invoked when the refresh process begins. This callback receives a Promise as a parameter that represents the status of the overall refresh process.
     *
     * @returns a numeric refreshNode.handle value that uniquely identifies the container that is to receive refresh events. You can pass this value to unregisterRefreshContainer() to stop the component from receiving refresh events.
     */
    export function registerRefreshContainer(contextElement: HTMLElement | Constructor<LightningElement>, providerMethod: Function): number;

    /**
     * Stops a container from receiving refresh events.
     *
     * @param refreshId A numeric refreshNode.handle value that uniquely identifies the node of this container on the refresh tree. You obtain the refreshNode.handle value when you call registerRefreshContainer().
     */
    export function unregisterRefreshContainer(refreshId: number): void;

    /**
     * Registers a component's refresh handler method to be included in a refresh process.
     *
     * @param contextElement An HTMLElement representing the container that is participating in the refresh process.
     * @param providerMethod A Function identifying the callback method to be invoked when the refresh process begins. The handler callback is required to return a Promise that represents the refresh status of its particular element.
     *
     * @returns a numeric refreshNode.handle value that uniquely identifies the node of this component on the refresh tree. You can pass this value to unregisterRefreshHandler() to remove this component's refresh handler method from the refresh process.
     */
    export function registerRefreshHandler(contextElement: HTMLElement | Constructor<LightningElement>, providerMethod: Function): number;

    /**
     * Removes a container's refresh handler method from the refresh process.
     *
     * @param refreshId A numeric refreshNode.handle value that uniquely identifies the node of this component on the refresh tree. You obtain the refreshNode.handle value when you call registerRefreshHandler().
     */
    export function unregisterRefreshHandler(refreshId: number): void;
}