// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Get the ID of the network part of the site for eg., import the ID to pass as a parameter to an API.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/create-community-info.html#salesforcecommunity|Get Information About the Current Experience Builder site}
 */
declare module "@salesforce/community/Id" {
    /** The ID of the network part of the site. */
    const Id: string;
    export default Id;
}
/**
 * Get the section of the site's URL that comes after the domain.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/create-community-info.html#salesforcecommunity|Get Information About the Current Experience Builder site}
 */
declare module "@salesforce/community/basePath" {
    /** The base path is the section of the site's URL that comes after the domain. */
    const basePath: string;
    export default basePath;
}