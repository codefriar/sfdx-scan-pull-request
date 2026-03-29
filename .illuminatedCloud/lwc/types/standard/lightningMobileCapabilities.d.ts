// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */

/**
 * Mobile capabilities are JavaScript APIs that make mobile hardware and platform (operating system) features available in JavaScript. They require access to device hardware, platform APIs, or both.
 * Mobile capability APIs are available only when a Lightning web component runs in a supported mobile app on a mobile device.
 * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-mobilecapabilities.html|lightning/mobileCapabilities Module}
 */
declare module "lightning/mobileCapabilities" {
    // Inlined from BaseCapability.d.ts

    /**
     * Provide all services with common functionalities.
     */
    export interface BaseCapability {
        /**
         * Use this function to determine whether the respective service functionality is available.
         * @returns Returns true when used on a supported device and false otherwise.
         */
        isAvailable(): boolean;
    }

    // Inlined from AppReviewService/appReviewService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode AppReviewService}.
     * @returns An instance of {@linkcode AppReviewService}.
     */
    export function getAppReviewService(): AppReviewService;

    /**
     * Request an app review from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-appreviewservice.html|AppReviewService API}
     */
    export interface AppReviewService extends BaseCapability {
        /**
         * Requests an app review.
         * @param options An {@linkcode AppReviewServiceOptions} object to configure the {@linkcode AppReviewService} request.
         * @returns A resolved promise returns null.
         */
        requestAppReview(options?: AppReviewServiceOptions): Promise<null>;
    }

    /**
     * An object representing configuration details for an {@linkcode AppReviewService} session.
     */
    export interface AppReviewServiceOptions {
        /**
         * Ignore the app review request if already asked for the current version of the app.
         */
        ignoreIfAlreadyRequestedForCurrentAppVersion?: boolean;
    }

    /**
     * An object representing an error that occurred when accessing {@linkcode AppReviewService} features.
     */
    export interface AppReviewServiceFailure {
        /**
         * A value representing the reason for an app review error.
         */
        code?: AppReviewServiceFailureCode;

        /**
         * A string value describing the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English and isn't localized.
         */
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    type AppReviewServiceFailureCode =
        | "ALREADY_REQUESTED_FOR_CURRENT_APP_VERSION"
        | "IN_APP_REVIEW_ERROR"
        | "SERVICE_NOT_ENABLED"
        | "UNKNOWN_REASON";

    // Inlined from ARSpaceCapture/arSpaceCapture.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode ARSpaceCapture}.
     * @returns An instance of {@linkcode ARSpaceCapture}.
     */
    export function getARSpaceCapture(): ARSpaceCapture;

    /**
     * Scan a room using Apple's RoomPlan AR Capabilities.
     */
    export interface ARSpaceCapture extends BaseCapability {
        /**
         * Scan Room using Apple's AR Capabilities.
         * @param options The customization options for the {@linkcode ARSpaceCapture} Plugin.
         * @returns A resolved promise returns {@linkcode ARSpaceCaptureResult} object.
         */
        scanRoom(options?: ARSpaceCaptureOptions): Promise<ARSpaceCaptureResult>;
    }

    /**
     * ARSpaceCaptureResult interface.
     */
    export interface ARSpaceCaptureResult {
        capturedRooms?: CapturedRoom[] | null;
    }

    /**
     * CapturedRoom interface.
     */
    export interface CapturedRoom {
        /**
         * An array of walls that the framework identifies during a scan.
         */
        walls?: unknown[];

        /**
         * An array of doors that the framework identifies during a scan.
         */
        doors?: unknown[];

        /**
         * An array of windows that the framework identifies during a scan.
         */
        windows?: unknown[];

        /**
         * An array of openings that the framework identifies during a scan.
         */
        openings?: unknown[];

        /**
         * An array of floors that the framework identifies during a scan.
         * Available iOS 17.0+.
         */
        floors?: unknown[];

        /**
         * An array of objects that the framework identifies during a scan.
         */
        objects?: unknown[];

        /**
         * A unique alphanumeric value that the framework assigns the room.
         */
        identifier?: string;

        /**
         * One or more room types that the framework observes in the room.
         * Available iOS 17.0+.
         */
        sections?: unknown[];

        /**
         * The story, floor number, or level on which the captured room resides within a larger structure.
         * Available iOS 17.0+.
         */
        story?: number;

        /**
         * A version number for the captured room.
         * Available iOS 17.0+.
         */
        version?: number;
    }

    /**
     * ARSpaceCaptureOptions interface.
     */
    export interface ARSpaceCaptureOptions {
        permissionRationaleText?: string;
        presentWithAnimation: boolean;
    }

    /**
     * ARSpaceCaptureFailure interface.
     */
    export interface ARSpaceCaptureFailure {
        code?: ARSpaceCaptureFailureCode;
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    type ARSpaceCaptureFailureCode =
        | "USER_DISMISSED" // User cancelled the operation.
        | "USER_DENIED_PERMISSION" // The user denied permissions to use the device camera.
        | "AR_NOT_SUPPORTED" // The AR capabilities are not enabled/available on the device.
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; // An error happened in the native code that is not permission based. Will give more information in the ARSpaceCaptureFailure message

    // Inlined from BarcodeScanner/barcodeScanner.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode BarcodeScanner}.
     * @returns An instance of {@linkcode BarcodeScanner}.
     */
    export function getBarcodeScanner(): BarcodeScanner;

    /**
     * Scan barcodes from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-barcodescanner.html|BarcodeScanner API}
     */
    export interface BarcodeScanner extends BaseCapability {
        /**
         * @deprecated Use this function to start a new scanning session. Consider using scan() instead.
         * @param options A {@linkcode BarcodeScannerOptions} object to configure the scanning session.
         * @returns A resolved promise returns {@linkcode Barcode} object.
         */
        beginCapture(options?: BarcodeScannerOptions): Promise<Barcode>;

        /**
         * @deprecated Use this function to continue a scanning session. Consider using scan() instead.
         * @returns A resolved promise returns {@linkcode Barcode} object.
         */
        resumeCapture(): Promise<Barcode>;

        /**
         * @deprecated Use this function to end a scanning session, close the mobile OS scanning interface, and dispose resources. Consider using dismiss() instead.
         */
        endCapture(): void;

        /**
         * Use this function to start scanning barcodes.
         * @returns A resolved promise returns an array of {@linkcode Barcode} objects.
         */
        scan(options: BarcodeScannerOptions): Promise<Barcode[]>;

