// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

// TODO: Need to add wire adapter mappings for these, but they're undocumented

declare module 'lightning/platformScaleCenterApi' {
    /**
     * Wire adapter for a Scale Center observability metrics.
     *
     * @param request a serialized list of ScaleCenterRequests that define which metrics are to be queried
     * @returns a serialized list of the requested metric data
     */
    export function getMetrics(request: string): void;
}