// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * This module includes one wire adapter, getNavItems. Use this wire adapter to get the navigation items (tabs) that the user has access to.
 */
declare module 'lightning/uiAppsApi' {
// IC2 BEGIN
    //import {LegacyWireAdapterConstructor} from "lwc";

    /** An ordered list of navigation items (tabs) for the current user. */
    export interface GetNavItemsResponse {
        /** Metadata for navigation tabs. */
        navItems?: NavigationItem[];
        /** URL to the current page of navigation tabs. */
        currentPageUrl?: string;
        /** URL to the next page of navigation tabs. */
        nextPageUrl?: string;
    }

    /** The metadata for a single navigation item (tab). */
    export interface NavigationItem {
        /** If true, the tab is available for Salesforce Classic. */
        availableInClassic?: boolean;
        /** If true, the tab is available for Lightning Experience. */
        availableInLightning?: boolean;
        /** Color of the navigation tab. */
        color?: string;
        /** Launch URL of the navigation tab. */
        content?: string;
        /** If true, this navigation tab is a custom tab. */
        custom?: boolean;
        /** API name of the navigation tab. */
        developerName?: string;
        /** URL of the icon of the navigation tab. */
        iconUrl?: string;
        /** ID of the navigation tab. */
        id?: string;
        /**
         * The navigation tab menu type. One of these values:
         *
         * * CanvasConnectedApp: The Canvas Collected App menu type. This value matches Describe App Menu value CanvasConnectedApp.
         * * Connected App: The Connected App menu type. This value matches Describe App Menu value ConnectedApp.
         * * Entity: The Entity menu type as found from search-driven sections. This value is not sourced from the Describe App Menu.
         * * Standard: The Standard special case menu type as found from search-driven sections. This value matches Describe App Menu values Standard.*. The rest of the type information is in standardType.
         * * TabApexPage: The Visualforce tab menu type. This value matches Describe App Menu value Tab.apexPage.
         * * TabAura: The Aura tab menu type. This value matches Describe App Menu value Tab.flexiPage.
         * * TabSObject: The SObject tab menu type. This value matches Describe App Menu value Tab.sObject.
         * * TabWeb: The web tab menu type. This type is only available in Lightning Experience. This value is not sourced from the Describe App Menu.
         * * FullSite: The Full Site tab menu type. This value is not sourced from the Describe App Menu.
         * * Help: The Help menu type. This value is not sourced from the Describe App Menu.
         * * Logout: The Logout menu type. This value is not sourced from the Describe App Menu.
         * * UserProfile: The User Profile menu type. This value is not sourced from the Describe App Menu.
         * * Notification Settings: The Notification Settings menu type. This value is not sourced from the Describe App Menu.
         * * Record: The Record menu type. This value is not sourced from the Describe App Menu.
         * * ListView: The ListView menu type. This value is not sourced from the Describe App Menu.
         */
        itemType?: 'CanvasConnectedApp' |
            'Connected App' |
            'Entity' |
            'Standard' |
            'TabApexPage' |
            'TabAura' |
            'TabSObject' |
            'TabWeb' |
            'FullSite' |
            'Help' |
            'Logout' |
            'UserProfile' |
            'Notification Settings' |
            'Record' |
            'ListView';
        /** Localized label name of the navigation tab. */
        label?: string;
        /** Corresponding object API name of the navigation tab. */
        objectApiName?: string;
        /** The label of the corresponding object. */
        objectLabel?: string;
        /** The plural label of the corresponding object. */
        objectLabelPlural?: string;
        /** Corresponding page reference for the navigation tab. */
        pageReference?: PageReference;
        /** The subtype of a Standard menu type for the app. */
        standardType?: 'Dashboards' |
            'Events' |
            'Feeds' |
            'Groups' |
            'Home' |
            'MyDay' |
            'PendingInterviews' |
            'People' |
            'ProcessInstanceWorkitem' |
            'Reports' |
            'Tasks' |
            'Topics' |
            'News' |
            'DistributedMarketing' |
            'Forecasting3' |
            'ForecastingLightning' |
            'Development' |
            'AppLauncher' |
            'DataAssessmentLightning' |
            'DiscoveryForAccounts' |
            'WaveHome' |
            'WaveHomeLightning' |
            'WaveHomeLightningEacFree' |
            'B2bHome' |
            'B2bPardotCampaigns' |
            'B2bEmail' |
            'B2bMarketablePeople' |
            'B2bAutomation' |
            'B2bSocialSearch' |
            'B2bContent' |
            'B2bPardotSettings' |
            'OmniSupervisorLightning' |
            'ReactNative' |
            'LightningBoltHome' |
            'LightningInstrumentation';
    }