        /**
         * Use this function to end a scanning session, close the mobile OS scanning interface, and dispose of resources.
         */
        dismiss(): void;

        /**
         * Available values of barcode types as defined by {@linkcode BarcodeType}.
         */
        barcodeTypes?: BarcodeType;
    }

    /**
     * An object representing a scanned barcode.
     */
    export interface Barcode {
        /**
         * The type of barcode that was recognized. Available values are enumerated in BarcodeScanner.barcodeTypes.
         */
        type?: BarcodeType;

        /**
         * The decoded value of the barcode.
         */
        value?: string;
    }

    /**
     * An object enumerating the barcode symbologies supported by {@linkcode BarcodeScanner}.
     */
    export interface BarcodeType {
        CODE_128: "code128";
        CODE_39: "code39";
        CODE_93: "code93";
        DATA_MATRIX: "datamatrix";
        EAN_13: "ean13";
        EAN_8: "ean8";
        ITF: "itf";
        UPC_A: "upca";
        UPC_E: "upce";
        PDF_417: "pdf417";
        QR: "qr";
    }

    /**
     * An object representing an error that occurred when attempting to scan a barcode.
     */
    export interface BarcodeScannerFailure {
        /**
         * A value representing the reason for the scanning failure
         */
        code?: BarcodeScannerFailureCode;

        /**
         * A string value explaining the reason for the scanning failure.
         * This value is suitable for use in user interface messages.
         * The message is provided in English, and isn't localized.
         */
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    export type BarcodeScannerFailureCode =
        | "USER_DISMISSED" // The user clicked the button to dismiss the scanner
        | "USER_DENIED_PERMISSION" // This is only ever returned on android. android: permission was denied by user when prompt, could ask again.
        | "USER_DISABLED_PERMISSION" // Both ios and android will use this as it requires the same action of the user going to settings.
        // Android: permission was denied along "don't ask again" when prompt, will need to go app setting to turn on.
        // iOS: permission was disabled by the user and will need to be turned on in settings
        | "INVALID_BARCODE_TYPE_REQUESTED" // One or more invalid barcode types were passed to the scanner for scanning
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; //  A hardware or unknown failure happened when trying to use the camera or other reason, like FirebaseVision failure. This is not caused by a lack of permission.

    /**
     * ScannerSize values.
     */
    export type ScannerSize =
        | "SMALL"
        | "MEDIUM"
        | "LARGE"
        | "XLARGE"
        | "FULLSCREEN";

    /**
     * CameraFacing values.
     */
    export type CameraFacing = "FRONT" | "BACK";

    /**
     * An object representing configuration details for a barcode scanning session.
     */
    export interface BarcodeScannerOptions {
        /**
         * Optional. Specifies the types of barcodes to scan for. Available values are enumerated in BarcodeScanner.barcodeTypes. Defaults to all supported barcode types.
         */
        barcodeTypes?: string[];

        /**
         * Optional. Provides instructions to display in the scanning interface. Defaults to no text.
         */
        instructionText?: string;

        /**
         * Optional. Provides a message to display in the scanning interface when a barcode is successfully scanned. Defaults to no text.
         */
        successText?: string;

        /**
         * Optional. Indicates whether or not a check mark is displayed upon a successful scan. Defaults to true.
         */
        showSuccessCheckMark?: boolean;

        /**
         * Optional. Determines whether the device vibrates when a scan is successful. Defaults to true.
         */
        vibrateOnSuccess?: boolean;

        /**
         * Optional. Modifies the size of the scanner camera view. The available options represent a percentage of the user's device screen size.
         */
        scannerSize?: ScannerSize;

        /**
         * Optional. Specifies whether the front- or rear-facing camera is used. Defaults to "BACK". Available options include "FRONT" and "BACK". If the user's device doesn't support the specified camera facing, an error is returned.
         */
        cameraFacing?: CameraFacing;

        /**
         * Optional. Defines a custom user interface for the scanner instead of using the standard UI. Defaults to null. If nothing is passed in for this parameter, the standard UI is used. If a custom UI is used, it completely replaces the standard UI,
         * including the standard Cancel button used for dismissing the scanner. When defining a custom UI, it's the responsibility of the caller to handle dismissing the scanner.
         */
        backgroundViewHTML?: string;

        /**
         * Optional. Determines whether the scanner animates in and out when presented and dismissed. Defaults to true.
         */
        presentWithAnimation?: boolean;

        /**
         * Optional. Determines whether the user has to manually confirm that a detected barcode should be scanned. Defaults to false.
         */
        manualConfirmation?: boolean;

        /**
         * Optional. Determines whether the scanner displays the barcode data while scanning. Defaults to true. Previewing barcode is only supported when backgroundViewHTML is omitted.
         */
        previewBarcodeData?: boolean;

        /**
         * Optional. Determines whether the scanner collects the results of scanned barcodes before sending them back to the caller. Defaults to false. When set to true, the scanner
         * collects the results of scanned barcodes and displays them on the screen. When the user taps done, the scanned barcode data is sent back to the caller.
         */
        enableBulkScan?: boolean;

        /**
         * Optional. Determines whether the scanner detects multiple barcodes simultaneously. Defaults to false. Setting this parameter to true will automatically set the enableBulkScan parameter to true as well.
         */
        enableMultiScan?: boolean;

        /**
         * Optional. Enable flashlight. Defaults to false.
         */
        enableFlashlight?: boolean;
    }

    // Inlined from BiometricsService/biometricsService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode BiometricsService}.
     * @returns An instance of {@linkcode BiometricsService}.
     */
    export function getBiometricsService(): BiometricsService;

    /**
     * Access a device's biometrics capabilities from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-biometricsservice.html|BiometricsService API}
     */
    export interface BiometricsService extends BaseCapability {
        /**
         * Verify if the biometrics hardware or pin code is available to use to verify the user's device ownership.
         * @param options A {@linkcode BiometricsServiceOptions} object to configure the {@linkcode BiometricsService} request.
         * @returns A Promise object that resolves as a Boolean value. True if the biometrics hardware or pin code is available for use and false otherwise.
         */
        isBiometricsReady(options?: BiometricsServiceOptions): Promise<boolean>;

        /**
         * Verify if the user is the device owner using the device's biometrics hardware or pin code.
         * @param options A {@linkcode BiometricsServiceOptions} object to configure the {@linkcode BiometricsService} request.
         * @returns A Promise object that resolves as a Boolean value. True if the user is the registered device owner and false otherwise.
         */
        checkUserIsDeviceOwner(options?: BiometricsServiceOptions): Promise<boolean>;
    }

