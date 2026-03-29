// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// NOTE: Derived from Salesforce's lds.d.ts

/**
 * Work with view count statistics for knowledge articles.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-service-knowledge-api.html|Lightning Web Components Developer Guide}.
 */
declare module "lightning/serviceKnowledgeApi" {
    /**
     * An object containing Knowledge article or article version ID.
     */
    export interface UpdateViewStatPayload {
        /**
         *  The ID of the KnowledgeArticle or KnowledgeArticleVersion record to increase the view count for.
         */
        articleOrVersionId: string;
    }

    /**
     * Increases the article view count of a KnowledgeArticle or KnowledgeArticleVersion record.
     * @param payload Payload containing article or article version ID
     */
    export function updateViewStat(payload: UpdateViewStatPayload): void;
}