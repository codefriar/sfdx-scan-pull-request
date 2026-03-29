// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

/**
 * This module includes new wire adapters to get records, metadata, and record count for a related list.
 */
declare module 'lightning/uiRelatedListApi' {
    import {ListColumn, ListFilterByInfo, ListOrderByInfo, ListUserPreference} from "lightning/uiListsApi";
    import {RecordRepresentation} from "lightning/uiRecordApi";

// IC2 BEGIN
    // Deduping these type definitions
    import {ObjectId} from "@salesforce/schema";

    /** Metadata that describes a related list. */
    export interface RelatedListInfo {
        /** Indicates whether the related list can be cloned. */
        cloneable?: boolean;
        /** Indicates whether a new related list for this related list's object can be created. */
        createable?: boolean;
        /** Indicates whether the related list can be deleted. */
        deletable?: boolean;
        /** All display columns for this related list. */
        displayColumns?: ListColumn[];
        /** The API name of the field in the child object that links to the parent object. */
        fieldApiName?: string;
        /** Related list fields queried. If a field is specified and the user doesn't have access to it or it doesn't exist, an error occurs. */
        fields?: string[];
        /** The filter logic string, such as "(1 OR 2) and 3". Related lists don't support saved filters, so the value is always empty. */
        filterLogicString?: string;
        /** Filtering information for the related list. Related lists don't support saved filters, so the value is always empty. */
        filteredByInfo?: ListFilterByInfo[];
        /** The related list display label, for example, "Contracts". */
        label?: string;
        /** A reference to the related list. */
        listReference?: ListReference;
        /** The API names for the objects returned in the related list. The objects returned depend on the parent object's layout. */
        objectApiNames?: string[];
        /** Additional related list fields queried. If a field is specified and the user doesn't have access to it, no error occurs. */
        optionalFields?: string[];
        /** Ordering information for the related list. */
        orderedByInfo?: ListOrderByInfo[];
        /** Indicates whether metadata was retrieved for only the list columns in the page layout (true) or all columns (false). */
        restrictColumnsToLayout?: boolean;
        /** Indicates whether the related list can be updated. */
        updateable?: boolean;
        /** User preferences for the related list. */
        userPreferences?: ListUserPreference;
        /** The related list's visibility. Related lists are always Public. */
        visibility?: string;
        /** Indicates whether the visibility of the related list can be edited. The value is always false. */
        visibilityEditable?: boolean;
    }
// IC2 END

    /**
     * Gets the metadata for a specific Related List
     * @param parentObjectApiName The API name of the parent object for the related list (must be specified with relatedListId)
     * @param parentRecordId The record ID of the parent record for the related list (must be specified with relatedListId)
     * @param relatedListId The ID of the related list (can be specified with either parentObjectApiName or parentRecordId)
     * @param recordTypeId The ID of the parent record type. If not provided, the default record type is used.
     * @param fields The API names of the related list's fields.
     * @param optionalFields The API names of additional fields in the related list.
     * @param restrictColumnsToLayout Indicates whether to retrieve metadata for only the list columns in the page layout (true) or all columns (false). The default value is true. To further filter columns, use restrictColumnsToLayout with fields and optionalFields.
     */
    export function getRelatedListInfo(
        parentObjectApiName?: string | ObjectId,
        parentRecordId?: string,
        relatedListId?: string,
        recordTypeId?: string,
        fields?: string[],
        optionalFields?: string[],
        restrictColumnsToLayout?: boolean
    ): void;

    /**
     * Gets the metadata for a batch of related lists
     * @param parentObjectApiName The API name of the parent object for the related lists
     * @param relatedListIds Comma separated IDs of supported related lists for the specified parent object
     */
    export function getRelatedListInfoBatch(parentObjectApiName: string | ObjectId, relatedListIds: Array<string>): void;

// IC2 BEGIN
    /** A collection of related lists for a given object. */
    export interface RelatedListSummaryCollection {
        /** The API name of the parent object. */
        parentObjectApiName?: string;
        /** The record type ID of the parent. */
        parentRecordTypeId?: string;
        /** Related list information. */
        relatedLists?: RelatedListSummary[];
    }

    /** A summary of a related list for an object. */
    export interface RelatedListSummary {
        /** The label for the related list object. */
        entityLabel?: string;
        /** The plural label for the related list object. */
        entityLabelPlural?: string;
        /** The API name of the field in the child object that links to the parent object. */
        fieldApiName?: string;
        /** The key prefix for IDs of the object that populates the list. This can be null for some related lists. */
        keyPrefix?: string;
        /** The related list label. */
        label?: string;
        /** The API name for the object. */
        objectApiName?: string;
        /** The name of the field that relates the object to the parent object. */
        parentFieldApiName?: string;
        /** The ID of the related list. */
        relatedListId?: string;
        /** The URL to fetch the metadata for the related list. */
        relatedListInfoUrl?: string;
        /** The theme info for the related list object. */
        themeInfo?: ThemeInfo;
    }

