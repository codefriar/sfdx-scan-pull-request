// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

/**
 * JavaScript API to Create and Update Records.
 */
declare module 'lightning/uiRecordApi' {
// IC2 BEGIN
    // Deduping these type definitions
    import {FieldId, ObjectId} from "@salesforce/schema";
// IC2 END

    /**
     * Contains both the raw and displayable field values for a field in a Record.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_field_value.htm
     *
     * Keys:
     *    (none)
     */
    export interface FieldValueRepresentation {
        displayValue?: string | null;
        value?: RecordRepresentation | boolean | number | string | null;
    }

    export type FieldValueRepresentationValue = FieldValueRepresentation['value'];

    /**
     * Record Collection Representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_record_collection.htm
     *
     * Keys:
     *    (none)
     */
    export interface RecordCollectionRepresentation {
        count?: number;
        currentPageToken?: string | null;
        currentPageUrl?: string;
        nextPageToken?: string | null;
        nextPageUrl?: string | null;
        previousPageToken?: string | null;
        previousPageUrl?: string | null;
        records?: Array<RecordRepresentation>;
    }

    /**
     * Record type.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_record_type_info.htm
     *
     * Keys:
     *    (none)
     */
    export interface RecordTypeInfoRepresentation {
        available?: boolean;
        defaultRecordTypeMapping?: boolean;
        master?: boolean;
        name?: string;
        recordTypeId?: string;
    }

    /**
     * Record.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_record.htm
     *
     * Keys:
     *    recordId (string): id
     */
    export interface RecordRepresentation {
        apiName?: string;
        childRelationships?: {
            [key: string]: RecordCollectionRepresentation;
        };
        eTag?: string;
        fields?: {
            [key: string]: FieldValueRepresentation;
        };
        id?: string;
        lastModifiedById?: string | null;
        lastModifiedDate?: string | null;
        recordTypeId?: string | null;
        recordTypeInfo?: RecordTypeInfoRepresentation | null;
        systemModstamp?: string | null;
        weakEtag?: number;
    }

    /**
     * Description of a record input.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_requests_record_input.htm
     *
     * Keys:
     *    (none)
     */
    export interface RecordInputRepresentation {
        allowSaveOnDuplicate?: boolean;
        apiName?: string;
// IC2 BEGIN
        fields: {
            [key: string]: string | number | null | boolean;
        } | SObject;
        triggerOtherEmail?: boolean;
        triggerUserEmail?: boolean;
        useDefaultRule?: boolean;
// IC2 END
    }

    export interface ClientOptions {
        ifUnmodifiedSince?: string;
    }

    /**
     * Child Relationship.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_child_relationship.htm
     *
     * Keys:
     *    (none)
     */
    export interface ChildRelationshipRepresentation {
        childObjectApiName?: string;
        fieldName?: string;
        junctionIdListNames?: Array<string>;
        junctionReferenceTo?: Array<string>;
        relationshipName?: string;
    }

    /**
     * Information about a reference field's referenced types and the name field names of those types.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_reference_to_info.htm
     *
     * Keys:
     *    (none)
     */
    export interface ReferenceToInfoRepresentation {
        apiName?: string;
        nameFields?: Array<string>;
    }

    /**
     * Filtered lookup info.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_filtered_lookup_info.htm
     *
     * Keys:
     *    (none)
     */
    export interface FilteredLookupInfoRepresentation {
        controllingFields?: Array<string>;
        dependent?: boolean;
        optionalFilter?: boolean;
    }

    export const enum ExtraTypeInfo {
        ExternalLookup = 'ExternalLookup',
        ImageUrl = 'ImageUrl',
        IndirectLookup = 'IndirectLookup',
        PersonName = 'PersonName',
        PlainTextArea = 'PlainTextArea',
        RichTextArea = 'RichTextArea',
        SwitchablePersonName = 'SwitchablePersonName',
    }

    export const enum RecordFieldDataType {
        Address = 'Address',
        Base64 = 'Base64',
        Boolean = 'Boolean',
        ComboBox = 'ComboBox',
        ComplexValue = 'ComplexValue',
        Currency = 'Currency',
        Date = 'Date',
        DateTime = 'DateTime',
        Double = 'Double',
        Email = 'Email',
        EncryptedString = 'EncryptedString',
        Int = 'Int',
        Location = 'Location',
        MultiPicklist = 'MultiPicklist',
        Percent = 'Percent',
        Phone = 'Phone',
        Picklist = 'Picklist',
        Reference = 'Reference',
        String = 'String',
        TextArea = 'TextArea',
        Time = 'Time',
        Url = 'Url',
    }