    /**
     * An object for specifying which instances of a recurring event are affected by an update to or deletion of one instance of the event.
     */
    export interface BiometricsServiceOptions {
        /**
         * Reason to use biometrics scanner.
         */
        permissionRequestBody?: string;

        /**
         * Title used in the dialog when the reason text is displayed. Allowed on iOS, but effective only on Android.
         */
        permissionRequestTitle?: string;

        /**
         * Policies specified in the array allows customization of the biometrics scan behavior.
         */
        additionalSupportedPolicies?: BiometricsServicePolicy[];
    }

    /**
     * An object representing policy to use pin code as an alternative to biometrics.
     */
    export type BiometricsServicePolicy =
    /** User cancelled the operation. */ "PIN_CODE";

    /**
     * An object representing an error that occurred when accessing {@linkcode BiometricsService} features.
     */
    interface BiometricsServiceFailure {
        /**
         * A value representing the reason for a biometrics service error. See {@linkcode BiometricsServiceFailureCode} for the list of possible values.
         */
        code?: BiometricsServiceFailureCode;

        /**
         * A string value describing the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English and isn't localized.
         */
        message?: string;
    }

    /**
     * Correlates with the code property on the {@linkcode BiometricsServiceFailure} object.
     */
    type BiometricsServiceFailureCode =
        | "HARDWARE_NOT_AVAILABLE" // There is no fingerprint scanner or face recognition hardware found.
        | "NOT_CONFIGURED" // Biometrics hardware was found but has not been set up yet.
        | "SERVICE_NOT_ENABLED" // BiometricsService is not enabled and cannot be used.
        | "UNKNOWN_REASON"; // An error occurred in the native code that isn't related to permissions or hardware issues. More information is provided in the BiometricsServiceFailure message.

    // Inlined from CalendarService/calendarService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode CalendarService}.
     * @returns An instance of {@linkcode CalendarService}.
     */
    export function getCalendarService(): CalendarService;

    /**
     * Manage calendar events from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-calendarservice.html|CalendarService API}
     */
    export interface CalendarService extends BaseCapability {
        /**
         * Returns all available calendars from the device's native Calendar application.
         * If needed, a permission pop-up for the user to grant calendar access is presented first.
         * @param options A {@linkcode CalendarServiceOptions} object to configure the {@linkcode CalendarService} request.
         * @returns A Promise object that resolves as an array of {@linkcode Calendar} objects.
         */
        getCalendars(options?: CalendarServiceOptions): Promise<Calendar[]>;

        /**
         * Returns all events of all available calendar events in a specified date range from the specified calendars.
         * @param startDateSecondsUTC The start of the date range.
         * @param endDateSecondsUTC The end of the date range.
         * @param calendars The titles of calendars to get events from. If not provided, or null is passed in, events are fetched from all available calendars.
         * @param options A {@linkcode CalendarServiceOptions} object to configure the {@linkcode CalendarService} request.
         * @returns A Promise object that resolves as an array of {@linkcode CalendarEvent} objects.
         */
        getEvents(
            startDateSecondsUTC: number,
            endDateSecondsUTC: number,
            calendars?: string[],
            options?: CalendarServiceOptions,
        ): Promise<CalendarEvent[]>;

        /**
         * Adds an event to the device's calendar.
         * @param event A {@linkcode CalendarEvent} object to be added to the device's calendar.
         * @param options A {@linkcode CalendarServiceOptions} object to configure the {@linkcode CalendarService} request.
         * @returns A Promise object that resolves as a coerced version of the {@linkcode CalendarEvent} parameter.
         */
        addEvent(
            event: CalendarEvent,
            options?: CalendarServiceOptions,
        ): Promise<CalendarEvent>;

        /**
         * Updates an event in the device's calendar.
         * @param updatedEvent A {@linkcode CalendarEvent} object with updated data to replace the existing data in the corresponding event on the device's calendar.
         * @param options A {@linkcode CalendarServiceOptions}  object to configure the {@linkcode CalendarService}  request.
         * @returns A Promise object that resolves as a coerced version of the {@linkcode CalendarEvent} parameter.
         */
        updateEvent(
            updatedEvent: CalendarEvent,
            options?: CalendarServiceOptions,
        ): Promise<CalendarEvent>;

        /**
         * Removes an event from a device's calendar.
         * @param event The {@linkcode CalendarEvent} object to be removed from the device's calendar.
         * @param options A {@linkcode CalendarServiceOptions} object to configure the {@linkcode CalendarService} request.
         * @returns If successful, null is returned.
         */
        removeEvent(
            event: CalendarEvent,
            options?: CalendarServiceOptions,
        ): Promise<null>;
    }

    /**
     * Calendar interface.
     */
    export interface Calendar {
        id?: string;
        title?: string;
        allowsContentModifications?: boolean; // indicates whether the calendar is read-only
        hexColor?: string; // includes # + hex color value, e.g #c603fc
        type?: string; // a string hinting about calendar type. It is platform specific. on iOS it is set to EKSource.sourceType+EKSource.title and on Android it is set to CalendarContract.Calendars.ACCOUNT_TYPE+CalendarContract.Calendars.ACCOUNT_NAME
        isPrimary?: boolean; // indicates whether it is the primary/default calendar
    }

    /**
     * Event interface.
     */
    export interface CalendarEvent {
        id: string;
        isAllDay: boolean; // defaults to False
        startDateSecondsUTC: number;
        endDateSecondsUTC: number;
        availability: EventAvailability; // defaults to Busy
        status: EventStatus; // read-only - value set by caller will be ignored and overwritten by the plugin
        calendarId?: string;
        title: string;
        location?: string;
        notes?: string;
        alarms?: Alarm[];
        attendees?: Participant[]; // Note: on iOS this field can only be used for fetching attendee info of an existing event, but you cannot create an event with attendee info (which is an EventKit limitation as mentioned here https://apple.co/3toRnDO)
        recurrenceRules?: RecurrenceRule[];
    }

    /**
     * EventAvailability values.
     */
    export type EventAvailability = "Busy" | "Free" | "Tentative";

    /**
     * EventStatus values.
     */
    export type EventStatus = "Canceled" | "Confirmed" | "Tentative";

    /**
     * Alarm interface.
     */
    export interface Alarm {
        relativeOffsetSeconds?: number;
    }

    /**
     * Participant interface.
     */
    export interface Participant {
        name?: string;
        email?: string | null;
        role?: ParticipantRole;
        status?: ParticipantStatus;
    }

