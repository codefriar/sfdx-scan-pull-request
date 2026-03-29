// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * This library provides three utility methods to create test wire adapters used in the tests to emit data and get the
 * last resolved @wire configuration. This library doesn't inject wire adapters for you, and your test configuration
 * has to reroute all the wire adapters imports to resolve a mocked implementation.
 */
declare module "@salesforce/wire-service-jest-util" {
    /**
     * Returns a generic wire adapter for the given identifier. Emitted values may be of
     * any shape.
     *
     * @param fn this parameter might be used to implement adapters that can be invoked imperatively (like the Apex one).
     */
    export function createTestWireAdapter(fn: Function | Mock): TestWireAdapter;

    export interface TestWireAdapter {
        /**
         * Emits any value of any shape.
         * @param value The value to emit to the component
         * @param filterFn When provided, it will be invoked for every adapter instance on the
         *                 component with its associated config; if it returns true, the value will be
         *                 emitted to that particular instance.
         */
        emit(value: Object, filterFn?: (config) => boolean): void;

// IC2 BEGIN
        // TODO: I've seen non-Apex/non-LDS mocks emitting errors, so I'm adding this to the generic TestWireAdapter
        //  interface even though it's not documented as being available through it
        /**
         * Emits an error. By default this will emit a resource not found error.
         *
         * `{
         *       ok: false,
         *       status: 404,
         *       statusText: "NOT_FOUND",
         *       body: [{
         *           errorCode: "NOT_FOUND",
         *           message: "The requested resource does not exist",
         *       }]
         *  }`
         */
        error(body?: any, status?: number, statusText?: string): void;
// IC2 END

        /**
         * Gets the last resolved config. Useful if component @wire uses includes
         * dynamic parameters.
         */
        getLastConfig(): any;
    }

    /**
     * Returns a wire adapter mock that mimics Lightning Data Service (LDS) adapters behavior,
     * emitted data and error shapes. For example, the emitted shape is
     * `{ data: object|undefined, error: FetchResponse|undefined}`.
     *
     * @param fn This parameter might be used to implement adapters that can be invoked imperatively (like the Apex one).
     */
    export function createLdsTestWireAdapter(fn: Function | Mock): LdsTestWireAdapter;

    export interface LdsTestWireAdapter {
        /**
         * Emits data.
         * @param value The data to emit to the component
         * @param filterFn When provided, it will be invoked for every adapter instance on the
         *                 component with its associated config; if it returns true, the data will be
         *                 emitted to that particular instance.
         */
        emit(value: Object, filterFn?: (config) => boolean): void;

        /**
         * Emits an error. By default this will emit a resource not found error.
         *
         * `{
         *       ok: false,
         *       status: 404,
         *       statusText: "NOT_FOUND",
         *       body: [{
         *           errorCode: "NOT_FOUND",
         *           message: "The requested resource does not exist",
         *       }]
         *  }`
         */
        error(body?: any, status?: number, statusText?: string): void;

        /**
         * Emits an error. By default this will emit a resource not found error.
         *
         * @param errorOptions
         * @param filterFn     When provided, it will be invoked for every adapter instance on the
         *                     component with its associated config; if it returns true, the error will be
         *                     emitted to that particular instance.
         */
        emitError(
            errorOptions?: { body?: any, status?: number, statusText?: string },
            filterFn?: (config) => boolean
        ): void;

        /**
         * Gets the last resolved config. Useful if component @wire uses includes
         * dynamic parameters.
         */
        getLastConfig(): any;
    }

    /**
     * Returns a wire adapter that connects to an Apex method and provides APIs
     * to emit data and errors in the expected shape. For example, the emitted shape
     * is `{ data: object|undefined, error: FetchResponse|undefined}`.
     *
     * @param fn An apex adapters are also callable, this function will be called when
     * the wire adapter is invoked imperatively.
     */
    export function createApexTestWireAdapter(fn: Function | Mock): ApexTestWireAdapter;

    export interface ApexTestWireAdapter {
        /**
         * Emits data.
         * @param value The data to emit to the component
         * @param filterFn When provided, it will be invoked for every adapter instance on the
         *                 component with its associated config; if it returns true, the data will be
         *                 emitted to that particular instance.
         */
        emit(value: Object, filterFn?: (config) => boolean): void;

        /**
         * Emits an error. By default this will emit a resource not found error.
         *
         * `{
         *       ok: false,
         *       status: 400,
         *       statusText: "Bad Request",
         *       body: {
         *           message: "An internal server error has occurred",
         *       }
         *  }`
         */
        error(body?: any, status?: number, statusText?: string): void;

        /**
         * Emits an error. By default this will emit a resource not found error.
         *
         * @param errorOptions
         * @param filterFn     When provided, it will be invoked for every adapter instance on the
         *                     component with its associated config; if it returns true, the error will be
         *                     emitted to that particular instance.
         */
        emitError(
            errorOptions?: { body?: any, status?: number, statusText?: string },
            filterFn?: (config) => boolean
        ): void;

        /**
         * Gets the last resolved config. Useful if component @wire uses includes
         * dynamic parameters.
         */
        getLastConfig(): any;
    }
}

// Union of the three test wire adapters used as the data type for wire adapters imported into Jest source files
declare namespace ic {
    export namespace jest {
        import {ApexTestWireAdapter, LdsTestWireAdapter, TestWireAdapter} from "@salesforce/wire-service-jest-util";
        export interface MockTestWireAdapter extends TestWireAdapter, LdsTestWireAdapter, ApexTestWireAdapter {}
    }
}