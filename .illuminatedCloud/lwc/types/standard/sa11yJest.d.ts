// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/* @sa11y/jest stubs */
declare global {
    namespace jest {
        interface Matchers<R> extends jest.CustomMatcher {
            /**
             * Jest expect matcher to check DOM for accessibility issues
             * @param config - A11yConfig to be used to test for accessibility. Defaults to `base` ruleset.
             */
            toBeAccessible(config?: A11yConfig): Promise<CustomMatcherResult>;
        }
    }
}

/** A11yConfig defines options to run accessibility checks using axe specifying list of rules to test */
export interface A11yConfig extends axe.RunOptions {
    runOnly: {
        type: 'rule';
        values: string[];
    };
    resultTypes: ['violations'];
}