    /**
     * ParticipantRole values.
     */
    export type ParticipantRole = "Required" | "Optional" | "Unknown";

    /**
     * ParticipantStatus values.
     */
    export type ParticipantStatus =
        | "Accepted"
        | "Declined"
        | "Pending"
        | "Tentative"
        | "Unknown";

    /**
     * The recurrence rule as defined by https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10.
     */
    export interface RecurrenceRule {
        frequency: RecurrenceFrequency;
        interval: number;
        daysOfTheWeek?: RecurrenceDayOfWeek[];
        daysOfTheMonth?: number[];
        monthsOfTheYear?: number[];
        weeksOfTheYear?: number[];
        daysOfTheYear?: number[];
        setPositions?: number[];
        end?: RecurrenceEnd;
    }

    /**
     * RecurrenceFrequency values.
     */
    export type RecurrenceFrequency = "Daily" | "Weekly" | "Monthly" | "Yearly";

    /**
     * RecurrenceDayOfWeek interface.
     */
    export interface RecurrenceDayOfWeek {
        dayOfTheWeek?: Weekday;
        weekNumber?: number;
    }

    /**
     * Weekday values.
     */
    export type Weekday =
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday";

    /**
     * RecurrenceEnd interface.
     */
    export interface RecurrenceEnd {
        endDateSecondsUTC?: number;
        occurrenceCount?: number;
    }

    /**
     * CalendarServiceOptions interface.
     */
    export interface CalendarServiceOptions {
        permissionRationaleText?: string;
        span?: Span;
    }

    /**
     * Span values.
     */
    export type Span = "ThisEvent" | "ThisAndFollowingEvents";

    /**
     * CalendarServiceFailure interface.
     */
    export interface CalendarServiceFailure {
        code?: CalendarServiceFailureCode;
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    export type CalendarServiceFailureCode =
        | "USER_DENIED_PERMISSION" // Permission was denied by user when prompt.
        | "NOT_FOUND" // A specified item (calendar or event) was not found.
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; // An error happened in the native code that is not permission based. Will give more information in the CalendarServiceFailure message.

    // Inlined from ContactsService/contactsService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode ContactsService}.
     * @returns An instance of {@linkcode ContactsService}.
     */
    export function getContactsService(): ContactsService;

    /**
     * Access contacts from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-contactsservice.html|ContactsService API}
     */
    export interface ContactsService extends BaseCapability {
        /**
         * Allows the user to pick one or more contacts from the device's Contacts app. If needed, presents a
         *  permissions pop-up to the user to request access to contacts first, and then presents the user with the contacts selector.
         * @param options A {@linkcode ContactsServiceOptions} object to configure the {@linkcode ContactsService} request.
         * @returns A Promise object that resolves as an array of {@linkcode Contact} objects. If an error is encountered, the array is empty.
         */
        getContacts(options?: ContactsServiceOptions): Promise<Contact[]>;

        /**
         * Save a contact record into the mobile device address book.
         * @param contact A {@linkcode Contact} object.
         * @param options A {@linkcode ContactsServiceOptions} object to configure the {@linkcode ContactsService} request. Currently
         *                used to override the device's permission UX sequence text.
         * @returns A resolved promise returns a {@linkcode Contact} object.
         */
        putContact(
            contact: Contact,
            options?: ContactsServiceOptions,
        ): Promise<Contact>;
    }

    /**
     * An object representing a contact.
     */
    export interface Contact {
        /**
         * A stringified number unique to each contact. Generated by the native device at the time of contact creation.
         */
        id?: string;

        /**
         * An object representing a contact's name.
         */
        name?: ContactName;

        /**
         * An array of objects containing phone numbers for the contact.
         */
        phoneNumbers?: ContactLabeledValue[];

        /**
         * An array of objects containing email addresses for the contact.
         */
        emails?: ContactLabeledValue[];

        /**
         * An array of objects representing contact's addresses.
         */
        addresses?: ContactAddress[];

        /**
         * An array of objects containing instant messaging (IM) usernames for the contact.
         */
        ims?: ContactLabeledValue[];

        /**
         * An object representing a contact's organization.
         */
        organizations?: ContactOrganization[];

        /**
         * A text field for any extra information about the contact.
         */
        note?: string;

        /**
         * An array of objects containing URLs for the contact.
         */
        urls?: ContactLabeledValue[];
    }

    /**
     * An object representing a contact's address.
     */
    export interface ContactAddress {
        /**
         * A string representing the type of address for a contact's address.
         */
        type?: string;

        /**
         * A string representing the street address for a contact's address.
         */
        streetAddress?: string;

        /**
         * A string representing the locality (also known as the “city”) for a contact's address.
         */
        locality?: string;

        /**
         * A string representing the region (also known as the “state” or “province”) for a contact's address.
         */
        region?: string;

        /**
         * A string representing the postal code for a contact's address.
         */
        postalCode?: string;

        /**
         * A string representing the country for a contact's address.
         */
        country?: string;
    }

    /**
     * An object representing a contact's organization.
     */
    export interface ContactOrganization {
        /**
         * A string representing the name of a contact's organization.
         */
        name?: string;

        /**
         * A string representing the department of a contact's organization.
         */
        department?: string;

        /**
         * A string representing the title the contact holds in the organization.
         */
        title?: string;
    }

    /**
     * An object representing a contact's name.
     */
    export interface ContactName {
        /**
         * A string representing the contact's family name (also known as “surname” or “last name”).
         */
        familyName?: string;

        /**
         * A string representing the contact's given name (also known as “first name”).
         */
        givenName?: string;

        /**
         * A string representing the contact's middle name.
         */
        middleName?: string;

        /**
         * A string representing the contact's name prefix.
         */
        namePrefix?: string;

        /**
         * A string representing the contact's name suffix.
         */
        nameSuffix?: string;
    }

    /**
     * An object containing a label and a value for a miscellaneous piece of contact information.
     */
    export interface ContactLabeledValue {
        /**
         * The display name that categorizes the data in value. In the following examples, home, homepage, and work are label properties.
         */
        label?: string;

        /**
         * The value of the data specified in label.
         */
        value?: string;
    }

    /**
     * An object representing an error that occurred when accessing {@linkcode ContactsService} features.
     */
    export interface ContactsServiceFailure {
        /**
         * A value representing the reason for a contacts error.
         */
        code?: ContactsServiceFailureCode;

        /**
         * A string value describing the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English, and isn't localized.
         */
        message?: string;
    }

