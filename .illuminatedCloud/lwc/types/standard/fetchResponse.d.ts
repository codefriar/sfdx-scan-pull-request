// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * The FetchResponse error object is modeled after the Fetch API's Response object. It contains the body of the
 * response and a status code and message. This is a concrete implementation of the FetchResponse object passed to
 * wired fields/functions as described
 * <a href="https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_error">here</a>.
 */
declare interface FetchResponse {
    /**
     * The body of the response, which is defined by the underlying API.
     */
    body?: any | Array<any>;
    /**
     * Specifies whether the response was successful or not. For an error, ok is always false and contains a status
     * in the range 400–599.
     */
    ok?: boolean;
    /**
     * Contains the status code of the response, for example, 404 if a resource is not found or 500 for an internal
     * server error.
     */
    status?: number;
    /**
     * Contains the status message corresponding to the status code, for example, NOT_FOUND for a status code of 404.
     */
    statusText?: string;
}

/**
 * A simple wrapper object that includes both the FetchResponse and the data itself.
 */
declare interface WireResult<T> {
    /**
     * The FetchResponse error object is modeled after the Fetch API's Response object. It contains the body of the
     * response and a status code and message.
     */
    error: FetchResponse;
    /**
     * The strongly-typed data returned by the wire service.
     */
    data: T;
}

/**
 * @deprecated Use {@link WireResult}.
 */
type FetchResponseAndData<T> = WireResult<T>;