    /**
     * Field metadata.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_field.htm
     *
     * Keys:
     *    (none)
     */
    export interface FieldRepresentation {
        apiName?: string;
        calculated?: boolean;
        compound?: boolean;
        compoundComponentName?: string | null;
        compoundFieldName?: string | null;
        controllerName?: string | null;
        controllingFields?: Array<string>;
        createable?: boolean;
        custom?: boolean;
// IC2 BEGIN
        dataType?: RecordFieldDataType;
        extraTypeInfo?: ExtraTypeInfo | null;
// IC2 END
        filterable?: boolean;
        filteredLookupInfo?: FilteredLookupInfoRepresentation | null;
        highScaleNumber?: boolean;
        htmlFormatted?: boolean;
        inlineHelpText?: string | null;
        label?: string;
        length?: number;
        nameField?: boolean;
        polymorphicForeignKey?: boolean;
        precision?: number;
        reference?: boolean;
        referenceTargetField?: string | null;
        referenceToInfos?: Array<ReferenceToInfoRepresentation>;
        relationshipName?: string | null;
        required?: boolean;
        scale?: number;
        searchPrefilterable?: boolean;
        sortable?: boolean;
        unique?: boolean;
        updateable?: boolean;
    }

    /**
     * Theme info.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_theme_info.htm
     *
     * Keys:
     *    (none)
     */
    export interface ThemeInfoRepresentation {
        color?: string;
        iconUrl?: string | null;
    }

    /**
     * Object metadata.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_object_info.htm
     *
     * Keys:
     *    apiName (string): apiName
     */
    export interface ObjectInfoRepresentation {
        apiName?: string;
        associateEntityType?: string | null;
        associateParentEntity?: string | null;
        childRelationships?: Array<ChildRelationshipRepresentation>;
        createable?: boolean;
        custom?: boolean;
        defaultRecordTypeId?: string | null;
        deletable?: boolean;
        dependentFields?: {
            [key: string]: {};
        };
        eTag?: string;
        feedEnabled?: boolean;
        fields?: {
            [key: string]: FieldRepresentation;
        };
        keyPrefix?: string | null;
        label?: string;
        labelPlural?: string;
        layoutable?: boolean;
        mruEnabled?: boolean;
        nameFields?: Array<string>;
        queryable?: boolean;
        recordTypeInfos?: {
            [key: string]: RecordTypeInfoRepresentation;
        };
        searchable?: boolean;
        themeInfo?: ThemeInfoRepresentation | null;
        updateable?: boolean;
    }

    /**
     * Wire adapter for a record.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_record
     *
     * @param recordId ID of the record to retrieve.
     * @param fields Object-qualified field API names to retrieve. If a field isn't accessible to the context user, it causes an error.
     *               If specified, don't specify layoutTypes.
     * @param layoutTypes Layouts defining the fields to retrieve. If specified, don't specify fields.
     * @param modes Layout modes defining the fields to retrieve.
     * @param optionalFields Object-qualified field API names to retrieve. If an optional field isn't accessible to the context user,
     *                       it isn't included in the response, but it doesn't cause an error.
     * @returns An observable of the record.
     */
    export function getRecord(
        recordId: string,
        fields?: Array<string | FieldId>,
        layoutTypes?: string[],
        modes?: string[],
        optionalFields?: Array<string | FieldId>,
    ): void;

// IC2 BEGIN
    /** The default information and data needed to create or clone a record. */
    export interface RecordDefaults {
        /** Record layout information. */
        layout?: RecordLayout;
        /** Object metadata. */
        objectInfo?: ObjectInfoRepresentation;
        /** A collection of object metadata. */
        objectInfos?: ObjectInfoRepresentation[];
        /** Pre-populated record data. */
        record?: RecordRepresentation;
    }