    // https://developer.salesforce.com/docs/platform/lwc/guide/reference-page-reference-type
    /** A page reference. */
    export interface PageReference {
        /** Name of the corresponding page definition. */
        type: 'comm__externalRecordPage' |
            'comm__loginPage' |
            'comm__namedPage' |
            'standard__app' |
            'standard__component' |
            'standard__knowledgeArticlePage' |
            'standard__managedContentPage' |
            'standard__namedPage' |
            'standard__navItemPage' |
            'standard__objectPage' |
            'standard__recordPage' |
            'standard__recordRelationshipPage' |
            'standard__webPage';
        /** Values for each attribute specified by the page definition. */
        attributes: PageReferenceAttributes;
        /** Optional parameters that are not integral to the resolution of the reference. */
        state?: PageReferenceState;
    }

    export interface PageReferenceAttributes {
        /**
         * App that you're navigating to. Pass either the `appId` or `appDeveloperName` to the `appTarget`.
         *
         * * The `appId` is the `DurableId` field on the `AppDefinition` object.
         * * To form the `appDeveloperName` value, concatenate the app's namespace with the developer name. To find the app's developer name, navigate to the App Manager in Setup and look in the Developer Name column.
         *
         * For standard apps, the namespace is `standard__`. For custom apps, it's `c__`. For managed packages, it's the namespace registered for the package.
         */
        appTarget?: string;
        /** Identifies a specific location in the app you're navigating to. Pass in the `pageRef` and applicable attributes for that `pageRef` type. */
        pageRef?: PageReference;
        /** Record ID */
        recordId?: string;
        /** External record type. Currently only supports `cms` for CMS Connect. */
        objectType?: string;
        /** Additional information used to identify the record for the `objectType`. */
        objectInfo?: any;
        /** The Lightning component name in the format `namespace__componentName`. */
        componentName?: string;
        /** The `articleType` API name of the Knowledge Article record. In Experience Builder sites, `articleType` is ignored. */
        articleType?: string;
        /** The value of the `urlName` field on the target `KnowledgeArticleVersion` record. The `urlName` is the article's URL. */
        urlName?: string;
        /** The action name to invoke. */
        actionName?: 'login' | 'logout' | 'home' | 'list' | 'new' | 'clone' | 'edit' | 'view';
        /** The name of the Salesforce CMS content type. */
        contentTypeName?: string;
        /** The unique content key that identifies CMS content. */
        contentKey?: string;
        /**
         * The unique name of the Experience Builder page. The value for `name` is the API Name value for a supported page. The API Name field can only be defined when a new page is being created, and must be unique. If the API Name isn't defined upon page creation, it's automatically generated. The value of `home` is reserved for the landing page of any Experience Builder site in your org. Supported pages in Experience Builder sites are:
         *
         * * Home
         * * Account Management
         * * Contact Support
         * * Error
         * * Login
         * * My Account
         * * Top Articles
         * * Topic Catalog
         * * Custom page
         */
        name?: string;
        /** The unique name of the page. */
        pageName?: 'home' | 'chatter' | 'today' | 'dataAssessment' | 'filePreview';
        /** The unique name of the custom tab. */
        apiName?: string;
        /** The API name of the standard or custom object. For custom objects that are part of a managed package, prefix the custom object with `ns__`. */
        objectApiName?: string;
        /** The API name of the object's relationship field. */
        relationshipApiName?: string;
        /** The URL of the page you're navigating to. */
        url?: string;

        /** Unanticipated attributes */
        [key: string]: any;
    }

    export interface PageReferenceState {
        /** ID or developer name of the object page. Default is `Recent`. Supported actions are: `list`. */
        filterName?: string;
        /** List of key-value pairs for the default field values that you're passing. This list is generated by the `lightning/pageReferenceUtils` module. Supported actions are: `new`. */
        defaultFieldValues?: string;
        /** To use a standard action, assign this property any value, such as `1`. To use an override action, don't include this property at all. Supported actions are: `home`, `list`, `new`. */
        nooverride?: string;

        /** Unanticipated state */
        [key: string]: any;
    }
// IC2 END

    /**
     * Use this wire adapter to retrieve the items in the navigation menu for the Salesforce mobile app.
     */
    export function getNavItems(): void;
}