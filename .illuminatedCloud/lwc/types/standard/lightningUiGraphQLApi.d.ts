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
 *
 * @deprecated use `lightning/graphql` instead
 */
declare module 'lightning/uiGraphQLApi' {
    /**
     * The GraphQL wire adapter accepts a GraphQL document and a variables map. You can import an identifier and pass in a configuration for the properties on your component.
     *
     * @param query Parsed GraphQL query. Parse the query using the gql JavaScript template literal function. gql parses the GraphQL query into a format that the wire adapter can use. gql isn't reactive. If you include ${} string interpolation constructs, they're evaluated one time only when the template literal is expanded.
     * @param variables A key-value pair of dynamic values for the gql query. Use variables with a getter function so the wire adapter can react to changes.
     * @param operationName The name of the operation that you want to perform in the query. For improved debugging on the server-side that easily identifies different GraphQL requests, we recommend labeling your queries with query operationName instead of using the shorthand syntax query. For example, query bigAccounts or query serviceReports.
     *
     * @deprecated use `lightning/graphql` instead
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
     *
     * @deprecated use `lightning/graphql` instead
     */
    export function gql(graphQl: string | TemplateStringsArray): string;

    // TODO: These are almost certainly not correct, but the best available docs just say:
    //   Lightning Data Service doesn't require different wire adapters for each query that's defined in the GraphQL
    //   schema, unlike the other wire adapters. To explore the GraphQL API schema, we recommend reviewing the schema
    //   documentation via introspection using the Altair GraphQL client.

    /**
     * Triggers a query to re-run. This function updates the data provisioned by the GraphQL wire adapter imperatively.
     *
     * `refreshGraphql()` enables you to control when you want the query to re-run, such as in response to a button click or via JavaScript. Call this function to send a GraphQL query request again to the server and update the client-side stored result set.
     *
     * @param result the result set to be refreshed
     *
     * @returns A Promise object. The Promise isn’t resolved until the wire has received the latest data. The wire function might not be invoked again if the data that’s returned from the server hasn’t changed. Instead, wait for the Promise to resolve if you need to know when the refresh has completed. The actual value to which the Promise resolves is meaningless.
     *
     * @deprecated use `lightning/graphql` instead
     */
    export function refreshGraphQL(result): Promise<any>;

    export interface ParsedGraphQlQuery {
    }

    export interface GraphQlQueryResponse {
        uiapi?: GraphQlQueryUiApi;
    }

    export interface GraphQlQueryUiApi {
        query?: any;
    }
}