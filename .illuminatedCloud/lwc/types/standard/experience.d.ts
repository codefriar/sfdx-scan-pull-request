// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Use the experience/cmsDeliveryApi module to retrieve content from an enhanced CMS workspace.
 */
declare module "experience/cmsDeliveryApi" {
    /**
     * The getContent wire adapter retrieves published content from the workspace to use in a custom Lightning web
     * component in an enhanced LWR site.
     *
     * @param channelOrSiteId the channel or site ID
     * @param contentKeyOrId the content key or ID
     */
    export function getContent(
        channelOrSiteId: string,
        contentKeyOrId: string
    ): void;

    /** The retrieved content item. */
    export interface GetContentResponse {
        title?: string;
        urlName?: string;
        contentBody?: string;
    }

    /**
     * Retrieves a list of published content from an enhanced CMS workspace for an enhanced LWR site, non-enhanced LWR site, or Aura site in Experience Cloud.
     *
     * @param channelOrSiteId The ID for the enhanced LWR site on which you want to use CMS content.
     * @param contentKeys The content keys for the CMS content that you want to use on your enhanced LWR site.
     * @param managedContentIds The managed content IDs for the CMS content that you want to use on your enhanced LWR site.
     * @param contentTypeFQN Fully qualified name of the managed content type.
     * @param referenceDepth An integer 0–3 specifying the depth of references.
     * @param page Number of the page you want returned. Starts at 0. If you don't specify a value or if you specify 0, the first page is returned.
     * @param pageSize Specifies the number of items per page. Valid values are from 1 through 250. If unspecified, the default size is 25.
     * @param includeContentBody Specifies whether to return the content body (true) or summaries of references (false) in the response body. If unspecified, the default value is false.
     *
     * @return A Promise that resolves to a ManagedContentDeliveryDocumentCollection
     */
    export function getContents(
        channelOrSiteId: string,
        contentKeys?: string | string[],
        managedContentIds?: string | string[],
        contentTypeFQN?: string,
        referenceDepth?: number,
        page?: number,
        pageSize?: number,
        includeContentBody?: boolean
    ): void

    /**
     * Managed content delivery document collection.
     */
    export interface ManagedContentDeliveryDocumentCollection {
        /** Information about the managed content channel. */
        channelInfo?: ManagedContentChannelSummary;
        /** Summary information about the managed content delivery channel. */
        channelSummary?: ManagedContentDeliveryChannelSummary;
        /** List of managed content delivery documents. */
        contents?: ManagedContentDeliveryDocument[] | ManagedContentDeliveryDocumentSummary[];
        /** URL to the current page of managed content records. */
        currentPageUrl?: string;
        /** URL to the next page of managed content records. */
        nextPageUrl?: string;
        /** URL to the previous page of managed content records. */
        previousPageUrl?: string;
        /** Map of references with contentKey as the key. */
        references?: Map<string, ManagedContentReference> | Map<string, ManagedContentReferenceSummary>;
        /** List of references. */
        referencesList?: ManagedContentReference[] | ManagedContentReferenceSummary[];
    }

    /**
     * Managed content channel.
     */
    export interface ManagedContentChannelSummary {
        /** Domain URL of the channel. */
        domainUrl?: string;
        /** ID of the managed content channel. */
        id?: string;
        /** Name of the managed content channel. */
        name?: string;
        /** Resource URL to complete information of the channel. */
        resourceUrl?: string;
        /** Target site associated with the channel. */
        target?: ManagedContentChannelTargetSummary;
        /** Type of managed content channel. */
        type?: 'CloudToCloud' | 'Community' | 'ConnectedApp' | 'PublicUnauthenticated' | 'UserPermission';
        /** URL to the channel resource. */
        url?: string;
    }

    /**
     * Summary information of a managed content delivery channel.
     */
    export interface ManagedContentDeliveryChannelSummary {
        /** Domain URL of the channel. */
        domainUrl?: string;
        /** ID of the managed content delivery channel. */
        id?: string;
        /** Name of the managed content channel. */
        name?: string;
        /** Resource URL to complete information of the channel. */
        resourceUrl?: string;
        /** Target site associated with the channel. */
        target?: ManagedContentChannelTargetSummary;
        /** Type of managed content channel. */
        type?: 'CloudToCloud' | 'Community' | 'ConnectedApp' | 'PublicUnauthenticated' | 'UserPermission';
    }

    /**
     * Managed content in delivery scope.
     */
    export interface ManagedContentDeliveryDocument {
        /** Information about the managed content channel. */
        channelInfo?: ManagedContentChannelSummary;
        /** Summary information about the managed content delivery channel. */
        channelSummary?: ManagedContentDeliveryChannelSummary;
        /** Map of properties of the managed content with their values. */
        contentBody?: {
            [key: object]: object;
        };
        /** Globally unique identifier (GUID) for the managed content. */
        contentKey?: string;
        /** Type of managed content. */
        contentType?: ManagedContentTypeSummary;
        /** Language locale of the managed content. */
        language?: string;
        /** ID of the managed content. */
        managedContentId?: string;
        /** Most recent publish date of the managed content. */
        publishedDate?: string;
        /** Map of references with contentKey as the key. */
        references?: Map<string, ManagedContentReference> | Map<string, ManagedContentReferenceSummary>;
        /** List of references. */
        referencesList?: ManagedContentReference[] | ManagedContentReferenceSummary[];
        /** URL to the single content delivery resource. */
        resourceUrl?: string;
        /** Title of the managed content. */
        title?: string;
        /** Public URL for the managed content. */
        unauthenticatedUrl?: string;
        /** URL name of the managed content. */
        urlName?: string;
    }