    /**
     * An object representing configuration details for a {@linkcode ContactsService} session.
     */
    export interface ContactsServiceOptions {
        /**
         * Optional parameter, used by Android only. This only appears after an initial denial by the user. To use the default permission message, pass in an empty object.
         * The default permission message is “To import Contacts, permission is needed to access Contacts. Tap Allow in the following permissions dialog.”
         */
        permissionRationaleText?: string;
    }

    /**
     * Possible failure codes.
     */
    export type ContactsServiceFailureCode =
        | "USER_DISMISSED" // The user clicked the cancel button.
        | "USER_DENIED_PERMISSION" // Permission was denied to access contacts (older versions of Android only).
        | "USER_DISABLED_PERMISSION" // Android Only - Permission was denied.  User will need to go to app setting to turn on.
        | "USER_RESTRICTED_PERMISSION" // The application is restricted (perhaps by parental controls) from accessing Contacts (iOS only).
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "SAVE_OPERATION_FAILED" // The service couldn't save the contact record into the address book.
        | "UNKNOWN_REASON"; // Generic error that is not captured by any of the above categories

    // Inlined from DocumentScanner/documentScanner.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode DocumentScanner}.
     * @returns An instance of {@linkcode DocumentScanner}.
     */
    export function getDocumentScanner(): DocumentScanner;

    /**
     * Scan documents from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-documentscanner.html|DocumentScanner API}
     */
    export interface DocumentScanner extends BaseCapability {
        /**
         * Use this function to start scanning a document.
         * @param options A {@linkcode DocumentScannerOptions} object to configure the scanning session.
         * @returns A Promise object that resolves to an array containing one or more {@linkcode Document} objects.
         */
        scan(options?: DocumentScannerOptions): Promise<Document[]>;
    }

    /**
     * An object representing a scanned document. Returned as the result of a successful scan operation.
     */
    export interface Document {
        /**
         * A string containing the base64 image data of the scanned document. Only provided when returnImageBytes is set to true in your {@linkcode DocumentScannerOptions} configuration object.
         */
        imageBytes?: string;

        /**
         * A string value providing the recognized text from the scanned document.
         */
        text: string;

        /**
         * An array of {@linkcode TextBlock} objects that represent a structured text result that is visually aligned with the corresponding image. See {@linkcode TextBlock} for details of this structured text data.
         */
        blocks: TextBlock[];

        /**
         * An array of {@linkcode Entity} objects.
         */
        entities: Entity[];
    }

    /**
     * An object representing a contiguous section of the scanned text. Text that is visually close together is grouped into a block of text.
     * A document is made up of one to many blocks, and each block can be further broken down into smaller text elements: {@linkcode TextLine} (a single line of text in
     * a visually aligned run of text) and {@linkcode TextElement} (an individual word or glyph).
     */
    export interface TextBlock {
        /**
         * A string containing the text content of the block.
         */
        text?: string;

        /**
         * An object containing the coordinates — position and size — that represent the bounding rectangle in the scanned image that contains the {@linkcode TextBlock}.
         */
        frame?: Frame;

        /**
         * An array of Point objects that define a closed shape within the scanned image that contains the {@linkcode TextBlock}.
         */
        cornerPoints?: Point[];

        /**
         * The BCP-47 language code values for the languages detected in the recognized text.
         */
        recognizedLangCodes?: string[];

        /**
         * An array of {@linkcode TextLine} objects, each of which represents a visually aligned line of text within the {@linkcode TextBlock}.
         */
        lines?: TextLine[];
    }

    /**
     * An object representing a single line of scanned text.
     */
    export interface TextLine {
        /**
         * A string containing the text content of the line.
         */
        text?: string;

        /**
         * An object containing the coordinates — position and size — that represent the bounding rectangle in the scanned image that contains the {@linkcode TextLine}.
         */
        frame?: Frame;

        /**
         * An array of {@linkcode Point} objects that define a closed shape within the scanned image that contains the {@linkcode TextLine}.
         */
        cornerPoints?: Point[];

        /**
         * The BCP-47 language code values for the languages detected in the recognized text.
         */
        recognizedLangCodes?: string[];

        /**
         * An array of {@linkcode TextElement} objects, each of which represents a word or glyph within the {@linkcode TextLine}.
         */
        elements?: TextElement[];
    }

    /**
     * An object representing a single word, individual character, or glyph.
     */
    export interface TextElement {
        /**
         * A string containing the text content of the word or character.
         */
        text?: string;

        /**
         * An object containing the coordinates — position and size — that represent the bounding rectangle in the scanned image that contains the {@linkcode TextElement}.
         */
        frame?: Frame;

        /**
         * An array of {@linkcode Point} objects that define a closed shape within the scanned image that contains the {@linkcode TextElement}.
         */
        cornerPoints?: Point[];

        /**
         * The BCP-47 language code values for the languages detected in the recognized text.
         */
        recognizedLangCodes?: string[];
    }

    /**
     * An object representing a bounding rectangle. When used in {@linkcode DocumentScanner}, the Frame is the smallest that fully encloses a region of scanned text for a {@linkcode TextBlock}, {@linkcode TextLine}, or {@linkcode TextElement}.
     */
    export interface Frame {
        /**
         * The X coordinate of the top-left of the rectangle, in pixels, within the coordinate system of the scanned image.
         */
        x: number;

        /**
         * The Y coordinate of the top-left of the rectangle, in pixels, within the coordinate system of the scanned image.
         */
        y: number;

        /**
         * The width of the rectangle, in pixels.
         */
        width: number;

        /**
         * The height of the rectangle, in pixels.
         */
        height: number;
    }

    /**
     * An object representing a point in a coordinate system.
     */
    export interface Point {
        /**
         * The X coordinate of the point.
         */
        x: number;

        /**
         * The Y coordinate of the point.
         */
        y: number;
    }

    /**
     * Entity interface.
     */
    export interface Entity {
        type: EntityType;
        value: string;
        dateTimeEntity?: DateTimeEntity;
        flightNumberEntity?: FlightNumberEntity;
        ibanEntity?: IBANEntity;
        moneyEntity?: MoneyEntity;
        paymentCardEntity?: PaymentCardEntity;
        trackingNumberEntity?: TrackingNumberEntity;
    }

    /**
     * EntityType values.
     */
    export type EntityType =
        | "ADDRESS"
        | "DATETIME"
        | "EMAIL"
        | "FLIGHTNUMBER"
        | "IBAN"
        | "ISBN"
        | "MONEY"
        | "PAYMENTCARD"
        | "PHONE"
        | "TRACKINGNUMBER"
        | "URL";