    /** The layout information for a record. */
    export interface RecordLayout {
        /** The layout ID. */
        id?: string;
        /**
         * The layout type for the record. One of these values:
         * * Compact — Use this value to get a layout that contains a record's key fields.
         * * Full — (Default) Use this value to get a full layout.
         */
        layoutType?: 'Compact' | 'Full';
        /**
         * The access mode for the record. This value determines which fields to get from a layout. Layouts have different fields for create, edit, and view modes. For example, formula fields are rendered in view mode, but not in create mode because they're calculated at run time, like formulas in a spreadsheet. One of these values:
         * * Create — Use this mode if you intend to build UI that lets a user create a record. This mode is used by the /ui-api/record-defaults/create/{apiName} resource.
         * * Edit — Use this mode if you intend to build UI that lets a user edit a record. This mode is used by the /ui-api/record-defaults/clone/{recordId} resource.
         * * View — (Default) Use this mode to build UI that displays a record.
         */
        mode?: 'Create' | 'Edit' | 'View';
        /** The API name of the object that the layout is associated with. */
        objectApiName?: string;
        /** The record type ID for this record. */
        recordTypeId?: string;
        /** The save options for the layout. */
        saveOptions?: RecordLayoutSaveOption[];
        /** A collection of layout sections. */
        sections?: RecordLayoutSection[];
    }

    /** The save option for a record layout. Save options define behavior that occurs when objects are created or modified using the given layout. For example, for Cases and Leads, a “UseDefaultAssignmentRule” save option is exposed to control whether assignment rules are applied when Cases or Leads are created or edited. */
    export interface RecordLayoutSaveOption {
        /** Indicates whether the save option defaults to enabled (true) or not (false). */
        defaultValue?: boolean;
        /** Indicates whether the save option is displayed in the layout or not. */
        isDisplayed?: boolean;
        /** Label for the save option. */
        label?: string;
        /** API name for the save option. */
        name?: string;
        /** REST API header for the save option. */
        restHeaderName?: string;
        /** SOAP API header for the save option. */
        soapHeaderName?: string;
    }

    /** A section in a record layout. */
    export interface RecordLayoutSection {
        /** Indicates whether the section can be collapsed. */
        collapsible?: boolean;
        /** The number of columns in the section. */
        columns?: number;
        /** The heading text for the section. */
        heading?: string;
        /** The ID of the section. */
        id?: string;
        /** A collection of the rows in the section. */
        layoutRows?: RecordLayoutRow[];
        /** The number of rows in the section. */
        rows?: number;
        /** Indicates whether the heading text is expected to be displayed. */
        useHeading?: boolean;
    }

    /** A row in a record layout. */
    export interface RecordLayoutRow {
        /** A collection of items in the row, from left to right. Might not extend to the last column. */
        layoutItems?: RecordLayoutItem[];
    }

    /** An item in a record layout. */
    export interface RecordLayoutItem {
        /** Indicates whether the item can be edited when creating a new record. */
        editableForNew?: boolean;
        /** Indicates whether the item can be edited when updating a record. */
        editableForUpdate?: boolean;
        /** The text label for the item. */
        label?: string;
        /** A collection of components that make up the item. */
        layoutComponents?: CanvasLayoutComponent | CustomLinkLayoutComponent | FieldLayoutComponent | RecordLayoutComponent | ReportLayoutComponent | VisualforceLayoutComponent;
        /** The ID field name of a lookup field. */
        lookupIdApiName?: string;
        /** Indicates whether the field is required in a layout when creating or updating a record. This information is useful to know if you wanted to render required fields with a different treatment, such as a red outline. */
        required?: boolean;
        /** Reserved for future use. */
        sortable?: boolean;
    }

