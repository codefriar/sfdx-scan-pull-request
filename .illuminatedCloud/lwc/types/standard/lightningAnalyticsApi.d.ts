// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module 'lightning/analyticsSmartDataDiscoveryApi' {
    import {AssetReferenceRepresentation} from "lightning/analyticsWaveApi";

    /**
     * Retrieves a collection of Einstein Discovery stories.
     *
     * @param folderId Filters the collection to only contain stories for the specified CRM Analytics folder. The ID can be the requesting user's ID for stories in the user's private folder.
     * @param inputId Filters the collection to only contain stories for the specified story input ID.
     * @param page Generated token that indicates the view of stories to be returned.
     * @param pageSize Number of items to be returned in a single page. Minimum is 1, maximum is 200, and the default is 25.
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string. If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in the URL along with any other special characters.
     * @param scope Scope type to apply to the collection results.
     * @param sourceType Single source type to apply to the collection results.
     * @param sourceTypes List of source type to apply to the collection results.
     */
    export function getStories(
        folderId?: string,
        inputId?: string,
        page?: string,
        pageSize?: number,
        q?: string,
        scope?: GetStoriesScope,
        sourceType?: GetStoriesSourceType,
        sourceTypes?: GetStoriesSourceType[]
    ): void;

    export enum GetStoriesScope {
        CreatedByMe,
        SharedWithMe
    }

    export enum GetStoriesSourceType {
        AnalyticsDataset,
        ListDataset,
        Report
    }

    /** A collection of Einstein Discovery stories. */
    export interface StoryCollection {
        /** The URL to get the next page of items for the collection. */
        nextPageUrl?: string;
        /** A list of stories available to the current user. */
        stories?: Story[];
        /** The total size of the items in the collection. */
        totalSize?: number;
        /** The URL to get the predict job results. */
        url?: string;
    }

    /** An Einstein Discovery story. */
    export interface Story {
        /** The autopilot settings for the story. */
        autopilot?: Autopilot;
        /** The threshold for classification predictions for the story. */
        classificationThreshold?: BinaryClassificationThreshold;
        /** The user who created the prediction definition. */
        createdBy?: SmartDataDiscoveryUser;
        /** The creation date of the prediction definition. */
        createdDate?: Date;
        /** The diagnostic error code for the story. */
        errorCode?: number;
        /** A list of field configurations for the story. */
        fields?: DateFieldConfiguration | NumericFieldConfiguration | TextFieldConfiguration;
        /** The analytics folder the story belongs to. */
        folder?: AssetReferenceRepresentation;
        /** The URL for the story's history items. */
        historiesUrl?: string;
        /** The ID of the story. */
        id?: string;
        /** The input data for the story. */
        input?: AnalyticsDatasetSource | ReportSource;
        /** The statistical summary of the input data. */
        inputProfile?: AssetReferenceRepresentation;
        /** The label of the story. */
        label?: string;
        /** The user who last modified the story. */
        lastModifiedBy?: SmartDataDiscoveryUser;
        /** The last modified date of the story. */
        lastModifiedDate?: Date;
        /** The mapped outcome field for Salesforce. */
        lastSuccessfulVersion?: StoryVersionReference;
        /** The informational message related to the story generation. */
        message?: string;
        /** The model configuration for the story. */
        modelsConfiguration?: SmartDataDiscoveryModelConfiguration;
        /** The developer name of the story. */
        name?: string;
        /** The qualified namespace of the story. */
        namespace?: string;
        /** The selected outcome of the generated story. */
        outcome?: SmartDataDiscoveryOutcome;
        /** The run ID for fetching the story insights. */
        runId?: string;
        /** A map of the setup information for the story, including names, action variables, model settings, variables, and outcomes. */
        setup?: {
            [key: object]: object;
        };
        /** The current status of the story. */
        status?: AnalysisSetupStatusEnum;
        /** The URL for the story. */
        url?: string;
    }

    /** The setup for autopilot. */
    export interface Autopilot {
        /** Indicates whether autopilot is enabled (true) or not (false). */
        enabled?: boolean;
    }

    /** The base classification threshold. */
    export interface AbstractClassificationThreshold {
        /** The classification type. */
        type?: ClassificationTypeEnum;
    }

    /** The classification type. */
    export enum ClassificationTypeEnum {
        Binary
    }

    /** A binary classification threshold. */
    export interface BinaryClassificationThreshold extends AbstractClassificationThreshold {
        /** The data for source analysis. */
        value?: number;
    }

    /** An Einstein Discovery user. */
    export interface SmartDataDiscoveryUser {
        /** The ID of the user. */
        id?: string;
        /** The name of the user. */
        name?: string;
        /** The Chatter profile photo of the user. */
        profilePhotoUrl?: string;
    }

    /** The base Einstein Discovery field configuration. */
    export interface AbstractFieldConfiguration {
        /** Indicates whether the field is a high cardinality field (true) or not (false). */
        highCardinality?: Boolean;
        /** Indicates whether the field is ignored (true) or not (false). */
        ignored?: Boolean;
        /** The developer name for the field. */
        label?: String;
        /** The display name for the field. */
        name?: String;
        /** Indicates whether the field is sensitive (true) or not (false). */
        sensitive?: Boolean;
        /** The field type. */
        type?: SmartDataDiscoveryFilterFieldTypeEnum;
    }

    /** The field type. */
    export enum SmartDataDiscoveryFilterFieldTypeEnum {
        Boolean,
        Date,
        DateTime,
        Number,
        Text
    }

    /** The base Einstein Discovery date field configuration. */
    export interface AbstractDateFieldConfiguration extends AbstractFieldConfiguration {
        /** The date interval for the field. */
        interval?: SmartDataDiscoveryDateIntervalEnum;
        /** The maximum date value for the field. */
        max?: Date;
        /** The minimum date value for the field. */
        min?: Date;
        /** A list of periodic date intervals for the field. */
        periodicIntervals?: SmartDataDiscoveryPeriodicDateIntervalEnum;
    }

    /** The date interval for the field. */
    export enum SmartDataDiscoveryDateIntervalEnum {
        Auto,
        Day,
        Month,
        None,
        Quarter,
        Year
    }

    /** The periodic date interval for the field. */
    export enum SmartDataDiscoveryPeriodicDateIntervalEnum {
        Day_of_week,
        Month_of_year,
        Quarter_of_year
    }

    /** The date field configuration. */
    export interface DateFieldConfiguration extends AbstractDateFieldConfiguration {
    }

    /** The base Einstein Discovery numeric field configuration. */
    export interface AbstractNumericFieldConfiguration extends AbstractFieldConfiguration {
        /** The bucketing strategy for the field. */
        bucketingStrategy?: EvenWidthBucketingStrategy | ManualBucketingStrategy | PercentileBucketingStrategy;
        /** The impute strategy for the field. */
        imputeStrategy?: SmartDataDiscoveryImputeStrategy;
        /** The maximum value for the field. */
        max?: number;
        /** The minimum value for the field. */
        min?: number;
    }

    /** The base bucketing strategy. */
    export interface AbstractBucketingStrategy {
        /** The bucketing strategy. */
        type?: SmartDataDiscoveryBucketingStrategyEnum;
    }

    /** The bucketing strategy. */
    export enum SmartDataDiscoveryBucketingStrategyEnum {
        EvenWidth,
        Manual,
        Percentage
    }

    export interface EvenWidthBucketingStrategy extends AbstractBucketingStrategy {
        /** The number of buckets for a numeric field. */
        numberOfBuckets?: number;
    }

    /** The manual bucketing strategy. */
    export interface ManualBucketingStrategy extends AbstractBucketingStrategy {
        /** A list of manual buckets for a numeric field. */
        cutoffs?: number[];
    }

    /** The percentile bucketing strategy. */
    export interface PercentileBucketingStrategy extends AbstractBucketingStrategy {
        /** The number of buckets for a numeric field. */
        numberOfBuckets?: number;
    }

    /** The impute strategy. */
    export interface SmartDataDiscoveryImputeStrategy {
        /** The field name value to group by. */
        groupByFieldName?: string;
        /** The impute method. */
        method?: SmartDataDiscoveryImputeMethodEnum;
    }

    /** The impute method. */
    export enum SmartDataDiscoveryImputeMethodEnum {
        Mean,
        Median,
        Mode,
        None
    }

    /** The numeric field configuration. */
    export interface NumericFieldConfiguration extends AbstractNumericFieldConfiguration {
    }

    /** The base Einstein Discovery text field configuration. */
    export interface AbstractTextFieldConfiguration extends AbstractFieldConfiguration {
        /** Indicates whether values that don't match the specified values should be grouped into other (true) or not (false). */
        includeOther?: boolean;
        /** The strategy for ordering text values. */
        ordering?: SmartDataDiscoveryOrderingEnum;
        /** A list of values for the field. */
        values?: TextFieldValueConfiguration[];
    }

    /** The strategy for ordering text values. */
    export enum SmartDataDiscoveryOrderingEnum {
        Alphabetical,
        Numeric,
        Occurrence
    }

    /** The text field value configuration. */
    export interface TextFieldValueConfiguration {
        /** The label of the field value. */
        label?: string;
        /** The name of the field value. */
        name?: string;
    }

    /** The text field configuration. */
    export interface TextFieldConfiguration extends AbstractTextFieldConfiguration {
    }

    /** The base Einstein Discovery analysis source. */
    export interface AbstractStorySource {
        /** The source type of the analysis. */
        type?: AnalysisSetupSourceTypeEnum;
    }

    /** The source type of the analysis. */
    export enum AnalysisSetupSourceTypeEnum {
        AnalyticsDataset,
        LiveDataset,
        Report
    }

    /** An analytics dataset as the analysis source. */
    export interface AnalyticsDatasetSource extends AbstractStorySource {
        /** The dataset for an analysis source. */
        dataset?: AssetReferenceRepresentation;
        /** The dataset version for an analysis source. */
        datasetVersion?: AssetReferenceRepresentation;
    }

    /** An analytics report as the analysis source. */
    export interface ReportSource extends AbstractStorySource {
        /** The report for an analysis source. */
        report?: AssetReferenceRepresentation;
        /** The report instance for an analysis source. */
        reportInstance?: AssetReferenceRepresentation;
    }

    /** The basic information for an Einstein Discovery story version. */
    export interface StoryVersionReference {
        /** The creation date of the story version. */
        createdDate?: Date;
        /** The ID of the story version. */
        id?: string;
        /** The URL for the story version. */
        url?: string;
    }

    /** The configuration for an Einstein Discovery model. */
    export interface SmartDataDiscoveryModelConfiguration {
        /** The algorithm type for the model. */
        algorithmType?: SmartDataDiscoveryClassificationAlgorithmTypeEnum;
    }

    /** The algorithm type for the model. */
    export enum SmartDataDiscoveryClassificationAlgorithmTypeEnum {
        /** Distributed Random Forest */
        Drf,
        /** GBM */
        Gbm,
        /** GLM */
        Glm,
        /** Model tournament */
        ModelTournament,
        /** XGBoost */
        Xgboost
    }

    /** The analysis outcome for an Einstein Discovery story. */
    export interface SmartDataDiscoveryOutcome {
        /** The analysis prediction type. */
        predictionType?: AnalysisPredictionTypeEnum;
        /** The analysis outcome type. */
        type?: AnalysisOutcomeTypeEnum;
    }

    /** The analysis prediction type. */
    export enum AnalysisPredictionTypeEnum {
        Binary,
        Count,
        MultiClass,
        None,
        Numeric
    }

    /** The analysis outcome type. */
    export enum AnalysisOutcomeTypeEnum {
        Categorical,
        Count,
        Number,
        Text
    }

    /** The current status of the story. */
    export enum AnalysisSetupStatusEnum {
        Autopilot,
        DoneDescriptive,
        DoneFeatureEngineering,
        DonePredictive,
        Draft,
        Failed,
        Fetching,
        GenerateSetup,
        InProgress,
        Postprocessing,
        Preprocessing,
        Queued,
        QueuedForFetching,
        QueuedForPostprocessing,
        RequestToDelete,
        Resizing,
        RetryPreprocessing,
        RunningDescriptive,
        RunningFeatureEngineering,
        RunningPredictive,
        Success,
        TimedOut
    }
}

declare module 'lightning/analyticsWaveApi' {
    /**
     * A Tableau CRM dataflow node.
     *
     * Keys:
     *    (none)
     */
    export interface AbstractDataflowNodeRepresentation {
        /** Node action */
        action?: string;
        /** Node sources */
        sources?: Array<string>;
    }

    /**
     * Base representation for fields in Tableau CRM.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#AbstractFieldRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface AbstractFieldRepresentation {
        defaultValue?: string | number | null | boolean;
        description?: string;
        fieldType: string;
        format?: string;
        label: string;
        multiValue?: boolean;
        multiValueSeparator?: string;
        name: string;
        precision?: number;
        scale?: number;
        systemField?: boolean;
        uniqueId?: boolean;
    }

    /**
     * An advanced property Name and Value.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#AdvancedPropertyValueReprensentation
     *
     * Keys:
     *    (none)
     */
    export interface AdvancedPropertyValueRepresentation {
        name?: string;
        value?: string;
    }

    /**
     * Asset reference representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#AssetReferenceRepresentation
     *
     * Keys:
     *    (none)
     */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface AssetReferenceRepresentation extends BaseAssetReferenceRepresentation {
    }

