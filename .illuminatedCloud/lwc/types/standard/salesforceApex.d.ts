// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module "@salesforce/apex" {
    import {FieldId} from "@salesforce/schema";

    /**
     * Services for Apex.
     */
    export interface ApexServices {
        /**
         * Refreshes a property annotated with @wire. Queries the server for updated data and refreshes the cache.
         * @param wiredTargetValue A property annotated with @wire.
         * @returns Promise that resolves to the refreshed value. If an error occurs, the promise is rejected.
         */
        refreshApex: (wiredTargetValue: any) => Promise<any>;

        /**
         * Gets a field value from an Apex sObject.
         * @param sObject The sObject holding the field.
         * @param field The field to return.
         * @returns The field's value. If it doesn't exist, undefined is returned.
         */
        getSObjectValue: (sObject: Object, field: string | FieldId) => any;
    }

// IC2 BEGIN
    // Also export these as top-level functions because that's how they're used

    /**
     * Refreshes a property annotated with @wire. Queries the server for updated data and refreshes the cache.
     *
     * This function is deprecated for the non-Apex usage of the function. Support for non-Apex usage of the function
     * ends on May 1, 2023. We recommend using the getRecordNotifyChange function instead to refresh record data
     * returned by a non-Apex wire adapter. refreshApex continues to be supported for data returned by a wire adapter
     * that uses Apex.
     *
     * @param wiredTargetValue A property annotated with @wire.
     * @returns Promise that resolves to the refreshed value. If an error occurs, the promise is rejected.
     */
    export function refreshApex(wiredTargetValue: any): Promise<any>;

    /**
     * Gets a field value from an Apex sObject.
     * @param sObject The sObject holding the field.
     * @param field The field to return.
     * @returns The field's value. If it doesn't exist, undefined is returned.
     */
    export function getSObjectValue(sObject: Object, field: string | FieldId): any;
// IC2 END
}