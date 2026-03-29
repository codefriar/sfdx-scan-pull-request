// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Provides utilities for encoding and decoding default field values. To generate a URL for or navigate to a record's create page with prepopulated field values, pass this string into the pageReference.state.defaultFieldValues attribute on standard__objectPage page reference types. You decode the string only when using override actions.
 */
declare module 'lightning/pageReferenceUtils' {
    /**
     * Decodes default field values from a serialized string into a standard object. Use this method when overriding a standard action only.
     * @param encodedDefaultFieldValuesString Encoded string of default field values. The values returned by this method are strings. Field type isn't preserved.
     */
    export function decodeDefaultFieldValues(encodedDefaultFieldValuesString: string): string;

    /**
     * Encodes default field values from a JavaScript object into a serialized string.
     * @param defaultFieldValues List of default key-value pairs for the default field values you are passing.
     */
    export function encodeDefaultFieldValues(defaultFieldValues: Object): string;
}