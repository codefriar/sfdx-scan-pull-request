// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Get the current user's ID.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/get-current-user.html|Get Information About the Current User}
 */
declare module "@salesforce/user/Id" {
    /** The ID of the current user. */
    const Id: string;
    export default Id;
}
/**
 * Identify whether the current user is a guest or not.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/get-current-user.html|Get Information About the Current User}
 */
declare module "@salesforce/user/isGuest" {
    /** Whether the user is a guest user (`true`) or not (`false`). */
    const isGuest: boolean;
    export default isGuest;
}