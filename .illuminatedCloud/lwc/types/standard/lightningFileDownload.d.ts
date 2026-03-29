// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Use the lightning/fileDownload module's generateURL method in your Lightning web components in Experience Cloud
 * sites that use the Build Your Own (LWR) template. The module supports downloads of ContentDocument, ContentVersion,
 * Attachment, and Document content types from desktop and mobile devices.
 */
declare module 'lightning/fileDownload' {
    /**
     * Generates a file download URL for the specified file's record ID.
     *
     * @param recordId the file record ID
     * @return a URL to download the file
     */
    export function generateUrl(recordId: string): string;
}