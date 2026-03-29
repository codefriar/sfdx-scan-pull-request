// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Originally called lightningIndustriesEducationPublicApi.d.ts

/**
 * The `lightning/industriesEducationPublicApi` module includes APIs to create Constituent Role and update Benefit Assignment records.
 * @see {@link https://developer.salesforce.com/docs/component-library/bundle/lightning-industries-education-public-api/documentation|Industries Education Public API documentation}
 */
declare module "lightning/industriesEducationPublicApi" {
    /**
     * Output representation of the benefit assignment record that's updated with provider details.
     */
    export type MentoringBenefitAssignment = {
        benefitId?: string;
        createdById?: string;
        createdDate?: string;
        endDateTime?: string;
        enrolleeId?: string;
        enrollmentCount?: string;
        entitlementAmount?: string;
        id?: string;
        lastModifiedById?: string;
        lastModifiedDate?: string;
        minimumBenefitAmount?: string;
        name?: string;
        parentRecordId?: string;
        priority?: string;
        programEnrollmentId?: string;
        providerId?: string;
        startDateTime?: string;
        status?: string;
        taskJobStatus?: string;
        taskJobStatusMessage?: string;
        unitOfMeasureId?: string;
    };

    /**
     * Updates Benefit Assignment records with Provider lookup, and creates Contact Contact Relationship and Party Role Relationship records for Mentoring participants.
     * @param benefitAssignmentId The ID of the benefit assignment record.
     * @param providerId The ID of the provider offering that's associated with the benefit assignment.
     * @returns A Promise object that resolves with the MentoringBenefitAssignment response.
     */
    export function postBenefitAssignment(
        benefitAssignmentId: string,
        providerId: string,
    ): Promise<MentoringBenefitAssignment>;
}