// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * This module includes one wire adapter, getListInfoByName. Use this wire adapter to get the metadata for a list view.
 */
declare module 'lightning/uiListsApi' {
    /** Metadata that describes a list view. */
    export interface ListInfo {
        /** Indicates whether the list view can be cloned. */
        cloneable?: boolean;
        /** Indicates whether a new list view for this list view's object can be created. */
        createable?: boolean;
        /** Indicates whether the list view can be deleted. */
        deletable?: boolean;
        /** The list view's API name. For example, AllAccounts. */
        listViewApiName?: string;
        /** All display columns for this list view. */
        displayColumns?: ListColumn[];
        /** The filter logic string, such as "(1 OR 2) and 3". Indexes start with 1. */
        filterLogicString?: string;
        /** Filtering information for the list view. */
        filteredByInfo?: ListFilterByInfo[];
        /** Identity information for the list view. */
        id?: ListViewId;
        /** The list view's display label. For example, "All Accounts". */
        label?: string;
        /** Ordering information for the list view. */
        orderedByInfo?: ListOrderByInfo[];
        /** Indicates whether the list view can be updated. */
        updateable?: boolean;
        /** User preferences for this list view. */
        userPreferences?: ListUserPreference;
        /** The list view's visibility. */
        visibility?: 'Private' | 'Public' | 'Shared';
        /** Indicates whether the visibility of the list view can be edited. */
        visibilityEditable?: boolean;
    }

    /** A column in a list */
    export interface ListColumn {
        /** The API name for the field. */
        fieldApiName?: string;
        /** The label of the field. */
        label?: string;
        /** Indicates whether the list column is sortable. */
        sortable?: boolean;
    }

    /** Information used to filter a list */
    export interface ListFilterByInfo {
        /** The API name for the field used to filter the list. */
        fieldApiName?: string;
        /** The label for the field used to filter the list. */
        label?: string;
        /** The values (or label if one exists) used to filter the list. */
        operandLabels?: string[];
        /** The filter operator */
        operator?: 'Contains' | 'Equals' | 'Excludes' | 'GreaterOrEqual' | 'GreaterThan' | 'Includes' | 'LessOrEqual' | 'LessThan' | 'NotContain' | 'NotEqual' | 'StartsWith' | 'Within';
    }

    /** Information that identifies a list view. */
    export interface ListViewId {
        /** The list view ID. */
        id?: string;
        /** The object API name for the list view. */
        objectApiName?: string;
        /** The type of the list view. */
        type?: string;
    }

    /** Ordering information for a list. */
    export interface ListOrderByInfo {
        /** The API name for the field. */
        fieldApiName?: string;
        /** Indicates whether the list column is ascending or descending. */
        isAscending?: boolean;
        /** The localized label of the field. */
        label?: string;
    }

    /** User preferences for the list view. */
    export interface ListUserPreference {
        /** Column width preferences for the list view. Maps a column name to a width. */
        columnWidths?: {
            [key: string]: number;
        };
        /** Column wrapping preferences for the list view. Maps a column name to a boolean that indicates whether the column text wraps. */
        columnWrap?: {
            [key: string]: boolean;
        };
    }

    /**
     * List scope to update or create.
     */
    export interface ListScopeInput {
        /** API name of the list's scope. */
        apiName?: string;
        /** ID of the scope's entity. */
        entityId?: string;
        /** ID of the related entity for the scope. */
        relatedEntityId?: string;
    }

    export interface CreateListInfoInput {
        /** The API name of a supported object. */
        objectApiName: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName: string;
        /** Display columns (field API names) for the list. */
        displayColumns?: string[];
        /** The filter logic string, such as (1 OR 2) and 3. Indexes start with 1. */
        filterLogicString?: string;
        /** Filtering information for the list. */
        filteredByInfo?: ListFilterByInfo;
        /** The list's display label, such as All Accounts. */
        label?: string;
        /** Scope information for the list. */
        scope?: ListScopeInput;
        /** The list's level of visibility. */
        visibility?: 'Private' | 'Public' | 'Shared';
    }

    /**
     * Use this wire adapter to create a list view associated with a supported object.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListInfo.
     */
    export function createListInfo(input: CreateListInfoInput): void;

    export interface DeleteListInfoInput {
        /** The API name of a supported object. */
        objectApiName?: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName?: string;
    }

    /**
     * Use this wire adapter to delete a list view.
     *
     * @param input the input parameters
     *
     * @return If a list view is deleted successfully, there's no response.
     */
    export function deleteListInfo(input: DeleteListInfoInput): void;

    export interface GetListInfoByNameInput {
        /** The API name of a supported object. */
        objectApiName?: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName?: string;
    }

    /**
     * Use this wire adapter to get the metadata for a list view.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a List Info
     */
    export function getListInfoByName(input: GetListInfoByNameInput): void;

    export interface GetListInfosByNameInput {
        /** An array of comma-separated strings of list view names. A list view name starts with an entity name, a dot, and then the name of the list view, like Account.AllAccounts. */
        names?: string[];
    }

