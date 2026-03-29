// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-ui-learning-platform-api.html
declare module "lightning/uiLearningPlatformApi" {
    export interface EvaluateLearningItemInput {
        /** The ID of the LearningItem record to evaluate. */
        learningItemId: string;
        /** An optional Map<String, Object> that includes any additional information required for evaluating the learning item. The LearningItemType record that represents the custom exercise defines this criteria. */
        details?: {
            [key: object]: object;
        };
    }

    export interface EvaluateLearningItemResult {
        /** The ID of the LearningItemProgress record. */
        id?: string,
        /** The ID of the LearningItem record that was evaluated. */
        learningItemId?: string,
        /** Percentage of the learning item that's complete. */
        completedPercent?: number,
        /** The date when the user completed the learning item. */
        completedDate?: Date,
        /** Whether the learning item is complete. The default value is false. */
        isCompleted?: boolean
    }

    /**
     * Use this wire adapter to check whether the criteria for completing a custom exercise in an Enablement program are satisfied.
     *
     * @param input the input parameters
     *
     * @return A Promise object that resolves when the custom exercise's corresponding LearningItemProgress response is returned.
     */
    export function evaluateLearningItem(input: EvaluateLearningItemInput): void;
}