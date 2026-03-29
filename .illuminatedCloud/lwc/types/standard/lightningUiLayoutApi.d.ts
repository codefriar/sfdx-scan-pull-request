// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-ui-layout-api.html
declare module "lightning/uiLayoutApi" {
    export interface GetLayoutInput {
        /** A supported object. */
        objectApiName: string;
        /** Layout type for the record. */
        layoutType: 'Compact' | 'Full';
        /** The access mode for the record. This value determines which fields to get from a layout. Layouts have different fields for create, edit, and view modes. For example, formula fields are rendered in view mode, but not in create mode because they're calculated at run time, like formulas in a spreadsheet. */
        mode: ('Create' | 'Edit' | 'View') | ('Create' | 'Edit' | 'View')[];
        /** The ID of the record type (RecordType object) for the new record. If not provided, the default record type is used. */
        recordTypeId?: string;
    }

    /**
     * This wire adapter gets layout information, metadata, and data to build UI for one or more records. Use it instead of the deprecated lightning/getRecordUi.
     *
     * @param input the input parameters
     *
     * @return A Promise object that resolves to a Record Layout
     */
    export function getLayout(input: GetLayoutInput): void;
}