    /**
     * Use this wire adapter to get the metadata for a batch of list views.
     *
     * @param input the input parameters
     *
     * @return A results object with SimplifiedBatchResults and status codes.
     */
    export function getListInfosByName(input: GetListInfosByNameInput): void;

    /**
     * List info summary collection.
     */
    export interface ListInfoSummaryCollection {
        /** Total count of lists returned. */
        count?: number;
        /** Page token of the current page of lists. */
        currentPageToken?: string;
        /** URL of the current page of lists. */
        currentPageUrl?: string;
        /** Collection of list summaries. */
        lists?: ListInfoSummary[];
        /** Page token of the next page of lists. */
        nextPageToken?: string;
        /** URL of the next page of lists. */
        nextPageUrl?: string;
        /** API name of the object in the URL. */
        objectApiName?: string;
        /** Page size specified in the query parameter or the default value. */
        pageSize?: number;
        /** Page size specified in the query parameter or the default value. */
        previousPageToken?: string;
        /** URL of the previous page of lists. */
        previousPageUrl?: string;
        /** Query string specified in the query parameter or null. */
        queryString?: string;
        /** Indicates whether recent lists only were returned (true) or not (false). */
        recentListsOnly?: boolean;
    }

    /**
     * List info summary.
     */
    export interface ListInfoSummary {
        /** API name of the list. */
        apiName?: string;
        /** ID of the list. */
        id?: string;
        /** List's label. */
        label?: string;
        /** List's UI URL. */
        url?: string;
    }

    export interface GetListInfosByObjectNameInput {
        /** The API name of a supported object */
        objectApiName: string;
        /** The number of list records viewed at one time. The default value is 20. Valid values are 1–2000. */
        pageSize?: number;
        /**  token that represents the page offset. To indicate where the page starts, use this value with the pageSize parameter. The maximum offset is 2000, and the default is 0. */
        pageToken?: (string | number);
        /** A search term to filter the results. Wildcards are supported. */
        q?: string;
        /** Indicates whether to get recent lists only (true) or not (false). The default is false. */
        recentListsOnly?: boolean;
    }

    /**
     * Use this wire to get the list views associated with a supported object.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListInfoSummaryCollection
     */
    export function getListInfosByObjectName(input: GetListInfosByObjectNameInput): void;

    /**
     * List object info.
     */
    export interface ListObjectInfo {
        /** Information about available scopes for the object. */
        availableScopes?: ListObjectScope[];
        /** Information about available columns for the object. */
        columns?: ListObjectColumn[];
        /** Indicates whether a new list for the object can be created (true) or not (false). */
        createable?: boolean;
        /** Object API name. */
        objectApiName?: string;
        /** Indicates whether the context user can create a new public or shared listview for the object (true) or not (false). */
        publicOrSharedCreateable?: boolean;
        /** API name of the related object to which this list can be scoped, or null. */
        relatedEntityApiName?: stirng;
    }

    /**
     * List object scope.
     */
    export interface ListObjectScope {
        /** API name for the scope. */
        apiName?: string;
        /** Available entities, such as groups or queues, for the scope. */
        availableEntities?: ListObjectScopeAvailableEntity[];
        /** Label for the scope. */
        label?: string;
    }

    /**
     * List object scope available entity, such as a group or queue.
     */
    export interface ListObjectScopeAvailableEntity {
        /** ID for the available entity. */
        id?: string;
        /** Label for the available entity. */
        label?: string;
    }

    /**
     * List object column.
     */
    export interface ListObjectColumn {
        /** Alias for the column. */
        alias?: string;
        /** Data type for the column. */
        dataType?: 'Address' |
            'Anytype' |
            'Base64' |
            'Boolean' |
            'ComboBox' |
            'ComplexValue' |
            'Currency' |
            'Date' |
            'DateTime' |
            'Double' |
            'Email' |
            'EncryptedString' |
            'Int' |
            'JunctionIdList' |
            'Location' |
            'Long' |
            'MultiPicklist' |
            'Percent' |
            'Phone' |
            'Picklist' |
            'Reference' |
            'String' |
            'TextArea' |
            'Time' |
            'Url';
        /** Default filter operator for the column. */
        defaultFilterOperator?: string;
        /** Indicates whether the column is displayable (true) or not (false). */
        displayable?: boolean;
        /** Field API name for the column. */
        fieldApiName?: string;
        /** Indicates whether the column is filterable (true) or not (false). */
        filterable?: boolean;
        /** Label for the column. */
        label?: string;
        /** List of allowed picklist values for the column. */
        picklistValues?: ListObjectPicklistValue[];
        /** Indicates whether the column is sortable (true) or not (false). */
        sortable?: boolean;
        /** Supported filter operators for the column. */
        supportedFilterOperators?: ('Contains' |
            'Equals' |
            'Excludes' |
            'GreaterOrEqual' |
            'GreaterThan' |
            'Includes' |
            'LessOrEqual' |
            'LessThan' |
            'NotContain' |
            'NotEqual' |
            'StartsWith' |
            'Within')[];
    }

