// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Built on the Salesforce GraphQL API, the GraphQL wire adapter enables you to use UI API enabled objects with the
 * object-level security and field-level security of the current user. The wire adapter is quipped with client-side
 * caching and data management capabilities provided by Lightning Data Service.
 */
declare module 'lightning/graphql' {
    /**
     * The GraphQL wire adapter manages your data using Lightning Data Service (LDS). You don’t need different wire adapters for each query defined in the GraphQL schema, unlike the other wire adapters. Instead, LDS provides a single wire adapter that accepts a GraphQL query document and a variables map.
     *
     * The GraphQL wire adapter uses the Salesforce GraphQL API schema, which enables you to use UI API enabled objects with the object-level security and field-level security of the current user. UI API supports the GraphQL Cursor Connections Specification for pagination.
     *
     * @param query Parsed GraphQL query. Parse the query using the gql JavaScript template literal function. gql parses the GraphQL query into a format that the wire adapter can use. gql isn’t reactive.
     * @param variables A key-value pair of dynamic values for the gql query. Use variables with a getter function so the wire adapter can react to changes.
     * @param operationName The name of the operation you want to perform in the query. Use operationName to select the operation to run if your GraphQL query defines more than one operation. We recommend labeling your queries with query operationName instead of using the shorthand syntax query for improved server-side debugging to identify different GraphQL requests. For example, query bigAccounts or query serviceReports.
     */
    export function graphql(
        query: string,
        variables?: any,
        operationName?: string
    ): void;

    /**
     * Parses the GraphQL query into a format that the wire adapter can use. gql isn't reactive. If you include ${} string interpolation constructs, they're evaluated one time only when the template literal is expanded.
     *
     * @param graphQl the GraphQL query
     */
    export function gql(graphQl: string | TemplateStringsArray): string;

    export interface GraphQlQueryResponse {
        uiapi?: GraphQlQueryUiApi;
    }

    export interface GraphQlQueryUiApi {
        query?: any;
    }
}