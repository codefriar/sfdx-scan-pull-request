// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

/**
 * This module and its wire adapter, getListUi, are deprecated and no longer updated. Use lightning/uiListsApi with the getListInfoByName wire adapter instead.
 */
declare module 'lightning/uiListApi' {
// IC2 BEGIN
    // Deduping these type definitions
    import {FieldId, ObjectId} from "@salesforce/schema";

    import {ListInfo} from "lightning/uiListsApi";
    import {ListReference} from "lightning/uiRelatedListApi";
    import {RecordRepresentation} from "lightning/uiRecordApi";

    /** The record data and metadata for a list view. */
    export interface ListUI {
        /** The metadata for the list view. */
        info?: ListInfo;
        /** The record data for the list view. */
        records?: ListRecordCollection;
    }

    /** A collection of list view records. */
    export interface ListRecordCollection {
        /** The total count of records returned. */
        count?: number;
        /** The token for the current page of records. */
        currentPageToken?: string;
        /** The URL of the current page of records. */
        currentPageUrl?: string;
        /** The list of fields requested when these records were fetched. If a field isn't available to the user, an error occurs. */
        fields?: string[];
        /** An ETag that indicates whether the metadata has changed. */
        listInfoETag?: string;
        /** The list the records belong to. */
        listReference?: ListReference;
        /** The token for the next page of records. */
        nextPageToken?: string;
        /** The URL of the next page of records. */
        nextPageUrl?: string;
        /** The list of optional fields requested when these records were fetched. If a field isn't available to the user, no error occurs and the field isn't included in the response. */
        optionalFields?: string[];
        /** The number of list records viewed at one time. The default value is 50. */
        pageSize?: number;
        /** The token for the previous page of records. */
        previousPageToken?: string;
        /** The URL of the previous page of records. */
        previousPageUrl?: string;
        /** A collection of records. */
        records?: RecordRepresentation[];
        /** The API name of the field the list view is sorted by. If the name is preceded with -, the sort order is descending. */
        sortBy?: string;
    }
// IC2 END

    /**
     * Gets the records and metadata for a list view.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_get_list_ui
     *
     * @param objectApiName API name of the list view's object (must be specified along with listViewApiName).
     * @param listViewApiName API name of the list view (must be specified with objectApiName).
     * @param listViewId ID of the list view (may be specified without objectApiName or listViewApiName).
     * @param pageToken A token that represents the page offset. To indicate where the page starts, use this value with the pageSize parameter.
     *                The maximum offset is 2000 and the default is 0.
     * @param pageSize The number of list records viewed at one time. The default value is 50. Value can be 1–2000.
     * @param sortBy The API name of the field the list view is sorted by. If the name is preceded with `-`, the sort order is descending.
     *                For example, Name sorts by name in ascending order. `-CreatedDate` sorts by created date in descending order.
     *                Accepts only one value per request.
     * @param fields Additional fields queried for the records returned. These fields don't create visible columns.
     *                If the field is not available to the user, an error occurs.
     * @param optionalFields Additional fields queried for the records returned. These fields don't create visible columns.
     *                       If the field is not available to the user, no error occurs and the field isn't included in the records.
     * @returns See description.
     *
     * @deprecated Use 'lightning/uiListsApi' instead.
     */
    export function getListUi(
        objectApiName?: string | ObjectId,
        listViewApiName?: string | symbol,
        listViewId?: string,
        pageToken?: string,
        pageSize?: number,
        sortBy?: string | FieldId,
        fields?: Array<string | FieldId>,
        optionalFields?: Array<string | FieldId>,
    ): void;
}