    /**
     * Managed content delivery document summary.
     */
    export interface ManagedContentDeliveryDocumentSummary {
        /** Globally unique identifier (GUID) for the managed content. */
        contentKey?: string;
        /** Type of managed content. */
        contentType?: ManagedContentTypeSummary;
        /** Language locale of the managed content. */
        language?: string;
        /** ID of the managed content. */
        managedContentId?: string;
        /** Most recent publish date of the managed content. */
        publishedDate?: string;
        /** URL to the single content delivery resource. */
        resourceUrl?: string;
        /** Title of the managed content. */
        title?: string;
        /** Public URL for the managed content. */
        unauthenticatedUrl?: string;
        /** URL name of the managed content. */
        urlName?: string;
    }

    /**
     * Managed content reference.
     */
    export interface ManagedContentReference {
        /** Map of properties of the managed content reference with their values. */
        contentBody?: {
            [key: object]: object;
        };
        /** Unique identifier for the managed content reference. */
        contentKey?: string;
        /** ID of the managed content reference. */
        managedContentId?: string;
        /** URL to the single content delivery resource. */
        resourceUrl?: string;
        /** Title of the managed content reference. */
        title?: string;
    }

    /**
     * Summary of the managed content reference.
     */
    export interface ManagedContentReferenceSummary {
        /** Unique identifier for the managed content reference. */
        contentKey?: string;
        /** ID of the managed content reference. */
        managedContentId?: string;
        /** URL to the single content delivery resource. */
        resourceUrl?: string;
        /** Title of the managed content reference. */
        title?: string;
    }

    /**
     * Target site associated with the channel.
     */
    export interface ManagedContentChannelTargetSummary {
        /** ID of the site associated with the channel. */
        id?: string;
    }

    /**
     * Managed content type.
     */
    export interface ManagedContentTypeSummary {
        /** Fully qualified name of the managed content type. */
        fullyQualifiedName?: string;
        /** Reserved for future use. */
        name?: string;
    }
}

/**
 * Use the experience/cmsEditorApi module to work with the content editor in an enhanced CMS workspace.
 */
declare module "experience/cmsEditorApi" {
    /**
     * The getContent wire adapter retrieves published content from the workspace to use in a custom Lightning web
     * component in an enhanced LWR site.
     *
     * @param channelOrSiteId the channel or site ID
     * @param contentKeyOrId the content key or ID
     */
    export function getContent(
        channelOrSiteId: string,
        contentKeyOrId: string
    ): void;

    /** The retrieved content item. */
    export interface GetContentResponse {
        title?: string;
        urlName?: string;
        contentBody?: {
            [key: string]: string;
        };
    }

    /**
     * Retrieves metadata that provides contextual information about the content item in the CMS content editor.
     */
    export function getContext(): void;

    /** The retrieved content item context. */
    export interface GetContextResponse {
        schema?: GetContextResponseSchema;
        urlName?: string;
        contentBody?: {
            [key: string]: string;
        };
    }

    export interface GetContextResponseSchema {
        schema?: GetContextResponseSchema;
        properties?: Array<GetContextResponseProperty>;
    }

    export interface GetContextResponseProperty {
        $ref?: any;
        title?: string;
    }

    /**
     * Updates a content item.
     *
     * @param input the update request details.
     * @return a promise that will resolve to the update response.
     */
    export function updateContent(input: UpdateContentInput): Promise<UpdateContentResponse>;

    export interface UpdateContentInput {
        title?: string;
        contentBody?: {
            [key: string]: string;
        };
    }

    export interface UpdateContentResponse {
        // TODO: ???
    }

    // TODO: This method name is included in https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_modules.htm&type=5&release=240
    //  whereas the one above is included in https://github.com/salesforce-experiencecloud/CMS-sideBarExtensions. Remove
    //  whichever one is incorrect once the official docs for these modules are posted.

    /**
     * Sets a content item.
     *
     * @param input the set request details.
     * @return a promise that will resolve to the set response.
     */
    export function setContent(input: SetContentInput): Promise<SetContentResponse>;

    export interface SetContentInput {
        title?: string;
        contentBody?: {
            [key: string]: string;
        };
    }

    export interface SetContentResponse {
        // TODO: ???
    }
}

/** https://developer.salesforce.com/docs/platform/lwc/guide/reference-experience-mobile-publisher-config.html */
declare module "experience/mobilePublisherConfigApi" {
    /**
     * To customize navigation for your mobile Experience Cloud app, configure the hamburger menu and Back button
     * navigation options. How you access these options depends on which site template you're using.
     *
     * https://developer.salesforce.com/docs/platform/lwc/guide/reference-experience-mobile-publisher-config-getnavigationconfig.html
     *
     * @param siteId The ID of the site Network object. You can retrieve it using the current community property.
     * @return A promise object with the following payload:
     *
     * @deprecated
     */
    export function getNavigationConfig({siteId}: { siteId: string }): void;

    export interface GetNavigationConfigResponse {
        global?: GlobalGetNavigationConfigProperties;
        ios?: IosGetNavigationConfigProperties;
    }

    export interface GlobalGetNavigationConfigProperties {
        /** This exposes the value of the ‘Show hamburger menu' property under the ‘iOS and Android' section in Experience Builder. It's a global level property, so it applies to both iOS and Android. */
        showHamburgerMenu?: boolean;
    }

    export interface IosGetNavigationConfigProperties {
        /** An iOS only property that provides the value of the ‘Show only back button' option in Experience Builder. */
        showBackButton?: boolean;
        /** An iOS only property that provides the value of the ‘Show both hamburger menu and back button' option in Experience Builder. */
        showHamburgerMenuWithBackButton?: boolean;
    }
}