// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

// TODO: Need to add wire adapter mappings for these, but they're undocumented

declare module 'lightning/salesEngagementWorkspaceApi' {
    /**
     * Wire adapter for getting sales user workspace personalization.
     */
    export function getWorkspaceUserPersonalization(): void;

    /**
     * Wire adapter for getting sales user workspace supported objects.
     */
    export function getEngagementWorkspaceObjects(): void;

    /**
     * Wire adapter for updating sales user workspace personalization.
     */
    export function updateWorkspaceUserPersonalization(): void;

    /**
     * Wire adapter for deleting sales user workspace personalization.
     */
    export function deleteWorkspaceUserPersonalization(): void;
}