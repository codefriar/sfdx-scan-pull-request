// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Get the current Experience Builder site Id.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/create-community-info.html#salesforcesite|Get Information About the Current Experience Builder site}
 */
declare module "@salesforce/site/Id" {
    /** The ID of the current Experience Builder site. */
    const Id: string;
    export default Id;
}
/**
 * The list of active languages in your Experience Builder site.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/create-community-info.html#salesforcesite|Get Information About the Current Experience Builder site}
 */
declare module "@salesforce/site/activeLanguages" {
    /** The language object of experience builder site. */
    export interface Language {
        code?: string;
        label?: string;
    }

    /** The list of active languages in your Experience Builder site includes metadata on the default site language and all other active languages. */
    const activeLanguages: Language[];
    export default activeLanguages;
}