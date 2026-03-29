// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * The lightning/flowSupport module provides events that enable a component to control flow navigation and
 * notify the flow of changes in attribute values. The events are supported only in components where the
 * target is lightning__FlowScreen.
 *
 * https://developer.salesforce.com/docs/component-library/bundle/lightning-flow-support/documentation
 */
declare module 'lightning/flowSupport' {
    /** Informs the runtime that a component property has changed. */
    export class FlowAttributeChangeEvent extends Event {
        /**
         * Creates a Flow attribute change event for the named property with the provided value.
         *
         * @param propertyName the property name
         * @param propertyValue the property value
         */
        constructor(propertyName: string, propertyValue: any);
    }

    /** Requests navigation to the previous screen. */
    export class FlowNavigationBackEvent extends Event {
        constructor();
    }

    /** Requests navigation to the next screen. */
    export class FlowNavigationNextEvent extends Event {
        constructor();
    }

    /** Requests the flow runtime to pause the flow. */
    export class FlowNavigationPauseEvent extends Event {
        constructor();
    }

    /** Requests the flow runtime to terminate the flow. */
    export class FlowNavigationFinishEvent extends Event {
        constructor();
    }
}