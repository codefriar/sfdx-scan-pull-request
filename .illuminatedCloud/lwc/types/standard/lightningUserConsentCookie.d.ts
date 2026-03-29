// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * Use the lightning/userConsentCookie module to incorporate user-authorized cookie consent into your components.
 * Users can allow one or more specific cookie types: Required, Marketing, Preference, and Statistics.
 */
declare module 'lightning/userConsentCookie' {
    /**
     * Use setCookieConsent() to set consent preferences for one or more cookie categories.
     *
     * @param consent one of Preferences, Statistics, or Marketing
     */
    export function setCookieConsent(
        consent: 'Preferences' | 'Statistics' | 'Marketing'
    ): void;

    /**
     * Use isCategoryAllowedForCurrentConsent() to check consent for the specified category.
     *
     * @param consent one of Preferences, Statistics, or Marketing
     *
     * @return true if the category is allowed, otherwise false
     */
    export function isCategoryAllowedForCurrentConsent(
        consent: 'Preferences' | 'Statistics' | 'Marketing'
    ): boolean;
}