    /** Color and icon information for a theme. */
    export interface ThemeInfo {
        /** Color */
        color?: string;
        /** Icon URL */
        iconUrl?: string;
    }
// IC2 END

    /** Gets a collection of metadata for all the related lists for a specific entity
     *
     * @param parentObjectApiName The API name of the parent object
     */
    export function getRelatedListsInfo(parentObjectApiName?: string | ObjectId): void;

// IC2 BEGIN
    /** A collection of related list records. */
    export interface RelatedListRecordCollection {
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
     * Gets a collection of records for a given record and related list
     * @param parentRecordId The record ID of the parent record for the related list
     * @param relatedListId The ID of the related list
     */
    export function getRelatedListRecords(
        parentRecordId: string,
        relatedListId: string
    ): void;

    /**
     *  Gets record data for a batch of related lists
     * @param parentRecordId The ID of the parent record you want to get related lists for
     * @param relatedListIds Comma separated IDs of supported related lists for the specified parent record
     */
    export function getRelatedListRecordsBatch(
        parentRecordId: string,
        relatedListIds: Array<string>
    ): void;

// IC2 BEGIN
    /** The number of records in a given related list. */
    export interface RelatedListRecordCount {
        /** The number of records in the related list. */
        count?: number;
        /** Indicates whether there are more records than the provided count. */
        hasMore?: boolean;
        /** The related list referenced. */
        listReference?: ListReference;
    }

    /** The list view referenced by the collection or metadata. */
    export interface ListReference {
        /** The list view ID. */
        id?: string;
        /** The list view's API name, for example, AllAccounts. */
        listViewApiName?: string;
        /** A supported object, such as Account. */
        objectApiName?: string;
        /** The list view type. */
        type?: string;
    }
// IC2 END

    /**
     * Gets the count of records for a related list on a specific given record
     * @param parentRecordId The record ID of the parent record for the related list
     * @param relatedListId The ID of the related list
     */
    export function getRelatedListCount(
        parentRecordId: string,
        relatedListId: string
    ): void;

// IC2 BEGIN
    /**
     * Get records for a batch of RelatedLists.
     *
     * @param parentRecordId The ID of the parent record that you want to get related lists for, like an Account ID.
     * @param relatedListParameters An array of related list parameter collections.
     */
    export function getRelatedListRecordsBatch(
        parentRecordId: string,
        relatedListParameters: RelatedListParameters
    ): void;

    /** The related list parameters. */
    export interface RelatedListParameters {
        /** The API name of a related list object, like Contacts, Opportunities, or Cases. */
        relatedListId: string;
        /** The API names of the related list's column fields. */
        fields?: string[];
        /** The API names of additional fields in the related list. */
        optionalFields?: string[];
        /** The number of list records to return per page. */
        pageSize?: number;
        /** An array of field API names to sort the related list by. Accepts only one value per request. */
        sortBy?: string[];
        /** The filter to apply to related list records, in GraphQL syntax. */
        where?: string;
    }

    /** The simplified results from a request to a batch resource. Results include information for each sub-request in the batch. */
    export interface SimplifiedBatchResults {
        /** Collection of batch result items */
        results?: BatchResultItem[];
    }

    // TODO: I'm not sure if this is correct either, though it's based on:
    //  https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_batch_result.htm#ui_api_responses_batch_result
    //  However, the example from the documentation doesn't resolve everything property, e.g., "relatedListId" and "records":
    //  https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_get_related_list_records_batch
    /** The results of one sub-request in a batch request. */
    export interface BatchResultItem {
        /** A response body for a record or related list. */
        result?: ErrorMessage | RecordRepresentation | RelatedListInfo | RelatedListRecordCount;
        /** An HTTP status code indicating the status of this individual request in the batch. */
        statusCode?: number;
    }

    /** An error code and error message. */
    export interface ErrorMessage {
        /** An error code with information about the error, for example, INSUFFICIENT_PRIVILEGES */
        errorCode?: string;
        /** Description of error */
        message?: string;
    }

    /**
     * Get the metadata for a batch of RelatedLists
     *
     * @param parentObjectApiName The API name of a parent object that you want to get related lists for, like an Account.
     * @param relatedListNames The comma-separated API names of a related list object such as Contacts, Opportunities, or Cases.
     */
    export function getRelatedListInfoBatch(
        parentObjectApiName: string,
        relatedListNames: string
    ): void;
// IC2 END
}