    /**
     * Base Tableau CRM Asset input Representation
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#BaseAssetInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface BaseAssetInputRepresentation {
        description?: string;
        label?: string;
        name?: string;
    }

    /**
     * Base asset reference representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#AssetReferenceRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface BaseAssetReferenceRepresentation {
        /** The 18 character ID of the asset. */
        id: string;
        /** The asset label. */
        label?: string;
        /** The asset developer name. */
        name?: string;
        /** The namespace that qualifies the asset name */
        namespace?: string;
        /** The asset URL. */
        url?: string;
    }

    /**
     * Base Tableau CRM asset representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#BaseWaveAssetRepresentation
     * Keys:
     *    id (string): id
     */
    export interface BaseWaveAssetRepresentation {
        /** Sharing URL for the asset. */
        assetSharingUrl?: string | null;
        /** The user that created the asset. */
        createdBy?: WaveUserRepresentation;
        /** Time the asset was created. */
        createdDate?: string;
        /** Short description of the asset. */
        description?: string;
        /** The 18 character asset ID. */
        id: string;
        /** The label of the asset. */
        label?: string;
        /** Last time the asset was accessed. */
        lastAccessedDate?: string | null;
        /** The user that last updated the asset. */
        lastModifiedBy?: WaveUserRepresentation | null;
        /** Last time the asset was modified. */
        lastModifiedDate?: string | null;
        /** The name of the asset. */
        name?: string;
        /** The namespace of the Asset. */
        namespace?: string;
        /** Represents permissions for the present user. */
        permissions?: PermissionsRepresentation | null;
        /** The asset type. */
        type: string;
        /** URL to get the definition of the asset. */
        url: string;
    }

    /**
     * A Connection Property Name and Value.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataconnectors.htm#ConnectionPropertyValueRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface ConnectionPropertyValueRepresentation {
        name?: string;
        value?: string | number | boolean;
    }

    /**
     * Daily schedule on which to execute some type of job.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#DailyScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface DailyScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency?: 'daily' | 'Daily';
    }

    /**
     * Daily schedule on which to execute some type of job.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#DailyScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface DailyScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'daily' | 'Daily';
    }

    /**
     * Tableau CRM Data Connector input representation
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataconnectors.htm#DataConnectorInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface DataConnectorInputRepresentation extends BaseAssetInputRepresentation {
        /** Connection properties for the connector */
        connectionProperties?: Array<any>;
        /** Third party driver used for connection */
        connectorHandler?: string;
        /** The type of the Data Connector. */
        connectorType?: string;
        /** Folder for the Live connector */
        folder?: {
            [key: string]: string;
        };
        /** AssetReference containing ID or API name of target connector associated with the current source connector */
        targetConnector?: {
            [key: string]: string;
        };
    }

    /**
     * A Data Connector represents a connection.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataconnectors.htm#DataConnectorRepresentation
     *
     * Keys:
     *    id (string): id
     */
    export interface DataConnectorRepresentation extends BaseWaveAssetRepresentation {
        connectionProperties: Array<ConnectionPropertyValueRepresentation>;
        connectorHandler?: string;
        connectorType: string;
        folder?: AssetReferenceRepresentation;
        ingestionSchedule:
            | HourlyScheduleRepresentation
            | MonthlySpecificScheduleRepresentation
            | MinutelyScheduleRepresentation
            | EventDrivenScheduleRepresentation
            | WeeklyScheduleRepresentation
            | MonthlyRelativeScheduleRepresentation
            | DailyScheduleRepresentation
            | EmptyScheduleRepresentation;
        targetConnector?: AssetReferenceRepresentation;
        type: 'dataConnector';
    }

    /**
     * A collection of Dataflows.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataflows.htm#DataflowCollectionRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface DataflowCollectionRepresentation {
        dataflows?: Array<DataflowRepresentation>;
    }

    /**
     * A Tableau CRM dataflow definition.
     *
     * Keys:
     *    (none)
     */
    export interface DataflowDefinitionRepresentation {
        /** node definitions */
        nodes?: {
            [key: string]: AbstractDataflowNodeRepresentation;
        };
    }

    /**
     * DataflowJob input representation
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataflowjobs_id.htm#DataflowJobInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface DataflowJobInputRepresentation {
        /** Dataflow Job command */
        command?: string;
        /** Dataflow ID */
        dataflowId?: string;
    }

    /**
     * Tableau CRM dataflow job representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataflowjobs_id.htm#DataflowJobRepresentation
     *
     * Keys:
     *    id (string): id
     */
    export interface DataflowJobRepresentation extends BaseWaveAssetRepresentation {
        /** The runtime in seconds of a dataflow job */
        duration?: number;
        /** The start date of a job's execution. */
        executedDate?: string | null;
        /** The type of a job */
        jobType: string;
        /** The analytics license type and other properties */
        licenseAttributes?: LicenseAttributesRepresentation | null;
        /** The error or informational message of a dataflow job */
        message?: string | null;
        /** The URL of job nodes */
        nodesUrl: string;
        /** The progress of a job */
        progress: number;
        /** The source of a job */
        source?: AssetReferenceRepresentation | null;
        /** The start date of a dataflow job */
        startDate?: string;
        /** The runtime status of a dataflow job */
        status: string;
        /** The dataflows to sync when the job is triggered. */
        syncDataflows: DataflowCollectionRepresentation;
        type: 'DataflowJob';
    }

    /**
     * Tableau CRM dataflow asset representation.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataflows_id.htm#DataflowRepresentation
     *
     * Keys:
     *    id (string): id
     */
    export interface DataflowRepresentation extends BaseWaveAssetRepresentation {
        /** Current version of dataflow. */
        current?: DataflowVersionRepresentation | null;
        /** The representation of the dataflow nodes */
        definition: {
            [key: string]: string;
        };
        /** Email notification level of dataflow. */
        emailNotificationLevel?: string | null;
        /** The URL for the dataflow histories associated with the dataflow. */
        historiesUrl?: string | null;
        /** Next scheduled run of dataflow. */
        nextScheduledDate?: string | null;
        /** Schedule attributes of dataflow. */
        scheduleAttributes?: string | null;
        type: 'Dataflow';
    }

    /**
     * A Tableau CRM dataflow version.
     *
     * Keys:
     *    (none)
     */
    export interface DataflowVersionRepresentation {
        /** The user that created the asset. */
        createdBy?: WaveUserRepresentation;
        /** Time the asset was created. */
        createdDate?: string;
        /** Dataflow definition */
        definition?: DataflowDefinitionRepresentation;
        /** The 18 character asset ID. */
        id?: string;
    }

    /**
     * Represents an empty schedule on an asset
     *
     * Keys:
     *    id (string): assetId
     */
    export interface EmptyScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'none' | 'None';
    }

    /**
     * A schedule triggered by an event, e.g., the completion of a data sync job.
     *
     * Keys:
     *    (none)
     */
    export interface EventBasedScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency: 'eventdriven' | 'EventDriven';
        /** The expression defining the events that trigger the scheduling of the target asset. Currently, only accepting scheduling of Dataflows and Recipes as the target asset. */
        triggerRule?: string;
    }

    /**
     * A schedule triggered by an event, e.g., the completion of a data sync job.
     *
     * Keys:
     *    id (string): assetId
     */
    export interface EventDrivenScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'eventdriven' | 'EventDriven';
    }

    /**
     * A schedule which can run multiple times a day.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#HourlyScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface HourlyScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency: 'hourly' | 'Hourly';
        /** Days of the week on which the schedule will run. */
        daysOfWeek: Array<string>;
        /** Hours in between each queueing of task. */
        hourlyInterval: number;
        /** Hour at which schedule stops queueing. */
        lastHour?: number;
    }

    /**
     * A schedule which can run multiple times a day.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#HourlyScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface HourlyScheduleRepresentation extends ScheduleRepresentation {
        frequency: 'hourly' | 'Hourly';
        /** Days of the week on which the schedule will run. */
        daysOfWeek: Array<string>;
        /** Hours in between each queueing of task. */
        hourlyInterval: number;
        /** Hour at which schedule stops queueing. */
        lastHour?: number;
    }

    /**
     * The analytics license type and other properties
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_limits.htm#LicenseAttributesRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface LicenseAttributesRepresentation {
        /** The associated analytics license type */
        type?: string;
    }

    /**
     * A schedule which can run multiple times an hour.
     *
     * Keys:
     *    (none)
     */
    export interface MinutelyScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency: 'minutely' | 'Minutely';
        /** Days of the week on which the schedule will run. */
        daysOfWeek: Array<string>;
        /** Hour at which schedule stops queueing. */
        lastHour?: number;
        /** Minutes in between each queueing of task. */
        minutelyInterval: number;
    }

    /**
     * A schedule which can run multiple times an hour.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#MinutelyScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface MinutelyScheduleRepresentation extends ScheduleRepresentation {
        frequency: 'minutely' | 'Minutely';
        /** Days of the week on which the schedule will run. */
        daysOfWeek: Array<string>;
        /** Hour at which schedule stops queueing. */
        lastHour?: number;
        /** Minutes in between each queueing of task. */
        minutelyInterval: number;
    }

    /**
     * Schedule which runs monthly on a relative day within the month.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#MonthlyRelativeScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface MonthlyRelativeScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency?: 'monthlyrelative' | 'MonthlyRelative';
        /** Day within a week. */
        dayInWeek?: string;
        /** Week within a month. */
        weekInMonth?: string;
    }

    /**
     * Schedule which runs monthly on a relative day within the month.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#MonthlyRelativeScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface MonthlyRelativeScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'monthlyrelative' | 'MonthlyRelative';
        /** Day within a week. */
        dayInWeek?: string;
        /** Week within a month. */
        weekInMonth?: string;
    }

    /**
     * A schedule which runs once a month on specific (numerical) days of the month or on the 'last' day of the month.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#MonthlySpecificScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface MonthlySpecificScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency?: 'monthly' | 'Monthly';
        /** Days of the month on which the schedule will run (-1, 1-31). Note that months lacking specific days will skip the job. Can specify a single value of -1 to indicate the last day of the month (-1 cannot be used with additional days). */
        daysOfMonth?: Array<number>;
    }

    /**
     * A schedule which runs once a month on specific (numerical) days of the month or on the 'last' day of the month.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#MonthlySpecificScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface MonthlySpecificScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'monthly' | 'Monthly';
        /** Days of the month on which the schedule will run (-1, 1-31). Note that months lacking specific days will skip the job. Can specify a single value of -1 to indicate the last day of the month (-1 cannot be used with additional days). */
        daysOfMonth?: Array<number>;
    }

    /**
     * output source for output objects
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_replicateddatasets.htm#OutputSourceRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface OutputSourceRepresentation {
        inputRows?: number;
        isSyncOut: boolean;
        name: string;
        nextScheduledDate?: string;
        outputRows?: number;
    }

    /**
     * Replicates data from an external source object into Tableau CRM as a dataset. Replicated Datasets are not intended to be visualized directly, but are used like a cache to speed up other workflows which refer to the same source object.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_replicateddatasets.htm#ReplicatedDatasetInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface ReplicatedDatasetInputRepresentation {
        advancedProperties?: Array<{
            [key: string]: any;
        }>;
        connectionMode?: string;
        connectorId?: string;
        fullRefresh?: boolean;
        passThroughFilter?: string;
        rowLevelSharing?: boolean;
        sourceObjectName?: string;
    }

    /**
     * Replicates data from an external source object into Tableau CRM as a dataset. Replicated Datasets are not intended to be visualized directly, but are used like a cache to speed up other workflows which refer to the same source object.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_replicateddatasets.htm#ReplicatedDatasetRepresentation
     *
     * Keys:
     *    id (string): uuid
     */
    export interface ReplicatedDatasetRepresentation {
        assetSharingUrl?: string | null;
        createdBy?: WaveUserRepresentation;
        createdDate?: string;
        description?: string;
        id: string;
        label?: string;
        lastAccessedDate?: string | null;
        lastModifiedBy?: WaveUserRepresentation | null;
        lastModifiedDate?: string | null;
        name?: string;
        namespace?: string;
        permissions?: PermissionsRepresentation | null;
        type: string;
        url: string;
        advancedProperties: Array<AdvancedPropertyValueRepresentation>;
        connectionMode?: string;
        connector: DataConnectorRepresentation;
        datasetId?: string;
        fieldCount?: number;
        fieldsUrl: string;
        filterApplied: boolean;
        lastRefreshedDate?: string;
        outputSource?: OutputSourceRepresentation;
        passThroughFilter?: string;
        replicationDataflowId?: string;
        rowLevelSharing?: boolean;
        sourceObjectName: string;
        status?: string;
        supportedConnectionModes?: Array<string>;
        uuid: string;
    }

    /**
     * A list of configuration metadata that specifies how to replicate each field of a Replicated Dataset.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_replicateddatasets_id_fields.htm#ReplicatedFieldCollectionInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface ReplicatedFieldCollectionInputRepresentation {
        fields?: Array<{}>;
    }

    /**
     * A list of Replicated Fields.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_replicateddatasets_id_fields.htm#ReplicatedFieldCollectionInputRepresentation#ReplicatedFieldCollectionRepresentation
     *
     * Keys:
     *    id (string): replicatedDataset.id
     */
    export interface ReplicatedFieldCollectionRepresentation {
        fields?: Array<ReplicatedFieldRepresentation>;
        replicatedDataset?: AssetReferenceRepresentation;
        url?: string;
    }

    /**
     * Metadata/configuration for a single field of a Replicated Dataset.
     *
     * Keys:
     *    (none)
     */
    export interface ReplicatedFieldRepresentation extends AbstractFieldRepresentation {
        skipped?: boolean;
        fieldType?: 'replicatedField';
    }

    /**
     * Permissions of the user on an asset.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#PermissionsRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface PermissionsRepresentation {
        /** The value which indicates whether the user can create an asset */
        create?: boolean;
        /** The value which indicates whether the user can manage access control on an asset */
        manage?: boolean;
        /** The value which indicates whether the user can modify an asset */
        modify?: boolean;
        /** The value which indicates whether the user can view an asset. */
        view?: boolean;
    }

    /**
     * Representation of a dataset version restore.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_dataconnectors_connectorid_ingest.htm#RestoreDatasetVersionRepresentation
     *
     * Keys:
     *    id (string): url
     */
    export interface RestoreDatasetVersionRepresentation {
        message?: string;
        url?: string;
    }

    /**
     * Analtyics query specification.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_query.htm#SaqlQueryInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface SaqlQueryInputRepresentation {
        metadata?: SaqlQueryMetadataInputRepresentation;
        /** The query name */
        name?: string;
        /** The query */
        query: string;
        /** The language in which the query is written: Saql, Sql. */
        queryLanguage?: string;
        /** The timezone requested. */
        timezone?: string;
    }

    /**
     * Query metadata contains query Id and query sequence Id used for performance tracking and monitoring purposes.
     *
     * Keys:
     *    (none)
     */
    export interface SaqlQueryMetadataInputRepresentation {
        [key: string]: any;
    }

    /**
     * Input representation for specifying a schedule on which to execute some type of job.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#ScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface ScheduleInputRepresentation {
        /** Frequency on which this schedule is run. This is case-insensitive. */
        frequency: string;
        /** Level of subscription for the related job. */
        notificationLevel?: string;
        /** When the schedule should be run. */
        time?: {
            [key: string]: any;
        };
    }

    /**
     * Schedule on which to execute some type of job
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_schedule.htm#ScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface ScheduleRepresentation {
        /** The 18 character ID of the asset. */
        assetId: string;
        frequency: string;
        /** Next scheduled time (in UTC) for this schedule. */
        nextScheduledDate?: string;
        /** Email notification level of dataflow associated with this schedule. */
        notificationLevel?: string;
        /** Hour and timezone in which this schedule is run. */
        time?: TimeRepresentation;
    }

    /**
     * Time at which something should happen
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#TimeRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface TimeRepresentation {
        /** Hour at which this schedule is run (0-23). */
        hour?: number;
        /** Minute at which this schedule is run (0-59). */
        minute?: number;
        /** Time zone of the hour at which the schedule is run. */
        timeZone?: TimeZoneRepresentation;
    }

    /**
     * Information about a time zone.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#TimeZoneRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface TimeZoneRepresentation {
        /** The signed offset, in hours, from GMT. */
        gmtOffset?: number;
        /** The display name of this time zone. */
        name?: string;
        /** The zone ID of this time zone. */
        zoneId?: string;
    }

    /**
     * Information about a user.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#WaveUserRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface WaveUserRepresentation {
        /** The 18 character user ID. */
        id: string;
        /** The name of the user. */
        name?: string;
        /** The Chatter profile photo of the user. */
        profilePhotoUrl?: string | null;
    }

    /**
     * Weekly schedule on which to execute some type of job.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#WeeklyScheduleInputRepresentation
     *
     * Keys:
     *    (none)
     */
    export interface WeeklyScheduleInputRepresentation extends ScheduleInputRepresentation {
        frequency?: 'weekly' | 'Weekly';
        /** Days of the week on which the schedule will run. */
        daysOfWeek?: Array<string>;
    }

    /**
     * Weekly schedule on which to execute some type of job.
     *
     * https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#WeeklyScheduleRepresentation
     *
     * Keys:
     *    id (string): assetId
     */
    export interface WeeklyScheduleRepresentation extends ScheduleRepresentation {
        frequency?: 'weekly' | 'Weekly';
        /** Days of the week on which the schedule will run. */
        daysOfWeek?: Array<string>;
    }

    /**
     * Creates a Tableau CRM connector.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_create_data_connector
     *
     * @param dataConnector.connectionProperties Connection properties for the connector.
     * @param dataConnector.connectorHandler Third party driver used for connection.
     * @param dataConnector.connectorType The type of the Data Connector.
     * @param dataConnector.folder Folder for the Live connector.
     * @param dataConnector.targetConnector AssetReference containing ID or API name of target connector associated with the current source connector.
     * @return A promise that will resolve to the data connector response.
     */
    export function createDataConnector({dataConnector}: {
        dataConnector: DataConnectorInputRepresentation
    }): Promise<DataConnectorRepresentation>;

    /**
     * Creates a Tableau CRM dataflow job, which is the equivalent of clicking Run Now for a data prep recipe, a data sync,
     * or a dataflow in the Tableau CRM Data Manager UI.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_create_dataflow_job
     *
     * @param dataflowJob.dataflowId The dataflow, data prep recipe, or data sync ID for the job.
     * @param dataflowJob.command The job command to execute. Must be `Start` to create a dataflow job.
     * @return A promise that will resolve to the dataflow job response.
     */
    export function createDataflowJob({dataflowJob}: {
        dataflowJob: DataflowJobInputRepresentation
    }): Promise<DataflowJobRepresentation>;

    /**
     * Creates a CRM Analytics dataset.
     *
     * @param dataset The dataset to create.
     * @return A Promise object that resolves with the Dataset response.
     */
    export function createDataset({dataset}: { dataset: DatasetInputRepresentation }): Promise<DatasetRepresentation>;

    /**
     * Creates a Tableau CRM replicated dataset
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_create_replicated_dataset
     *
     * @param replicatedDataset.advancedProperties List of user-specified advanced properties associated with this.
     * @param replicatedDataset.connectionMode Connection mode for pulling the data from the replicated dataset.
     * @param replicatedDataset.connectorId The id of the connector object used to replicate.
     * @param replicatedDataset.fullRefresh Whether to perform a one-time full refresh (during the next run) as opposed to incremental.
     * @param replicatedDataset.passThroughFilter Passthrough filter for the replicated object.
     * @param replicatedDataset.rowLevelSharing Inherit row level sharing rules for this object.
     * @param replicatedDataset.sourceObjectName The name of the source object to be replicated.
     * @return A promise that will resolve to the replicated dataset response.
     */
    export function createReplicatedDataset({replicatedDataset,}: {
        replicatedDataset: ReplicatedDatasetInputRepresentation
    }): Promise<ReplicatedDatasetRepresentation>;

    /**
     * Deletes a specific CRM Analytics data connector by ID or developer name.
     *
     * @param datasetConnectorId The ID or developer name of the connector.
     * @return A promise that will resolve on completion.
     */
    export function deleteDataConnector({connectorIdOrApiName}: { connectorIdOrApiName: string }): Promise<void>;

    /**
     * Deletes a specific Tableau CRM dataset by ID or developer name.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_delete_dataset
     *
     * @param datasetIdOrApiName The ID or developer name of the dataset.
     * @return A promise that will resolve on completion.
     */
    export function deleteDataset({datasetIdOrApiName}: { datasetIdOrApiName: string }): Promise<void>;

    /**
     * Deletes a specific Tableau CRM data prep recipe by ID.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_delete_recipe
     *
     * @param id The ID of the data prep recipe.
     * @return A promise that will resolve on completion.
     */
    export function deleteRecipe({id}: { id: string }): Promise<void>;

    /**
     * Deletes a specific Tableau CRM replicated dataset by ID.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_delete_replicated_dataset
     *
     * @param id The ID of the replicated dataset.
     * @return A promise that will resolve on completion.
     */
    export function deleteReplicatedDataset({id}: { id: string }): Promise<void>;

    /**
     * Deletes a specific CRM Analytics folder by ID.
     *
     * https://developer.salesforce.com/docs/platform/lwc/guide/reference-analytics-delete-wave-folder.html
     *
     * @param id The ID of the CRM Analytics folder.
     * @return A promise that will resolve on completion.
     */
    export function deleteWaveFolder({folderId}: { folderId: string }): Promise<void>;

    /**
     * Response for executeQuery calls, e.g.:
     * ```json
     * {
     *   "action":"query",
     *   "responseId":"3vy-E9YmX-TIWe0769juD-",
     *   "results": {
     *     "metadata": {
     *       "columns":[
     *         {"name":"FirstName", "type":"String"},
     *         {"name":"count", "type":"Numeric"}
     *       ],
     *       "groups":["FirstName"]
     *     },
     *     "records":[
     *       {"FirstName":"","count":1},
     *       {"FirstName":"Admin","count":1},
     *       {"FirstName":"Integration","count":1},
     *       {"FirstName":"Security","count":1}
     *     ]
     *   },
     *   "query":"q = load \"0Fbxx0000000006CAA/0Fcxx000000001dCAA\";
     *            q = group q by 'FirstName';
     *            q = foreach q generate 'FirstName' as 'FirstName', count() as 'count';
     *            q = limit q 2000;",
     *   "responseTime":544
     * }
     * ```
     */
    export interface ExecuteQueryResponse {
        action?: string;
        responseId?: string;
        results?: ExecuteQueryResults;
        query?: string;
        responseTime?: number;
    }

    export interface ExecuteQueryResults {
        metadata?: ExecuteQueryResponseMetadata;
        records?: Array<any>;
    }

    export interface ExecuteQueryResponseMetadata {
        columns?: ExecuteQueryResponseColumn[];
    }

    export interface ExecuteQueryResponseColumn {
        name?: string;
        type?: string;
    }

    /**
     * Wire adapter to execute a Tableau CRM query.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_execute_query
     *
     * @param query.query The query string to execute.
     * @param query.queryLanguage The query language. Valid values are `SAQL` or `SQL`. The default is `SAQL`.
     * @param query.timezone The timezone for the query.
     */
    export function executeQuery(query: SaqlQueryInputRepresentation): void;

    /** Response for getAnalyticsLimits calls. */
    export interface GetAnalyticsLimitsResponse {
        /** A collection of Tableau CRM limits. */
        limits?: WaveAnalyticsLimit[];
    }

    /** A Tableau CRM limit. */
    export interface WaveAnalyticsLimit {
        /** The total current used amount. */
        current?: number;
        /** The interval in which the limit is applied. */
        interval?: LimitIntervalEnum;
        /** The Analytics license type and other properties. */
        licenseAttributes?: LicenseAttributes;
        /** The maximum count that Tableau CRM allows. */
        max?: number;
        /** The threshold value to issue a warning before reaching the max. */
        threshold?: number;
        /** The limit type */
        type?: ConnectAnalyticsLimitTypeEnum;
    }

    export enum LimitIntervalEnum {
        Daily,
        Hourly,
        Monthly,
        None,
        Weekly
    }

    /** The Analytics license attributes */
    export interface LicenseAttributes {
        /** The Analytics license type */
        type?: ConnectAnalyticsLicenseTypeEnum;
    }

    /** Analytics license types */
    export enum ConnectAnalyticsLicenseTypeEnum {
        /** Tableau CRM */
        EinsteinAnalytics,
        /** Salesforce Data Pipeline */
        Sonic
    }

    /** Analytics limit types */
    export enum ConnectAnalyticsLimitTypeEnum {
        /** Maximum dataflow runtime per month */
        BatchTransformationHours,
        /** Maximum queries on datasets for all users */
        DatasetQueries,
        /** Maximum row of all datasets combined */
        DatasetRowCount,
        /** Maximum rows for all high volume tier output connectors per rolling 24-hour period */
        MaxDailyRowsHighOutputCon,
        /** Maximum rows for all low volume tier output connectors per rolling 24-hour period */
        MaxDailyRowsLowOutputCon,
        /** Maximum rows for all medium volume tier output connectors per rolling 24-hour period */
        MaxDailyRowsMedOutputCon,
        /** Maximum data size for all high volume tier output connectors per rolling 24-hour period */
        MaxDailySizeHighOutputCon,
        /** Maximum data size for all low volume tier output connectors per rolling 24-hour period */
        MaxDailySizeLowOutputCon,
        /** Maximum data size for all medium volume tier output connectors per rolling 24-hour period */
        MaxDailySizeMedOutputCon,
        /** Maximum cumulative bytes of data files written to Salesforce in a rolling 24-hour period */
        OutputLocalConnectorVolume
    }

    /**
     * Wire adapter to retrieve the Analytics limits for Tableau CRM.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_analytics_limits
     *
     * @param licenseType The Tableau CRM license types. Valid values are `EinsteinAnalytics` or `Sonic`.
     * @param types The types of limits used in Tableau CRM.
     *              Valid values are `BatchTransformationHours`, `DatasetQueries`, `DatasetRowCount`,
     *              `MaxDailyRowsHighOutputCon`, `MaxDailyRowsLowOutputCon`, `MaxDailyRowsMedOutputCon`,
     *              `MaxDailySizeHighOutputCon`, `MaxDailySizeLowOutputCon`, `MaxDailySizeMedOutputCon`,
     *              or `OutputLocalConnectorVolume`.
     */
    export function getAnalyticsLimits(
        licenseType?: string,
        types?: string[]
    ): void;

    /**
     * Wire adapter to retrieve the Connector for Tableau CRM.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connector
     *
     * @param connectorIdOrApiName The ID of the connector.
     */
    export function getDataConnector(connectorIdOrApiName: string): void;

    /** A collection of Tableau CRM connectors. */
    export interface DataConnectorCollectionRepresentation {
        /** The categories that the data connector belongs to. */
        category?: ConnectWaveConnectorCategoryEnum;
        /** For a full list of the data connector types, see the enum description. */
        connectorType?: ConnectWaveDataConnectorTypeEnum;
        /** Filters the results to include on the contents of a specific folder. The id can be the requesting user's ID for items in the user's private folder. */
        folderId?: string;
        /** The type of scope to be applied to the returned collection. */
        scope?: ConnectWaveScopeTypeEnum;
    }

    /** The categories that the data connector belongs to. */
    export enum ConnectWaveConnectorCategoryEnum {
        AdvancedPropertiesSupport,
        BatchRead,
        Direct,
        FileBased,
        FilterSupport,
        MuleSoft,
        Output
    }

    /** The type of Tableau CRM connector. */
    export enum ConnectWaveDataConnectorTypeEnum {
        AmazonS3,
        AmazonS3Output,
        AwsRdsAuroraMySQL,
        AwsRdsAuroraPostgres,
        AwsRdsMariaDB,
        AwsRdsMySQL,
        AwsRdsPostgres,
        AwsRdsSqlServer,
        AzureDataLakeGen2Output,
        AzureSqlDatabase,
        AzureSqlDatawarehouse,
        GoogleAnalytics,
        GoogleAnalyticsCoreReporting,
        GoogleBigQuery,
        GoogleBigQueryDirect,
        GoogleBigQueryStandardSQL,
        GoogleCloudStorage,
        GoogleSpanner,
        HerokuPostgres,
        HubSpot,
        Marketo,
        MarketoV2,
        MicrosoftDynamics,
        MulesoftMySQL,
        MulesoftOracle,
        MulesoftSqlServer,
        NetSuite,
        OracleEloqua,
        Redshift,
        SalesforceCPQ,
        SalesforceCommunityCloud,
        SalesforceExternal,
        SalesforceForceCom,
        SalesforceMarketingCloud,
        SalesforceMarketingCloudOAuth2,
        SalesforceSalesCloud,
        SalesforceServiceCloud,
        SapHana,
        SapHanaCloud,
        SapSuccessFactors,
        SfdcLocal,
        SnowflakeComputing,
        SnowflakeDirect,
        SnowflakeOutput,
        SugarCRM,
        TableauHyperOutput,
        Teradata,
        Zendesk,
        ZuoraAQuA
    }

    /** The type of scope to be applied to the returned collection. */
    export enum ConnectWaveScopeTypeEnum {
        CreatedByMe,
        Mru,
        SharedWithMe
    }

    /**
     * Wire adapter to retrieve the collection of Connectors for Tableau CRM.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connectors
     *
     * @param category The categories that the data connector belongs to. Valid values are:
     *                 AdvancedPropertiesSupport, BatchRead, Direct, FileBased, FilterSupport, MuleSoft, Output
     * @param connectorType The type of Tableau CRM connector.
     * @param scope The type of scope to be applied to the returned collection. Valid values are:
     *              CreatedByMe, Mru (Most Recently Used), SharedWithMe
     */
    export function getDataConnectors(
        category?: string,
        connectorType?: string,
        scope?: string
    ): void;

    /** A collection of fields for a source object. */
    export interface SourceFieldCollectionRepresentation {
        /** A reference to the data connector that the fields belong to. */
        dataConnector: AssetReference;
        /** A list of Source Fields. */
        fields?: SourceField[];
        /** The name of the source object that the fields belong to. */
        sourceObjectName?: string;
        /** URL to get the collection. */
        url?: string;
    }

    // TODO: Should this be AssetReferenceRepresentation? */
    /** A Tableau CRM asset reference. */
    export interface AssetReference {
        /** The 18 character ID of the asset. */
        id?: string;
        /** The asset label. */
        label?: string;
        /** The asset developer name. */
        name?: string;
        /** The namespace that qualifies the asset name. The default is the current organization's namespace, which is "empty namespace" for all organizations, except those developer edition orgs that have set a namespace. */
        namespace?: string;
        /** The asset URL. */
        url?: string;
    }

    /** A field for a source object. */
    export interface SourceField {
        /** If this source field is inaccessible, this property contains a message describing the reason. */
        accessDeniedReason?: string;
        /** If this property is present and false, the source field is inaccessible and can't be synced. Check the accessDeniedReason property for more information. */
        accessible?: boolean;
    }

    /**
     * Wire adapter to retrieve the collection of source fields for a particular source object.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connector_source_fields
     *
     * @param connectorIdOrApiName The ID of the connector.
     * @param sourceObjectName The name of the source object.
     */
    export function getDataConnectorSourceFields(
        connectorIdOrApiName: string,
        sourceObjectName: string
    ): void;

    /** A source object for a Tableau CRM data connector. */
    export interface SourceObjectRepresentation {
        /** If this source object is inaccessible, this property contains a message describing the reason. */
        accessDeniedReason?: string;
        /** If this property is present and false, the source object is inaccessible and can't be synced. Check the accessDeniedReason property for more information. */
        accessible?: boolean;
        /** A reference to the data connector that the source object belongs to. */
        dataConnector?: AssetReference;
        /** The URL to retrieve the data preview associated with this source object. */
        dataPreviewUrl?: string;
        /** The URL to get the data associated with this source object. */
        dataUrl?: string;
        /** The URL to get the list of source fields that this source object has. */
        fieldsUrl?: string;
        /** The external name of this source object. The specifics depend on the connector type. */
        name?: string;
        /** Indicates whether this source object is synced in Tableau CRM (true) or not (false). */
        replicated?: boolean;
        /** The URL to get this source object. */
        url?: string;
    }

    /**
     * Wire adapter to retrieve a source object resource for a Tableau CRM connector.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connector_source_object
     *
     * @param connectorIdOrApiName The ID of the connector.
     * @param sourceObjectName The name of the source object.
     */
    export function getDataConnectorSourceObject(
        connectorIdOrApiName: string,
        sourceObjectName: string
    ): void;

    /** The status for a Tableau CRM data connector. */
    export interface DataConnectorStatusRepresentation {
        /** Message from testing a connection status. */
        message?: string;
        /** Result from testing the Tableau CRM connector. */
        status?: ConnectWaveDataConnectorStatusEnum;
        /** The URL for the data connector status. */
        url?: string;
    }

    export enum ConnectWaveDataConnectorStatusEnum {
        Failure,
        Success
    }

    /**
     * Retrieves a preview collection of source fields for a source object used by a CRM Analytics data connector.
     *
     * @param connectorIdOrApiName The ID or developer name of the data connector.
     * @param sourceObjectName The source object name to request the preview fields for.
     */
    export function getDataConnectorSourceObjectPreviewWithFields(
        connectorIdOrApiName: string,
        sourceObjectName: string
    ): void;

    /** The data retrieved from a source object given a list of fields and advanced properties. */
    export interface SourceObjectDataRepresentation {
        /** The JSON representation, as a string, for data preview to show. */
        dataListJson?: string;
        /** The URL to get this Source Object Data. */
        url?: string;
    }

    /**
     * Wire adapter to test the status of an external Tableau CRM connector.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connector_status
     *
     * @param connectorIdOrApiName The ID of the connector.
     */
    export function getDataConnectorStatus(connectorIdOrApiName: string): void;

    /** A collection of Tableau CRM data connector types. */
    export interface DataConnectorTypeCollectionRepresentation {
        /** A list of Tableau CRM connector types. */
        types?: DataConnectorType[];
        /** The URL to get the collection. */
        url?: string;
    }

    /** A Tableau CRM data connector type. */
    export interface DataConnectorType {
        /** The advanced properties of the Tableau CRM connector type. */
        advancedProperties?: AdvancedProperty[];
        /** The categories that the data connector belongs to. */
        associatedCategories?: ConnectWaveConnectorCategoryEnum;
        /** The bundle type that the data connector belongs to. */
        bundle?: ConnectWaveDataConnectorBundleEnum;
        /** The connection properties of the Tableau CRM connector type. */
        connectionProperties?: ConnectionProperty[];
        /** Indicates whether the Tableau CRM connector type is external (true) or internal (false). */
        isExternal?: boolean;
        /** The label of the Tableau CRM connector type. */
        label?: string;
        /** The name of the Tableau CRM connector type. */
        name?: string;
        /** The list of supported connector handlers for the Tableau CRM connector type. */
        supportedConnectorHandlers?: ConnectWaveDataConnectorHandlerEnum[];
        /** The type of Tableau CRM connector. */
        type?: ConnectWaveDataConnectorTypeEnum;
    }

    /** An advanced property is a replication property for a data connector source object. */
    export interface AdvancedProperty {
        /** The field type of the advanced property. */
        dataType?: ConnectWaveConnPropertyTypeEnum;
        /** The default value of the advanced property. */
        defaultValue?: any;
        /** The description of the advanced property. */
        description?: string;
        /** Indicates whether the property is required (true) or not (false). */
        isRequired?: boolean;
        /** The label of the advanced property. */
        label?: string;
        /** The name of the advanced property. */
        name?: string;
    }

    /** The field type of the advanced property. */
    export enum ConnectWaveConnPropertyTypeEnum {
        Boolean,
        Numeric,
        Text
    }

    /** The bundle type that the data connector belongs to. */
    export enum ConnectWaveDataConnectorBundleEnum {
        AmazonS3,
        Azure,
        Cdp,
        Salesforce,
        Snowflake,
        Tableau
    }

    /** A property used to connect to a Tableau CRM data connector. */
    export interface ConnectionProperty {
        /** The field type of the connection property. 39.0 */
        dataType?: ConnectWaveConnPropertyTypeEnum;
        /** The default value of the connection property. */
        defaultValue?: any;
        /** Indicates whether the connection property is encrypted (true) or not (false). */
        isEncrypted?: boolean;
        /** Indicates whether the connection property is required (true) or not (false). */
        isRequired?: boolean;
        /** The label of the connection property. */
        label?: string;
        /** The maximum length of the connection property. */
        maxLength?: number;
        /** The name of the connection property. */
        name?: string;
    }

    /** The connector handler associated with the Tableau CRM connector. */
    export enum ConnectWaveDataConnectorHandlerEnum {
        Base,
        Legacy
    }

    /**
     * Wire adapter to retrieve a collection of Tableau CRM connector types.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_data_connector_types
     */
    export function getDataConnectorTypes(): void;

    /**
     * Wire adapter to retrieve a specific Tableau CRM dataflow job.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_dataflow_job
     *
     * @param dataflowJobId The ID of the dataflow job.
     */
    export function getDataflowJob(dataflowJobId: string): void;

    /** A node in a dataflow job. */
    export interface DataflowJobNodeRepresentation extends BaseWaveAssetRepresentation {
        /** The run time in seconds of a node. */
        duration?: number;
        /** The URL to download the error log blob. */
        errorLogUrl?: string;
        /** The count of input rows to a node. */
        inputRows?: NodeRowCount;
        /** The error or informational message of a node */
        message?: string;
        /** The node type. */
        nodeType?: ConnectWaveEltNodeActionEnum;
        /** The count of output rows to a node. */
        outputRows?: NodeRowCount;
        /** The start date of a node. */
        startDate?: Date;
        /** The run-time status of the node. */
        status?: ConnectWaveDataflowJobNodeStatusEnum;
    }

    /** The node row count for a Tableau CRM dataflow job node. */
    export interface NodeRowCount {
        /** The number of failed rows for the node. */
        failedCount?: number;
        /** The number of processed rows for the node. */
        processedCount?: number;
    }

    /** The node type. */
    export enum ConnectWaveEltNodeActionEnum {
        Append,
        Augment,
        BinDigest,
        ComputeExpression,
        ComputeRelative,
        CsvDigest,
        Dataset,
        DeleteRows,
        Delta,
        Digest,
        Dim2Mea,
        Export,
        Filter,
        Flatten,
        IndexDim,
        Internal,
        Prediction,
        RecipeExport,
        RecipeTransforms,
        Register,
        SfdcFetch,
        SliceDataset,
        SobjectDigest,
        Update
    }

    /** The runtime status of the node. */
    export enum ConnectWaveDataflowJobNodeStatusEnum {
        Aborted,
        Error,
        Pending,
        Running,
        Success,
        Warning
    }

    /**
     * Wire adapter to retrieve a specific Tableau CRM dataflow job node for a recipe or dataflow.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_dataflow_job_node
     *
     * @param dataflowJobId The ID of the dataflow job.
     * @param nodeId The ID of the node.
     */
    export function getDataflowJobNode(
        dataflowJobId: string,
        nodeId: string
    ): void;

    /** The collection of nodes for a Tableau CRM dataflow job. */
    export interface DataflowJobNodeCollectionRepresentation {
        /** A list of dataflow job nodes. */
        nodes?: DataflowJobNodeRepresentation[];
        /** The URL to get the collection. */
        url?: string;
    }

    /**
     * Wire adapter to retrieve a collection of Tableau CRM dataflow job nodes.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_dataflow_job_nodes
     *
     * @param dataflowJobId The ID of the dataflow job.
     */
    export function getDataflowJobNodes(dataflowJobId: string): void;

    /** A list of dataflow jobs including standard dataflows and recipes. */
    export interface DataflowJobsCollectionRepresentation {
        /** Filters the collection to only contain dataflow jobs tied to this specific dataflow. ID must start with ‘02K' */
        dataflowId?: string;
        /** Filters the collection to only contain dataflow jobs for specified job types. */
        jobTypes?: ConnectJobTypeEnum[];
        /** Filters the collection by the Analytics license type. */
        licenseType?: ConnectAnalyticsLicenseTypeEnum;
        /** A generated token that indicates the view of dataflow jobs to be returned. */
        page?: string;
        /** The number of items to be returned in a single page. Minimum is 1, maximum is 200, and default is 25. */
        pageSize?: number;
        /** Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string. If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in the URI along with any other special characters. */
        q: string;
        /** Filters the collection to only contain dataflow jobs started at or after the specified date-time (in Epoch seconds in UTC). */
        startedAfter?: string;
        /** Filters the collection to only contain dataflow jobs with a specific runtime status. */
        status?: ConnectWaveDataflowJobStatusEnum;
    }

    /** Job types */
    export enum ConnectJobTypeEnum {
        DataSync,
        FileUpload,
        Internal,
        Recipe,
        Recipe_V3,
        Report,
        Restore,
        User
    }

    /** Job statuses */
    export enum ConnectWaveDataflowJobStatusEnum {
        Failure,
        Queued,
        Running,
        Success,
        Warning
    }

    /**
     * Wire adapter to retrieve a collection of Tableau CRM dataflow jobs.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_dataflow_jobs
     *
     * @param dataflowId Filters the collection to only contain dataflow jobs tied to this specific dataflow. The ID must start with '02K'.
     * @param licenseType The response includes dataflow jobs with this license type. Valid values are `EinsteinAnalytics` or `Sonic`.
     * @param page Generated token that indicates the view of dataflow jobs to be returned.
     * @param pageSize Number of items to be returned in a single page. Minimum is 1, maximum is 200, and the default is 25.
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string.
     *          If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in
     *          the URI along with any other special characters.
     * @param status Filters the collection to only contain dataflow jobs with a specific runtime status.
     *               Valid values are `Failure`, `Queued`, `Running`, `Success`, or `Warning`.
     */
    export function getDataflowJobs(
        dataflowId?: string,
        licenseType?: string,
        page?: string,
        pageSize?: number,
        q?: string,
        status?: string
    ): void;

    /**
     * Wire adapter to retrieve a collection of Tableau CRM dataflows.
     *
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string.
     *          If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in
     *          the URI along with any other special characters.
     */
    export function getDataflows(q?: string): void;

    /** A Tableau CRM dataset. */
    export interface DatasetRepresentation extends BaseWaveAssetRepresentation {
        /** The URL for the dataset shards. */
        clientShardsUrl?: string;
        /** The creator of the current version of the dataset. Only returned if the filterGroup input parameter is set to Supplemental. */
        currentVersionCreatedBy?: WaveUserRepresentation;
        /** The time at which the current version of the dataset was created, in ISO8601 date format. Only returned if the filterGroup input parameter is set to Supplemental. */
        currentVersionCreatedDate?: Date;
        /** The 18-character ID of the current dataset version. */
        currentVersionId?: string;
        /** The user who last updated the current version of the dataset. Only returned if the filterGroup input parameter is set to Supplemental. */
        currentVersionLastModifiedBy?: WaveUserRepresentation;
        /** The last time the current version of the dataset was modified, in ISO8601 date format. Only returned if the filterGroup input parameter is set to Supplemental. */
        currentVersionLastModifiedDate?: Date;
        /** Indicates whether the current dataset version supports new date formats (true) or not (false). */
        currentVersionSupportsNewDates?: boolean;
        /** The total number of rows in the dataset. */
        currentVersionTotalRows?: number;
        /** The total number of rows in the dataset. */
        currentVersionTotalRowCount?: number;
        /** The URL for the current dataset version. */
        currentVersionUrl?: string;
        /** The last time this dataset was updated. */
        dataRefreshDate?: Date;
        /** The type of the dataset., 41.0 */
        datasetType?: ConnectWaveDatasetTypeEnum;
        /** The reference to the folder in which this dataset is stored. */
        folder?: AssetReference;
        /** The last time the metadata (folder, label, current, sharing, or security predicate) of this dataset was changed. */
        lastMetadataChangedDate?: Date;
        /** The last time this dataset was queried. */
        lastQueriedDate?: Date;
        /** The Analytics license attributes associated with this dataset. */
        licenseAttributes?: LicenseAttributes;
        /** The live connection details for the dataset. */
        liveConnection?: LiveConnection;
        /** The associated user XMD. */
        userXmd?: XmdRepresentation;
        /** The URL for dataset versions. */
        versionsUrl?: string;
        /** Indicates whether the dataset is hidden from users with view access or not., 51.0 */
        visibility?: ConnectWaveAssetVisibilityType;
    }

    /** The type of the dataset. */
    export enum ConnectWaveDatasetTypeEnum {
        Default,
        Live,
        StagedData,
        Trended
    }

    /** The connection details of a Tableau CRM live dataset. */
    export interface LiveConnection {
        /** The label of the live connection. */
        connectionLabel?: string;
        /** The developer name of the live connection. */
        connectionName?: string;
        /** The type of Tableau CRM connector. The list of valid values can be found here. */
        connectionType?: ConnectWaveDataConnectorTypeEnum;
        /** The source object name for the live connection. */
        sourceObjectName?: string;
    }

    /** The extended metadata (Xmd) for a Tableau CRM dataset version. */
    export interface XmdRepresentation {
        /** The user who created the Xmd. */
        createdBy?: WaveUserRepresentation;
        /** The time at which the Xmd was created, in ISO8601 date format. */
        createdDate?: Date;
        /** A list of dates with formatting information. */
        dates?: XmdDate[];
        /** A list of derived dimensions with formatting information. */
        derivedDimensions?: XmdDimension[];
        /** A list of derived measures with formatting information. */
        derivedMeasures?: XmdMeasure[];
        /** A list of dimensions with formatting information. */
        dimensions?: XmdDimension[];
        /** The message if there was error copying forward the current version's user Xmd to the newly created version. */
        errorMessage?: string;
        /** The language in which this Xmd is localized. */
        language?: ConnectWaveLanguageEnum;
        /** The user who last updated the Xmd. */
        lastModifiedBy?: WaveUserRepresentation;
        /** The last time the Xmd was modified, in ISO8601 date format. */
        lastModifiedDate?: Date;
        /** A list of measures with formatting information. */
        measures?: XmdMeasure[];
        /** A list of organizations for multi-organization support. */
        organizations?: XmdOrganization[];
        /** An ordered list of dimensions and measures. The list defines the default order in which to show the dimensions and measures in the user interface. */
        showDetailsDefaultFields?: string[];
        /** The type of Xmd. */
        type?: ConnectWaveXmdTypeEnum;
        /** The location where this Xmd is stored. */
        url?: string;
    }

    /** Asset visibility type */
    export enum ConnectWaveAssetVisibilityType {
        /** Show all assets */
        All,
        /** Hide assets from viewers with view access */
        Limited
    }

    /** The extended metadata (Xmd) for a date. */
    export interface XmdDate {
        /** The alias of the Date column. */
        alias?: string;
        /** Indicates whether the date should be displayed as compact or not. */
        compact?: boolean;
        /** The description of the Date column. */
        description?: string;
        /** The formatting information for the date fields. */
        fields?: XmdDateField;
        /** Denotes the first day of the week. */
        firstDayOfWeek?: number;
        /** The offset number of months for the fiscal year in relation to the calendar year. */
        fiscalMonthOffset?: number;
        /** The format for date field. */
        format?: string;
        /** The fully qualified name of the date. */
        fullyQualifiedName?: string;
        /** Indicates if the DateTime type is from timezone auto conversion or not. */
        isConvertedDateTime?: boolean;
        /** Indicates if the year end is the fiscal year or not. */
        isYearEndFiscalYear?: boolean;
        /** The label of the Date column. */
        label?: string;
        /** Indicates whether the dataset field can be selected from the dashboard designer or explorer when creating dashboards and lenses (true) or not (false). Even if showInExplorer is false, the field can still be used for SAQL queries, manually added in JSON, and accessed using the Tableau CRM REST API. */
        showInExplorer?: boolean;
        /** The Date type. */
        type?: ConnectWaveDateType;
    }

    /** The extended metadata (Xmd) for the formatting of date fields. */
    export interface XmdDateField {
        /** The day of the month. */
        day?: string;
        /** The number of days that have elapsed since January 1, 1970 (midnight UTC). */
        epochDay?: string;
        /** The number of seconds that have elapsed since January 1, 1970 (midnight UTC). Corresponds to _sec_epoch in datasets. */
        epochSecond?: string;
        /** The month number in fiscal year. Corresponds to _Month_Fiscal in datasets. */
        fiscalMonth?: string;
        /** The quarter number in fiscal year. Corresponds to _Quarter_Fiscal in datasets. */
        fiscalQuarter?: string;
        /** The week number in fiscal year. Corresponds to _Week_Fiscal in datasets. */
        fiscalWeek?: string;
        /** The Fiscal year. Corresponds to _Year_Fiscal in datasets. */
        fiscalYear?: string;
        /** The full-field field. */
        fullField?: string;
        /** The number of hours. If the date contains no hours, value is '0.' Corresponds to _Hour in datasets. */
        hour?: string;
        /** The number of minutes. If the date contains no minutes, value is '0.' Corresponds to _Minute in datasets. */
        minute?: string;
        /** The month number in calendar year. Corresponds to _Month is datasets. */
        month?: string;
        /** The quarter number in calendar year. Corresponds to _Quarter in datasets. */
        quarter?: string;
        /** The number of seconds. If the date contains no seconds, value is '0.' Corresponds to _Second in datasets. */
        second?: string;
        /** The week number in calendar year. Corresponds to _Week in datasets. */
        week?: string;
        /** The calendar year. Corresponds to _Year in datasets. */
        year?: string;
    }

    /** The date type */
    export enum ConnectWaveDateType {
        Date,
        DateOnly,
        DateTime
    }

    /** The extended metadata (Xmd) for a dimension in a Tableau CRM dataset. */
    export interface XmdDimension {
        /** The conditional formatting for a dimension. */
        conditionalFormatting?: ConditionalFormattingProperty;
        /** The custom actions linked to this dimension. */
        customActions?: XmdDimensionCustomAction;
        /** Indicates whether the dimension has custom actions enabled (true) or not (false). */
        customActionsEnabled?: boolean;
        /** The default action for the dimension. */
        defaultAction?: string;
        /** The field name of the dimension (used in queries). */
        field?: string;
        /** The display name for the dataset field. Can be up to 40 characters. */
        label?: string;
        /** The URL to open when the user clicks the link in the actions menu. Overrides the default URL link, which is /{{row.recordIdField}}. The default finds the Salesforce record with the record ID specified in the recordIdField Xmd parameter. Must be 255 characters or less. To open a Salesforce record from a multi-org environment, enter {{instanceUrl}} to populate the org URL specified in the organizations section of the Xmd. Example: /{{row.dimensionNameId}}. */
        linkTemplate?: string;
        /** Indicates whether to display the link to open a Salesforce record or URL (true) or not (false). If set to false or not set, the menu doesn't display the Open Record link option. */
        linkTemplateEnabled?: boolean;
        /** The tooltip that a dashboard viewer sees when they hover over the link in a Tableau CRM lens or dashboard. */
        linkTooltip?: string;
        /** Any customizations for specific values of the dataset fields. For example, for the "Country" field, change the label of the "USA" to "United States." And change the color for this value in a chart to blue. Note: When you change the label, the new label only appears in the user interface. You can't use the label in queries, like a query filter. For this, the best practice is to modify the field values when you create the dataset. */
        members?: XmdDimensionMember[];
        /** An ordered list of dimensions and measures. These dataset fields are used to help a dashboard viewer identify a Salesforce record when multiple records match the action. For each field, specify its API name. In some instances, a dimension value is associated with multiple IDs and isn't unique. For example, an opportunity with the name “acme” has multiple opportunity IDs (and records). But the action or link can only be directed to one record. */
        recordDisplayFields?: string[];
        /** The dataset field that contains the record ID of the Salesforce object that you want to perform the action on. */
        recordIdField?: string;
        /** The record organization ID for this dimension. */
        recordOrganizationIdField?: string;
        /** The actions that appear in the action menu. You can only add actions that are defined in the page layouts for the corresponding Salesforce object. If left blank, Tableau CRM shows all actions. */
        salesforceActions?: XmdDimensionSalesforceAction[];
        /** Indicates if the Salesforce actions menu is enabled to appear on the field (true) or not (false). If set to false or not set, the menu doesn't display any actions. */
        salesforceActionsEnabled?: boolean;
        /** Indicates whether the dataset field can be selected from the dashboard designer or explorer when creating dashboards and lenses (true) or not (false). Even if showInExplorer is false, the field can still be used for SAQL queries, manually added in JSON, and accessed using the Tableau CRM REST API. */
        showInExplorer?: boolean;
    }

    /** The extended metadata (Xmd) for a property in the conditional formatting for a Tableau CRM dataset dimension or measure. */
    export interface ConditionalFormattingProperty {
        /** The parameters for different formatting types. */
        parameters?: any;
        /** The reference field the conditional formatting is based on, if any. */
        referenceField?: string;
        /** The conditional formatting type. */
        type?: ConnectWaveConditionalFormattingTypeEnum;
    }

    /** The conditional formatting type. */
    export enum ConnectWaveConditionalFormattingTypeEnum {
        Categories,
        Gradient,
        Multiple,
        Raw,
        Single,
        Static
    }

    /** The extended metadata (Xmd) for a custom action on a Tableau CRM dataset dimension. */
    export interface XmdDimensionCustomAction {
        /** The icon for the custom action. */
        icon?: string;
        /** The method for the custom action. */
        method?: string;
        /** The target for the custom action. */
        target?: string;
        /** The tooltip for the custom action. */
        tooltip?: string;
        /** The URL for the custom action. */
        url?: string;
    }

    /** The extended metadata (Xmd) for a member linked to a dimension in Tableau CRM dataset. */
    export interface XmdDimensionMember {
        /** The color for the member. For example, set to “Blue”. */
        color?: string;
        /** The label for the member. For example, set to “United States”. */
        label?: string;
        /** The member value. For example, set to “USA”. */
        member?: string;
    }

    /** The extended metadata (Xmd) for a Saleforce Action for a dimension in a Tableau CRM dataset. */
    export interface XmdDimensionSalesforceAction {
        /** Indicates whether the action is enabled for a specific dimension. */
        enabled?: boolean;
        /** The name of the action. */
        name?: string;
    }

    /** The extended metadata (Xmd) for a measure in a Tableau CRM dataset. */
    export interface XmdMeasure {
        /** The conditional formatting for the measure. */
        conditionalFormatting?: ConditionalFormattingProperty;
        /** The identifier (API name) for the dataset field. */
        field?: string;
        /** The format details for the measure. */
        format?: XmdMeasureFormat;
        /** The display name for the dataset field. Can be up to 40 characters. For example, “Sales Amount". */
        label?: string;
        /** Indicates whether the dataset field can be selected from the dashboard designer or explorer when creating dashboards and lenses (true) or not (false). Even if showInExplorer is false, the field can still be used for SAQL queries, manually added in JSON, and accessed using the Tableau CRM REST API. */
        showInExplorer?: boolean;
    }

    /** The extended metadata (Xmd) for the format of a measure in a Tableau CRM dataset. */
    export interface XmdMeasureFormat {
        /** When customizing the display, you can add a prefix, suffix, grouping separator, decimal separator, and leading and trailing zeros. You can also configure the number of digits. You can include any characters in prefixes and suffixes, including minus signs or currency symbols. You can use the following symbols to specifying a format. */
        customFormat?: string;
        /** The separators for the thousands and decimal places in the format. */
        delimiters?: NumericSeparators;
        /** The multiplier for the unit. The multiplier changes a field's values by the same factor—like multiplying by 100 to convert decimals to percents. The multiplier must be a positive number. */
        unitMultiplier?: number;
    }

    /** The numeric separators for thousands and decimals, used in formatting. */
    export interface NumericSeparators {
        /** The decimal separator. Default is the .(period) symbol, but it can be customized via the custom format. */
        decimal?: string;
        /** The thousands separator. Default is the ,(comma) symbol, but it can be customized via the custom format. */
        thousands?: string;
    }

    /** The language in which an Xmd is localized. */
    export enum ConnectWaveLanguageEnum {
        bg,
        zh_CN,
        zh_TW,
        hr,
        cs,
        da,
        nl_NL,
        en,
        en_GB,
        fi,
        fr,
        de,
        el,
        hu,
        in,
        it,
        ja,
        ko,
        no,
        pl,
        pt_PT,
        pt_BR,
        ro,
        ru,
        sk,
        sl,
        es,
        es_MX,
        sv,
        th,
        tr,
        uk,
        vi
    }

    /** The extended metadata (Xmd) for an organization in a Tableau CRM dataset. */
    export interface XmdOrganization {
        /** The ID of the org. */
        id?: string;
        /** The org's My Domain login URL in the format https://MyDomainName.my.salesforce.com. */
        instanceUrl?: string;
        /** The display name for the Salesforce org. Can be up to 40 characters. */
        label?: string;
    }

    /** The type of Xmd. */
    export enum ConnectWaveXmdTypeEnum {
        assert,
        main,
        system,
        user
    }

    /**
     * Wire adapter to retrieve a specific Tableau CRM dataset by ID or developer name.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_dataset
     *
     * @param datasetIdOrApiName The ID or developer name of the dataset.
     */
    export function getDataset(datasetIdOrApiName: string): void;

    /** A collection of datasets. */
    export interface DatasetCollectionRepresentation {
        /** The list of datasets available to the current user. */
        datasets?: DatasetRepresentation[];
        /** The URL to retrieve the next page of contents in the collection. */
        nextPageUrl?: string;
        /** The total count of the elements in the collection, including all pages. */
        totalSize?: number;
        /** The URL to retrieve the collection. */
        url?: string;
    }

    /** Wire adapter to retrieve a collection of Tableau CRM datasets.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_datasets
     *
     * @param datasetTypes Filters the collection to include only datasets of one or more of the specified types.
     *                     Valid values are `Default`, `Live`, or `Trended`.
     * @param folderId Filters the collection to only contain datasets for the specified folder. The ID can be the requesting user's ID for
     *                 datasets in the user's private folder.
     * @param hasCurrentOnly Filters the collection of datasets to include only those datasets that have a current version. The default is `false`.
     * @param includeCurrentVersion Specifies if the response should include the current version metadata. The default is `false`.
     * @param licenseType The response includes dataflow jobs with this license type. Valid values are `EinsteinAnalytics` or `Sonic`.
     * @param order Ordering to apply to the collection results. Valid values are `Ascending` or `Descending`.
     * @param page Generated token that indicates the view of datasets to be returned.
     * @param pageSize Number of items to be returned in a single page. Minimum is 1, maximum is 200, and the default is 25.
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string.
     *          If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in
     *          the URI along with any other special characters.
     * @param scope Scope type to apply to the collection results.
     *              Valid values are `CreatedByMe`, `Favorites`, `IncludeAllPrivate`, `Mru` (Most Recently Used), or `SharedWithMe`.
     * @param sort Sort order to apply to the collection results.
     *             Valid values are `CreatedBy`, `CreatedDate`, `LastModified`, `LastQueried`, `LastRefreshed`,
     *             `Mru` (Most Recently Used, last viewed date), `Name`, or `TotalRows`.
     */
    export function getDatasets(
        datasetTypes?: string,
        folderId?: string,
        hasCurrentOnly?: boolean,
        includeCurrentVersion?: boolean,
        licenseType?: string,
        order?: string,
        page?: string,
        pageSize?: number,
        q?: string,
        scope?: string,
        sort?: string,
    ): void;

    /** A Tableau CRM data prep recipe. */
    export interface RecipeRepresentation extends BaseWaveAssetRepresentation {
        /** The list of upconversion details when converting the recipe to R3. */
        conversionDetails?: RecipeConversionDetail[];
        /** The date of the last recipe dataflow update. */
        dataflowLastUpdate?: Date;
        /** The target dataset. */
        dataset?: AssetReference;
        /** The URL to get the recipe's JSON file content (see /wave/recipes/<recipeId>/file for more information). */
        fileUrl?: string;
        /** Specifies the format of the returned recipe. */
        format?: ConnectRecipeFormatTypeEnum;
        /** The URL for the version histories associated with the recipe. */
        historiesUrl?: string;
        /** The Analytics license type. */
        licenseType?: ConnectAnalyticsLicenseTypeEnum;
        /** The next scheduled run of this recipe. */
        nextScheduledDate?: Date;
        /** The target format or system to publish the recipe to. */
        publishingTarget?: ConnectRecipePublishingTargetEnum;
        /** The recipe definition for the Data Prep recipe only. This property isn't supported for Data Prep Classic recipes. */
        recipeDefinition?: RecipeDefinition;
        /** The security predicate of the target dataset. */
        rowLevelSecurityPredicate?: string;
        /** The schedule cron expression for the current dataflow. */
        schedule?: string;
        /** The schedule for the recipe. */
        scheduleAttributes?: ScheduleRepresentation;
        /** The schedule type of the recipe. */
        scheduleType?: ConnectRecipeScheduleTypeEnum;
        /** The dataflow used to upconvert or revert the current recipe. */
        sourceDataflow?: string;
        /** The recipe used to upconvert or revert the current recipe. */
        sourceRecipe?: string;
        /** The status of the recipe. */
        status?: ConnectRecipeStatusEnum;
        /** The target dataflow ID. */
        targetDataflowId?: string;
        /** The collection of validation details for a Data Prep recipe. This property isn't supported for Data Prep Classic recipes. */
        validationDetails?: RecipeValidationDetail[];
    }

    /** The details for the upconversion of a Tableau CRM data prep recipe. */
    export interface RecipeConversionDetail {
        /** The conversion detail ID. */
        conversionDetailId?: number;
        /** The conversion detail message. */
        message?: string;
        /** The name of the node referenced in the conversion detail. */
        nodeName?: string;
        /** The severity of the conversion detail. */
        severity?: ConnectRecipeConversionSeverityEnum;
    }

    /** The schedule type of the recipe. */
    export enum ConnectRecipeScheduleTypeEnum {
        EventDriven,
        TimeDriven
    }

    export enum ConnectRecipeStatusEnum {
        Failure,
        New,
        Queued,
        Running,
        Success,
        Warning
    }

    /** The validation details for a Tableau CRM recipe. */
    export interface RecipeValidationDetail {
        /** The message for the validation detail. */
        message?: string;
        /** The name of the node referenced in the validation detail. */
        nodeName?: string;
        /** The type of node referenced in the validation detail. */
        nodeType?: string;
        /** The severity of the validation detail. */
        severity?: ConnectRecipeValidationSeverityEnum;
        /** The validation action. */
        validationAction?: string;
        /** The validation code. */
        validationCode?: number;
    }

    export interface ConnectRecipeValidationSeverityEnum {
        /** The recipe is non-runnable and can't be saved. */
        Error,
        /** The validation process is stopped. The recipe is non-runnable and can't be saved. */
        Fatal,
        /** The recipe is non-runnable, but can be saved. */
        Warning
    }

    /** The severity of the conversion detail. */
    export enum ConnectRecipeConversionSeverityEnum {
        UserInfo,
        Warning
    }

    /** Recipe format type */
    export enum ConnectRecipeFormatTypeEnum {
        /** Data prep classic */
        R2,
        /** Data prep */
        R3
    }

    /** Publishing target */
    export enum ConnectRecipePublishingTargetEnum {
        /** Publish to dataset */
        Dataset
    }

    /** The definition for a Tableau CRM data prep recipe. Available on for R3 recipes. */
    export interface RecipeDefinition {
        /** The recipe definition name. */
        name?: string;
        /** The map of recipe nodes by name. */
        nodes?: {
            [key: string]: RecipeNodeRepresentation;
        };
        /** The recipe definition version. */
        version?: string;
        /** The recipe definition UI metadata. */
        ui?: any;
    }

    /** Recipe node */
    export interface RecipeNodeRepresentation {
        /** The recipe node action. */
        action?: AggregateNodeRepresentation |
            AppendNodeRepresentation |
            AppendV2NodeRepresentation |
            BucketNodeRepresentation |
            ClusterNodeRepresentation |
            ComputeRelativeNodeRepresentation |
            FormatDateNodeRepresentation |
            DetectSentimentNodeRepresentation |
            DiscoveryNodeRepresentation |
            ExportNodeRepresentation |
            ExtractNodeRepresentation |
            FilterNodeRepresentation |
            FlattenNodeRepresentation |
            FormulaNodeRepresentation |
            JoinNodeRepresentation |
            LoadNodeRepresentation |
            OutputExternalNodeRepresentation |
            PredictValuesNodeRepresentation |
            RecommendationNodeRepresentation |
            SaveNodeRepresentation |
            SchemaNodeRepresentation |
            SplitNodeRepresentation |
            SqlFilterNodeRepresentation |
            TimeSeriesNodeRepresentation |
            TimeSeriesV2NodeRepresentation |
            TypeCastNodeRepresentation |
            UpdateNodeRepresentation;
        /** The schema changes for the node. */
        schema?: SchemaNodeRepresentation;
        /** The input node IDs. */
        sources?: string[];
    }

    export interface AggregateNodeRepresentation {
        /** The parameters for the node. */
        parameters?: AggregateParametersRepresentation;
    }

    export interface AggregateParametersRepresentation {
        /** The list of aggregations for the node. */
        aggregations?: AggregateRepresentation[];
        /** The list of groupings for the node. */
        groupings?: string[];
        /** The aggregate type for the node. */
        nodeType?: RecipeAggregateNodeEnum;
        /** The parent field for the node */
        parentField?: string;
        /** The percentage field for the node */
        percentageField?: string;
        /** The list of pivots for the node. */
        pivots?: PivotRepresentation[];
        /** The self field for the node */
        selfField?: string;
    }

    export interface AggregateRepresentation {
        /** The recipe aggregation type. */
        action?: RecipeAggregateType;
        /** The label for the aggregate. */
        label?: string;
        /** The name for the aggregate. */
        name?: string;
        /** The source for the aggregate. */
        source?: string;
    }

    export enum RecipeAggregateNodeEnum {
        Hierarchical,
        Standard
    }

    export interface PivotRepresentation {
        /** The source for the pivot. */
        source?: string;
        /** The list of values for the pivot. */
        values?: string[];
    }

    export enum RecipeAggregateType {
        Avg,
        Count,
        Maximum,
        Median,
        Minimum,
        StdDev,
        StdDevP,
        Sum,
        Unique,
        Var,
        VarP
    }

    export interface AppendNodeRepresentation {
        /** The parameters for the node. */
        parameters?: AppendParametersRepresentation;
    }

    export interface AppendParametersRepresentation {
        /** The list of mappings for the node. */
        fieldMappings?: AppendMappingRepresentation[];
    }

    export interface AppendMappingRepresentation {
        /** The bottom dataset field. */
        bottom?: string;
        /** The top dataset field. */
        top?: string;
    }

    export interface AppendV2NodeRepresentation {
        /** The parameters for the node. */
        parameters?: AppendParametersRepresentation;
    }

    export interface BucketNodeRepresentation {
        /** The list of parameter fields. */
        fields?: BucketFieldRepresentation[];
    }

    export interface BucketFieldRepresentation {
        /** The bucket field property label. */
        bucketsSetup?: BucketSetupRepresentation;
        /** The bucket field property label. */
        label?: string;
        /** The bucket field property name. */
        name?: string;
        /** The data type to convert to. */
        type?: RecipeDataType;
    }

    export interface BucketSetupRepresentation {
        /** The bucketing algorithm. */
        algorithm?: AbstractBucketAlgorithmRepresentation;
        /** The buckets. */
        buckets?: BucketRepresentation;
        /** The default bucket value. */
        defaultBucketValue?: string;
        /** Indicates whether pass through is enabled (true) or not (false). */
        isPassThroughEnabled?: boolean;
        /** The null bucket value */
        nullBucketValue?: string;
        /** The bucket source fields. */
        sourceField?: BucketSourceFieldRepresentation;
    }

    export enum RecipeDataType {
        DateOnlyType,
        DateTimeType,
        NumberType,
        TextType
    }

    export interface AbstractBucketAlgorithmRepresentation {
        /** The recipe bucketing algorithm type. */
        type?: RecipeBucketAlgorithmType;
    }

    export enum RecipeBucketAlgorithmType {
        TypographicClustering
    }

    export interface BucketRepresentation {
        /** The bucket value. */
        value?: string;
    }

    export interface BucketSourceFieldRepresentation {
        /** The bucket source field name. */
        name?: string;
        /** The data type to convert to. */
        type?: RecipeDataType;
    }

    export interface ClusterNodeRepresentation {
        /** The parameters for the node. */
        parameters?: ClusterParametersRepresentation;
    }

    export interface ClusterParametersRepresentation {
        /** The cluster count. */
        clusterCount?: number;
        /** Indicates whether to find the optimal clusters (true) or (not). */
        findOptimalClusters?: boolean;
        /** Indicates whether to produce scaled columns (true) or (not). */
        produceScaledColumns?: boolean;
        /** The scaling type. */
        scaling?: MeasureScalingTypeEnum;
        /** The source fields. */
        sourceFields?: string[];
        /** The target field. */
        targetField?: RecipeNameLabelRepresentation;
        /** A list of target scaled fields. */
        targetScaledFields?: RecipeNameLabelRepresentation[];
    }

    export enum MeasureScalingTypeEnum {
        MinMaxScaling
    }

    export interface RecipeNameLabelRepresentation {
        /** The label. */
        label?: string;
        /** The name. */
        name?: string;
    }

    export interface ComputeRelativeNodeRepresentation {
        /** The parameters for the node. */
        parameters?: ComputeRelativeParametersRepresentation;
    }

    export interface ComputeRelativeParametersRepresentation {
        /** The formula expression type. */
        expressionType?: RecipeFormulaExpressionType;
        /** The list of formula fields. */
        fields?: SqlFormulaFieldRepresentation[];
        /** The list of sort fields. */
        orderBy?: ComputeRelativeSortParametersRepresentation[];
        /** The list of partition by values. */
        partitionBy?: string[];
    }

    export enum RecipeFormulaExpressionType {
        Legacy,
        Sql
    }

    export interface SqlFormulaFieldRepresentation {
        /** The formula expression */
        formulaExpression?: string;
        /** The formula label. */
        label?: string;
        /** The formula name. */
        name?: string;
        /** The data type to convert to. */
        type?: RecipeDataType;
    }

    export interface ComputeRelativeSortParametersRepresentation {
        /** The sort direction. */
        direction?: RecipeSortOrderEnum;
        /** The field name. */
        fieldName?: string;
    }

    export enum RecipeSortOrderEnum {
        Ascending,
        Descending
    }

    export interface FormatDateNodeRepresentation {
        /** The parameters for the node. */
        parameters?: FormatDateParametersRepresentation;
    }

    export interface FormatDateParametersRepresentation {
        /** The source field. */
        sourceField?: string;
        /** The list of source date formats. */
        sourceFormats?: FormatDatePatternRepresentation[];
        /** The target field. */
        targetField?: RecipeNameLabelRepresentation;
        /** The target date format. */
        targetFormat?: FormatDatePatternRepresentation;
    }

    export interface FormatDatePatternRepresentation {
        /** The construction for the date format. */
        construction?: string;
        /** The list of date format groups. */
        groups?: string[];
        /** The regular expression for the date format. */
        regex?: string;
    }

    export interface DetectSentimentNodeRepresentation {
        /** The parameters for the node. */
        parameters?: DetectSentimentParametersRepresentation;
    }

    export interface DetectSentimentParametersRepresentation {
        /** The output type. */
        outputType?: DetectSentimentOutputTypeEnum;
        /** The sentiment score type. */
        sentimentScore?: SentimentScoreTypeEnum;
        /** The source field. */
        sourceField?: string;
        /** The target field. */
        targetField?: RecipeNameLabelRepresentation;
        /** The collection of target confidence fields. */
        targetSentimentScoreFields?: {
            [key: string]: {
                [key: string]: {
                    RecipeNameLabelRepresentation;
                };
            };
        };
    }

    export enum DetectSentimentOutputTypeEnum {
        Dimension,
        Measure
    }

    export enum SentimentScoreTypeEnum {
        All,
        None
    }

    export interface DiscoveryNodeRepresentation {
        /** The parameters for the node. */
        parameters?: DiscoveryParametersRepresentation;
    }

    export interface DiscoveryParametersRepresentation {
        /** The map of column mappings. */
        columnMapping?: {
            [key: string]: string;
        };
        /** The prediction source. */
        predictSource?: DiscoverySourceRepresentation;
        /** The list of prediction factor fields. */
        predictionFactorFields?: DiscoveryContributorRepresentation[];
        /** The prediction field. */
        predictionField?: RecipeNameLabelRepresentation;
        /** The list of prescription fields. */
        prescriptionFields?: DiscoveryContributorRepresentation[];
    }

    export interface DiscoverySourceRepresentation {
        /** The source name. */
        name?: string;
        /** The source type. */
        type?: string;
    }

    export interface DiscoveryContributorRepresentation {
        /** The discovery field. */
        field?: RecipeNameLabelRepresentation;
        /** The discovery impact. */
        impact?: RecipeNameLabelRepresentation;
    }

    export interface ExportNodeRepresentation {
        /** The parameters for the node. */
        parameters?: ExportParametersRepresentation;
    }

    export interface ExportParametersRepresentation {
        /** The type of the recipe export CSV header row value. */
        csvHeaderRowValueType?: RecipeExportCsvHeaderRowValueType;
        /** The list of fields to select. */
        fields?: string[];
        /** The format of the export. The valid value is CSV. */
        format?: RecipeExportFormat;
        /** The limits to export. */
        limitsPerPart?: ExportLimitsRepresentation;
        /** The user ID with access to the exported data. */
        userId?: string;
    }

    export enum RecipeExportCsvHeaderRowValueType {
        FullyQualifiedName,
        Label
    }

    export enum RecipeExportFormat {
        CSV
    }

    export interface ExportLimitsRepresentation {
        /** The maximum file size for the export partition. */
        maxFileSizeInBytes?: number;
        /** The maximum row count for the export partition. */
        maxRowCount?: number;
    }

    export interface ExtractNodeRepresentation {
        /** The parameters for the node. */
        parameters?: ExtractParametersRepresentation;
    }

    export interface ExtractParametersRepresentation {
        /** The date fields to extract grains for. */
        grainExtractions?: ExtractParameterRepresentation[];
    }

    export interface ExtractParameterRepresentation {
        /** The source field. */
        source?: string;
        /** The list of grain fields. */
        targets?: ExtractFieldRepresentation[];
    }

    export interface ExtractFieldRepresentation {
        /** The extract grain type. */
        grainType?: RecipeDateGrain;
        /** The extract field label. */
        label?: string;
        /** The extract field name. */
        name?: string;
    }

    export enum RecipeDateGrain {
        Day,
        DayEpoch,
        FiscalMonth,
        FiscalQuarter,
        FiscalWeek,
        FiscalYear,
        Hour,
        Minute,
        Month,
        Quarter,
        Second,
        SecondEpoch,
        Week,
        Year
    }

    export interface FilterNodeRepresentation {
        /** The parameters for the node. */
        parameters?: FilterParametersRepresentation;
    }

    export interface FilterParametersRepresentation {
        /** The filter boolean logic. */
        filterBooleanLogic?: string;
        /** The list of filter expressions. */
        filterExpressions?: FilterExpressionRepresentation[];
    }

    export interface FilterExpressionRepresentation {
        /** The field to filter on. */
        field?: string;
        /** The list of operands. */
        operands?: string[];
        /** The operator to use for the filter. */
        operator?: string;
        /** The data type to convert to. */
        type?: RecipeDataType;
    }

    export interface FlattenNodeRepresentation {
        /** The parameters for the node. */
        parameters?: FlattenParametersRepresentation;
    }

    export interface FlattenParametersRepresentation {
        /** Indicates whether to include the self-ID (true) or not (false).. */
        includeSelfId?: boolean;
        /** The multi field. */
        multiField?: FlattenFieldRepresentation;
        /** The parent field. */
        parentField?: string;
        /** The path field. */
        pathField?: FlattenFieldRepresentation;
        /** The self-field. */
        selfField?: string;
    }

    export interface FlattenFieldRepresentation {
        /** Indicates whether the field is a system field (true) or not (false).. */
        isSystemField?: boolean;
        /** The field label. */
        label?: string;
        /** The field name. */
        name?: string;
    }

    export interface FormulaNodeRepresentation {
        /** The parameters for the node. */
        parameters?: FormulaParametersRepresentation;
    }

    export interface FormulaParametersRepresentation {
        /** The formula expression type. */
        expressionType?: RecipeFormulaExpressionType;
    }

    export interface JoinNodeRepresentation {
        /** The parameters for the node. */
        parameters?: JoinParametersRepresentation;
    }

    export interface JoinParametersRepresentation {
        /** The join type. */
        joinType?: RecipeJoinType;
        /** The list of left keys. */
        leftKeys?: string[];
        /** The left qualifier. */
        leftQualifier?: string;
        /** The list of right keys. */
        rightKeys?: string[];
        /** The right qualifier. */
        rightQualifier?: string;
    }

    export enum RecipeJoinType {
        Cross,
        Inner,
        LeftOuter,
        Lookup,
        MultiValueLookup,
        Outer,
        RightOuter
    }

    export interface LoadNodeRepresentation {
        /** The parameters for the node. */
        parameters?: LoadParametersRepresentation;
    }

    export interface LoadParametersRepresentation {
        /** The dataset to load */
        dataset?: LoadDatasetRepresentation;
        /** The list of fields to load. */
        fields?: string[];
        /** The number of rows to load. */
        sampleSize?: number;
    }

    export interface LoadDatasetRepresentation {
        /** The dataset label. */
        label?: string;
        /** The type of the dataset. */
        type?: RecipeDatasetType;
    }

    export enum RecipeDatasetType {
        Analytics,
        Connected
    }

    export interface OutputExternalNodeRepresentation {
        /** The parameters for the node. */
        parameters?: OutputExternalParametersRepresentation;
    }

    export interface OutputExternalParametersRepresentation {
        /** The connection name. */
        connectionName?: string;
        /** The field name for the external ID. */
        externalIdFieldName?: string;
        /** The list of field mappings. */
        fieldsMapping?: OutputExternalFieldMappingRepresentation[];
        /** The name of hyper file. */
        hyperFileName?: string;
        /** The object name. */
        any?: string;
        /** The output external operation type. */
        operation?: RecipeOutputExternalOperation;
    }

    export interface OutputExternalFieldMappingRepresentation {
        /** The name of the source field. */
        sourceField?: string;
        /** The name of the target field. */
        targetField?: string;
    }

    export enum RecipeOutputExternalOperation {
        Empty,
        Insert,
        Update,
        Upsert
    }

    export interface PredictValuesNodeRepresentation {
        /** The parameters for the node. */
        parameters?: PredictValuesParametersRepresentation;
    }

    export interface PredictValuesParametersRepresentation {
        /** The list of fields. */
        fields?: PredictValuesFieldRepresentation[];
    }

    export interface PredictValuesFieldRepresentation {
        /** The label for the field. */
        label?: string;
        /** The name for the field. */
        name?: string;
        /** The self-field . */
        predictionSetup?: PredictValuesSetupRepresentation[];
    }

    export interface PredictValuesSetupRepresentation {
        /** The list of input fields for the model. */
        modelInputFields?: PredictValuesInputFieldRepresentation[];
        /** The source field. */
        sourceField?: PredictValuesInputFieldRepresentation;
    }

    export interface PredictValuesInputFieldRepresentation {
        /** The field name. */
        name?: string;
    }

    export interface RecommendationNodeRepresentation {
        /** The parameters for the node. */
        parameters?: RecommendationParametersRepresentation;
    }

    export interface RecommendationParametersRepresentation {
        /** The customer ID field. */
        custIdField?: string;
        /** Indicates whether to exclude previous recommendations (true) or not (false). */
        excludePreviousRecommendations?: boolean;
        /** The product ID field. */
        productIdField?: string;
        /** The product recommendations field. */
        productRecommendations?: number;
        /** The rating field. */
        ratingField?: string;
        /** The target field. */
        targetField?: RecipeNameLabelRepresentation;
        /** The target rank field. */
        targetRankField?: RecipeNameLabelRepresentation;
        /** The target rating field. */
        targetRatingField?: RecipeNameLabelRepresentation;
        /** Indicates whether to use implicit ratings (true) or not (false). */
        useImplicitRatings?: boolean;
    }

    export interface SaveNodeRepresentation {
        /** The parameters for the node. */
        parameters?: SaveParametersRepresentation;
    }

    export interface SaveParametersRepresentation {
        /** The dataset to save. */
        dataset?: SaveDatasetRepresentation;
        /** The list of fields to save. */
        fields?: string[];
    }

    export interface SaveDatasetRepresentation {
        /** The Analytics folder for the dataset. */
        folderName?: string;
        /** Indicates whether the data is staged (true) or not (false). */
        isStaged?: boolean;
        /** The label for the dataset. */
        label?: string;
        /** The name of the dataset. */
        name?: string;
        /** The security predicate. */
        rowLevelSecurityFilter?: string;
        /** The sObject security sharing source. */
        rowLevelSharingSource?: string;
        /** The type of the dataset. */
        type?: string;
    }

    export interface SchemaNodeRepresentation {
        /** The schema fields for the node. */
        fields?: SchemaParametersRepresentation[];
        /** The schema slice definition for the node. */
        slice?: SchemaSliceRepresentation[];
    }

    export interface SchemaParametersRepresentation {
        /** The schema fields for the node. */
        fields?: SchemaFieldRepresentation[];
        /** The schema slice definition for the node. */
        slice?: SchemaSliceRepresentation;
    }

    export interface SchemaFieldRepresentation {
        /** The value to output on error. */
        errorValue?: string;
        /** The schema field name. */
        name?: string;
        /** The new schema field properties. */
        newProperties?: SchemaFieldNewPropertiesRepresentation;
    }

    export interface SchemaFieldNewPropertiesRepresentation {
        /** The schema field property label. */
        label?: string;
        /** The schema field property name. */
        name?: string;
        /** The new schema field type properties. */
        typeProperties?: SchemaFieldTypePropertiesRepresentation;
    }

    export interface SchemaFieldTypePropertiesRepresentation {
        /** The DateTime format. */
        format?: string;
        /** The total length of the text. */
        length?: number;
        /** The length of an arbitrary precision value. */
        precision?: number;
        /** The number of digits to the right of the decimal point. */
        scale?: number;
        /** The number format. */
        symbols?: SchemaFieldFormatSymbolsRepresentation;
        /** The data type to convert to. */
        type?: RecipeDataType;
    }

    export interface SchemaFieldFormatSymbolsRepresentation {
        /** The currency symbol format. */
        currencySymbol?: string;
        /** The decimal symbol format. */
        decimalSymbol?: string;
        /** The grouping symbol format. */
        groupingSymbol?: string;
    }

    export interface SchemaSliceRepresentation {
        /** The list of fields for SELECT or DROP. */
        fields?: string[];
        /** Indicates whether the node action ignores missing fields (true) or not (false). */
        ignoreMissingFields?: boolean;
        /** The slice mode. */
        mode?: 'SELECT' | 'DROP';
    }

    export interface SplitNodeRepresentation {
        /** The parameters for the node. */
        parameters?: SplitParametersRepresentation;
    }

    export interface SplitParametersRepresentation {
        /** The split delimiter. */
        delimiter?: string;
        /** The source field. */
        sourceField?: string;
        /** The list of target fields. */
        targetFields?: RecipeNameLabelRepresentation[];
    }

    export interface SqlFilterNodeRepresentation {
        /** The parameters for the node. */
        parameters?: SqlFilterParametersRepresentation;
    }

    export interface SqlFilterParametersRepresentation {
        /** The SQL filter expression. */
        sqlFilterExpression?: string;
    }

    export interface TimeSeriesNodeRepresentation {
        /** The parameters for the node. */
        parameters?: TimeSeriesParametersRepresentation;
    }

    export interface TimeSeriesParametersRepresentation {
        /** The confidence interval. */
        confidenceInterval?: RecipeTimeSeriesConfidenceIntervalType;
        /** The confidence interval field name and labels. */
        confidenceIntervalFields?: {
            [key: string]: TimeSeriesOutputConfidenceIntervalHighLow;
        };
        /** The day field. */
        dayField?: string;
        /** The list of forecast fields. */
        forecastFields?: string[];
        /** The forecast length. */
        forecastLength?: number;
        /** The value to group dates by. */
        groupDatesBy?: RecipeGroupDatesBy;
        /** Indicates whether to ignore the last time period (true) or not (false). */
        ignoreLastTimePeriod?: boolean;
        /** The time series model. */
        model?: RecipeTimeSeriesModel;
        /** The seasonality. */
        seasonality?: number;
        /** The sub year field. */
        subYearField?: string;
        /** The target date field. */
        targetDateField?: RecipeNameLabelRepresentation;
        /** The list of target forecast fields. */
        targetForecastFields?: RecipeNameLabelRepresentation[];
        /** The year field. */
        yearField?: string;
    }

    export enum RecipeTimeSeriesConfidenceIntervalType {
        Eighty,
        NinetyFive,
        None
    }

    export interface TimeSeriesOutputConfidenceIntervalHighLow {
        /** The high confidence interval. */
        high?: RecipeNameLabelRepresentation;
        /** The low confidence interval. */
        low?: RecipeNameLabelRepresentation;
    }

    export enum RecipeGroupDatesBy {
        Year,
        YearMonth,
        YearMonthDay,
        YearQuarter,
        YearWeek
    }

    export enum RecipeTimeSeriesModel {
        Additive,
        Auto,
        Multiplicative
    }

    export interface TimeSeriesV2NodeRepresentation {
        /** The parameters for the node. */
        parameters?: TimeSeriesV2ParametersRepresentation;
    }

    export interface TimeSeriesV2ParametersRepresentation {
        /** The forecast algorithm. */
        algorithm?: TimeSeriesV2ForecastAlgorithmEnum;
        /** The parameters for the algorithm. */
        algorithmParameters?: TimeSeriesV2AlgorithmParametersRepresentation;
        /** The confidence interval. */
        confidenceInterval?: RecipeTimeSeriesConfidenceIntervalType;
        /** The forecast date field. */
        forecastDateField?: string;
        /** The value to group dates by. */
        forecastDatesBy?: RecipeGroupDatesBy;
        /** The list of forecast fields. */
        forecastFields?: TimeSeriesV2ForecastInfoRepresentation[];
        /** The forecast length. */
        forecastLength?: number;
        /** The forecast length type. */
        forecastLengthType?: TimeSeriesV2ForecastLengthTypeEnum;
        /** The list of partition groupings. */
        groupingFields?: ExtractParameterRepresentation[];
        /** The partial data handling value. */
        partialDataHandling?: TimeSeriesV2PartialDataHandlingEnum;
        /** The target date field. */
        targetDateField?: RecipeNameLabelRepresentation;
    }

    export enum TimeSeriesV2ForecastAlgorithmEnum {
        HoltWinters
    }

    export interface TimeSeriesV2AlgorithmParametersRepresentation {
        /** The time series model. */
        model?: RecipeTimeSeriesModel;
        /** The seasonality value. */
        seasonality?: number;
    }

    export interface TimeSeriesV2ForecastInfoRepresentation {
        /** The aggregate data. */
        aggregate?: AggregateRepresentation;
        /** The confidence interval field name and labels. */
        confidenceIntervalFields?: TimeSeriesOutputConfidenceIntervalHighLow;
        /** The aggregate data. */
        forecastField?: RecipeNameLabelRepresentation;
    }

    export enum TimeSeriesV2ForecastLengthTypeEnum {
        Rolling
    }

    export enum TimeSeriesV2PartialDataHandlingEnum {
        IgnoreLast,
        None
    }

    export interface TypeCastNodeRepresentation {
        /** The parameters for the node. */
        parameters?: TypecastParametersRepresentation;
    }

    export interface TypecastParametersRepresentation {
        /** The list of fields to typecast. */
        fields?: SchemaFieldRepresentation[];
    }

    export interface UpdateNodeRepresentation {
        /** The parameters for the node. */
        parameters?: UpdateParametersRepresentation;
    }

    export interface UpdateParametersRepresentation {
        /** The list of left keys. */
        leftKeys?: string[];
        /** The right of left keys. */
        rightKeys?: string[];
        /** The map of columns to update. */
        updateColumns?: {
            [key: string]: string;
        };
    }

    /**
     * Wire adapter to retrieve a specific Tableau CRM data prep recipe by ID.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_recipe
     *
     * @param id The ID of the recipe.
     * @param format Specifies the format of the returned recipe. Valid values are `R2 or `R3`. The default is `R3`.
     */
    export function getRecipe(
        id: string,
        format?: string
    ): void;

    /** A collection of Tableau CRM data prep recipes. */
    export interface RecipeCollectionRepresentation {
        /** The URL to retrieve the next page of contents in the collection. */
        nextPageUrl?: string;
        /** A list of recipes. */
        recipes?: RecipeRepresentation[];
        /** The total count of the elements in the collection, including all pages. */
        totalSize?: number;
        /** The URL to retrieve the collection. */
        url?: string;
    }

    /**
     * Wire adapter to retrieve a collection of Tableau CRM data prep recipes.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_recipes
     *
     * @param format Filters the collection to include only recipes of the specified format. Valid values are `R2` or `R3`.
     * @param licenseType The response includes dataflow jobs with this license type. Valid values are `EinsteinAnalytics` or `Sonic`.
     * @param page Generated token that indicates the view of recipes to be returned.
     * @param pageSize Number of items to be returned in a single page. Minimum is 1, maximum is 200, and the default is 25.
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string.
     *          If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in
     *          the URI along with any other special characters.
     * @param sort Sort order to apply to the collection results.
     *             Valid values are `LastModified`, `LastModifiedBy`, `Mru` (Most Recently Used, last viewed date), or `Name`.
     */
    export function getRecipes(
        format?: string,
        licenseType?: string,
        page?: string,
        pageSize?: number,
        q?: string,
        sort?: string
    ): void;

    /** A notification for a Tableau CRM data prep recipe. */
    export interface RecipeNotificationRepresentation {
        /** The number of minutes that a recipe can run before sending an alert. */
        longRunningAlertInMins?: number;
        /** Valid types of email notification levels. */
        notificationLevel?: ConnectEmailNotificationLevelEnum;
        /** The recipe this notification belongs to. */
        recipe?: AssetReference;
    }

    /** Email notification levels. */
    export enum ConnectEmailNotificationLevelEnum {
        Always,
        Failures,
        Never,
        Warnings
    }

    /**
     * Returns the Tableau CRM recipe notification settings by recipe ID.
     * @param recipeId the recipe ID
     */
    export function getRecipeNotification(recipeId: string): void;

    /**
     * Wire adapter to retrieve a specific Tableau CRM replicated dataset by ID.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_replicated_dataset
     *
     * @param id The ID of the replicated dataset.
     */
    export function getReplicatedDataset(id: string): void;

    /** A collection of Tableau CRM replicated datasets, also known as connected objects. */
    export interface ReplicatedDatasetCollectionRepresentation {
        /** A list of connected objects. */
        replicatedDatasets?: ReplicatedDatasetRepresentation[];
        /** The URL to get the collection. */
        url?: string;
    }

    /**
     * Wire adapter to retrieve a collection of Tableau CRM replicated datasets, also known as connected objects.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_replicated_datasets
     *
     * @param category Filters the collection to include only connected objects of the specified category. Valid values are `Input` or `Output`.
     * @param connector Filters the collection to include only connected objects belonging to the specified Tableau CRM connector.
     * @param sourceObject Filters the collection to include only connected objects belonging to the specified source object.
     */
    export function getReplicatedDatasets(
        category?: string,
        connector?: string,
        sourceObject?: string
    ): void;

    /**
     * Wire adapter to retrieve a list of fields for the specified connected object.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_replicated_fields
     *
     * @param id The ID of the replicated dataset.
     */
    export function getReplicatedFields(id: string): void;

    /**
     * Wire adapter to retrieve a schedule for a Tableau CRM recipe, dataflow, or data sync.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_schedule
     *
     * @param assetId The ID of the dataflow, recipe, or data sync.
     */
    export function getSchedule(assetId: string): void;

    /** A collection of Tableau CRM folders. */
    export interface WaveFolderCollectionRepresentation {
        /** A list of folders or applications. */
        folders?: WaveFolderRepresentation[];
        /** The URL for the next page of content in the collection. */
        nextPageUrl?: string;
        /** The total count of the elements in the collection. */
        totalSize?: number;
        /** The URL for the collection. */
        url?: string;
    }

    /** A Tableau CRM folder. */
    export interface WaveFolderRepresentation extends BaseWaveAssetRepresentation {
        /** The application log from the creation or upgrade of the application. */
        appLog?: AppLog;
        /** The creation status of application. */
        applicationStatus?: ConnectWaveApplicationStatusEnum;
        /** The id's of the files attached to the Tableau CRM folder */
        attachedFiles?: AssetReference[];
        /** Indicates whether this app can be shared with Experience Cloud site users (true) or not (false). */
        canBeSharedExternally?: boolean;
        /** The default dashboard or lens that is presented when the app is viewed in App Runtime mode. */
        defaultAsset?: AssetReference;
        /** The map of featured assets for this application to be used in the UI. */
        featuredAssets?: {
            [key: string]: FeaturedAssets;
        }
        /** The asset icon. */
        icon?: AssetReference;
        /** Indicates whether this app is pinned (true) or not (false). */
        isPinned?: boolean;
        /** The folder shares list. */
        shares?: WaveFolderShare[];
        /** The options used on the last action performed on a templated Tableau CRM application. */
        templateOptions?: TemplateOptions;
        /** The source template ID or api name used to create the folder or application. */
        templateSourceId?: string;
        /** The map of template values used to create or update the folder or application. */
        templateValues?: {
            [key: string]: any;
        };
        /** The version of the template this application was created from. */
        templateVersion?: string;
    }

    /** The app log for app creation and updates. */
    export interface AppLog {
        /** A log message entry. */
        message?: string;
    }

    /** Application status */
    export enum ConnectWaveApplicationStatusEnum {
        CancelledStatus,
        CompletedStatus,
        DataflowInProgressStatus,
        ExtensionAssetTypeInProgressStatus,
        FailedStatus,
        InProgressStatus,
        NewStatus
    }

    /** The featured assets */
    export interface FeaturedAssets {
        /** The list of featured assets. */
        assets?: TypedAssetReference[];
    }

    /** A typed Tableau CRM asset reference. */
    export interface TypedAssetReference {
        /** The asset type */
        type?: ConnectWaveAssetTypeEnum;
    }

    /** Asset type */
    export enum ConnectWaveAssetTypeEnum {
        Collection,
        Component,
        Dashboard,
        DashboardSnapshot,
        DataConnector,
        Dataflow,
        DataflowJob,
        DataflowJobNode,
        Dataset,
        DatasetShard,
        DatasetVersion,
        ExternalData,
        Folder,
        Lens,
        LightningComponent,
        OaDashboard,
        OaDashboardFolder,
        Recipe,
        RecipeModel,
        ReplicatedDataset,
        Report,
        ReportFolder,
        Story,
        Widget,
        Workflow
    }

    /** A Tableau CRM folder sharing rule. */
    export interface WaveFolderShare {
        /** The access type. */
        accessType?: ConnectWaveAccessTypeEnum;
        /** The URL of the user image. */
        imageUrl?: string;
        /** The share type. */
        shareType?: ConnectWaveShareTypeEnum;
        /** The ID of the user with the share representation. */
        sharedWithId?: string;
        /** The label for the shared user, group, or org. */
        sharedWithLabel?: string;
    }

    /** Access type. */
    export enum ConnectWaveAccessTypeEnum {
        Edit,
        Manage,
        View
    }

    /** Share type. */
    export enum ConnectWaveShareTypeEnum {
        AllCspUsers,
        AllPrmUsers,
        CustomerPortalUser,
        Group,
        Organization,
        PartnerUser,
        PortalRole,
        PortalRoleAndSubordinates,
        Role,
        RoleAndSubordinates,
        User
    }

    /** The template options used on the last action performed on a templated Tableau CRM app. */
    export interface TemplateOptions {
        /** The last template action performed on the templated application. */
        appAction?: ConnectWaveTemplateAppActionEnum;
        /** The date and time the last action was performed. */
        appActionDate?: Date;
        /** The user that performed the last action. */
        appActionUser?: WaveUserRepresentation;
        /** A map of dynamic template options that can change from release to release. */
        dynamicOptions?: {
            [key: string]: any;
        }
    }

    /** Template app action. */
    export enum ConnectWaveTemplateAppActionEnum {
        Create,
        Decouple,
        Overlay,
        Upgrade
    }

    /**
     * Retrieves a specific CRM Analytics app or folder.
     *
     * @param disableMru Indicates whether to update the MRU (true) or not (false). The default is false.
     * @param mobileOnlyFeaturedAssets Filters the response to only return a folder which contain dashboards that are
     * enabled for the CRM Analytics mobile app (true) or not (false). The default is false.
     */
    export function getWaveFolder(
        disableMru?: boolean,
        mobileOnlyFeaturedAssets?: boolean
    ): void

    /**
     * Wire adapter to retrieve a collection of Tableau CRM apps or folders.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_wave_folders
     *
     * @param isPinned Filters the collection to include only folders which are pinned (`true`) or not (`false`). The default is `false`.
     * @param mobileOnlyFeaturedAssets Filters the collection to only contain folders which contain dashboards that are enabled for the
     *                                 Tableau CRM mobile app. The default is `false`.
     * @param page Generated token that indicates the view of folders to be returned.
     * @param pageSize Number of items to be returned in a single page. Minimum is 1, maximum is 200, and the default is 25.
     * @param q Search terms. Individual terms are separated by spaces. A wildcard is automatically appended to the last token in the query string.
     *          If the user's search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in
     *          the URI along with any other special characters.
     * @param scope Scope type to apply to the collection results.
     *              Valid values are `CreatedByMe`, `Favorites`, `IncludeAllPrivate`, `Mru` (Most Recently Used), or `SharedWithMe`.
     * @param sort Sort order to apply to the collection results.
     *             Valid values are `LastModified`, `LastModifiedBy`, `Mru` (Most Recently Used, last viewed date), or `Name`.
     * @param templateSourceId Filters the collection to include only folders that are created from a specific template source
     */
    export function getWaveFolders(
        isPinned?: boolean,
        mobileOnlyFeaturedAssets?: boolean,
        page?: string,
        pageSize?: number,
        q?: string,
        scope?: string,
        sort?: string,
        templateSourceId?: string,
    ): void;

    /**
     * Wire adapter to retrieve a specific Tableau CRM extended metadata type (Xmd) for a version of a dataset.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_wire_adapters_get_xmd
     *
     * @param datasetIdOrApiName The ID or developer name of the dataset.
     * @param versionId The ID of the dataset version.
     * @param xmdType The xmd type. Valid values are `Asset`, `Main`, `System`, or `User`.
     */
    export function getXmd(
        datasetIdOrApiName: string,
        versionId: string,
        xmdType: string
    ): void;

    /**
     * Wire adapter to trigger the Tableau CRM connector to run a data sync. This API is the equivalent of the “Run Now” UI feature.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_ingest_data_connector
     *
     * @param connectorIdOrApiName The ID or developer name of the dataset.
     * @return A promise that will resolve to the ingest data connector response.
     */
    export function ingestDataConnector({connectorIdOrApiName}: {
        connectorIdOrApiName: string
    }): Promise<RestoreDatasetVersionRepresentation>;

    /** The base Analytics folder asset. */
    export interface BaseWaveFolderInput {
        /** The icon enumeration that best represents the new folder or application. Valid values are 1.png through 20.png. */
        assetIcon?: string;
        /** The description of the folder or application. */
        description?: string;
        /** The user-facing name of the folder or application. */
        label?: string;
        /** The internal API name of the new folder or application. */
        name?: string;
    }

    /** An Analytics folder. */
    export interface WaveFolderInput extends BaseWaveFolderInput {
        /** The creation status of application. */
        applicationStatus?: ConnectWaveApplicationStatusEnum;
        /** The list of attached file IDs. */
        attachedFiles?: AssetReferenceInput[];
        /** Indicates whether the app is shared in Communities (true) or not (false). */
        canBeSharedExternally?: boolean;
        /** The default dashboard or lens presented for this app during app runtime. */
        defaultAsset?: AssetReferenceInput;
        /** The map of featured assets for this application to be used in the UI. */
        featuredAssets?: Map<string, FeaturedAssets>;
        /** Indicates whether the app is a pinned app (true) or not (false). */
        isPinned?: boolean;
        /** The folder shares list. */
        shares?: WaveFolderShare[];
    }

    /** A templated Analytics folder. */
    export interface WaveFolderTemplateInput extends BaseWaveFolderInput {
        templateOptions?: TemplateInput;
    }

    /** An Analytics template. */
    export interface TemplateInput extends BaseAssetInputRepresentation {
        /** The asset version to set for this template. Only used on template update. */
        assetVersion?: number;
        /** A list of data transform IDs to include in the template. Data transforms bring data from Data Cloud into Analytics. */
        dataTransformIds?: string[];
        /** The dataflow associated with this app. */
        dataflow?: AssetReferenceInput;
        /** The folder that this template is created from. */
        folderSource: AssetReferenceInput;
        /** A list of recipe IDs to include in the template. Recipes with datasets are automatically included using the dataset to folder connection. This list is for recipes without datasets. */
        recipeIds?: string[];
    }

    /** An Analytics folder schedule. */
    export interface WaveFolderSchedule {
        /** The reoccurring schedule for performing data refresh for an Analytics app. */
        dataRefreshSchedule?: ScheduledItem;
        /** The URL of the schedule. */
        url: string;
    }

    /** The base schedule for a data refresh. */
    export interface ScheduledItem {
        /** Frequency on which this schedule is run. */
        frequency?: ConnectScheduleFrequencyTypeEnum;
        /** The next scheduled time for this schedule. */
        nextScheduledRun?: Date;
        /** The scheduled run time. */
        time?: ScheduledTime;
    }

    /** The daily schedule for a data refresh. */
    export interface DailyScheduledItem extends ScheduledItem {
    }

    /** The weekly schedule for a data refresh. */
    export interface WeeklyScheduledItem extends ScheduledItem {
        /** Days of the week on which the schedule runs. */
        daysOfWeek?: ConnectJsonXformDayOfWeekEnum[];
    }

    export enum ConnectJsonXformDayOfWeekEnum {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }

    export enum ConnectScheduleFrequencyTypeEnum {
        /** Run once per day */
        Daily,
        /** Run on one or more specific numeric days per month */
        Monthly,
        /** Run on one or more relative days for month */
        MonthlyRelative,
        /** Run on one or more days each week */
        Weekly
    }

    /** The base schedule for a data refresh. */
    export interface ScheduledTime {
        /** The hour at which this schedule is run (0-23). */
        hour?: number;
        /** The minute at which this schedule is run (0-59). */
        minute?: number;
        /** The time zone of the hour at which the schedule is run. */
        timeZone?: ScheduledTimeZone;
    }

    /** The information for a schedule time zone. */
    export interface ScheduledTimeZone {
        /** The signed offset, in hours, from GMT. */
        gmtOffset?: number;
        /** The display name of this time zone. */
        name?: string;
        /** The id of this time zone. */
        zoneId?: string;
    }

    /** An Analytics folder. */
    export interface WaveFolder {
        /** The application log from the creation or upgrade of the application. */
        appLog?: AppLog;
        /** The creation status of application. */
        applicationStatus?: ConnectWaveApplicationStatusEnum;
        /** The id's of the files attached to the Analytics folder */
        attachedFiles?: AssetReference[];
        /** Indicates whether this app can be shared with Experience Cloud site users (true) or not (false). */
        canBeSharedExternally?: boolean;
        /** The default dashboard or lens that is presented when the app is viewed in App Runtime mode. */
        defaultAsset?: AssetReference;
        /** The map of featured assets for this application to be used in the UI. */
        featuredAssets?: Map<string, FeaturedAssets>;
        /** The asset icon. */
        icon?: AssetReference;
        /** The URL to the app's installation history. */
        installationHistoryUrl?: string;
        /** Indicates whether this app is pinned (true) or not (false). */
        isPinned?: boolean;
        /** The reoccurring schedule for app related tasks, like data refresh. */
        schedule?: Map<string, WaveFolderSchedule>;
        /** The folder shares list. */
        shares?: WaveFolderShare[];
        /** The options used on the last action performed on a templated Analytics application. */
        templateOptions?: TemplateOptions;
        /** The source template ID or api name used to create the folder or application. */
        templateSourceId?: string;
        /** The map of template values used to create or update the folder or application. */
        templateValues?: {
            [key: object]: object;
        };
        /** The version of the template this application was created from. */
        templateVersion?: string;
    }

    /**
     * Creates a CRM Analytics folder.
     *
     * https://developer.salesforce.com/docs/platform/lwc/guide/reference-analytics-post-wave-folders.html
     *
     * @param waveFolder The folder to create.
     * @return A Promise object that resolves with the Wave Folder response.
     */
    export function postWaveFolders({waveFolder}: { waveFolder: BaseWaveFolderInput }): Promise<WaveFolder>;

    /**
     * Wire adapter to updates Tableau CRM connectors.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_update_data_connector
     *
     * @param connectorIdOrApiName The ID or developer name of the dataset.
     * @param dataConnector Properties for the connector.
     * @param dataConnector.connectionProperties Connection properties for the connector.
     * @param dataConnector.connectorHandler Third party driver used for connection.
     * @param dataConnector.connectorType The type of the Data Connector.
     * @param dataConnector.folder Folder for the Live connector.
     * @param dataConnector.targetConnector AssetReference containing ID or API name of target connector associated with the current source connector.
     * @return A promise that will resolve to the data connector response.
     */
    export function updateDataConnector(
        {
            connectorIdOrApiName,
            dataConnector,
        }: {
            connectorIdOrApiName: string;
            dataConnector: DataConnectorInputRepresentation;
        }
    ): Promise<DataConnectorRepresentation>;

    /**
     * Updates a Tableau CRM dataflow job, which is the equivalent of clicking Stop for a data prep recipe, a data sync, or a dataflow in the Tableau CRM Data Manager UI.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_update_dataflow_job
     *
     * @param dataflowJobId The dataflow job ID.
     * @param dataflowJob Properties of the job.
     * @param dataflowJob.command The job command to execute. Must be `stop` to update a dataflow job.
     * @return A promise that will resolve to the dataflow job response.
     */
    export function updateDataflowJob(
        {
            dataflowJobId,
            dataflowJob,
        }: {
            dataflowJobId: string;
            dataflowJob: DataflowJobInputRepresentation;
        }
    ): Promise<DataflowJobRepresentation>;

    /**
     * Performs a partial a specific CRM Analytics folder by ID.
     *
     * https://developer.salesforce.com/docs/platform/lwc/guide/reference-analytics-update-partial-wave-folder.html
     *
     * @param folderId The ID of the folder.
     * @param folder The folder to update.
     * @return A Promise object that resolves with the Wave Folder response.
     */
    export function updatePartialWaveFolder(
        {
            folderId,
            folder
        }: {
            folderId: string,
            folder: BaseWaveFolderInput
        }
    ): Promise<WaveFolder>;

    /**
     * Updates the existing Tableau CRM recipe notification settings by recipe ID.
     * @param id the recipe ID
     */
    export function updateRecipeNotification({id}: { id: string; }): Promise<any>;

    /**
     * Wire adapter to update the Tableau CRM replicated dataset.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_update_replicated_dataset
     *
     * @param id The ID of the replicated dataset.
     * @param replicatedDataset Properties of the replicated dataset.
     * @param replicatedDataset.advancedProperties List of user-specified advanced properties associated with this.
     * @param replicatedDataset.connectionMode Connection mode for pulling the data from the replicated dataset.
     * @param replicatedDataset.connectorId The id of the connector object used to replicate.
     * @param replicatedDataset.fullRefresh Whether to perform a one-time full refresh (during the next run) as opposed to incremental.
     * @param replicatedDataset.passThroughFilter Passthrough filter for the replicated object.
     * @param replicatedDataset.rowLevelSharing Inherit row level sharing rules for this object.
     * @param replicatedDataset.sourceObjectName The name of the source object to be replicated.
     * @return A promise that will resolve to the replicated dataset response.
     */
    export function updateReplicatedDataset(
        {
            id,
            replicatedDataset,
        }: {
            id: string;
            replicatedDataset: ReplicatedDatasetInputRepresentation;
        }
    ): Promise<ReplicatedDatasetRepresentation>;

    /**
     * Wire adapter to update the Tableau CRM replicated fields.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_update_replicated_dataset_fields
     *
     * @param id The ID of the replicated dataset.
     * @param replicatedFields Properties of the replicated dataset fields.
     * @param replicatedFields.fields A list of configuration metadata that specifies how to replicate each field of a Replicated Dataset.
     * @return A promise that will resolve to the replicated fields response.
     */
    export function updateReplicatedFields(
        {
            id,
            replicatedFields,
        }: {
            id: string;
            replicatedFields: ReplicatedFieldCollectionInputRepresentation;
        }
    ): Promise<ReplicatedFieldCollectionRepresentation>;

    /**
     * Updates the schedule for a Tableau CRM data prep recipe, data sync, or dataflow.
     *
     * https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_analytics_update_schedule
     *
     * @param assetId The ID of the dataflow, recipe, or data sync.
     * @param schedule The schedule to create or update for the dataflow, recipe, or data sync. Use a
     *                 {@link https://developer.salesforce.com/docs/atlas.en-us.bi_dev_guide_rest.meta/bi_dev_guide_rest/bi_resources_appendix.htm#ScheduleInputRepresentation|ScheduleInputRepresentation}.
     *                 Schedules are hourly, daily, weekly, monthly (relative), monthly (specific), and event based.
     * @return A promise that will resolve to the schedule response.
     */
    export function updateSchedule(
        {
            assetId,
            schedule,
        }: {
            assetId: string;
            schedule: ScheduleInputRepresentation;
        }
    ): Promise<
        | DailyScheduleRepresentation
        | EmptyScheduleRepresentation
        | EventDrivenScheduleRepresentation
        | HourlyScheduleRepresentation
        | MinutelyScheduleRepresentation
        | MonthlyRelativeScheduleRepresentation
        | MonthlySpecificScheduleRepresentation
        | WeeklyScheduleRepresentation
    >;

    /**
     * Retrieves a collection of Salesforce actions available to a CRM Analytics user.
     *
     * @param entityId The ID of the CRM Analytics user.
     */
    export function getActions(entityId: string): void;

    /** A collection of Salesforce actions available to the user. */
    export interface ActionRepresentationCollection {
        /** The list of Salesforce actions for the current user. */
        actions: ActionRepresentation[];
    }

    /** A Salesforce action */
    export interface ActionRepresentation {
        /** The API name of the action. */
        apiName?: string;
        /** The icon URL of the action. */
        iconUrl?: string;
        /** The label of the action. */
        label?: string;
        /** The primary color of the action. */
        primaryColor?: string;
        /** The sub type of the action. */
        subType?: string;
    }

    /**
     *  Retrieves a specific CRM Analytics dataset version by dataset ID or developer name and version ID.
     *
     *  @param datasetIdOrApiName The ID or developer name of the dataset.
     *  @param versionId The ID of the dataset version.
     */
    export function getDatasetVersion(
        datasetIdOrApiName: string,
        versionId: string
    ): void;

    /** A specific version of an Analytics dataset. */
    export interface DatasetVersionRepresentation extends BaseWaveAssetRepresentation {
        /** A reference to the dataset. */
        dataset?: AssetReference;
        /** The list of information about the data files that make up the dataset version. */
        files?: WaveFileMetadata[];
        /** The URL of the files resource for this dataset version. */
        filesUrl?: string;
        /** The row-level security predicate. Only returned if the predicate is set in the input request. */
        predicate?: string;
        /** The version of the row-level security predicate. Only returned if the predicate is set in the input request. */
        predicateVersion?: number;
        /** The dataset sharing inheritance coverage information resource. */
        securityCoverageUrl?: string;
        /** The entity from which sharing rules will be inherited for the dataset version. */
        sharingSource?: AssetReference;
        /** The parent dataflow or file for the dataset version.. */
        source?: AssetReference;
        /** The total number of rows for the dataset version. */
        totalRows?: number;
        /** The total number of rows for the dataset version. */
        totalRowCount?: number;
        /** The Xmd for this dataset version. */
        xmdMain?: XmdRepresentation;
        /** The URL of the Xmd collection resource for this dataset version. */
        xmdsUrl?: string;
    }

    /** The metadata for an Analytics file. */
    export interface WaveFileMetadata {
        /** The user that created the file. */
        createdBy?: WaveUserRepresentation;
        /** The created date of the file. */
        createdDate?: Date;
        /** The 18 character file ID. */
        id?: string;
        /** The last accessed date of the file. */
        lastAccessedDate?: Date;
        /** The last modified date of the file. */
        lastModifiedDate?: Date;
        /** The size of the binary file. */
        length?: number;
        /** The name of the file. */
        name?: string;
        /** The URL of the file. */
        url?: string;
    }

    /**
     * Retrieves a list of CRM Analytics dataset versions for a specific dataset.
     *
     * @param datasetIdOrApiName The ID or developer name of the dataset.
     */
    export function getDatasetVersions(datasetIdOrApiName: string): void;

    /** A collection of versions for an Analytics dataset. */
    export interface DatasetVersionCollectionRepresentation {
        /** The URL to retrieve the collection. */
        url?: string;
        /** The collection of dataset versions for a particular dataset. */
        versions?: DatasetVersionRepresentation[];
    }

    /**
     * Returns the dependencies for an asset. The dependencies resource returns only assets for which the user has view access.
     *
     * @param assetId The ID of the CRM Analytics asset.
     */
    export function getDependencies(assetId: string): void;

    /** A collection of Analytics asset dependencies. */
    export interface DependencyCollectionRepresentation {
        /** The list of dependencies for an asset. */
        dependencies?: DependencyRepresentation[];
        /** The total count of the dependencies. */
        totalSize?: number;
    }

    /** An Analytics asset dependency. */
    export interface DependencyRepresentation {
        /** The sharing URL for an asset. */
        assetSharingUrl?: string;
        /** The components that depend on the asset. */
        components?: DependencyCollectionRepresentation;
        /** The dashboards that depend on the asset. */
        dashboards?: DependencyCollectionRepresentation;
        /** The datasets that depend on the asset. */
        datasets?: DependencyCollectionRepresentation;
        /** The folder containing the asset. */
        folder?: AssetReference;
        /** The 18-character asset ID. */
        id?: string;
        /** The time at which the asset was last accessed. */
        lastAccessedDate?: Date;
        /** The user who last modified the asset. */
        lastModifiedBy?: WaveUserRepresentation;
        /** The last time the asset was modified, in ISO8601 date format. */
        lastModifiedDate?: Date;
        /** The lenses that depend on the asset. */
        lenses?: DependencyCollectionRepresentation;
        /** The name of the asset. */
        name?: string;
        /** The recipes that depend on the asset. */
        recipes?: DependencyCollectionRepresentation;
        /** The asset type. */
        type?: ConnectWaveAssetTypeEnum;
        /** The URL to retrieve the definition of the asset. */
        url?: string;
        /** The dataflows that depend on the asset. */
        workflows?: DependencyCollectionRepresentation;
    }

    /**
     * Returns the security coverage, also known as sharing inheritance, for a particular dataset version. The source objects listed are local to the org. Objects from other orgs or other external sources aren't returned.
     *
     * @param objectApiName The API name of the dataset object.
     * @param userId The ID of the user.
     */
    export function getSecurityCoverageDatasetVersion(
        objectApiName: string,
        userId: string
    ): void;

    /** The security coverage for a specific dataset version. */
    export interface DatasetCoverageRepresentation {
        /** The dataset version for which the coverage information applies. */
        datasetVersion?: DatasetVersionReference;
        /** The source objects for the dataset version. */
        sources?: DatasetSource[];
        /** The URL for retrieving this information. */
        url?: string;
    }

    /** The dataset version the coverage information applies to. */
    export interface DatasetVersionReference {
        /** A reference to the dataset. */
        dataset?: AssetReference;
        /** The 18 character ID of the dataset version. */
        id?: string;
        /** The asset URL. */
        url?: string;
    }

    /** The source object used to create a dataset. */
    export interface DatasetSource {
        /** The source object for a dataset. */
        object?: ObjectCoverage;
        /** The dataset fields relevant to security for the object. */
        securityFields?: string[];
    }

    /** The security coverage for a source object. */
    export interface ObjectCoverage {
        /** Indicates whether the object is an eligible sharing source or not. */
        eligibleSharingSource?: boolean;
        /** The label of the object. */
        label?: string;
        /** The name of the object. */
        name?: string;
        /** The namespace of the object. */
        namespace?: string;
        /** The specific records that are unsupported for sharing inheritance. */
        unsupportedRecords?: UnsupportedRecordCollection;
        /** The URL for retrieving this information. */
        url?: string;
    }

    /** The collection of specific records that unsupported for sharing inheritance. */
    export interface UnsupportedRecordCollection {
        /** The count of records not covered by sharing inheritance. This value may not match the length of the values collection. */
        count?: number;
        /** The collection of specific records that are unsupported for sharing inheritance. The collection length may be shorter than the count due to limiting for the API. */
        values?: UnsupportedRecord[];
    }

    /** The sharing usage of object instances based on Analytics limits. */
    export interface UnsupportedRecord {
        /** The number of descriptors for the record id. */
        descriptorCount?: number;
        /** The record id. */
        id?: string;
    }

    /**
     * Retrieves a CRM Analytics template.
     *
     * @param options Template visibility options to apply to the collection results.
     * @param templateIdOrApiName The ID or developer name of the template.
     */
    export function getWaveTemplate(
        options?: TemplateVisibilityOptionsEnum,
        templateIdOrApiName?: string
    ): void;

    export enum TemplateVisibilityOptionsEnum {
        CreateApp,
        ManageableOnly,
        ViewOnly
    }

    /** An Analytics template. */
    export interface TemplateRepresentation {
        /** The icon that best represents the Analytics application. */
        assetIcon?: string;
        /** The asset version (API version) of all the dashboards and lenses. */
        assetVersion?: number;
        /** The URL to the configuration of the template. */
        configurationUrl?: string;
        /** The user that created the template. */
        createdBy?: WaveUserRepresentation;
        /** The date and time the template was created. */
        createdDate?: Date;
        /** The custom attribute definitions of the template. */
        customAttributes?: TemplateCustomAttributes;
        /** The description of the template. */
        description?: string;
        /** The folder source of the template */
        folderSource?: AssetReference;
        /** The icons configured for the template. */
        icons?: TemplateIcons;
        /** The ID or fully qualified API name of the template. */
        id?: string;
        /** The localized name of the application template. */
        label?: string;
        /** The user that last updated the template. */
        lastModifiedBy?: WaveUserRepresentation;
        /** The last date and time the template was modified. */
        lastModifiedDate?: Date;
        /** The local API name of the template. */
        name?: string;
        /** The namespace of the template provider. */
        namespace?: string;
        /** The release information for the template */
        releaseInfo?: TemplateRelease;
        /** A list of tag definitions for the template. */
        tags?: string[];
        /** The icon that best represents the Analytics application template. */
        templateIcon?: string;
        /** The type of template. */
        templateType?: ConnectWaveTemplateTypeEnum;
        /** The URL to the detail of the template. */
        url?: string;
        /** The videos associated with the template. */
        videos?: VideoInfo;
    }

    /** The custom attributes or metadata for an Analytics template. */
    export interface TemplateCustomAttributes {
        /** The label for the custom attribute metadata. */
        label?: string;
        /** The list of values for the custom attribute metadata. */
        values?: string[];
    }

    /** The icons for an Analytics template. */
    export interface TemplateIcons {
        /** The badge icon used on any app created from this template. */
        appBadge?: AssetReference;
        /** The badge icon used to represent this template in the template configuration wizard. */
        templateBadge?: AssetReference;
        /** The list of images to display in the carousel on the template detail page when the template is selected in the wizard. */
        templatePreviews?: ImageAssetReferenceRepresentation[];
    }

    /** A image asset for Analytics. */
    export interface ImageAssetReferenceRepresentation extends BaseAssetReferenceRepresentation {
        /** The image description. */
        description?: string;
    }

    /** The release information for an Analytics template. */
    export interface TemplateRelease {
        /** The URL to the release notes for this template */
        notesUrl?: string;
        /** The version of this template. */
        templateVersion?: string;
    }

    /** Information for describing a particular video. */
    export interface VideoInfo {
        /** The platform-specific ID of the video content. */
        id?: string;
        /** The title of the video. */
        label?: string;
        /** The video platform. */
        linkType?: ConnectTemplateVideoLinkTypeEnum;
        /** The video purpose. */
        purpose?: ConnectTemplateVideoPurposeEnum;
        /** Indicates whether the video platform displays a playlist or not. */
        showPlaylist?: boolean;
    }

    export enum ConnectTemplateVideoLinkTypeEnum {
        Vidyard,
        YouTube
    }

    export enum ConnectTemplateVideoPurposeEnum {
        Onboarding,
        Walkthrough
    }

    export enum ConnectWaveTemplateTypeEnum {
        App,
        Dashboard,
        Data,
        Embedded,
        Lens
    }

    /**
     * Retrieves the configuration for a CRM Analytics template.
     *
     * @param disableApex Indicates whether Apex integration hooks are disabled (true) or not (false).
     * @param templateIdOrApiName The ID or developer name of the template.
     */
    export function getWaveTemplateConfig(
        disableApex?: boolean,
        templateIdOrApiName?: string
    ): void;

    /** The configuration for an Analytics Template. */
    export interface TemplateConfigurationRepresentation {
        /** The ID or fully qualified name of the template. */
        id?: string;
        /** The local API name of the template. */
        name?: string;
        /** The namespace of the template provider. */
        namespace?: string;
        /** The user interface definition for the template. */
        ui?: UIDefinition;
        /** A map of the defined variables for the template. */
        variables?: {
            [key: string]: VariableDefinition;
        };
    }

    /** The UI definition for an Analytics template. */
    export interface UIDefinition {
        /** The display messages for this template configuration. */
        displayMessages?: DisplayMessage[];
        /** The page collection for this template configuration. */
        pages?: PageRepresentation[];
    }

    /** The display message for an Analytics template. */
    export interface DisplayMessage {
        /** The name of the page where the text is to be displayed. */
        location?: string;
        /** The text content to display. */
        text?: string;
    }

    /** A UI page for an Analytics template. */
    export interface PageRepresentation {
        /** The optional condition to determine if the page is visible or not. Values are client-side EL notation (such as {{Variables.selectedOption}}). */
        condition?: string;
        /** A URL to this page's help webpage. */
        helpUrl?: string;
        /** The title for the page. */
        title?: string;
        /** The collection of variables for this template configuration. */
        variables?: PageVariable[];
        /** The Visualforce page to be used as the wizard user interface instead of the standard wizard interface. */
        vfPage?: AssetReference;
    }

    /** An Analytics variable to display on a UI page. */
    export interface PageVariable {
        /** The name of a variable. */
        name?: string;
        /** The visibility expression for this variable */
        visibility?: string;
    }

    /** The variable definition for an Analytics template. Specific variable type responses are listed here. */
    export interface VariableDefinition {
        /** The computed value of the variable. This value is set by integrated apex implementations. */
        computedValue?: any;
        /** The default value of the variable. */
        defaultValue?: any;
        /** The description of the variable. */
        description?: string;
        /** Indicates whether this variable excludes already selected values or not. */
        excludeSelected?: boolean;
        /** The list of values to exclude from the variable selection. */
        excludes?: string[];
        /** The label for the variable. */
        label?: string;
        /** The value specified in the most recent app creation process. */
        mostRecentValue?: any;
        /** Indicates whether the variable is required or not. */
        required?: boolean;
        /** The type of the variable. */
        variableType?: ArrayType |
            BooleanType |
            ConnectorType |
            DatasetAnyFieldType |
            DatasetDateType |
            DatasetDimensionType |
            DatasetMeasureType |
            DatasetType |
            DateTimeType |
            NumberType |
            ObjectType |
            SObjectFieldType |
            SObjectType |
            StringType;
    }

    /** The base type of all variable types. */
    export interface VariableType {
        /** The type of the variable. */
        type?: VariableTypeEnum;
    }

    /** Variable types. */
    export enum VariableTypeEnum {
        ArrayType,
        BooleanType,
        ConnectorType,
        DatasetAnyFieldType,
        DatasetDateType,
        DatasetDimensionType,
        DatasetMeasureType,
        DatasetType,
        DateTimeType,
        NumberType,
        ObjectType,
        SobjectFieldType,
        SobjectType,
        StringType
    }

    export interface ArrayType extends VariableType {
        /** The restricted list of enumerated values for the array. */
        enums?: any;
        /** The variable type contents of the array variable type. */
        itemsType?: VariableType;
        /** The size limit of the array. */
        sizeLimit?: SizeLimit;
    }

    export interface SizeLimit {
        /** The minimum number of elements in the array. */
        min?: number;
        /** The maximum number of elements in the array. */
        max?: number;
    }

    export interface BooleanType extends VariableType {
        /** The restricted list of enumerated values for the boolean variable type. */
        enums?: boolean[];
    }

    export interface ConnectorType extends VariableType {
        /** The restricted list of enumerated string values for the connector variable type. */
        enums?: string[];
    }

    export interface BaseObjectType extends VariableType {
        /** The defined properties and types of the object variable type. */
        properties?: {
            [key: string]: VariableType;
        };
        /** The required properties of the object variable type. */
        required?: string[];
        /** Indicates whether to use strict validation when unexpected properties exist in the object's payload or not. */
        strictValidation?: boolean;
    }

    export interface DatasetAnyFieldType extends BaseObjectType {
    }

    export interface DatasetDateType extends BaseObjectType {
    }

    export interface DatasetMeasureType extends BaseObjectType {
    }

    export interface DatasetDimensionType extends BaseObjectType {
    }

    export interface DatasetType extends BaseObjectType {
    }

    export interface DateTimeType extends VariableType {
    }

    export interface NumberType extends VariableType {
        /** The restricted list of enumerated double values for the numeric variable type. */
        enums?: number[];
        /** The maximum allowed value of the number. */
        max?: number;
        /** The minimum allowed value of the number. */
        min?: number;
    }

    export interface ObjectType extends BaseObjectType {
    }

    export interface SObjectType extends BaseObjectType {
    }

    export interface SObjectFieldType extends BaseObjectType {
        /** The sObject field data type when a default field is not supplied. The valid data types are XSD data types, for example: xsd:string */
        dataType?: string;
    }

    export interface StringType extends BaseObjectType {
        /** The restricted list of enumerated values for the string variable type. */
        enums?: string[];
    }

    /**
     * Retrieves the release notes for a CRM Analytics template.
     *
     * @param templateIdOrApiName The ID or developer name of the template.
     */
    export function getWaveTemplateReleaseNotes(templateIdOrApiName: string): void;

    /** The release notes for an Analytics template. */
    export interface TemplateReleaseNotesRepresentation {
        /** The ID or fully qualified name of the template. */
        id?: string;
        /** The local API name of the template. */
        name?: string;
        /** The namespace of the template provider. */
        namespace?: string;
        /** The release note's markdown. */
        notes?: string;
    }

    /**
     * Retrieves a collection of CRM Analytics templates.
     *
     * @param options Template visibility options to apply to the collection results.
     * @param type Template type to apply to the collection results.
     */
    export function getWaveTemplates(
        options?: GetWaveTemplatesOptionsEnum,
        type?: GetWaveTemplatesTypeEnum
    ): void;

    export enum GetWaveTemplatesOptionsEnum {
        CreateApp,
        ManageableOnly,
        ViewOnly
    }

    export enum GetWaveTemplatesTypeEnum {
        App,
        Dashboard,
        Data,
        Embedded,
        Lens
    }

    /** A collection of Analytics templates. */
    export interface TemplateCollectionRepresentation {
        /** A list of templates. */
        templates?: TemplateRepresentation[];
    }

    /**
     * Creates a version of a CRM Analytics dataset.
     *
     * @param request The creation parameters
     *
     * @returns A Promise object that resolves with the Restore Dataset Version response.
     */
    export function createDatasetVersion(request: CreateDatasetVersionRequest): Promise<RestoreDatasetVersionRepresentation>;

    export interface CreateDatasetVersionRequest {
        /** The dataset version to create. */
        datasetVersion?: RestoreDatasetVersionInput;
    }

    /** A specific version to restore an Analytics dataset to. */
    export interface RestoreDatasetVersionInput {
        /** The source version to restore. */
        sourceVersion?: AssetReferenceInput;
    }

    /** An Analytics asset reference. */
    export interface AssetReferenceInput extends BaseAssetReferenceInput {
    }

    /** The base Analytics asset. */
    export interface BaseAssetReferenceInput {
        /** Short description of the asset. */
        description?: string;
        /** The asset developer name. */
        name?: string;
        /** The asset label. */
        label?: string;
    }

    /**
     * Updates a specific CRM Analytics dataset by ID.
     *
     * @param request The update parameters
     *
     * @returns A Promise object that resolves with the Dataset response.
     */
    export function updateDataset(request: UpdateDatasetRequest): Promise<DatasetRepresentation>;

    export interface UpdateDatasetRequest {
        /** The ID or API name of the dataset. */
        datasetIdOrApiName?: string;
        /** The dataset to update. */
        dataset?: DatasetInputRepresentation;
    }

    /** An Analytics dataset. */
    export interface DatasetInputRepresentation extends BaseAssetInputRepresentation {
        /**
         * The 18-character ID of the current version of this dataset.
         *
         * @deprecated
         */
        currentVersionId?: string;
        /** The type of the dataset. */
        datasetType: ConnectWaveDatasetTypeEnum;
        /** The 18-character ID of the folder that contains the dataset. */
        folder?: string;
        /** The live connection details for the dataset. */
        liveConnection?: LiveConnectionInput;
        /** The user XMD associated with this dataset. */
        userXmd?: XmdInput;
        /** Indicates whether the dataset is hidden from users with view access or not. */
        visibility?: ConnectWaveAssetVisibilityType;
    }

    /** The connection details of an Analytics live dataset. */
    export interface LiveConnectionInput {
        /** The developer name of the live connection. */
        connectionName?: String;
        /** The source object name for the live connection. */
        sourceObjectName?: String;
    }


    /**
     * Updates a specific CRM Analytics dataset version by dataset ID and version ID.
     *
     * @param request the update parameters
     *
     * @returns A Promise object that resolves with the Dataset Version response.
     */
    export function updateDatasetVersion(request: UpdateDatasetVersionRequest): Promise<DatasetVersionRepresentation>;

    export interface UpdateDatasetVersionRequest {
        /** The ID or API name of the dataset. */
        datasetIdOrApiName?: string;
        /** The ID of the dataset version. */
        versionId?: string;
        /** The dataset version to update. */
        datasetVersion?: DatasetVersionInputRepresentation;
    }

    /** A specific version of an Analytics dataset. */
    export interface DatasetVersionInputRepresentation {
        /** Indicates whether the Dataset Version is complete or not. */
        isComplete?: boolean;
        /** The row level security predicate to be applied to this Dataset Version. */
        predicate?: string;
        /** Entity from which sharing rules should be inherited. */
        sharingSource?: AssetReferenceInput;
        /** The total number of rows that make up the dataset version. */
        totalRows?: number;
    }

    /**
     * Updates a specific CRM Analytics folder by ID.
     *
     * https://developer.salesforce.com/docs/platform/lwc/guide/reference-analytics-update-wave-folder.html
     *
     * @param folderId The ID of the folder.
     * @param folder The folder to update.
     *
     * @return A Promise object that resolves with the Wave Folder response.
     */
    export function updateWaveFolder(
        {
            folderId,
            folder
        }: {
            folderId: string,
            folder: BaseWaveFolderInput
        }
    ): Promise<WaveFolder>;

    /**
     * Updates a specific CRM Analytics user Xmd by dataset ID.
     *
     * @param datasetId The ID of the dataset.
     * @param versionId The ID of the dataset version.
     * @param xmd The Xmd to update.
     */
    export function updateXmd(
        {
            datasetId,
            versionId,
            xmd
        }: {
            datasetId: string,
            versionId: string,
            xmd: XmdInput
        }
    ): Promise<Xmd>;

    /**
     * Enables you to validate your CRM Analytics app template to ensure that it passes lint rules. Call this function
     * to validate your template and then package and share it.
     *
     * @param templateIdOrApiName the template ID or API name
     * @param templateValidateParam the validation parameter (TODO: Not well documented at this time)
     */
    export function validateWaveTemplateApi(
        templateIdOrApiName: string,
        templateValidateParam: any
    ): void;
}