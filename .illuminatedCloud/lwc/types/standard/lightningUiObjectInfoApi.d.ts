// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

declare module 'lightning/uiObjectInfoApi' {
    import {ObjectInfoRepresentation} from "lightning/uiRecordApi";

// IC2 BEGIN
    // Deduping these type definitions
    import {FieldId, ObjectId} from "@salesforce/schema";

    /** Additional picklist value attributes for case statuses, lead statuses, and opportunity stages. */
    export interface PicklistValueAttributes {
        /**
         * Case status: If this status indicates the case has been closed, the value is true, otherwise false. For more info, see the documentation for the CaseStatus standard object.
         *
         * Opportunity stage: Indicates whether this opportunity stage value represents a closed opportunity. Multiple opportunity stage values can represent a closed opportunity. For more info, see the documentation for the OpportunityStage standard object.
         */
        closed?: boolean;
        /** Lead status: If this status indicates the lead has been converted, the value is true, otherwise false. For more info, see the documentation for the LeadStatus standard object. */
        converted?: boolean;
        /**
         * Lead status: The value is LeadStatus. Indicates that these value attributes are associated with the status of a Lead.
         *
         * Opportunity stage: The value is OpportunityStage. Indicates that these value attributes are associated with the status of an Opportunity.
         */
        picklistAttributesValueType?: string;
        /** Opportunity stage: The default percentage estimate of the confidence in closing a specific opportunity for this opportunity stage value. May be null if forecasting is not enabled for the org. For more info, see the documentation for the OpportunityStage standard object. */
        defaultProbability?: number;
        /** Opportunity stage: The default forecast category value for this opportunity stage value. May be null if forecasting is not enabled for the org. For more info, see the documentation for the OpportunityStage standard object. */
        forecastCategoryName?: string;
        /** Opportunity stage: Indicates whether this opportunity stage value represents a won opportunity. Multiple opportunity stage values can represent a won opportunity. For more info, see the documentation for the OpportunityStage standard object. */
        won?: boolean;
    }

    /** A single picklist value. */
    export interface PicklistValue {
        /** This property might contain a nested response body to help consumers understand the meaning of the picklist value. */
        attributes?: PicklistValueAttributes;
        /** The displayable value of the picklist to use in a UI. */
        label?: string;
        /** If the picklist is a dependent picklist, the property contains a list of the controlling value indexes for which this value is valid. If the picklist is an independent picklist, the list is empty. */
        validFor?: number[];
        /** The value of the picklist to use in the API. */
        value?: string;
    }

    /** The picklist values for a field, scoped to a record type. If a picklist is dependent, this response includes the values of its immediate controlling field and how they map to the picklist. */
    export interface PicklistValues {
        /** If the picklist is dependent, this property is a map of its immediate controlling field's picklist values to their indexes. If the controlling field is a picklist, the String is the picklist value and the integer is the value's index. If the controlling field is a checkbox, the values in the map are "false": 0 and "true": 1. If the picklist is independent, the map is empty. */
        controllerValues?: {
            [key: string]: number;
        };
        /** The default value for the picklist, or null if there isn't one. */
        defaultValue?: PicklistValue;
        /** A User Interface API resource that represents this payload. */
        url?: string;
        /** A list of values for this object, record type, field combination. */
        values?: PicklistValue[];
    }
// IC2 END

    /**
     * Gets the metadata for a specific object.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_object_info
     *
     * @param objectApiName The API name of the object to retrieve.
     */
    export function getObjectInfo(objectApiName: string | ObjectId): void;

    /** Response for getObjectInfos calls. */
    export interface GetObjectInfosResponse {
        results?: GetObjectInfosResult[];
    }

    export interface GetObjectInfosResult {
        result?: ObjectInfoRepresentation | GetObjectInfosError[];
        statusCode?: number;
    }

    export interface getObjectInfosError {
        errorCode?: string;
        message?: string;
    }

    /**
     * Wire adapter for multiple object metadata objects.
     *
     * @param objectApiNames The API names of the objects to retrieve.
     */
    export function getObjectInfos(objectApiNames: Array<string | ObjectId>): void;

    /**
     * Wire adapter for values for a picklist field.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_picklist_values
     *
     * @param fieldApiName The picklist field's object-qualified API name.
     * @param recordTypeId The record type ID. Pass '012000000000000AAA' for the master record type.
     */
    export function getPicklistValues(
        fieldApiName: string | FieldId,
        recordTypeId: string
    ): void;

    /** A collection of picklist values for all the picklists of a specified record type. */
    export interface GetPicklistValuesByRecordTypeResponse {
        /** A map of field names to Picklist Values response bodies. This map contains all the picklist values for all the picklists of a specified record type, including dependent picklists. If a field isn't a picklist, it isn't represented in the map. */
        picklistFieldValues?: {
            [key: string]: PicklistValues;
        };
    }

    /**
     * Wire adapter for values for all picklist fields of a record type.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_picklist_values_record
     *
     * @param objectApiName API name of the object.
     * @param recordTypeId Record type ID. Pass '012000000000000AAA' for the master record type.
     */
    export function getPicklistValuesByRecordType(
        objectApiName: string,
        recordTypeId: string
    ): void;
}