    /**
     * List object picklist value.
     */
    export interface ListObjectPicklistValue {
        /** API name for the picklist value. */
        apiName?: String;
        /** Label for the picklist value. */
        label?: String;
    }

    export interface GetListObjectInfoInput {
        /** The API name of a supported object. */
        objectApiName?: string;
    }

    /**
     * This wire adapter gets the metadata for a list view object.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListObjectInfo
     */
    export function getListObjectInfo(input: GetListObjectInfoInput): void;

    /**
     * List preferences.
     */
    export interface ListPreferences {
        /** Column width preferences for the list. */
        columnWidths?: {
            [key: object]: object;
        };
        /** Column wrapping preferences for the list. */
        columnWrap?: {
            [key: object]: object;
        };
        /** Reference information for the list. */
        listReference?: ListReference;
        /** Ordering preference for the list. */
        orderedBy?: ListOrderByInfo[];
    }

    /**
     * The list view referenced by the collection or metadata.
     */
    export interface ListReference {
        /** The list view ID. */
        id?: string;
        /** The list view's API name, for example, AllAccounts */
        listViewApiName?: string;
        /** A supported object, such as Account. */
        objectApiName?: string;
        /** The list view type. */
        type?: string;
    }

    export interface GetListPreferencesInput {
        /** The API name of the supported object. */
        objectApiName?: string;
        /** The API name of the list view, such as AllAccounts. */
        listViewApiName?: string;
    }

    /**
     * Use this wire adapter to get the preferences for a list view.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListPreferences.
     */
    export function getListPreferences(input: GetListPreferencesInput): void;

    export interface GetListRecordsByNameInput {
        /** The API name of a supported object. */
        objectApiName: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName: string;
        /** Additional fields queried for the records returned. These fields don't create visible columns. If the field isn't available to the user, an error occurs. */
        fields?: string[];
        /** Additional fields queried for the records returned. These fields don't create visible columns. If the field isn't available to the user, no error occurs and the field isn't included in the records. */
        optionalFields?: string[];
        /** The number of list records viewed at one time. The default value is 50. Valid values are 1—2000. */
        pageSize?: number;
        /** A search term to filter the results. Wildcards are supported. */
        searchTerm?: string;
        /** The API name of the field the list view is sorted by. If the name is preceded with -, the sort order is descending. For example, Name sorts by name in ascending order, and -CreatedDate sorts by the created date in descending order. This parameter accepts only one value per request. */
        sortBy?: string;
        /** The filter applied to returned records, in GraphQL syntax. For example, { and: [ { StageName: { eq: "Prospecting" } }, { Account: { Name: { eq: "Dickenson plc" } } } ] } filters an Opportunity related list to show only opportunities in the Prospecting stage that are linked to the "Dickenson plc" account. */
        where?: string;
        /** A token that represents the page offset. To indicate where the page starts, use this value with the pageSize parameter. The maximum offset is 2000 and the default is 0. */
        pageToken?: (string | number);
    }

    /**
     * Use this wire adapter to get record data for a list view.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListRecordCollection
     */
    export function getListRecordsByName(input: GetListRecordsByNameInput): void

    export interface UpdateListInfoByNameInput {
        /** The API name of a supported object. */
        objectApiName: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName: string;
        /** The display columns (field API names) for the list. */
        displayColumns?: string[];
        /** The filter logic string, such as (1 OR 2) and 3. Indexes start with 1. */
        filterLogicString?: string;
        /** Filtering information for the list. */
        filteredByInfo?: ListFilterByInfo;
        /** The list's display label. For example, All Accounts. */
        label?: string;
        /** Objects the list is shared with, if visibility is set to Shared. */
        listShares?: string;
        /** The scope information for the list. */
        scope?: ListScopeInput;
        /** The list's visibility. */
        visibility?: 'Private' | 'Public' | 'Shared';
    }

    /**
     * Use this wire adapter to update a list view's metadata.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListInfo
     */
    export function updateListInfoByName(input: UpdateListInfoByNameInput): void;

    export interface UpdateListPreferencesInput {
        /** The API name of a supported object. */
        objectApiName: string;
        /** The API name of a list view, such as AllAccounts. */
        listViewApiName: string;
        /** The column-width preferences for the list. */
        columnWidths?: {
            [key: object]: object;
        };
        /** The column-wrapping preferences for the list. */
        columnWrap?: {
            [key: object]: object;
        };
        /** The reference information for the list. */
        listReference?: string;
        /** The ordering preference for the list. */
        orderedBy?: string;
    }

    /**
     * Use this wire adapter to update the preferences for a list view.
     *
     * @param input the input parameters
     *
     * @return A Promise that resolves to a ListInfo
     */
    export function updateListPreferences(input: UpdateListPreferencesInput)
}