// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Use the Lightning Web Components Wire Service to access Salesforce CMS content data.
 */
declare module 'lightning/cmsDeliveryApi' {
    /**
     * Retrieves published CMS content versions for an Experience Builder site.
     *
     * @param communityId the ID of the Experience Builder site for which published CMS content versions should be returned.
     */
    export function listContent(communityId: string): void;
}