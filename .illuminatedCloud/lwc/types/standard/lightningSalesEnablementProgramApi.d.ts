// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

// TODO: Need to add wire adapter mappings for these, but they're undocumented

declare module 'lightning/salesEnablementProgramApi' {
    /**
     * Wire adapter for getting Sales Enablement Program templates list.
     */
    export function getProgramTemplates(): void;

    /**
     * Wire adapter for getting Sales Enablement Program details of the programTemplateName passed as url param.
     * @param programTemplateName name of the template for which details are required
     */
    export function getProgramTemplate(programTemplateName: string): void;
}