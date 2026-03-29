// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// TODO: These are simple signature stubs until better definitions are provided.

/**
 * Provides state management facilities. Note that this is considered **pilot** and is subject to change.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/state-management-examples.html}
 */
declare module "@lwc/state" {
    /**
     * Defines the state manager.
     * @param input The state manager definition input.
     * @returns The state manager definition output.
     */
    export function defineState(
        input: any
    ): any;
}

/**
 * Provides state management facilities. Note that this is considered **pilot** and is subject to change.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/state-management-examples.html}
 */
declare module "lightning/stateManagerRecord" {
    /**
     * Fetches a record from the state manager.
     * @param input The record input data.
     * @returns The record.
     */
    export default function smRecord(
        input: any
    ): any;
}

/**
 * Provides state management facilities. Note that this is considered **pilot** and is subject to change.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/state-management-examples.html}
 */
declare module "lightning/stateManagerLayout" {
    /**
     * Fetches a layout from the state manager.
     * @param input The layout input data.
     * @returns The layout.
     */
    export default function smLayout(
        input: any
    ): any;
}