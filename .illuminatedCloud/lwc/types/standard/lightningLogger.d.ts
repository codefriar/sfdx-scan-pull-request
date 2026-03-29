// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Logs the event data from the component.
 * @see {@link https://developer.salesforce.com/docs/component-library/bundle/lightning-logger/documentation|Add observability to your Lightning web components using the Custom Component Instrumentation API}
 */
declare module "lightning/logger" {
    /**
     * Logs the event data from the component.
     * @param message The message to be logged to the Lightning Logger Event Type in Event Monitoring.
     */
    export function log(
        message: string | number | boolean | object | symbol | bigint,
    ): void;
} //