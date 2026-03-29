// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

// TODO: Need to add wire adapter mappings for these, but they're undocumented

declare module 'lightning/salesUserWorkingHoursApi' {
    /**
     * Wire adapter for getting sales user working hours availability.
     */
    export function getSalesUserWorkingHours(): void;

    /**
     * Wire adapter for updating sales user working hours availability.
     */
    export function updateSalesUserWorkingHours(): void;

    /**
     * Wire adapter for creating sales user working hours availability.
     */
    export function createSalesUserWorkingHours(): void;

    /**
     * Wire adapter for deleting sales user working hours availability.
     */
    export function deleteSalesUserWorkingHours(): void;
}