    /** A canvas component on a record page layout. */
    export interface CanvasLayoutComponent {
        /** The API name of the canvas app. */
        apiName?: string;
        /** The value is Canvas. */
        componentType?: string;
        /**
         * The location in the application where the canvas app is being called from. One of these values:
         *
         * * Chatter — The canvas app was called from the Chatter tab.
         * * ChatterFeed — The canvas app was called from a Chatter canvas feed item.
         * * MobileNav — The canvas app was called from the navigation menu in the Salesforce mobile app.
         * * OpenCTI — The canvas app was called from an Open CTI component.
         * * PageLayout — The canvas app was called from an element within a page layout. If the displayLocation is PageLayout, one of the subLocation values can be returned.
         * * Publisher — The canvas app was called from a canvas custom quick action.
         * * ServiceDesk — The canvas app was called from a Salesforce Console component.
         * * Visualforce — The canvas app was called from a Visualforce page.
         * * None — The canvas app was called from the Canvas App Previewer.
         *
         * The sub-location in the application where the canvas app was called from when the canvas app is loaded in a mobile device. The possible values are:
         *
         * * S1MobileCardFullview — The canvas app was called from a mobile card.
         * * S1MobileCardPreview — The canvas app was called from a mobile card preview.
         * * S1RecordHomePreview — The canvas app was called from a record detail page preview.
         * * S1RecordHomeFullview — The canvas app was called from a page layout.
         */
        displayLocation?: 'Chatter' |
            'ChatterFeed' |
            'MobileNav' |
            'OpenCTI' |
            'PageLayout' |
            'Publisher' |
            'ServiceDesk' |
            'Visualforce' |
            'None' |
            'S1MobileCardFullview' |
            'S1MobileCardPreview' |
            'S1RecordHomePreview' |
            'S1RecordHomeFullview';
        /** The height of the component. */
        height?: string;
        /** The unique ID of the canvas app definition. */
        referenceId?: string;
        /** Indicates whether to show the scroll bar on the canvas component (true) or not (false). */
        showScroll?: boolean;
        /** The width of the component. */
        width?: string;
    }

    /** A custom link component on a record page layout. */
    export interface CustomLinkLayoutComponent {
        /** If a field powers this component, this property contains the API name of the field. */
        apiName?: string;
        /**
         * Indicates how a link behaves on open. One of these values:
         *
         * * NewWindow — Open a new window.
         * * NoSidebar — No sidebar
         * * OnClickJavaScript — When the link is clicked, run JavaScript.
         * * Replace — Replace the current page.
         * * Sidebar — Sidebar
         */
        behavior?: 'NewWindow' |
            'NoSidebar' |
            'OnClickJavaScript' |
            'Replace' |
            'Sidebar';
        /** The component type. The value is CustomLink. */
        componentType?: string;
        /** The custom link URL. */
        customLinkUrl?: string;
        /** The custom link label. */
        label?: string;
    }

    /** A field in a record layout. */
    export interface FieldLayoutComponent {
        /** The API name of the field. */
        apiName?: string;
        /** The value is Field */
        componentType?: string;
        /** The label of the field. */
        label?: string;
    }

    /** A concrete record layout component. */
    export interface RecordLayoutComponent {
        /** If a field powers this component, this property contains the API name of the field. */
        apiName?: string;
        /**
         * One of these values:
         *
         * * Canvas
         * * CustomLink
         * * EmptySpace
         * * Field
         * * ReportChart
         * * VisualforcePage
         */
        componentType?: 'Canvas' |
            'CustomLink' |
            'EmptySpace' |
            'Field' |
            'ReportChart' |
            'VisualforcePage';
    }

    /** A report chart component on a record layout page. */
    export interface ReportLayoutComponent {
        /** If a field powers this component, this property contains the API name of the field. */
        apiName?: string;
        /** Indicates whether to cache data (true) or not (false). */
        cacheData?: boolean;
        /** The value is ReportChart. */
        componentType?: string;
        /** An error message. */
        error?: string;
        /** A filter for the report. */
        filter?: string;
        /** Indicates whether to hide the component when there's an error (true) or not (false). */
        hideOnError?: boolean;
        /** A placeholder for the report. */
        placeholder?: string;
        /** The component's report ID. */
        reportId?: string;
        /** Indicates whether to show the title of the report (true) or not (false). */
        showTitle?: boolean;
        /** The size of the component. */
        size?: string;
    }

    /** A Visualforce component on a record layout page. */
    export interface VisualforceLayoutComponent {
        /** If a field powers this component, this property contains the API name of the field. */
        apiName?: string;
        /** The value is VisualforcePage. */
        componentType?: string;
        /** The height of the component. */
        height?: string;
        /** Indicates whether to show the section label with this Visualforce component (true) or not (false). */
        showLabel?: boolean;
        /** Indicates whether to show the scroll bar on the canvas component (true) or not (false). */
        showScroll?: boolean;
        /** The Visualforce URL. */
        visualforceUrl?: string;
        /** The width of the component. */
        width?: string;
    }

    /**
     * Gets data for a batch of records at once. You can request multiple objects or different record types.
     *
     * @param records the criteria by which records should be selected
     */
    export function getRecords(
        records: GetRecordRequestCollection
    ): void;

