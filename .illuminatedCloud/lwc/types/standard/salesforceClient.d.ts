// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Access the form factor of the hardware the browser is running on.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/create-client-form-factor.html|Access Client Form Factor}
 */
declare module "@salesforce/client/formFactor" {
    /** The current client form factor. */
    const formFactor: "Large" | "Medium" | "Small";
    export default formFactor;
}