    /**
     * DateTimeEntity interface.
     */
    export interface DateTimeEntity {
        secondsUTC?: number;
        granularity?: string;
    }

    /**
     * FlightNumberEntity interface.
     */
    export interface FlightNumberEntity {
        airlineCode?: string;
        flightNumber?: string;
    }

    /**
     * IBANEntity interface.
     */
    export interface IBANEntity {
        countryCode?: string;
        iban?: string;
    }

    /**
     * MoneyEntity interface.
     */
    export interface MoneyEntity {
        unnormalizedCurrency?: string;
        integerPart?: number;
        fractionalPart?: number;
    }

    /**
     * PaymentCardEntity interface.
     */
    export interface PaymentCardEntity {
        network?: string;
        cardNumber?: string;
    }

    /**
     * TrackingNumberEntity interface.
     */
    export interface TrackingNumberEntity {
        carrier?: string;
        trackingNumber?: string;
    }

    /**
     * DocumentScannerSource values.
     */
    export type DocumentScannerSource =
        | "INPUT_IMAGE"
        | "PHOTO_LIBRARY"
        | "DEVICE_CAMERA";

    /**
     * Script values.
     */
    export type Script = "CHINESE" | "DEVANAGARI" | "JAPANESE" | "KOREAN" | "LATIN";

    /**
     * An object containing configuration details for a document scanning session.
     */
    export interface DocumentScannerOptions {
        /**
         * Optional, and only for Android implementations. The text shown in the UI when the device prompts the user to grant permission for your app to use the camera.
         */
        permissionRationaleText?: string;

        /**
         * Optional. Specifies the source of the document to be scanned. Defaults to "DEVICE_CAMERA".
         */
        imageSource?: DocumentScannerSource;

        /**
         * Optional. Specifies the language writing system of the text to be scanned. Defaults to "LATIN".
         */
        scriptHint?: Script;

        /**
         * Defaults to FALSE when omitted.
         */
        extractEntities?: boolean;

        /**
         * Defaults to EN when omitted.
         */
        entityExtractionLanguageCode?: string;

        /**
         * Optional. Specifies whether the image data should (true) or should not (false) be returned by the plugin. Defaults to false. This setting is overridden and set to false when imageSource is set to “INPUT_IMAGE”.
         */
        returnImageBytes?: boolean;

        /**
         * Optional. A stringified array of base64 image data to be scanned. Used when imageSource is set to "INPUT_IMAGE".
         */
        inputImageBytes?: string[];
    }

    /**
     * An object representing an error that occurred when accessing {@linkcode DocumentScanner} features.
     */
    export interface DocumentScannerFailure {
        /**
         * A value representing the reason for a document scanner error. See {@linkcode DocumentScannerFailureCode} for the list of possible values.
         */
        code?: DocumentScannerFailureCode;

        /**
         * A string value describing the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English and isn't localized.
         */
        message?: string;
    }

    /**
     * Correlates with the code property on the {@linkcode DocumentScannerFailure} object.
     */
    export type DocumentScannerFailureCode =
        | "USER_DISMISSED" // User dismissed the scanner.
        | "USER_DENIED_CAMERA_PERMISSION" // A user denied permission to access the device camera when prompted.
        | "USER_DENIED_PHOTO_LIBRARY_PERMISSION" // A user denied permission to access the device photo library when prompted.
        | "NO_SUPPORTED_CAMERA" // The device doesn't have a supported camera.
        | "INVALID_INPUT_IMAGE" // The input image data can't be read as an image.
        | "SERVICE_NOT_ENABLED" // DocumentScanner is not enabled and cannot be used.
        | "UNKNOWN_REASON"; // An error occurred in the native code that isn't related to permissions or hardware issues. More information is provided in the DocumentScannerFailure message.

    // Inlined from GeofencingService/geofencingService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode GeofencingService}.
     * @returns An instance of {@linkcode GeofencingService}.
     */
    export function getGeofencingService(): GeofencingService;

    /**
     * Create and monitor geofences in a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-geofencingservice.html|GeofencingService API}
     */
    export interface GeofencingService extends BaseCapability {
        /**
         * Starts geofence monitoring.
         * @param geofence A {@linkcode Geofence} object to monitor.
         * @returns A Promise object that resolves as a string value. The value is a unique ID that's assigned to the monitored geofence.
         */
        startMonitoringGeofence(geofence: Geofence): Promise<string>;

        /**
         * Stop monitoring a specific geofence.
         * @param id  Unique ID assigned to a specific geofence.
         * @returns A Promise object that resolves as null.
         */
        stopMonitoringGeofence(id: string): Promise<null>;

        /**
         * Stop monitoring all geofences.
         * @returns A Promise object that resolves as null.
         */
        stopMonitoringAllGeofences(): Promise<null>;

        /**
         * Get all IDs of monitored geofences.
         * @returns A Promise object that resolves as an array of string values. The values are unique IDs assigned to monitored geofences.
         */
        getMonitoredGeofenceIds(): Promise<string[]>;
    }

    /**
     * An object representing an error that occurred when accessing {@linkcode GeofencingService} features.
     */
    export interface GeofencingServiceFailure {
        /**
         * A value representing the reason for a location error.
         */
        code?: GeofencingServiceFailureCode;

        /**
         * A string value explaining the reason for the failure. This value is
         * suitable for use in user interface messages. The message is provided in English and isn't localized.
         */
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    export type GeofencingServiceFailureCode =
        | "LOCATION_SERVICE_DISABLED" // Android Only: The location service is disabled on the device, not just for this app.
        | "USER_DENIED_PERMISSION" // Permission was denied by user when prompt, could ask again
        | "USER_DISABLED_PERMISSION" // Android: permission was denied along "don't ask again" when prompt, will need to go app setting to turn on. iOS: permission was disabled by the user and will need to be turned on in settings
        | "UNAVAILABLE_ON_HARDWARE" // Geofence monitoring not available on the hardware.
        | "MAX_GEOFENCE_MONITORED_REACHED" // The maximum number of geofences that can be monitored by the OS has been reached.
        | "INVALID_LATITUDE" // The range of latitude for a geofence is -90...90
        | "INVALID_LONGITUDE" // The range of longitude for a geofence is -180...180
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; // An error happened in the Native Code that is not permission based. Will give more information in the GeofencingServiceFailure message.

    /**
     * An object representing the coordinates and radius of the geofence region.
     */
    export interface Geofence {
        /**
         * The latitude, in degrees. Ranges from -90 to 90.
         */
        latitude?: number;

        /**
         * The longitude, in degrees. Ranges from -180 to 180.
         */
        longitude?: number;