    public interface GetRecordRequestCollection {
        /** The record requests. */
        records?: GetRecordRequest[];
    }

    public interface GetRecordRequest {
        /** IDs of the records to retrieve. */
        recordIds: string[];
        /** Object-qualified field API names to retrieve. If a field isn't accessible to the context user, it causes an error. If specified, don't specify layoutTypes. */
        fields?: Array<string | FieldId>;
        /** Layouts defining the fields to retrieve. If specified, don't specify fields. */
        layoutTypes?: string[];
        /** Layout modes defining the fields to retrieve. */
        modes?: string[];
        /** Object-qualified field API names to retrieve. If an optional field isn't accessible to the context user, it isn't included in the response, but it doesn't cause an error. */
        optionalFields?: Array<string | FieldId>;
    }
// IC2 END

    /**
     * Wire adapter for default field values to create a record.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_create_record_values
     *
     * @param objectApiName API name of the object.
     * @param formFactor Form factor. Possible values are 'Small', 'Medium', 'Large'. Large is default.
     * @param recordTypeId Record type id.
     * @param optionalFields Object-qualified field API names to retrieve. If an optional field isn't accessible to the context user,
     *                       it isn't included in the response, but it doesn't cause an error.
     */
    export function getRecordCreateDefaults(
        objectApiName: string | ObjectId,
        formFactor?: string,
        recordTypeId?: string,
        optionalFields?: Array<string | FieldId>,
    ): void;

// IC2 BEGIN
    /**
     * Fetch record updates for the specified record IDs and refresh the Lightning Data Service cache, providing your
     * wires with the latest record data. Call this function to notify Lightning Data Service that a record has changed
     * outside its mechanisms, such as via imperative Apex or Visualforce, or by calling User Interface API via a
     * third-party framework.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_get_record_notify
     *
     * @param items (Required) An array of objects with an object shape of { recordId: string }. The record ID can be
     * either 15 or 18 characters long, and it must be from a supported object.
     *
     * @deprecated use notifyRecordUpdateAvailable(recordIds) instead
     */
    export function getRecordNotifyChange(
        items: Array<{ recordId: string }>
    ): void;

    /** The layout information, field information, and data for a record. */
    export interface RecordUI {
        /** A map of layout IDs to user state information. */
        layoutUserStates?: {
            [key: string]: RecordLayoutSectionUserState;
        };
        // TODO: This is documented to be "Map<String, Map<String, Map<String, Map<String, Record Layout>>>>" but that
        //  doesn't seem right so I've simplified it to a single key here
        /** A map of object API names to layout information for each object. */
        layouts?: {
            [key: string]: RecordLayout;
        };
        /** A map of object API names to each object's metadata. */
        objectInfos?: {
            [key: string]: ObjectInfoRepresentation;
        };
        /** A map of record IDs to each record's data. */
        records?: {
            [key: string]: RecordRepresentation;
        };
    }

    /** The user state information for a record layout section. */
    export interface RecordLayoutSectionUserState {
        /** Indicates whether the section is initially displayed as collapsed (true) or expanded (false). */
        collapsed?: boolean;
        /** The ID of a layout section. */
        id?: string;
    }
// IC2 END

    /**
     * Wire adapter for record data, object metadata and layout metadata
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_record_ui
     *
     * @param recordIds ID of the records to retrieve.
     * @param layoutTypes Layouts defining the fields to retrieve.
     * @param modes Layout modes defining the fields to retrieve.
     * @param optionalFields Object-qualified field API names to retrieve. If an optional field isn't accessible to the context user,
     *                       it isn't included in the response, but it doesn't cause an error.
     *
     * @deprecated Support for this wire adapter ends on May 1, 2023. We recommend using the getRecord and getRecords
     * wire adapters instead. To load object info for lookup records, use getRecord, followed by getObjectInfo for the
     * primary record, and getObjectInfos for all lookup field object infos. Retrieving a layout using an alternative
     * wire adapter isn't currently supported.
     */
    export function getRecordUi(
        recordIds: string | string[],
        layoutTypes: string | string[],
        modes: string | string[],
        optionalFields: Array<string | FieldId>,
    ): void;