        /**
         * The radius of the geofence in meters.
         */
        radius?: number;

        /**
         * Monitors the entry into the geofence radius. Defaults to true.
         */
        notifyOnEntry?: boolean;

        /**
         * Monitors the exit out of the geofence radius. Defaults to true.
         */
        notifyOnExit?: boolean;

        /**
         * Notification triggered by a geofence event.
         */
        message?: string;

        /**
         * Removes geofence after it's triggered. Defaults to true.
         */
        triggerOnce?: boolean;
    }

    // Inlined from LocationService/locationService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode LocationService}.
     * @returns An instance of {@linkcode LocationService}.
     */
    export function getLocationService(): LocationService;

    /**
     * Access and track location in a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-locationservice.html|LocationService API}
     */
    export interface LocationService extends BaseCapability {
        /**
         * Gets the device's current geolocation.
         * @param options A {@linkcode LocationServiceOptions} object to configure the location request.
         * @returns A Promise object that resolves as a {@linkcode LocationResult} object with the device location details.
         */
        getCurrentPosition(options?: LocationServiceOptions): Promise<LocationResult>;

        /**
         * Subscribes to asynchronous location updates for the mobile device.
         * @param options A {@linkcode LocationServiceOptions} object to configure the location request.
         * @param callback A function to handle location update responses.
         * @returns An integer identifier for the location subscription, which you can use to end the subscription when you want to stop receiving location updates.
         */
        startWatchingPosition(
            options: LocationServiceOptions | null,
            callback: (
                result?: LocationResult,
                failure?: LocationServiceFailure,
            ) => void,
        ): number;

        /**
         * Unsubscribes from location updates for the mobile device.
         * @param watchId An integer identifier for an active location subscription, returned by a call to startWatchingPosition().
         */
        stopWatchingPosition(watchId: number): void;
    }

    /**
     * LocationResult interface.
     */
    export interface LocationResult {
        /**
         * The physical location.
         */
        coords?: Coordinates;

        /**
         * The time of the location reading, measured in milliseconds since January 1, 1970.
         */
        timestamp?: number;
    }

    /**
     * An object representing a specific point located on the planet Earth. Includes velocity details, if available.
     * Includes accuracy information, to the best of the device's ability to evaluate. Similar to a GeolocationCoordinates in the Geolocation Web API.
     */
    export interface Coordinates {
        /**
         * The latitude, in degrees. Ranges from -90 to 90.
         */
        latitude: number;

        /**
         * The longitude, in degrees. Ranges from -180 to 180.
         */
        longitude: number;

        /**
         * Optional. Accuracy of the location measurement, in meters, as a radius around the measurement.
         */
        accuracy?: number;

        /**
         * Optional. Meters above sea level.
         */
        altitude?: number;

        /**
         * Optional. Accuracy of the altitude measurement, in meters.
         */
        altitudeAccuracy?: number;

        /**
         * Optional. Velocity of motion, if any, in meters per second.
         */
        speed?: number;

        /**
         * Optional. Accuracy of the speed measurement, in meters.
         */
        speedAccuracy?: number;

        /**
         * Optional. Direction of motion, in degrees from true north. Ranges from 0 to 360.
         */
        heading?: number;

        /**
         * Optional. Accuracy of the heading measurement, in degrees.
         */
        headingAccuracy?: number; // accuracy for the heading in degree
    }

    /**
     * An object representing an error that occurred when accessing LocationService features.
     */
    export interface LocationServiceFailure {
        /**
         * A value representing the reason for a location error.
         */
        code?: LocationServiceFailureCode;

        /**
         * A string value explaining the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English, and isn't localized.
         */
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    export type LocationServiceFailureCode =
        | "LOCATION_SERVICE_DISABLED" // Android only - The code when the location service is disabled on the device, not just for this app.
        | "USER_DENIED_PERMISSION" // Permission was denied by user when prompt, could ask again
        | "USER_DISABLED_PERMISSION" // Android: permission was denied along "don't ask again" when prompt, will need to go app setting to turn on. iOS: permission was disabled by the user and will need to be turned on in settings
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; // An error happened in the Native Code that is not permission based. Will give more information in the LocationServiceFailure message.

    /**
     * An object representing configuration details for a location service session.
     */
    export interface LocationServiceOptions {
        /**
         * Whether to use high accuracy mode when determining location. Set to true to prioritize location accuracy.
         * Set to false to prioritize battery life and response time.
         */
        enableHighAccuracy: boolean;

        /**
         * Optional, and only for Android implementations. The text shown in the UI when the device prompts the user to grant permission for your app to use the Android's location service.
         */
        permissionRationaleText?: string;
    }

    // Inlined from NfcService/nfcService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode NfcService}.
     * @returns An instance of {@linkcode NfcService}.
     */
    export function getNfcService(): NfcService;

    /**
     * Interact with NFC tags from a Lightning web component.
     * @see {@link https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-nfcservice.html|NFCService API}
     */
    export interface NfcService extends BaseCapability {
        /**
         * Reads an NFC tag and returns the data read from it.
         * @param options An {@linkcode NFCServiceOptions} object to configure the {@linkcode NfcService} request.
         * @returns A Promise object that resolves to an array containing a single {@linkcode NFCMessage} object.
         */
        read(options?: NFCServiceOptions): Promise<NFCMessage[]>;

        /**
         * Erase the contents of an NFC tag.
         * @param options An {@linkcode NFCServiceOptions} object to configure the {@linkcode NfcService} request.
         * @returns If successful, the OS returns a Promise object that resolves to null.
         */
        erase(options?: NFCServiceOptions): Promise<null>;

        /**
         * Write text to an NFC tag.
         * @param payloads An array of {@linkcode NFCRecord} objects containing the raw bytes to be written.
         * @param options An {@linkcode NFCServiceOptions} object to configure the {@linkcode NfcService} request.
         * @returns If successful, the OS returns a Promise object that resolves to null.
         */
        write(
            payloads: NFCRecord[],
            options?: NFCServiceOptions
        ): Promise<null>;

        /**
         * Given a text payload, this function creates a properly formatted {@linkcode NFCRecord} to be written to an NFC tag.
         * @param payload A {@link TextPayload} object, which contains the text to be converted to an NFC record.
         * @returns A Promise object that resolves to an {@linkcode NFCRecord} object.
         */
        createTextRecord(payload: TextPayload): Promise<NFCRecord>;

        /**
         * Given a URI string payload, this function creates a properly formatted {@linkcode NFCRecord} to be written to an NFC tag.
         * @param payload The URI to be converted to an NFC record.
         * @returns A Promise object that resolves to an {@linkcode NFCRecord} object.
         */
        createUriRecord(payload: string): Promise<NFCRecord>;
    }

    /**
     * An object returned by an NFC read() operation.
     */
    export interface NFCMessage {
        /**
         * The size, in number of bytes, of the data received by the read() operation.
         */
        totalByteLength?: number;

        /**
         * An array containing a single {@linkcode NFCMessageRecord} object, which in turn contains the payload from the NFC tag.
         */
        records?: NFCMessageRecord[];
    }

    /**
     * An object within an {@linkcode NFCMessage} object, containing the payload read from an NFC tag.
     */
    export interface NFCMessageRecord {
        /**
         * Contains the parsed values of the raw data read from the NFC tag. The parsing operation
         * only occurs if the value of the typeNameFormat property on the {@linkcode NFCRecord} object is "WELLKNOWN".
         * Otherwise, this property's value is null.
         */
        parsed?: NFCRecord;

        /**
         * Contains the raw base64 data string read from the NFC tag.
         */
        raw?: NFCRecord;
    }

    /**
     * An object containing one record of data from an NFC tag scan.
     */
    export interface NFCRecord {
        /**
         * The Type Name Format field of the payload, as defined by the NDEF specification.
         */
        typeNameFormat?: TypeNameFormat;

        /**
         * The type of the payload, as defined by the NDEF specification.
         */
        type?: string;

        /**
         * The identifier of the payload, as defined by the NDEF specification, or an empty string if no identifier data was present in the tag.
         */
        identifier?: string;

        /**
         * The content of the record, encoded in base64 format.
         */
        payload?: string;
    }

    /**
     * An object containing raw text input, to be converted into an {@linkcode NFCRecord}.
     */
    export interface TextPayload {
        /**
         * The raw text payload to be converted.
         */
        text?: string;

        /**
         * The ISO 639-1 language ID of the text.
         */
        langId?: string;
    }

    /**
     * The following constants are available as properties on an instance of {@linkcode NfcService}. The constants enumerate the accepted values for the associated properties.
     */
    export type TypeNameFormat =
        | "ABSOLUTE_URI"
        | "EMPTY"
        | "EXTERNAL"
        | "MEDIA"
        | "WELLKNOWN"
        | "UNCHANGED"
        | "UNKNOWN";

    /**
     * An object containing configuration details for an NFC interaction.
     */
    export interface NFCServiceOptions {
        /**
         * Optional. Provides instructions to display in the user interface. Defaults to no text.
         */
        instructionText?: string;

        /**
         * Optional. Provides a message to display in the user interface when an NFC operation is successfully completed. Defaults to no text.
         */
        successText?: string;
    }

    /**
     * An object representing an error that occurred when accessing {@linkcode NfcService} features.
     */
    export interface NFCServiceFailure {
        /**
         * A value representing the reason for an error. See {@linkcode NFCServiceFailureCode} for the list of possible values.
         */
        code?: NFCServiceFailureCode;

        /**
         * A string value describing the reason for the failure. This value is suitable for use in user interface messages. The message is provided in English and isn't localized.
         */
        message?: string;
    }

    /**
     * Correlates with the code property on the {@linkcode NFCServiceFailure} object.
     */
    export type NFCServiceFailureCode =
        | "USER_DISMISSED" // The user dismissed the scanner.
        | "NFC_NOT_SUPPORTED" // The device doesn't support NFC capabilities.
        | "NFC_NOT_ENABLED" // The device NFC feature is turned off.
        | "TAG_EMPTY" // The NFC tag contains no data to be read.
        | "SERVICE_NOT_ENABLED" // NFCService is not enabled and cannot be used.
        | "UNKNOWN_REASON"; // An error occurred in the native code that isn't related to permissions or hardware issues. More information is provided in the NFCServiceFailure message.

    // Inlined from PaymentsService/paymentsService.d.ts

    /**
     * Use this factory function to get an instance of {@linkcode PaymentsService}.
     * @returns An instance of {@linkcode PaymentsService}.
     */
    export function getPaymentsService(): PaymentsService;

    /**
     * PaymentsService is a Nimbus plugin that allows JavaScript code in a Lightning web component to call functions that launches Stripe's Tap to Pay capabilities.
     */
    export interface PaymentsService extends BaseCapability {
        /**
         * Process payment.
         * @param options The customization options.
         * @returns A Promise object that resolves to {@linkcode CollectPaymentResult} object.
         */
        collectPayment(options: CollectPaymentOptions): Promise<CollectPaymentResult>;

        /**
         * Get the supported payment methods on this device
         * @param options The customization options.
         * @returns  A Promise object that resolves to an array containing {@linkcode PaymentMethod} objects.
         */
        getSupportedPaymentMethods(options: GetSupportedPaymentMethodsOptions): Promise<PaymentMethod[]>;
    }

    /**
     * PaymentMethod values.
     */
    export type PaymentMethod =
        | "TAP_TO_PAY"
        | "CREDIT_CARD_DETAILS"
        | "PAY_VIA_LINK";

    /**
     * GetSupportedPaymentMethodsOptions interface.
     */
    export interface GetSupportedPaymentMethodsOptions {
        countryIsoCode?: string;
        merchantAccountId?: string;
        permissionRationaleText?: string;
    }

    /**
     * CollectPaymentOptions interface.
     */
    export interface CollectPaymentOptions {
        amount: number;
        paymentMethod: PaymentMethod;
        currencyIsoCode: string;
        merchantAccountId: string;
        merchantName: string;
        payerAccountId?: string;
        sourceObjectIds?: string[];
        permissionRationaleText?: string;
    }

    /**
     * CollectPaymentResult interface.
     */
    export interface CollectPaymentResult {
        gatewayRefId?: string;
        guid?: string;
        paymentGatewayId?: string;
        status?: string;
    }

    /**
     * PaymentsServiceFailure interface.
     */
    export interface PaymentsServiceFailure {
        code?: PaymentsServiceFailureCode;
        message?: string;
    }

    /**
     * Possible failure codes.
     */
    export type PaymentsServiceFailureCode =
        | "USER_DISMISSED" // User cancelled the operation.
        | "USER_DENIED_PERMISSION" // Permission to access device location is denied.
        | "SERVICE_NOT_ENABLED" // The service is not enabled and therefore cannot be used.
        | "UNKNOWN_REASON"; // An error happened in the native code that is not permission based. Will give more information in the PaymentsServiceFailure message.
}