    /**
     * Updates a record using the properties in recordInput. recordInput.fields.Id must be specified.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_update_record
     *
     * @param recordInput The record input representation to use to update the record.
     * @param clientOptions Controls the update behavior. Specify ifUnmodifiedSince to fail the save if the record has changed since the provided value.
     * @returns A promise that will resolve with the patched record.
     */
    export function updateRecord(
        recordInput: RecordInputRepresentation,
        clientOptions?: ClientOptions
    ): Promise<RecordRepresentation>;

    /**
     * Creates a new record using the properties in recordInput.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_create_record
     *
     * @param recordInput The RecordInput object to use to create the record.
     * @returns A promise that will resolve with the newly created record.
     */
    export function createRecord(recordInput: RecordInputRepresentation): Promise<RecordRepresentation>;

    /**
     * Deletes a record with the specified recordId.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_delete_record
     *
     * @param recordId ID of the record to delete.
     * @returns A promise that will resolve to undefined.
     */
    export function deleteRecord(recordId: string): Promise<undefined>;

    /**
     * Returns an object with its data populated from the given record. All fields with values that aren't nested records will be assigned.
     * This object can be used to create a record with createRecord().
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_generate_record_input_create
     *
     * @param record The record that contains the source data.
     * @param objectInfo The ObjectInfo corresponding to the apiName on the record. If provided, only fields that are createable=true
     *        (excluding Id) are assigned to the object return value.
     * @returns RecordInput
     */
    export function generateRecordInputForCreate(
        record: RecordRepresentation,
        objectInfo?: ObjectInfoRepresentation
    ): RecordInputRepresentation;

    /**
     * Returns an object with its data populated from the given record. All fields with values that aren't nested records will be assigned.
     * This object can be used to update a record.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_generate_record_input_update
     *
     * @param record The record that contains the source data.
     * @param objectInfo The ObjectInfo corresponding to the apiName on the record.
     *        If provided, only fields that are updateable=true (excluding Id) are assigned to the object return value.
     * @returns RecordInput.
     */
    export function generateRecordInputForUpdate(
        record: RecordRepresentation,
        objectInfo?: ObjectInfoRepresentation
    ): RecordInputRepresentation;

    /**
     * Returns a new RecordInput containing a list of fields that have been edited from their original values. (Also contains the Id
     * field, which is always copied over.)
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_create_record_input_update
     *
     * @param recordInput The RecordInput object to filter.
     * @param originalRecord The Record object that contains the original field values.
     * @returns RecordInput.
     */
    export function createRecordInputFilteredByEditedFields(
        recordInput: RecordInputRepresentation,
        originalRecord: RecordRepresentation,
    ): RecordInputRepresentation;

    /**
     * Gets a field's value from a record.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_get_field_value
     *
     * @param record The record.
     * @param field Object-qualified API name of the field to return.
     * @returns The field's value (which may be a record in the case of spanning fields), or undefined if the field isn't found.
     */
    export function getFieldValue(
        record: RecordRepresentation,
        field: FieldId | string
    ): any | undefined;

    /**
     * Gets a field's display value from a record.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_get_field_display_value
     *
     * @param record The record.
     * @param field Object-qualified API name of the field to return.
     * @returns The field's display value, or undefined if the field isn't found.
     */
    export function getFieldDisplayValue(
        record: RecordRepresentation,
        field: FieldId | string
    ): any | undefined;

    /**
     * Informs Lightning Data Service that record data has changed so that Lightning Data Service can take the
     * appropriate actions to keep wire adapters updated with the latest record data. Call this function to notify
     * Lightning Data Service that a record has changed outside its mechanisms, such as via imperative Apex or by
     * calling User Interface API via a third-party framework. This function supersedes getRecordNotifyChange(recordIds).
     *
     * @param items (Required) An array of objects with an object shape of { recordId: string }. The record ID can be
     * either 15 or 18 characters long, and it must be from a supported object.
     *
     * @returns A Promise object that is resolved when Lightning Data Service has completed its processing. Updated
     * information is sent to all affected wire adapters before the Promise is resolved. Use the Promise to determine
     * when Lightning Data Service has completed its processing. The resolved value of the Promise is void.
     */
    export function notifyRecordUpdateAvailable(items: Array<{ recordId: string }>): Promise<void>;
}

// IC2 BEGIN
declare interface SObject
{
    Id: string;
}
// IC2 END