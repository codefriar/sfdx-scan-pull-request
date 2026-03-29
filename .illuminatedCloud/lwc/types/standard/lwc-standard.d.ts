// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

declare module 'lightning/accordion' {
    import { LightningElement, api } from 'lwc';

    /** A collection of vertically stacked sections with multiple content areas. This component requires version 41.0 and later. */
    export default class LightningAccordion extends LightningElement {
        /** The activeSectionName changes the default expanded section. The first section in the accordion is expanded by default. */
        @api
        activeSectionName?: string;

        /** If true, all sections will be closed by default and the accordion will allow multiple sections open at a time. */
        @api
        allowMultipleSectionsOpen?: boolean;

        /** Action fired when the open sections change, it contains all open sections. */
        @api
        onsectiontoggle?: EventListener;
    }

    export type Accordion = LightningAccordion;
}

declare module 'lightning/accordionSection' {
    import { LightningElement, api } from 'lwc';

    /** A single section that is nested in a lightning:accordion component. This component requires version 41.0 and later. */
    export default class LightningAccordionSection extends LightningElement {
        /** Enables a custom menu implementation. Actions are displayed to the right of the section title. */
        @api
        actions?: string;

        /** The text that displays as the title of the section. */
        @api
        label?: string;

        /** The unique section name to use with the activeSectionName attribute in the lightning:accordion component. */
        @api
        name?: string;
    }

    export type AccordionSection = LightningAccordionSection;
}

declare module 'lightning/avatar' {
    import { LightningElement, api } from 'lwc';

    /** A visual representation of an object. */
    export default class LightningAvatar extends LightningElement {
        /** The alternative text used to describe the avatar, which is displayed as hover text on the image. */
        @api
        alternativeText?: string;

        /** The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed. */
        @api
        fallbackIconName?: string;

        /** If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter. */
        @api
        initials?: string;

        /** The size of the avatar. Valid values are x-small, small, medium, and large. This value defaults to medium. */
        @api
        size?: 'x-small' | 'small' | 'medium' | 'large';

        /** The URL for the image. */
        @api
        src: string;

        /** The variant changes the shape of the avatar. Valid values are empty, circle, and square. This value defaults to square. */
        @api
        variant?: 'empty' | 'circle' | 'square';
    }

    export type Avatar = LightningAvatar;
}

declare module 'lightning/badge' {
    import { LightningElement, api } from 'lwc';

    /** Represents a label which holds a small amount of information, such as the number of unread notifications. */
    export default class LightningBadge extends LightningElement {
        /** The alternative text used to describe the icon, which is displayed as tooltip text. */
        @api
        iconAlternativeText?: string;

        /** The Lightning Design System name of the icon to be displayed inside the badge. */
        @api
        iconName?: string;

        /** The position for the icon inside the badge. Valid values are 'start' (displayed before the text) and 'end' (displayed after the text). */
        @api
        iconPosition?: 'start' | 'end';

        /** The text to be displayed inside the badge. */
        @api
        label: string;
    }

    export type Badge = LightningBadge;
}

declare module 'lightning/barcodeScanner' {
    import { LightningElement, api } from 'lwc';

    /** Represents a label which holds a small amount of information, such as the number of unread notifications. */
    export default class LightningBarcodeScanner extends LightningElement {
        /** Specifies whether this component should be displayed in a disabled state. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The alternative text displayed when the component is disabled. */
        @api
        disabledAlternativeText?: string;

        /** The icon displayed when the component is disabled. */
        @api
        disabledIconSrc?: string;

        /** Specifies whether continuous scan should be enabled. This value defaults to false */
        @api
        enableContinuousScan?: boolean;

        /** The alternative text displayed when the component is enabled. */
        @api
        enabledAlternativeText?: string;

        /** The icon displayed when the component is enabled. */
        @api
        enabledIconSrc?: string;

        /** The size of the icon. Options include xx-small, x-small, medium, or large. This value defaults to medium. */
        @api
        iconSize?: 'xx-small' | 'x-small' | 'medium' | 'large';

        /** The scan event is triggered by a successful scan on a single scan component or by successfully closing the scanner window on a multiple scan component. */
        @api
        onscan?: string;

        /** The BarcodeScanner API for lightning-barcode-scanner supports various scanner options. For the list of barcode scanner option properties, see BarcodeScannerOptions in the Lightning Web Components Developer Guide. */
        @api
        scannerOptions?: string;
    }

    export type BarcodeScanner = LightningBarcodeScanner;
}

declare module 'lightning/breadcrumb' {
    import { LightningElement, api } from 'lwc';

    /** An item in the hierarchy path of the page the user is on. */
    export default class LightningBreadcrumb extends LightningElement {
        /** The URL of the page that the breadcrumb goes to. */
        @api
        href?: string;

        /** The text label for the breadcrumb. */
        @api
        label: string;

        /** The name for the breadcrumb component. This value is optional and can be used to identify the breadcrumb in a callback. */
        @api
        name?: string;
    }

    export type Breadcrumb = LightningBreadcrumb;
}

declare module 'lightning/breadcrumbs' {
    import { LightningElement, api } from 'lwc';

    /** A hierarchy path of the page you're currently visiting within the website or app. */
    export default class LightningBreadcrumbs extends LightningElement {
    }

    export type Breadcrumbs = LightningBreadcrumbs;
}

declare module 'lightning/button' {
    import { LightningElement, api } from 'lwc';

    /** Represents a button element. */
    export default class LightningButton extends LightningElement {
        /** Indicates that the button has an interactive popup element. Valid values are 'true', 'false', 'menu', 'listbox', 'tree', 'grid', or 'dialog'. */
        @api
        ariaHaspopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

        /** Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Reserved for internal use. If present, disables button animation. */
        @api
        disableAnimation?: boolean;

        /** The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. */
        @api
        iconName?: string;

        /** Describes the position of the icon with respect to body. Options include left and right. This value defaults to left. */
        @api
        iconPosition?: 'left' | 'right';

        /** The text to be displayed inside the button. */
        @api
        label?: string;

        /** The name for the button element. This value is optional and can be used to identify the button in a callback. */
        @api
        name?: string;

        /** Expands the button to the available width. Default value is false. */
        @api
        stretch?: boolean;

        /** Specifies the type of button. Valid values are button, reset, and submit. This value defaults to button. */
        @api
        type?: 'button' | 'reset' | 'submit';

        /** The value for the button element. This value is optional and can be used when submitting a form. */
        @api
        value?: string;

        /** The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse and success. This value defaults to neutral. */
        @api
        variant?: 'base' | 'neutral' | 'brand' | 'brand-outline' | 'destructive' | 'destructive-text' | 'inverse' | 'success';
    }

    export type Button = LightningButton;
}

declare module 'lightning/buttonGroup' {
    import { LightningElement, api } from 'lwc';

    /** Represents a group of buttons. */
    export default class LightningButtonGroup extends LightningElement {
    }

    export type ButtonGroup = LightningButtonGroup;
}

declare module 'lightning/buttonIcon' {
    import { LightningElement, api } from 'lwc';

    /** An icon-only HTML button. */
    export default class LightningButtonIcon extends LightningElement {
        /** The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'. */
        @api
        alternativeText?: string;

        /** Indicates that the button has an interactive popup element. Valid values are 'true', 'false', 'menu', 'listbox', 'tree', 'grid', or 'dialog'. */
        @api
        ariaHaspopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

        /** Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The class to be applied to the contained icon element. */
        @api
        iconClass?: string;

        /** The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. Only utility icons can be used in this component. */
        @api
        iconName: string;

        /** The name for the button element. This value is optional and can be used to identify the button in a callback. */
        @api
        name?: string;

        /** The size of the button-icon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium. This value defaults to medium. Valid values are xx-small, x-small, small, medium, and large. */
        @api
        size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

        /** Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space. */
        @api
        tooltip?: string;

        /** Specifies the type of button. Valid values are button, reset, and submit. This value defaults to button. */
        @api
        type?: 'button' | 'reset' | 'submit';

        /** The value for the button element. This value is optional and can be used when submitting a form. */
        @api
        value?: string;

        /** The variant changes the appearance of buttonIcon. Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse. This value defaults to border. */
        @api
        variant?: 'bare' | 'container' | 'brand' | 'border' | 'border-filled' | 'bare-inverse' | 'border-inverse';
    }

    export type ButtonIcon = LightningButtonIcon;
}

declare module 'lightning/buttonIconStateful' {
    import { LightningElement, api } from 'lwc';

    /** An icon-only button that retains state. This component requires API version 41.0 and later. */
    export default class LightningButtonIconStateful extends LightningElement {
        /** The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'. */
        @api
        alternativeText?: string;

        /** Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The icon class. */
        @api
        iconClass?: string;

        /** The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. Note: Only utility icons can be used in this component. */
        @api
        iconName?: string;

        /** The name for the button element. This value is optional and can be used to identify the button in a callback. */
        @api
        name?: string;

        /** Specifies whether button is in selected state or not */
        @api
        selected?: boolean;

        /** The size of the buttonIcon. Options include xx-small, x-small, small, and medium. This value defaults to medium. */
        @api
        size?: 'xx-small' | 'x-small' | 'small' | 'medium';

        /** The value for the button element. This value is optional and can be used when submitting a form. */
        @api
        value?: string;

        /** The variant changes the appearance of buttonIcon. Accepted variants include border, border-filled, and border-inverse. This value defaults to border. */
        @api
        variant?: 'border' | 'border-filled' | 'border-inverse';
    }

    export type ButtonIconStateful = LightningButtonIconStateful;
}

declare module 'lightning/buttonMenu' {
    import { LightningElement, api } from 'lwc';

    /** Represents a dropdown menu with a list of actions or functions. */
    export default class LightningButtonMenu extends LightningElement {
        /** The assistive text for the button. */
        @api
        alternativeText?: string;

        /** If true, the menu is disabled. Disabling the menu prevents users from opening it. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Describes the reason for showing the draft indicator. This is required when the isDraft attribute is true. */
        @api
        draftAlternativeText?: string;

        /** The name of the icon to be used in the format 'utility:down'. This value defaults to utility:down. If an icon other than utility:down or utility:chevrondown is used, a utility:down icon is appended to the right of that icon. */
        @api
        iconName?: string;

        /** The size of the icon. Options include xx-small, x-small, small, medium, or large. This value defaults to medium. */
        @api
        iconSize?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

        /** If true, the menu trigger shows a draft indicator. This value defaults to false. */
        @api
        isDraft?: boolean;

        /** If true, the menu is in a loading state and shows a spinner. This value defaults to false. */
        @api
        isLoading?: boolean;

        /** Optional text to be shown on the button. */
        @api
        label?: string;

        /** Message displayed while the menu is in the loading state. */
        @api
        loadingStateAlternativeText?: string;

        /** Determines the alignment of the menu relative to the button. Available options are: left, center, right, bottom-left, bottom-center, bottom-right. This value defaults to left. */
        @api
        menuAlignment?: string;

        /** The name for the button element. This value is optional and can be used to identify the button in a callback. */
        @api
        name?: string;

        /** If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment. */
        @api
        nubbin?: string;

        /** Action fired when the menu is opened. */
        @api
        onopen?: EventListener;

        /** Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space. */
        @api
        tooltip?: string;

        /** The value for the button element. This value is optional and can be used when submitting a form. */
        @api
        value?: string;

        /** The variant changes the look of the button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This value defaults to border. */
        @api
        variant?: 'bare' | 'container' | 'border' | 'border-filled' | 'bare-inverse' | 'border-inverse';
    }

    export type ButtonMenu = LightningButtonMenu;
}

declare module 'lightning/buttonStateful' {
    import { LightningElement, api } from 'lwc';

    /** A button that toggles between states. */
    export default class LightningButtonStateful extends LightningElement {
        /** The name of the icon to be used in the format 'utility:close' when the state is true and the button receives focus. */
        @api
        iconNameWhenHover?: string;

        /** The name of the icon to be used in the format 'utility:add' when the state is false. */
        @api
        iconNameWhenOff?: string;

        /** The name of the icon to be used in the format 'utility:check' when the state is true. */
        @api
        iconNameWhenOn?: string;

        /** The text to be displayed inside the button when state is true and the button receives focus. */
        @api
        labelWhenHover?: string;

        /** The text to be displayed inside the button when state is false. */
        @api
        labelWhenOff: string;

        /** The text to be displayed inside the button when state is true. */
        @api
        labelWhenOn: string;

        /** If present, the button is in the selected state. */
        @api
        selected?: boolean;

        /** The variant changes the appearance of the button. Accepted variants include brand, destructive, inverse, neutral, success, and text. This value defaults to neutral. */
        @api
        variant?: 'brand' | 'destructive' | 'inverse' | 'neutral' | 'success' | 'text';
    }

    export type ButtonStateful = LightningButtonStateful;
}

declare module 'lightning/card' {
    import { LightningElement, api } from 'lwc';

    /** Cards are used to apply a container around a related grouping of information. */
    export default class LightningCard extends LightningElement {
        /** Placeholder for actionable components, such as lightning-button or lightning-button-menu. Actions are displayed on the top corner of the card after the title. */
        @api
        actions?: string;

        /** Placeholder for your content in the card body. */
        @api
        default?: string;

        /** Placeholder for the card footer, which is displayed at the bottom of the card and is usually optional. For example, the footer can display a 'View All' link to navigate to a list view. */
        @api
        footer?: any;

        /** The headingLevel changes the 'aria-level' attribute value of <h2> tag in the markup for the card's title element. It can take values of (1, 2, 3, 4, 5, 6) */
        @api
        headingLevel?: string;

        /** Hides the header chunk of the card when set to `true`. Requires you to set the `label` attribute to supplement a non-rendered header. If `label` isn't set, you get a `console.warn` error. */
        @api
        hideHeader?: boolean;

        /** The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title. */
        @api
        iconName?: string;

        /** Assistive label for the card header. Only shown if `hideHeader` attribute is set to `true`. */
        @api
        label?: string;

        /** The variant changes the appearance of the card. Accepted variants include base or narrow. This value defaults to base. */
        @api
        variant?: 'base' | 'narrow';
    }

    export type Card = LightningCard;
}

declare module 'lightning/carousel' {
    import { LightningElement, api } from 'lwc';

    /** A collection of images that are displayed one at a time. */
    export default class LightningCarousel extends LightningElement {
        /** Specifies whether the carousel should stop looping from the beginning after the last item is displayed. The default value is false. */
        @api
        disableAutoRefresh?: boolean;

        /** Specifies whether auto scroll is disabled. The default value is false. */
        @api
        disableAutoScroll?: boolean;

        /** The auto scroll duration. The default is 5 seconds, after that the next image is displayed. */
        @api
        scrollDuration?: number;
    }

    export type Carousel = LightningCarousel;
}

declare module 'lightning/carouselImage' {
    import { LightningElement, api } from 'lwc';

    /** Use lightning-carousel-image components nested in lightning-carousel to specify up to five images. For each image, optionally provide header and descriptive text that the carousel displays below the image. You can also hyperlink the images. */
    export default class LightningCarouselImage extends LightningElement {
        /** Assistive text for the image. */
        @api
        alternativeText?: string;

        /** Text displayed under the header. */
        @api
        description?: string;

        /** Text for the label that's displayed under the image. */
        @api
        header?: string;

        /** A URL to create a link for the image. Clicking the image opens the link in the same frame. */
        @api
        href?: string;

        /** The path to the image. */
        @api
        src?: string;
    }

    export type CarouselImage = LightningCarouselImage;
}

declare module 'lightning/checkboxGroup' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningCheckboxGroupOption {
        label?: string;
        value?: string;
    }
// IC2 END

    /** A checkbox group that enables selection of single or multiple options. This component requires API version 41.0 and later. */
    export default class LightningCheckboxGroup extends LightningElement {
        /** Set to true if the checkbox group is disabled. Checkbox selections can't be changed for a disabled checkbox group. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Text label for the checkbox group. */
        @api
        label: string;

        /** Optional message displayed when no checkbox is selected and the required attribute is set to true. */
        @api
        messageWhenValueMissing?: string;

        /** The name of the checkbox group. */
        @api
        name: string;

        /** Array of label-value pairs for each checkbox. */
        @api
        options: Array<LightningCheckboxGroupOption>;

        /** Set to true if at least one checkbox must be selected. This value defaults to false. */
        @api
        required?: boolean;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: string;

        /** The list of selected checkboxes. Each array entry contains the value of a selected checkbox. The value of each checkbox is set in the options attribute. */
        @api
        value: string[];

        /** The variant changes the appearance of the checkbox group. Accepted variants include standard and label-hidden. The default is standard. Use these variants instead of the slds-form-element_horizontal or slds-form-element_stacked Lightning Design System classes. */
        @api
        variant?: 'standard' | 'label-hidden';

        /**
         * Indicates whether the checkbox group has any validity errors.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when the checkbox value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message?: string): void;

        /** Displays an error message if the checkbox value is required and no option is selected. */
        showHelpMessageIfInvalid(): void;
    }

    export type CheckboxGroup = LightningCheckboxGroup;
// IC2 BEGIN
    export type CheckboxGroupOption = LightningCheckboxGroupOption;
// IC2 END
}

declare module 'lightning/clickToDial' {
    import { LightningElement, api } from 'lwc';

    /** Renders a formatted phone number as click-to-dial enabled or disabled for Open CTI and Voice. This component requires API version 41.0 and later. */
    export default class LightningClickToDial extends LightningElement {
        /** Comma-separated list of parameters to pass to the third-party phone system. */
        @api
        params?: string;

        /** The Salesforce record Id that's associated with the phone number. */
        @api
        recordId?: string;

        /** The phone number. */
        @api
        value: string;
    }

    export type ClickToDial = LightningClickToDial;
}

declare module 'lightning/combobox' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningComboboxOption {
        label?: string;
        value?: any;
        description?: string;
    }
// IC2 END

    /** A widget that provides an input field that is readonly, accompanied with a dropdown list of selectable options. */
    export default class LightningCombobox extends LightningElement {
        /** Defines descriptive text for a list item. The descriptive text displays below the label of the list item. When adding descriptions, specify a description for each item in a list. If some items are missing descriptions, the text of the items can be misaligned. */
        @api
        description?: string;

        /** Specifies that an input element should be disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Specifies where the drop-down list is aligned with or anchored to the selection field. By default the list is aligned with the selection field at the top so the list opens down.  Use bottom-left to make the selection field display at the bottom so the list opens above it.  Use auto to let the component determine where to open the list based on space available. */
        @api
        dropdownAlignment?: string;

        /** Help text detailing the purpose and function of the combobox. */
        @api
        fieldLevelHelp?: string;

        /** Text label for the combobox. */
        @api
        label?: string;

        /** Error message to be displayed when the value is missing and input is required. */
        @api
        messageWhenValueMissing?: string;

        /** Specifies the name of an input element. */
        @api
        name?: string;

        /** A list of options that are available for selection. Each option has the following attributes: label and value. */
        @api
        options: Array<LightningComboboxOption>;

        /** Text that is displayed before an option is selected, to prompt the user to select an option. The default is "Select an Option". */
        @api
        placeholder?: string;

        /** Specifies that an input field is read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies that an input field must be filled out before submitting the form. This value defaults to false. */
        @api
        required?: boolean;

        /** Displays a spinner to indicate activity in the dropdown list. This value defaults to false. */
        @api
        spinnerActive?: boolean;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** Specifies the value of an input element. */
        @api
        value?: any;

        /** The variant changes the appearance of an input field. Accepted variants include standard and label-inline, label-stacked, and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-stacked' | 'label-hidden';

        /**
         * Returns the valid attribute value (Boolean) on the ValidityState object.
         * @returns The valid attribute value (Boolean) on the ValidityState object
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when the combobox value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message: string): void;

        /** Shows the help message if the combobox is in an invalid state. */
        showHelpMessageIfInvalid(): void;
    }

    export type Combobox = LightningCombobox;
// IC2 BEGIN
    export type ComboboxOption = LightningComboboxOption;
// IC2 END
}

declare module 'lightning/conversationToolkitApi' {
    import { LightningElement, api } from 'lwc';

    /** Conversation Toolkit API is a collection of front-end API methods for interacting with the MIAW or Enhanced Messaging product. */
    export default class LightningConversationToolkitApi extends LightningElement {

        /**
         * Inserts the specified text content into the agent publisher. setAtCursor is optional.
         * @param recordId The record ID
         * @param message The message
         * @param setAtCursor Whether or not to set at the cursor
         * @returns  Returns a Promise. Success resolves to true. The Promise is rejected if there's an error.
         */
        setAgentInput(recordId: string, message: string, setAtCursor?: boolean): Promise<boolean>;

        /**
         * Sends a new conversation text message from the agent.
         * @param recordId The record ID
         * @param message The message
         * @returns  Returns a Promise. Success resolves to true. The Promise is rejected if there's an error.
         */
        sendTextMessage(recordId: string, message: string): Promise<boolean>;

        /**
         * Returns contents of the visible Conversation Log. Only returns Text formatted Static Content Messages.
         * @param recordId The record ID
         * @returns Returns a Promise. Success resolves to a response object that contains text messages. The Promise is rejected if there's an error.
         */
        getConversationLog(recordId: string): Promise<any>;

        /**
         * Inactivates the conversation record for the given record ID.
         * @param recordId The record ID
         * @returns Returns a promise that resolves to true. The promise is rejected if there’s an error.
         */
        inactivateConversation(recordId: string): Promise<boolean>;

        /**
         * Ends the given conversation record.
         * @param recordId The record ID
         * @returns Returns a Promise. Success resolves to true. The Promise is rejected if there's an error.
         */
        endConversation(recordId: string): Promise<boolean>;
    }

    export type ConversationToolkitApi = LightningConversationToolkitApi;
}

declare module 'lightning/datatable' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface RowActionEvent<ROWVALUE = any> extends Event {
        detail: RowDetail<ROWVALUE>;
    }

    export interface RowDetail<ROWVALUE = any> {
        /** The action that triggered the event */
        action: RowAction;
        /** The row's value from the table's data attribute */
        row: ROWVALUE;
    }

    export interface RowAction {
        /** Required. The label that's displayed for the action. */
        label: string;
        /** Required. The name of the action, which identifies the selected action. */
        name: string;
        /** Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false. */
        disabled?: boolean;
        /** The name of the icon to be displayed to the right of the action item. */
        iconName?: string;
    }

    export interface DatatableColumn {
        /** Appends a dropdown menu of actions to a column. You must pass in a list of label-name pairs. */
        actions?: RowAction[];

        /** Provides additional customization, such as appending an icon to the output. For more information, see Appending an Icon to Column Data. */
        cellAttributes?: CellAttributes;

        /** Use instead of fieldName to give a column a unique ID if the same field name is used for two columns. */
        columnKey?: string;

        /** Displays a lock icon when a field isn't editable. */
        displayReadOnlyIcon?: boolean;

        /** Specifies whether a column supports inline editing. The default is false. */
        editable?: boolean;

        /** Required. The name that binds the columns attributes to the associated data. Each column's attribute must correspond to an item in the data array. */
        fieldName: string;

        /** Specifies the width of a column in pixels and makes the column non-resizable. */
        fixedWidth?: number;

        /** Hides the column label and displays only an icon when iconName is also specified. The label property is still required and is used for the icon's title and alternativeText attributes. */
        hideLabel?: boolean;

        /** The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label. */
        iconName?: string;

        /** The width of the column when it's initialized, which must be within the min-column-width and max-column-width values, or within 50px and 1000px if they are not provided. */
        initialWidth?: number;

        /** Required. The text label displayed in the column header. */
        label: string;

        /** Specifies whether the column can be sorted. The default is false. */
        sortable?: boolean;

        /** The sort direction. */
        sortDirection?: 'asc' | 'desc';

        /** Required. The data type to be used for data formatting. For more information, see Formatting with Data Types. */
        type?: 'action' | 'boolean' | 'button' | 'button-icon' | 'currency' | 'date' | 'date-local' | 'email' | 'location' | 'number' | 'percent' | 'phone' | 'text' | 'url' | string;

        /** Provides custom formatting with component attributes for the data type. For example, currency-code for the currency type. */
        typeAttributes?: TypeAttributes;

        /** Specifies whether text in a column is wrapped when the table renders. Wrapped text vertically expands a row to reveal its full content. */
        wrapText?: boolean;
    }

    export interface CellAttributes {
        class?: string;

        /** Required. The Lightning Design System name of the icon, for example, utility:down. */
        iconName?: string;

        /** The label for the icon to be displayed on the right of the icon. */
        iconLabel?: string;

        /** The position of the icon relative to the data. Valid options include left and right. This value defaults to left. */
        iconPosition?: 'left' | 'right';

        /** Descriptive text for the icon. */
        iconAlternativeText?: string;

        alignment?: 'left' | 'right' | 'center';
    }

    export type stringOrFieldRef = string | { fieldName: string }

    /** See 'Formatting with Data Types' at https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation for more details */
    export interface TypeAttributes {
        alternativeText?: string;
        class?: string;
        currencyCode?: string;
        currencyDisplayAs?: string;
        day?: 'numeric' | '2-digit';
        disabled?: boolean;
        era?: 'narrow' | 'short' | 'long';
        hour?: 'numeric' | '2-digit';
        hour12?: boolean;
        iconClass?: string;
        iconName?: string;
        iconPosition?: string;
        label?: stringOrFieldRef;
        latitude?: string;
        linkify?: boolean;
        longitude?: string;
        maximumFractionDigits?: number;
        maximumSignificantDigits?: number;
        menuAlignment?: string;
        minimumFractionDigits?: number;
        minimumIntegerDigits?: number;
        minimumSignificantDigits?: number;
        minute?: 'numeric' | '2-digit';
        month?: 'narrow' | 'short' | 'long' | '2-digit';
        name?: string;
        rowActions?: RowAction[];
        second?: 'numeric' | '2-digit';
        step?: number;
        target?: string;
        timeZone?: string;
        timeZoneName?: string;
        title?: string;
        tooltip?: string;
        value?: stringOrFieldRef;
        variant?: string;
        weekday?: 'narrow' | 'short' | 'long';
        year?: 'numeric' | '2-digit';
    }

    interface DatatableError {
        title: string;
        messages: Array<string>;
    }

    export type DatatableRowError = DatatableError & { fieldNames: Array<string> }

    interface DatatableErrorValues {
        /** Row level errors */
        rows: { [rowKey: string]: DatatableRowError } | null

        /** Table level errors */
        table: DatatableError | null
    }
// IC2 END

    /** A table that displays columns of data, formatted according to type. This component requires API version 41.0 and later. */
    export default class LightningDatatable extends LightningElement {
        /** An ID of an element that provides a description for the table element. */
        @api
        ariaDescribedby?: string;

        /** Specifies the ID or list of IDs of the element or elements that contain visible descriptive text to caption or describe the table. */
        @api
        ariaLabelledby?: string;

        /** Specifies how column widths are calculated. Set to 'fixed' for columns with equal widths. Set to 'auto' for column widths that are based on the width of the column content and the table width. The default is 'fixed'. Valid values are 'auto' and 'fixed'. */
        @api
        columnWidthsMode?: 'auto' | 'fixed';

        /** Array of the columns object that's used to define the data types. Required properties include 'label', 'dataKey', and 'type'. The default type is 'text'. */
        @api
        columns?: Array<DatatableColumn>;

        /** The array of data to be displayed. */
        @api
        data?: any[];

        /** Set value to 'enable' on custom elements to enable keyboard navigation. */
        @api
        dataNavigation?: string;

        /** Specifies the default sorting direction on an unsorted column. Valid options include 'asc' and 'desc'. The default is 'asc' for sorting in ascending order. */
        @api
        defaultSortDirection?: 'asc' | 'desc';

        /** Prevents row selection with a list of key-field values. */
        @api
        disabledRows?: string;

        /** The current values per row that are provided during inline edit. */
        @api
        draftValues?: any;

        /** Enables or disables infinite loading. The default is false. */
        @api
        enableInfiniteLoading?: boolean;

        /** Specifies an object containing information about cell level, row level, and table level errors. When it's set, error messages are displayed on the table accordingly. */
        @api
        errors?: Array<DatatableErrorValues>;

        /** If present with hide-table-header, the table borders are hidden. */
        @api
        hideBorders?: boolean;

        /** Hides or displays the checkbox column for row selection. To hide the checkbox column, set hideCheckboxColumn to true. The default is false. */
        @api
        hideCheckboxColumn?: boolean;

        /** If present, the table header is hidden. */
        @api
        hideTableHeader?: boolean;

        /** Specifies whether more data is being loaded and displays a spinner if so. The default is false. */
        @api
        isLoading?: boolean;

        /** Required for better performance. Associates each row with a unique ID. */
        @api
        keyField: string;

        /** Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table. The default is 20. */
        @api
        loadMoreOffset?: number;

        /** The maximum width for all columns. The default is 1000px. */
        @api
        maxColumnWidth?: number;

        /** The maximum number of rows that can be selected. Checkboxes are used for selection by default, and radio buttons are used when maxRowSelection is 1. */
        @api
        maxRowSelection?: number;

        /** The minimum width for all columns. The default is 50px. */
        @api
        minColumnWidth?: number;

        /** The action triggered when clicking on the table footer bar's cancel button during inline edit. All edited cells are reverted to their original values. */
        @api
        oncancel?: EventListener;

        /** The action triggered when a cell's value changes after an inline edit. Returns the draftValues object. */
        @api
        oncellchange?: EventListener;

        /** The action triggered when a header action is clicked. By default, it also closes the header actions menu. Returns the action and columnDefinition objects. */
        @api
        onheaderaction?: EventListener;

        /** The action triggered when infinite loading loads more data. */
        @api
        onloadmore?: EventListener;

        /** The action triggered when a row action is clicked. By default, it also closes the row actions menu. Returns the eventDetails object. */
        @api
        onrowaction?: (ev: RowActionEvent) => void;

        /** The action triggered when a row is selected. Returns the selectedRows object. */
        @api
        onrowselection?: EventListener;

        /** The action triggered when clicking on the table footer bar's save button during inline edit. Returns the draftValues object. */
        @api
        onsave?: EventListener;

        /** The action triggered when a column is sorted. Returns fieldName and sortDirection. */
        @api
        onsort?: EventListener;

        /** Enables and configures advanced rendering modes. */
        @api
        renderConfig?: string;

        /** Enables virtual rendering when set to role-based. Valid values include 'default' and 'role-based'. Default value is 'default'. */
        @api
        renderMode?: 'default' | 'role-based';

        /** Specifies whether column resizing is disabled. The default is false. */
        @api
        resizeColumnDisabled?: boolean;

        /** The width to resize the column when user press left or right arrow. The default is 10px. */
        @api
        resizeStep?: number;

        /** Determines where to start counting the row number. The default is 0. */
        @api
        rowNumberOffset?: number;

        /** Enables programmatic row selection with a list of keyField values. */
        @api
        selectedRows?: Array<any>;

        /** Shows or hides the row number column. Set to true to show the row number column. The default is false. */
        @api
        showRowNumberColumn?: boolean;

        /** Specifies whether to render checkboxes or radio buttons in the selection column. Use this attribute only when you set max-row-selection='1' to restrict selection to one row. Valid values are radio and checkbox. The default value is radio. */
        @api
        singleRowSelectionMode?: 'radio' | 'checkbox';

        /** The column fieldName that controls the sorting order. Sort the data using the onsort event handler. */
        @api
        sortedBy?: string;

        /** Specifies the sorting direction. Sort the data using the onsort event handler. Valid options include 'asc' and 'desc'. */
        @api
        sortedDirection?: 'asc' | 'desc';

        /** If present, the footer that displays the Save and Cancel buttons is hidden during inline editing. */
        @api
        suppressBottomBar?: boolean;

        /** Set value to {internalTabIndex} on custom elements to enable keyboard navigation. */
        @api
        tabindex?: number;

        /** Specifies how the table header is wrapped. Valid options are 'all', 'none', and 'by-column'. Set to 'all' to wrap all column headers. Set to 'none' to clip all column headers. Set to 'by-column' to wrap/clip column headers based on the wrap/clip setting for that individual column. The default is 'none'. */
        @api
        wrapTableHeader?: 'all' | 'none' | 'by-column';

        /** This value specifies the number of lines after which the content will be cut off and hidden. It must be at least 1 or more. The text in the last line is truncated and shown with an ellipsis. */
        @api
        wrapTextMaxLines?: number;

        /**
         * Returns an array of data in each selected row.
         * @returns An array of data in each selected row.
         */
        getSelectedRows(): Array<any>;

        /** Programmatically change an editable focused field to edit mode from an external element such as a button. */
        openInlineEdit(): void;

        /** Scrolls to the first row of the datatable. */
        scrollToTop(): void;
    }

    export type Datatable = LightningDatatable;
}

declare module 'lightning/dualListbox' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningDualListboxOption {
        label?: string;
        value?: string;
    }
// IC2 END

    /** A widget that provides an input listbox, accompanied with a listbox of selectable options. Order of selected options is saved. This component requires API version 41.0 and later. */
    export default class LightningDualListbox extends LightningElement {
        /** Label for add button. */
        @api
        addButtonLabel?: string;

        /** Set to true to hide the Up and Down buttons used for reordering the Selected list items. */
        @api
        disableReordering?: boolean;

        /** Specifies that an input element should be disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Label for down button. */
        @api
        downButtonLabel?: string;

        /** Help text detailing the purpose and function of name compound field. */
        @api
        fieldLevelHelp?: string;

        /** Label for the dual list box. */
        @api
        label: string;

        /** Maximum number of options required in the selected options list box. */
        @api
        max?: number;

        /** Error message to be displayed when a range overflow is detected. */
        @api
        messageWhenRangeOverflow?: string;

        /** Error message to be displayed when a range underflow is detected. */
        @api
        messageWhenRangeUnderflow?: string;

        /** Error message to be displayed when the value is missing and input is required. */
        @api
        messageWhenValueMissing?: string;

        /** Minimum number of options required in the selected options list box. */
        @api
        min?: number;

        /** Specifies the name of an input element. */
        @api
        name?: string;

        /** A list of options that are available for selection. Each option has the following attributes: label and value. */
        @api
        options: Array<LightningDualListboxOption>;

        /** Label for remove button. */
        @api
        removeButtonLabel?: string;

        /** Specifies that an input field must be filled out before submitting the form. This value defaults to false. */
        @api
        required?: boolean;

        /** A list of required options that cannot be removed from selected options list box. This list is populated with values from options attribute. */
        @api
        requiredOptions?: Array<any>;

        /** Label for selected options list box. */
        @api
        selectedLabel: string;

        /** Displays a spinner to indicate activity in the list box. This value defaults to false. */
        @api
        showActivityIndicator?: boolean;

        /** Number of items that display before vertical scrollbars are displayed for the list boxes. Determines the vertical size of the dual list box. */
        @api
        size?: number;

        /** Label for source options list box. */
        @api
        sourceLabel: string;

        /** Label for up button. */
        @api
        upButtonLabel?: string;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** Specifies the value of an input element. */
        @api
        value?: any;

        /** A list of default options that are included in the selected options list box. This list is populated with values from the options attribute. */
        @api
        values?: Array<any>;

        /** The variant changes the appearance of the compound field. Accepted variants include standard, label-inline, label-stacked, and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-stacked' | 'label-hidden';

        /**
         * Returns the valid attribute value (Boolean) on the ValidityState object.
         * @returns The valid attribute value (Boolean) on the ValidityState object.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when the dual listbox value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message?: string): void;

        /** Displays an error message if the dual listbox value is required. */
        showHelpMessageIfInvalid(): void;
    }

    export type DualListbox = LightningDualListbox;
// IC2 BEGIN
    export type DualListboxOption = LightningDualListboxOption;
// IC2 END
}

declare module 'lightning/dynamicIcon' {
    import { LightningElement, api } from 'lwc';

    /** Represents various animated icons with different states. This component requires API version 41.0 and later. */
    export default class LightningDynamicIcon extends LightningElement {
        /** The alternative text used to describe the dynamicIcon. This text should describe what's happening. For example, 'Graph is refreshing', not what the icon looks like, 'Graph'. */
        @api
        alternativeText?: string;

        /** The option attribute changes the appearance of the dynamic icon. The options available depend on the type. eq: play (default) or stop, score: positive (default) or negative, strength: -3, -2, -1, 0 (default), 1, 2, 3, trend: neutral (default), up, or down */
        @api
        option?: string;

        /** The Lightning Design System name of the dynamicIcon. Valid values are: ellie, eq, score, strength, trend, and waffle. */
        @api
        type: 'ellie' | 'eq' | 'score' | 'strength' | 'trend' | 'waffle';
    }

    export type DynamicIcon = LightningDynamicIcon;
}

declare module 'lightning/fileUpload' {
    import { LightningElement, api } from 'lwc';

    /** A file uploader for uploading and attaching files to records. */
    export default class LightningFileUpload extends LightningElement {
        /** Comma-separated list of file extensions that can be uploaded in the format .ext, such as .pdf, .jpg, or .png */
        @api
        accept?: Array<any>;

        /** Specifies whether this component should be displayed in a disabled state. Disabled components can't be clicked. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Specifies the API name of a custom field on the ContentVersion object that can be used to enable guest users to upload files to a record. */
        @api
        fileFieldName?: string;

        /** Specifies a value for the custom field defined by file-field-name. */
        @api
        fileFieldValue?: string;

        /** The text label for the file uploader. */
        @api
        label: string;

        /** Specifies whether a user can upload more than one file simultaneously. This value defaults to false. */
        @api
        multiple?: boolean;

        /** Specifies the name of the input element. */
        @api
        name: string;

        /** The action triggered when files have finished uploading. */
        @api
        onuploadfinished?: EventListener;

        /** The record Id of the record that the uploaded file is associated to. */
        @api
        recordId?: string;
    }

    export type FileUpload = LightningFileUpload;
}

declare module 'lightning/flow' {
    import { LightningElement, api } from 'lwc';

    /** Represents a flow interview. */
    export default class LightningFlow extends LightningElement {
        /** The API name of the flow interview. Required to start a new flow interview. Setting this value resets the flowInterviewId. This attribute doesn't set if there's an ongoing interview for this flow. Pause or finish the interview in progress to start a new one. */
        @api
        flowApiName?: string;

        /** Sets the behavior when the flow completes. Valid values are NONE and RESTART. Default is RESTART. Not required. */
        @api
        flowFinishBehavior?: 'NONE' | 'RESTART';

        /** An array of values to provide when starting an interview. Setting this value resets the flowInterviewId. This attribute doesn't set if there's an ongoing interview for this flow. Pause or finish the interview in progress to start a new one. */
        @api
        flowInputVariables?: Array<any>;

        /** The ID of interview you use to resume a flow. Required to resume an interview. Setting this value resets flowApiName and flowInputVariables. This attribute doesn't set if there's an ongoing interview for this flow. Pause or finish the interview in progress to resume a new one. */
        @api
        flowInterviewId?: string;

        /** Called when the status changes. */
        @api
        onstatuschange?: Function;

        /**
         * Call this method with a flowInterviewId to resume an existing paused interview.
         * @param flowInterviewId The ID of interview you use to resume a flow. Required.
         */
        resumeFlow(flowInterviewId: string): void;

        /**
         * Starts a flow interview.
         * @param flowApiName The API name of the flow interview. Required.
         * @param flowInputVariables An array of values to provide when starting an interview.
         */
        startFlow(flowApiName: string, flowInputVariables?: Array<any>): void;
    }

    export type Flow = LightningFlow;
}

declare module 'lightning/formattedAddress' {
    import { LightningElement, api } from 'lwc';

    /** Displays a formatted address that provides a link to the given location on Google Maps. This component requires API version 42.0 and later. */
    export default class LightningFormattedAddress extends LightningElement {
        /** The city detail for the address. */
        @api
        city?: string;

        /** The country detail for the address. */
        @api
        country?: string;

        /** Specifies whether the address is clickable. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The latitude of the location if known. Latitude values must be within -90 and 90. */
        @api
        latitude?: number;

        /** The locale of the address. The default value is 'en-US'. */
        @api
        locale?: string;

        /** The longitude of the location if known. Longitude values must be within -180 and 180. */
        @api
        longitude?: number;

        /** The postal code detail for the address. */
        @api
        postalCode?: string;

        /** The province detail for the address. */
        @api
        province?: string;

        /** Displays a static map of the location using Google Maps. This value defaults to false. */
        @api
        showStaticMap?: boolean;

        /** The street detail for the address. */
        @api
        street?: string;
    }

    export type FormattedAddress = LightningFormattedAddress;
}

declare module 'lightning/formattedDateTime' {
    import { LightningElement, api } from 'lwc';

    /** Displays formatted date and time. */
    export default class LightningFormattedDateTime extends LightningElement {
        /** Allowed values are numeric or 2-digit. */
        @api
        day?: 'numeric' | '2-digit';

        /** Allowed values are narrow, short, or long. */
        @api
        era?: 'narrow' | 'short' | 'long';

        /** Allowed values are numeric or 2-digit. */
        @api
        hour?: 'numeric' | '2-digit';

        /** Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is determined by the user's locale. */
        @api
        hour12?: boolean;

        /** Allowed values are numeric or 2-digit. */
        @api
        minute?: 'numeric' | '2-digit';

        /** Allowed values are 2-digit, narrow, short, or long. */
        @api
        month?: '2-digit' | 'narrow' | 'short' | 'long';

        /** Allowed values are numeric or 2-digit. */
        @api
        second?: 'numeric' | '2-digit';

        /** The time zone to use. Implementations can include any time zone listed in the IANA time zone database. The default is the runtime's default time zone. Use this attribute only if you want to override the default time zone. */
        @api
        timeZone?: string;

        /** Allowed values are short or long. For example, the Pacific time zone would display as 'PST' if you select 'short', or 'Pacific Standard Time' if you select 'long.' */
        @api
        timeZoneName?: 'short' | 'long';

        /** The value to be formatted, which can be a Date object, timestamp, or an ISO8601 formatted string. */
        @api
        value?: any;

        /** Specifies how to display the day of the week. Allowed values are narrow, short, or long. */
        @api
        weekday?: 'narrow' | 'short' | 'long';

        /** Allowed values are numeric or 2-digit. */
        @api
        year?: 'numeric' | '2-digit';
    }

    export type FormattedDateTime = LightningFormattedDateTime;
}

declare module 'lightning/formattedEmail' {
    import { LightningElement, api } from 'lwc';

    /** Displays an email as a hyperlink with the mailto: URL scheme. This component requires API version 41.0 and later. */
    export default class LightningFormattedEmail extends LightningElement {
        /** If present, the email icon is hidden and only the email address is displayed. */
        @api
        hideIcon?: boolean;

        /** The text label for the email. */
        @api
        label?: string;

        /** The email address that's displayed if a label is not provided. */
        @api
        value?: string;
    }

    export type FormattedEmail = LightningFormattedEmail;
}

declare module 'lightning/formattedLocation' {
    import { LightningElement, api } from 'lwc';

    /** Displays a geolocation in Decimal degrees (DD) using the format [latitude, longitude]. This component requires API version 41.0 and later. */
    export default class LightningFormattedLocation extends LightningElement {
        /** The latitude value of the geolocation. Latitude values must be within -90 and 90. */
        @api
        latitude: number;

        /** The longitude value of the geolocation. Longitude values must be within -180 and 180. */
        @api
        longitude: number;
    }

    export type FormattedLocation = LightningFormattedLocation;
}

declare module 'lightning/formattedName' {
    import { LightningElement, api } from 'lwc';

    /** Displays a formatted name that can include a salutation and suffix. This component requires API version 42.0 and later. */
    export default class LightningFormattedName extends LightningElement {
        /** The value for the first name. */
        @api
        firstName?: string;

        /** The format for which to display the name. Valid values include short, medium, and long. This value defaults to long. */
        @api
        format?: 'short' | 'medium' | 'long';

        /** The value for the informal name. */
        @api
        informalName?: string;

        /** The value for the last name. */
        @api
        lastName?: string;

        /** Specifies the locale that’s used to determine the layout and order of the name fields. In Lightning Experience, this value defaults to the Locale field on the Language & Time Zone page in the user’s personal settings. */
        @api
        locale?: string;

        /** The value for the middle name. */
        @api
        middleName?: string;

        /** The value for the salutation, such as Dr. or Mrs. */
        @api
        salutation?: string;

        /** The value for the suffix. */
        @api
        suffix?: string;
    }

    export type FormattedName = LightningFormattedName;
}

declare module 'lightning/formattedNumber' {
    import { LightningElement, api } from 'lwc';

    /** Displays formatted numbers for decimals, currency, and percentages. */
    export default class LightningFormattedNumber extends LightningElement {
        /** Only used if style='currency', this attribute determines which currency is displayed as an ISO 4217 currency codes such as 'USD' for the US dollar. */
        @api
        currencyCode?: string;

        /** Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol. */
        @api
        currencyDisplayAs?: 'symbol' | 'code' | 'name';

        /** The number formatting style to use. Possible values are decimal, currency, percent, and percent-fixed. This value defaults to decimal. */
        @api
        formatStyle?: 'decimal' | 'currency' | 'percent' | 'percent-fixed';

        /** The maximum number of fraction digits that are allowed. */
        @api
        maximumFractionDigits?: number;

        /** The maximum number of significant digits that are allowed in the range 1 to 21. */
        @api
        maximumSignificantDigits?: number;

        /** The minimum number of fraction digits that are required. */
        @api
        minimumFractionDigits?: number;

        /** The minimum number of integer digits that are required in the range 1 to 21. */
        @api
        minimumIntegerDigits?: number;

        /** The minimum number of significant digits that are required in the range 1 to 21. */
        @api
        minimumSignificantDigits?: number;

        /** The value to be formatted. */
        @api
        value: number;
    }

    export type FormattedNumber = LightningFormattedNumber;
}

declare module 'lightning/formattedPhone' {
    import { LightningElement, api } from 'lwc';

    /** Displays a phone number as a hyperlink with the tel: URL scheme. This component requires API version 41.0 and later. */
    export default class LightningFormattedPhone extends LightningElement {
        /** Displays the phone number as plain text instead of a link. The number can't be clicked or receive focus. */
        @api
        disabled?: boolean;

        /** Sets the phone number to display. */
        @api
        value?: number;
    }

    export type FormattedPhone = LightningFormattedPhone;
}

declare module 'lightning/formattedRichText' {
    import { LightningElement, api } from 'lwc';

    /** Displays rich text that's formatted with whitelisted tags and attributes. Other tags and attributes are removed and only their text content is displayed. This component requires API version 41.0 and later. */
    export default class LightningFormattedRichText extends LightningElement {
        /** Prevents the component from creating links in the rich text. */
        @api
        disableLinkify?: boolean;

        /** Sets the rich text to display. */
        @api
        value?: string;
    }

    export type FormattedRichText = LightningFormattedRichText;
}

declare module 'lightning/formattedText' {
    import { LightningElement, api } from 'lwc';

    /** Displays text, replaces newlines with line breaks, and linkifies if requested. This component requires API version 41.0 and later. */
    export default class LightningFormattedText extends LightningElement {
        /** Specifies whether the text should be converted to a link. If set to true, URLs and email addresses are displayed in anchor tags. */
        @api
        linkify?: boolean;

        /** Text to output. */
        @api
        value?: string;
    }

    export type FormattedText = LightningFormattedText;
}

declare module 'lightning/formattedTime' {
    import { LightningElement, api } from 'lwc';

    /** Displays a formatted time in user's locale format. This component requires API version 42.0 and later. */
    export default class LightningFormattedTime extends LightningElement {
        /** The time value to format. */
        @api
        value?: string;
    }

    export type FormattedTime = LightningFormattedTime;
}

declare module 'lightning/formattedUrl' {
    import { LightningElement, api } from 'lwc';

    /** Displays a URL as a hyperlink. This component requires API version 41.0 and later. */
    export default class LightningFormattedUrl extends LightningElement {
        /** The text to display in the link. */
        @api
        label?: string;

        /** Specifies where to open the link. Options include _blank, _parent, _self, and _top. */
        @api
        target?: '_blank' | '_parent' | '_self' | '_top';

        /** The text to display when the mouse hovers over the link. */
        @api
        tooltip?: string;

        /** The URL to be formatted. */
        @api
        value?: string;
    }

    export type FormattedUrl = LightningFormattedUrl;
}

declare module 'lightning/helptext' {
    import { LightningElement, api } from 'lwc';

    /** An icon with a text popover. */
    export default class LightningHelptext extends LightningElement {
        /** The assistive text for the button icon. This value defaults to 'Help'. */
        @api
        alternativeText?: string;

        /** Text to be shown in the popover. */
        @api
        content?: string;

        /** The Lightning Design System name of the icon used as the visible element. Names are written in the format 'utility:info' where 'utility' is the category, and 'info' is the specific icon to be displayed. The default value is 'utility:info'. */
        @api
        iconName?: string;

        /** The iconVariant changes the appearance of the icon. Accepted variants include inverse, warning, error. */
        @api
        iconVariant?: 'inverse' | 'warning' | 'error';
    }

    export type Helptext = LightningHelptext;
}

declare module 'lightning/icon' {
    import { LightningElement, api } from 'lwc';

    /** Represents a visual element that provides context and enhances usability. */
    export default class LightningIcon extends LightningElement {
        /** The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'. */
        @api
        alternativeText?: string;

        /** The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. */
        @api
        iconName: string;

        /** The size of the icon. Options include xx-small, x-small, small, medium, or large. This value defaults to medium. */
        @api
        size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

        /** A uri path to a custom svg sprite, including the name of the resource, for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart */
        @api
        src?: string;

        /** The variant changes the appearance of a utility icon. Accepted variants include success, inverse, warning, and error. Use the success variant to change the fill of an icon to green. Use the inverse variant to implement a white fill in utility icons on dark backgrounds. */
        @api
        variant?: 'success' | 'inverse' | 'warning' | 'error';
    }

    export type Icon = LightningIcon;
}

declare module 'lightning/input' {
    import { LightningElement, api } from 'lwc';

    /** Represents interactive controls that accept user input depending on the type attribute. */
    export default class LightningInput extends LightningElement {
        /** Specifies the types of files that the server accepts. This attribute can be used only when type='file'. */
        @api
        accept?: string;

        /** Controls autofilling of the field. This attribute is supported for email, search, tel, text, and url input types. The values on and off are supported, but the autofill behavior depends on the browser. When you set the autocomplete attribute, the lightning-input component passes the value through to be interpreted by the browser. */
        @api
        autocomplete?: boolean;

        /** Specifies whether the checkbox is checked. This value defaults to false. */
        @api
        checked?: boolean;

        /** Allows an access key to be set on date input fields. */
        @api
        dateAccessKey?: string;

        /** A space-separated list of element IDs whose presence or content is controlled by the date input when type=datetime. On mobile devices, this is merged with ariaControls and timeAriaControls to describe the native date time input. */
        @api
        dateAriaControls?: string;

        /** A space-separated list of element IDs that provide descriptive labels for the date input when type=datetime. On mobile devices, this is merged with ariaDescribedBy and timeAriaDescribedBy to describe the native date time input. */
        @api
        dateAriaDescribedBy?: string;

        /** A space-separated list of element IDs that provide error messages for the date input when type='datetime'. */
        @api
        dateAriaErrorMessage?: string;

        /** Describes the date input to assistive technologies when type=datetime. On mobile devices, this label is merged with ariaLabel and timeAriaLabel to describe the native date time input. */
        @api
        dateAriaLabel?: string;

        /** A space-separated list of element IDs that provide labels for the date input when type=datetime. On mobile devices, this is merged with ariaLabelledBy and timeAriaLabelledBy to describe the native date time input. */
        @api
        dateAriaLabelledBy?: string;

        /** The display style of the date when type='date' or type='datetime'. Valid values are short, medium, and long. The default value is medium. The format of each style is specific to the locale. This attribute has no effect on mobile devices. */
        @api
        dateStyle?: 'short' | 'medium' | 'long';

        /** Specifies that an input element should be disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Help text detailing the purpose and function of the input. This attribute isn't supported for file, toggle, and checkbox-button types. */
        @api
        fieldLevelHelp?: string;

        /** A FileList that contains selected files. This attribute can be used only when type='file'. */
        @api
        files?: FileList | File[];

        /** String value with the formatter to be used for number input. Valid values include decimal, percent, percent-fixed, and currency. */
        @api
        formatter?: 'decimal' | 'percent' | 'percent-fixed' | 'currency';

        /** Specifies whether the spinner is displayed to indicate that data is loading. This value defaults to false. */
        @api
        isLoading?: boolean;

        /** Text label for the input. */
        @api
        label: string;

        /** The maximum acceptable value for the input. This attribute can be used only with number, range, date, time, and datetime input types. For number and range type, the max value is a decimal number. For the date, time, and datetime types, the max value must use a valid string for the type. */
        @api
        max?: string | number;

        /** The maximum number of characters allowed in the field. */
        @api
        maxLength?: number;

        /** Text shown for the active state of a toggle. The default is "Active". */
        @api
        messageToggleActive?: string;

        /** Text shown for then inactive state of a toggle. The default is "Inactive". */
        @api
        messageToggleInactive?: string;

        /** Error message to be displayed when a bad input is detected. */
        @api
        messageWhenBadInput?: string;

        /** Error message to be displayed when a pattern mismatch is detected. */
        @api
        messageWhenPatternMismatch?: string;

        /** Error message to be displayed when a range overflow is detected. */
        @api
        messageWhenRangeOverflow?: string;

        /** Error message to be displayed when a range underflow is detected. */
        @api
        messageWhenRangeUnderflow?: string;

        /** Error message to be displayed when a step mismatch is detected. */
        @api
        messageWhenStepMismatch?: string;

        /** Error message to be displayed when the value is too long. */
        @api
        messageWhenTooLong?: string;

        /** Error message to be displayed when the value is too short. */
        @api
        messageWhenTooShort?: string;

        /** Error message to be displayed when a type mismatch is detected. */
        @api
        messageWhenTypeMismatch?: string;

        /** Error message to be displayed when the value is missing. */
        @api
        messageWhenValueMissing?: string;

        /** The minimum acceptable value for the input. This attribute can be used only with number, range, date, time, and datetime input types. For number and range types, the min value is a decimal number. For the date, time, and datetime types, the min value must use a valid string for the type. */
        @api
        min?: string | number;

        /** The minimum number of characters allowed in the field. */
        @api
        minLength?: number;

        /** Specifies that a user can enter more than one value. This attribute can be used only when type='file' or type='email'. */
        @api
        multiple?: boolean;

        /** Specifies the name of an input element. */
        @api
        name?: string;

        /** The event fired when you press Enter after interacting with the input, or move away from the input so it loses focus. */
        @api
        oncommit?: EventListener;

        /** Specifies the regular expression that the input's value is checked against. This attribute is supported for text, search, url, tel, email, and password types. */
        @api
        pattern?: string;

        /** Text that is displayed when the field is empty, to prompt the user for a valid entry. */
        @api
        placeholder?: string;

        /** Specifies that an input field is read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies that an input field must be filled out before submitting the form. This value defaults to false. */
        @api
        required?: boolean;

        /** Specifies the index of the last character to select in the input element. This attribute is supported only for text type. Use with selection-start to programmatically select a string. */
        @api
        selectionEnd?: number;

        /** Specifies the index of the first character to select in the input element. This attribute is supported only for text type. Use with selection-end to programmatically select a string. */
        @api
        selectionStart?: number;

        /** Granularity of the value, specified as a positive floating point number. Use 'any' when granularity is not a concern. This value defaults to 1. */
        @api
        step?: any;

        /** Allows an access key to be set on time input fields. */
        @api
        timeAccessKey?: string;

        /** A space-separated list of element IDs whose presence or content is controlled by the time input when type=datetime. On mobile devices, this is merged with ariaControls and dateAriaControls to describe the native date time input. */
        @api
        timeAriaControls?: string;

        /** A space-separated list of element IDs that provide descriptive labels for the time input when type=datetime. On mobile devices, this is merged with ariaDescribedBy and dateAriaDescribedBy to describe the native date time input. */
        @api
        timeAriaDescribedBy?: string;

        /** A space-separated list of element IDs that provide error messages for the time input when type='datetime'. */
        @api
        timeAriaErrorMessage?: string;

        /** Describes the time input to assistive technologies when type=datetime. On mobile devices, this label is merged with ariaLabel and dateAriaLabel to describe the native date time input. */
        @api
        timeAriaLabel?: string;

        /** A space-separated list of element IDs that provide labels for the time input when type=datetime. On mobile devices, this is merged with ariaLabelledBy and dateAriaLabelledBy to describe the native date time input. */
        @api
        timeAriaLabelledBy?: string;

        /** The display style of the time when type='time' or type='datetime'. Valid values are short, medium, and long. The default value is short. The medium and long styles currently have the same formatting. */
        @api
        timeStyle?: 'short' | 'medium' | 'long';

        /** Specifies the time zone used when type='datetime' only. This value defaults to the user's Salesforce time zone setting. */
        @api
        timezone?: string;

        /** The type of the input. Valid values are checkbox, checkbox-button, color, date, datetime, time, email, file, password, range, search, tel, text, url, number, and toggle. This value defaults to text. */
        @api
        type?: 'checkbox' | 'checkbox-button' | 'color' | 'date' | 'datetime' | 'time' | 'email' | 'file' | 'password' | 'range' | 'search' | 'tel' | 'text' | 'url' | 'number' | 'toggle';

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** Specifies the value of an input element. */
        @api
        value?: any;

        /** The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-stacked, and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-stacked' | 'label-hidden';

        /**
         * Indicates whether the checkbox group has any validity errors.
         * @returns Whether the checkbox group has any validity errors.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when a form is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message: string): void;

        /** Displays error messages on invalid fields. An invalid field fails at least one constraint validation and returns false when checkValidity() is called. */
        showHelpMessageIfInvalid(): void;
    }

    export type Input = LightningInput;
}

declare module 'lightning/inputAddress' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningInputAddressCountryOption {
        label?: string;
        value?: string;
    }

    export interface LightningInputAddressProvinceOption {
        label?: string;
        value?: string;
    }
// IC2 END

    /** Represents an address compound field. This component requires API version 42.0 and later. */
    export default class LightningInputAddress extends LightningElement {
        /** The label of the address compound field. */
        @api
        addressLabel?: string;

        /** Sets an accessible label for the optional address lookup field. Visible when the show-address-lookup attribute is present. */
        @api
        addressLookupLabel?: string;

        /** The placeholder for the address lookup field, which is visible only when you use show-address-lookup. */
        @api
        addressLookupPlaceholder?: string;

        /** The city field of the address. */
        @api
        city?: string;

        /** The label of the city field of the address. */
        @api
        cityLabel?: string;

        /** The placeholder for the city field. */
        @api
        cityPlaceholder?: string;

        /** The country field of the address. If countryOptions is provided, this country value is selected by default. */
        @api
        country?: string;

        /** Specifies whether the country field is disabled so users can't interact with it. This value defaults to false. */
        @api
        countryDisabled?: boolean;

        /** The label of the country field of the address. */
        @api
        countryLabel?: string;

        /** A list of ISO 3166-1 Alpha-2 country codes to filter the address by when you use the show-address-lookup attribute. Country codes are case-insensitive. You can specify up to five country codes. */
        @api
        countryLookupFilter?: string;

        /** The array of label-value pairs for the country. Displays a dropdown menu of options. */
        @api
        countryOptions?: Array<LightningInputAddressCountryOption>;

        /** The placeholder for the country field. */
        @api
        countryPlaceholder?: string;

        /** Specifies whether the address fields are disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Help text detailing the purpose and function of the address compound field. */
        @api
        fieldLevelHelp?: string;

        /** Hides the province field from the component's fields layout for locales that don't require it. For example, you can use hide-province when the locale is fr-FR or zh-CN. */
        @api
        hideProvince?: string;

        /** Sets the order of the input fields based on a specific locale. Default value is en_US. */
        @api
        locale?: string;

        /** The postal code field of the address. */
        @api
        postalCode?: string;

        /** The label of the postal code field of the address. */
        @api
        postalCodeLabel?: string;

        /** The placeholder for the postal code field. */
        @api
        postalCodePlaceholder?: string;

        /** The province field of the address. If provinceOptions is provided, this province value is selected by default. */
        @api
        province?: string;

        /** The label of the province field of the address. */
        @api
        provinceLabel?: string;

        /** The array of label-value pairs for the province. Displays a dropdown menu of options. */
        @api
        provinceOptions?: Array<LightningInputAddressProvinceOption>;

        /** The placeholder for the province field. */
        @api
        provincePlaceholder?: string;

        /** Specifies whether the address fields are read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies whether the address fields are required. This value defaults to false. */
        @api
        required?: boolean;

        /** If present, address lookup using Google Maps is enabled. */
        @api
        showAddressLookup?: boolean;

        /** When this attribute is present, the street field is rendered as two separate inputs instead of a single textarea. To provide a label for the first street field, use street-label. To provide a label for the second street field, use subpremise-label. */
        @api
        showCompactAddress?: boolean;

        /** The street field of the address. */
        @api
        street?: string;

        /** The label of the street field of the address. */
        @api
        streetLabel?: string;

        /** The placeholder for the street field. */
        @api
        streetPlaceholder?: string;

        /** The value for the subpremise field. The maximum length is 80 characters. Use this field for supplementary street information, such as the building number. Use this attribute with show-compact-address. The subpremise field doesn’t require a value for form submission. */
        @api
        subpremise?: string;

        /** The label for the subpremise field, which is visible only when using show-compact-address. */
        @api
        subpremiseLabel?: string;

        /** The placeholder for the subpremise field, which is visible only when using show-compact-address. */
        @api
        subpremisePlaceholder?: string;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: string;

        /** The variant changes the appearance of the compound field. Accepted variants include standard, label-inline, label-stacked, and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-stacked' | 'label-hidden';

        /**
         * Checks if the input is valid.
         * @returns Whether the input is valid.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed for the specified fieldName when the input address value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         * @param fieldName Name of the field, which must be one of the following: street, city, province, postalCode, country.
         */
        setCustomValidityForField(message: string, fieldName: string): void;

        /** Displays error messages on the address fields if the values are invalid. */
        showHelpMessageIfInvalid(): void;
    }

    export type InputAddress = LightningInputAddress;
// IC2 BEGIN
    export type InputAddressCountryOption = LightningInputAddressCountryOption;
    export type InputAddressProvinceOption = LightningInputAddressProvinceOption;
// IC2 END
}

declare module 'lightning/inputField' {
    import { LightningElement, api } from 'lwc';

    /** Represents an editable input for a field on a Salesforce object. This component requires API version 42.0 and later. */
    export default class LightningInputField extends LightningElement {
        /** Whether or not the field is disabled. Defaults to false for readonly fields, true for other fields. */
        @api
        disabled?: boolean;

        /** The API name of the field to be displayed. */
        @api
        fieldName?: string;

        /** Specifies whether an input field is read-only. This value defaults to false. Not supported for the following field types: rich text, picklist, multi-select picklist, and lookup. A read-only field is not disabled by default. */
        @api
        readOnly?: boolean;

        /** To make an input field required only on the client, include the required attribute. Use this attribute to require a value in a field before the form can be submitted, and the field isn't marked required in Setup. If the field doesn't have a value, the component's client-side validation catches the error before the form data is submitted to the server. */
        @api
        required?: boolean;

        /** The field value, which overrides the existing value. */
        @api
        value?: any;

        /** The variant changes the label position of an input field. Accepted variants include standard, label-hidden, label-inline, and label-stacked. The variant, if specified, determines the label position. Otherwise, the density setting of the parent form determines the label position. */
        @api
        variant?: 'standard' | 'label-hidden' | 'label-inline' | 'label-stacked';

        /** Resets the form fields to their initial values. */
        reset(): void;
    }

    export type InputField = LightningInputField;
}

declare module 'lightning/inputLocation' {
    import { LightningElement, api } from 'lwc';

    /** Represents a geolocation compound field that accepts a latitude and longitude value. This component requires API version 41.0 and later. */
    export default class LightningInputLocation extends LightningElement {
        /** Specifies whether the compound field should be disabled. Disabled fields are grayed out and not clickable. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Help text detailing the purpose and function of location compound field. */
        @api
        fieldLevelHelp?: string;

        /** Text label for the compound field. */
        @api
        label?: string;

        /** The latitude value. Latitude values must be within -90 and 90. */
        @api
        latitude?: string;

        /** The longitude value. Longitude values must be within -180 and 180. */
        @api
        longitude?: string;

        /** Specifies whether the compound field is read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies whether the compound field must be filled out. An error message is displayed if a user interacts with the field and does not provide a value. This value defaults to false. */
        @api
        required?: boolean;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: string;

        /** The variant changes the appearance of the compound field. Accepted variants include standard, label-inline, label-stacked, and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-stacked' | 'label-hidden';

        /**
         * Returns the valid attribute value (Boolean) on the ValidityState object.
         * @returns The valid attribute value (Boolean) on the ValidityState object.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed for the latitude or longitude field when the value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         * @param fieldName Name of the field, which must be latitude or longitude.
         */
        setCustomValidityForField(message: string, fieldName: string): void;

        /** Displays error messages on the latitude or longitude field if the coordinates are invalid. */
        showHelpMessageIfInvalid(): void;
    }

    export type InputLocation = LightningInputLocation;
}

declare module 'lightning/inputName' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningInputNameOption {
        label?: string;
        value?: string;
    }
// IC2 END

    /** Represents a name compound field. This component requires API version 42.0 and later. */
    export default class LightningInputName extends LightningElement {
        /** Specifies whether the compound field should be disabled. Disabled fields are grayed out and not clickable. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Help text detailing the purpose and function of name compound field. */
        @api
        fieldLevelHelp?: string;

        /** List of fields to be displayed on the component. This value defaults to ['firstName', 'salutation', 'lastName']. Other field values include middleName, informalName, suffix. */
        @api
        fieldsToDisplay?: Array<'firstName' | 'lastName' | 'middleName' | 'informalName' | 'suffix' | 'salutation'>;

        /** Displays the First Name field. */
        @api
        firstName?: string;

        /** Displays the Informal Name field. */
        @api
        informalName?: string;

        /** Text label for the compound field. */
        @api
        label?: string;

        /** Displays the Last Name field. This field is always displayed if you set required to true. */
        @api
        lastName?: string;

        /** Specifies the locale that’s used to determine the layout and order of the name fields. In Lightning Experience, this value defaults to the Locale field on the Language & Time Zone page in the user’s personal settings. */
        @api
        locale?: string;

        /** Displays the Middle Name field. */
        @api
        middleName?: string;

        /** Displays a list of salutation options, such as Dr. or Mrs., provided as label-value pairs. */
        @api
        options?: Array<LightningInputNameOption>;

        /** Specifies whether the compound field is read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies whether the compound field must be filled out. A red asterisk is displayed on the Last Name field. An error message is displayed if a user interacts with the Last Name field and does not provide a value. This value defaults to false. */
        @api
        required?: boolean;

        /** Displays the Salutation field as a dropdown menu. An array of label-value pairs must be provided using the options attribute. */
        @api
        salutation?: string;

        /** Displays the Suffix field. */
        @api
        suffix?: string;

        /** The variant changes the appearance of a name compound field. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and name fields. Use label-stacked to place the label above the name fields. */
        @api
        variant?: 'standard' | 'label-hidden' | 'label-inline' | 'label-stacked';

        /**
         * Returns the valid property value (Boolean) on the ValidityState object to indicate whether input name fields have validity errors.
         * @returns The valid property value (Boolean) on the ValidityState object to indicate whether input name fields have validity errors.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed for the input name fields when the input value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         * @param fieldName The name of the input name field.
         */
        setCustomValidityForField(message: string, fieldName: string): void;

        /** Displays error messages on the input fields if the entries are invalid. */
        showHelpMessageIfInvalid(): void;
    }

    export type InputName = LightningInputName;
// IC2 BEGIN
    export type InputNameOption = LightningInputNameOption;
// IC2 END
}

declare module 'lightning/inputRichText' {
    import { LightningElement, api } from 'lwc';

    /** A WYSIWYG editor with a customizable toolbar for entering rich text */
    export default class LightningInputRichText extends LightningElement {
        /** Specifies whether the editor is disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** A comma-separated list of button categories to remove from the toolbar. */
        @api
        disabledCategories?: Array<any>;

        /** A whitelist of formats. By default, the list is computed based on enabled categories. The "table" format is always enabled to support copying and pasting of tables If formats are not provided. If formats are provided, omitting a format from the list removes the corresponding button. */
        @api
        formats?: Array<any>;

        /** Text label for the rich text editor. */
        @api
        label?: string;

        /** Specifies whether the label is visible or not. The default is false. */
        @api
        labelVisible?: boolean;

        /** Error message that's displayed when valid is false. */
        @api
        messageWhenBadInput?: string;

        /** Text that is displayed when the field is empty. */
        @api
        placeholder?: string;

        /** Marks the text editor as requiring user input. To display an asterisk to indicate input is required, also specify label-visible. A default label displays after the asterisk. Wire up your own validation logic as the component doesn't validate for required input. */
        @api
        required?: boolean;

        /** Entity ID to share the image with. */
        @api
        shareWithEntityId?: string;

        /** Specifies whether the editor content is valid. If invalid, the slds-has-error class is added. This value defaults to true. */
        @api
        valid?: boolean;

        /** The HTML content in the rich text editor. */
        @api
        value?: string;

        /** The variant changes the appearance of the toolbar. Accepted variant is bottom-toolbar which causes the toolbar to be displayed below the text box. */
        @api
        variant?: 'bottom-toolbar';

        /**
         * Returns an object representing the formats applied to the current selection. Only align, font, and size are supported.
         * @returns An object representing the formats applied to the current selection. Only align, font, and size are supported.
         */
        getFormat(): string;

        /**
         * Sets a format in the editor from the cursor point onwards. The format also applies to currently selected content. Valid formats are font, size, and align.
         * @param formats A key-value pair with format names and values.
         */
        setFormat(formats: Object): void;
    }

    export type InputRichText = LightningInputRichText;
}

declare module 'lightning/layout' {
    import { LightningElement, api } from 'lwc';

    /** Represents a responsive grid system for arranging containers on a page. */
    export default class LightningLayout extends LightningElement {
        /** Determines how to spread the layout items horizontally. Valid values are center, space, spread, and end. */
        @api
        horizontalAlign?: 'center' | 'space' | 'spread' | 'end';

        /** Determines whether to wrap the child items when they exceed the layout width. If true, the items wrap to the following line. This value defaults to false. */
        @api
        multipleRows?: boolean;

        /** Pulls layout items to the layout boundaries and corresponds to the padding size on the layout item. Possible values are small, medium, or large. */
        @api
        pullToBoundary?: 'small' | 'medium' | 'large';

        /** Determines how to spread the layout items vertically. Valid values are start, center, end, and stretch. */
        @api
        verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
    }

    export type Layout = LightningLayout;
}

declare module 'lightning/layoutItem' {
    import { LightningElement, api } from 'lwc';

    /** The basic element of lightning:layout. */
    export default class LightningLayoutItem extends LightningElement {
        /** Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom. */
        @api
        alignmentBump?: 'left' | 'top' | 'right' | 'bottom';

        /** Make the item fluid so that it absorbs any extra space in its container or shrinks when there is less space. Allowed values are: auto (columns grow or shrink equally as space allows), shrink (columns shrink equally as space decreases), no-shrink (columns don't shrink as space reduces), grow (columns grow equally as space increases), no-grow (columns don't grow as space increases), no-flex (columns don't grow or shrink as space changes). Use a comma-separated value for multiple options, such as 'auto, no-shrink'. */
        @api
        flexibility?: 'auto' | 'shrink' | 'no-shrink' | 'grow' | 'no-grow' | 'no-flex';

        /** If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than desktop. It is expressed as an integer from 1 through 12. */
        @api
        largeDeviceSize?: number;

        /** If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than tablet. It is expressed as an integer from 1 through 12. */
        @api
        mediumDeviceSize?: number;

        /** Sets padding to either the right and left sides of a container, or all sides of a container. Allowed values are horizontal-small, horizontal-medium, horizontal-large, around-small, around-medium, around-large. */
        @api
        padding?: 'horizontal-small' | 'horizontal-medium' | 'horizontal-large' | 'around-small' | 'around-medium' | 'around-large';

        /** If the viewport is divided into 12 parts, size indicates the relative space the container occupies. Size is expressed as an integer from 1 through 12. This applies for all device-types. */
        @api
        size?: number;

        /** If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than mobile. It is expressed as an integer from 1 through 12. */
        @api
        smallDeviceSize?: number;
    }

    export type LayoutItem = LightningLayoutItem;
}

declare module 'lightning/map' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningMapMarker {
        location?: LightningMapMarkerLocation;
        value?: string;
        title?: string;
        description?: string;
        icon?: string;
        mapIcon?: LightningMapMarkerIcon;
    }

    export type MapMarker = LightningMapMarker;

    export interface LightningMapMarkerLocation {
        Latitude?: string;
        Longitude?: string;
        City?: string;
        Country?: string;
        PostalCode?: string;
        State?: string;
        Street?: string;
    }

    export type MarkMarkerLocation = LightningMapMarkerLocation;

    export interface LightningMapMarkerIcon {
        path?: string;
        fillColor?: string;
        fillOpacity?: number;
        strokeOpacity?: number;
        strokeColor?: string;
        strokeWeight?: number;
        scale?: number;
        anchor?: LightningMapMarkerIconAnchor;
    }

    export type MapMarkerIcon = LightningMapMarkerIcon;

    export interface LightningMapMarkerIconAnchor {
        x: number;
        y: number;
    }

    export type MapMarkerAnchor = LightningMapMarkerIconAnchor;
// IC2 END

    /** A lightning:map component securely displays a map of one or more locations. This component requires API version 44.0 and later. */
    export default class LightningMap extends LightningElement {
        /** Centers the map according to an specific 'mapMarker' object. If not specified automatically calculates center. */
        @api
        center?: any;

        /** Displays or hides the list of locations. Valid values are visible, hidden, or auto. The default is auto, which shows the list only when multiple markers are present. Passing in an invalid value hides the list view. */
        @api
        listView?: 'visible' | 'hidden' | 'auto';

        /** Array containing one of more objects with the address or coordinates to be displayed. */
        @api
        mapMarkers: any;

        /** When the map displays multiple markers on the page and shows the list of markers, this property provides the heading title for the markers. Required if multiple markers specified. */
        @api
        markersTitle?: string;

        /** Called when a marker is selected. */
        @api
        onmarkerselect?: Function;

        /** Specifies boolean properties you can set to enable or disable controls on the map. 'draggable' enables dragging to pan the map; default is true. 'zoomControl' enables zooming controls; default is true. 'scrollwheel' enables zooming with the mouse wheel; default is true. 'disableDefaultUI' disables zooming and choosing the map layer; default is false. 'disableDoubleClickZoom' disables zooming with a mouse double-click; default is false. */
        @api
        options?: string;

        /** Provides the value of the currently selected marker. Returns undefined if you don't pass a value to map-markers. */
        @api
        selectedMarkerValue?: string;

        /** Shows footer with 'Open in Google Maps' link. Default value: 'false'. */
        @api
        showFooter?: boolean;

        /** Corresponds to zoom levels defined in Google Maps API. If not specified, the map component automatically chooses an appropriate zoom level to show all markers with comfortable margins. */
        @api
        zoomLevel?: number;
    }

    export type Map = LightningMap;
}

declare module 'lightning/menuDivider' {
    import { LightningElement, api } from 'lwc';

    /** Use the lightning-menu-divider subcomponent to create a dividing line after a menu item. By default, space is added above and below the divider. Use variant='compact' with lightning-menu-divider to reduce the space. */
    export default class LightningMenuDivider extends LightningElement {
        /** Use variant='compact' with lightning-menu-divider to reduce the space. */
        @api
        variant?: string;
    }

    export type MenuDivider = LightningMenuDivider;
}

declare module 'lightning/menuItem' {
    import { LightningElement, api } from 'lwc';

    /** Represents a list item in a menu. */
    export default class LightningMenuItem extends LightningElement {
        /** If not specified, the menu item is not checkable. If true, a check mark is shown to the left of the menu item. If false, a check mark is not shown but there is space to accommodate one. */
        @api
        checked?: boolean;

        /** If true, the menu item is not actionable and is shown as disabled. */
        @api
        disabled?: boolean;

        /** Specifies the name of a file to download when clicking a link in the menu item. The name is used when the file is saved in the download location and is not necessarily the name of the original file. Use download with the href attribute. */
        @api
        download?: string;

        /** Describes the reason for showing the draft indicator. This is required when the isDraft attribute is true */
        @api
        draftAlternativeText?: string;

        /** URL for a link to use for the menu item. */
        @api
        href?: string;

        /** The name of an icon to display after the text of the menu item. */
        @api
        iconName?: string;

        /** Determines the background color of the icons in the menu item. Accepted values include standard and color. This attribute doesn't apply to utility and doctype icons. */
        @api
        iconType?: 'standard' | 'color';

        /** If true, the menu item shows a draft indicator. This value defaults to false. */
        @api
        isDraft?: boolean;

        /** Text of the menu item. */
        @api
        label?: string;

        /** DEPRECATED. The action triggered when this menu item is selected. */
        @api
        onactive?: EventListener;

        /** The name of an icon to display before the text of the menu item. */
        @api
        prefixIconName?: string;

        /** Determines how a link in the href attribute is opened. Valid values include '_self' and '_blank'. The default is '_self', which opens the link in the current browser tab. '_blank' opens the link in a new browser tab. */
        @api
        target?: '_self' | '_blank';

        /** A value associated with the menu item. */
        @api
        value?: string;
    }

    export type MenuItem = LightningMenuItem;
}

declare module 'lightning/menuSubheader' {
    import { LightningElement, api } from 'lwc';

    /** Use the lightning-menu-subheader subcomponent to create sub-headings in the list of menu items. Specify the text of the heading using the label attribute. */
    export default class LightningMenuSubheader extends LightningElement {
        /** Specify the text of the heading using the label attribute. */
        @api
        label?: string;
    }

    export type MenuSubheader = LightningMenuSubheader;
}

declare module 'lightning/messages' {
    import { LightningElement, api } from 'lwc';

    /** Use to display error messages. */
    export default class LightningMessages extends LightningElement {
    }

    export type Messages = LightningMessages;
}

declare module 'lightning/modalBody' {
    import { LightningElement, api } from 'lwc';

    /** The modal body component to display main content area in lightning modal. */
    export default class LightningModalBody extends LightningElement {
    }

    export type ModalBody = LightningModalBody;
}

declare module 'lightning/modalFooter' {
    import { LightningElement, api } from 'lwc';

    /** Creates a footer at the bottom of a modal dialog. */
    export default class LightningModalFooter extends LightningElement {
    }

    export type ModalFooter = LightningModalFooter;
}

declare module 'lightning/modalHeader' {
    import { LightningElement, api } from 'lwc';

    /** Creates a header to display the heading and tagline at the top of a modal. */
    export default class LightningModalHeader extends LightningElement {
        /** Text to display as the heading at the top of the modal. */
        @api
        label?: string;
    }

    export type ModalHeader = LightningModalHeader;
}

declare module 'lightning/navigation' {
    import { LightningElement, api } from 'lwc';

    /** Generates URL for a given pageReference. This component requires API version 43.0 and later. */
    export default class LightningNavigation extends LightningElement {

        /**
         * Generates a URL for a given pageReference.
         * @param pageReference Defines the page reference. Required properties include 'type' and 'attributes'. 'state' is optional.
         * @returns Returns a Promise javascript object that resolves to a URL.
         */
        generateUrl(pageReference: Object): Promise<string>;

        /**
         * Requests navigation to the specified page reference.
         * @param pageReference Defines the page reference. Required properties include 'type' and 'attributes'. 'state' is optional.
         * @param replace Indicates that the new page should replace the current page in the navigation history.
         */
        navigate(pageReference: Object, replace?: boolean): void;
    }

    export type Navigation = LightningNavigation;

// IC2 BEGIN
    import {WireAdapterConstructor} from "lwc";
    import {PageReference} from "lightning/uiAppsApi";

    /** A wire adapter for a reference to the current page in Salesforce. */
    export const CurrentPageReference: PageReference & WireAdapterConstructor;

    /**
     * Apply the NavigationMixin to the component's base class to gain access to its APIs.
     */
    export class NavigationMixin {
        /**
         * A component calls this API to get a promise that resolves to the resulting URL. The component can use the URL
         * in the href attribute of an anchor. It can also use the URL to open a new window using the window.open(url)
         * browser API.
         * @param pageReference Defines the page reference. Required properties include 'type' and 'attributes'. 'state' is optional.
         * @returns Promise<string>
         */
        static readonly GenerateUrl = 'GenerateUrl';

        /**
         * A component calls this API to navigate to another page in the application.
         * @param pageReference Defines the page reference. Required properties include 'type' and 'attributes'. 'state' is optional.
         * @param replace Indicates that the new page should replace the current page in the navigation history.
         */
        static readonly Navigate = 'Navigate';
    }

    export type Constructor<T = {}> = new (...args: Array<any>) => T;

    export class NavigationElement {
        public GenerateUrl(pageReference: PageReference): Promise<string>;

        public Navigate(pageReference: PageReference, replace?: boolean): void;
    }

    /**
     * Apply the NavigationMixin to the component's base class to gain access to its APIs.
     */
    export function NavigationMixin<T extends Constructor<LightningElement>>(superClass: T): T & Constructor<NavigationElement>;

    // FOR TESTING ONLY
    /**
     * Tests do not have access to the internals of this mixin used by the component under test so save a reference to
     * the arguments the Navigate method is invoked with and provide access with this function.
     */
    export function getNavigateCalledWith(): { pageReference: PageReference, replace: boolean };
// IC2 END
}

declare module 'lightning/notificationsLibrary' {
    import { LightningElement, api } from 'lwc';

    /** Displays messages via notices and toasts. This component requires API version 41.0 and later. */
    export default class LightningNotificationsLibrary extends LightningElement {

        /**
         * Displays a notice with a message.
         * @param noticeParams Parameters to customize your notice with values for variant, header, message, and closeCallback.
         */
        showNotice(noticeParams: Object): void;

        /**
         * Displays a toast with a message.
         * @param toastParams Parameters to customize your toast with values for variant, title, message, messageData, and mode.
         */
        showToast(toastParams: Object): void;
    }

    export type NotificationsLibrary = LightningNotificationsLibrary;
}

declare module 'lightning/omnistudioFlexcard' {
    import { LightningElement, api } from 'lwc';

    /** A wrapper for Omnistudio Flexcards that enables you to display Flexcards in a custom component. */
    export default class LightningOmnistudioFlexcard extends LightningElement {
        /** The name of the Flexcard that you want to show. You can find the Flexcard name in the Setup Panel of the Flexcard Designer. */
        @api
        flexcardName: string;

        /** The object API name, such as Account, which is passed to the Omniscript via the Update Omniscript action type that's added to the Flexcard. */
        @api
        objectApiName?: string;

        /** Required if you use the records attribute to send data to the Flexcard. When this attribute is set to true, records can be set from the parent LWC. */
        @api
        parentData?: boolean;

        /** The record ID of the Salesforce object. */
        @api
        recordId?: string;

        /** The record data for the Flexcards. The records attribute holds the complete data and all operations in Flexcards are using this value. */
        @api
        records?: any;
    }

    export type OmnistudioFlexcard = LightningOmnistudioFlexcard;
}

declare module 'lightning/omnistudioOmniscript' {
    import { LightningElement, api } from 'lwc';

    /** A wrapper for Omniscripts that allows you to use Omniscripts in custom Lightning web components. */
    export default class LightningOmnistudioOmniscript extends LightningElement {
        /** The text direction of the language of the Omniscript. Valid values are ltr and rtl. The default is ltr. */
        @api
        direction?: 'ltr' | 'rtl';

        /** Set to true to make the Omniscript display inline in a page. */
        @api
        inline?: boolean;

        /** The label when the Omniscript is displayed as a button. Required if the Inline parameter is set. */
        @api
        inlineLabel?: string;

        /** The variant of the lightning-button component you want to use. Valid values are base, brand, and neutral. Required if the Inline parameter is set. */
        @api
        inlineVariant?: 'base' | 'brand' | 'neutral';

        /** The language in which the Omniscript was created. */
        @api
        language: string;

        /** Add a data JSON if you want to prefill your Omniscript with data. */
        @api
        prefill?: any;

        /** The record ID of the Salesforce object. */
        @api
        recordId?: string;

        /** The value for the Subtype field in your Omniscript. */
        @api
        subType: string;

        /** The theme that you applied to the Omniscript. Valid values are slds or nds. */
        @api
        theme?: 'slds' | 'nds';

        /** The value for the Type field in your Omniscript. */
        @api
        type: string;
    }

    export type OmnistudioOmniscript = LightningOmnistudioOmniscript;
}

declare module 'lightning/outputField' {
    import { LightningElement, api } from 'lwc';

    /** Represents a read-only display of a label, help text, and value for a field on a Salesforce object. This component requires API version 41.0 and later. */
    export default class LightningOutputField extends LightningElement {
        /** A CSS class for the outer element, in addition to the component's base classes. */
        @api
        fieldClass?: string;

        /** The API name of the field to be displayed. */
        @api
        fieldName?: string;

        /** Changes the appearance of the output. Accepted variants include standard and label-hidden. This value defaults to standard. */
        @api
        variant?: 'standard' | 'label-hidden';
    }

    export type OutputField = LightningOutputField;
}

declare module 'lightning/overlayLibrary' {
    import { LightningElement, api } from 'lwc';

    /** Displays messages via modals and popovers. This component requires API version 41.0 and later. */
    export default class LightningOverlayLibrary extends LightningElement {

        /** Dismisses and destroys the modal or popover. */
        close(): void;

        /** Hides the modal or popover from view. */
        hide(): void;

        /** Displays the modal or popover. */
        show(): void;

        /**
         * Displays a modal with a message.
         * @param modalParams Parameters to customize your modal with values for header, body, footer, showCloseButton, cssClass, and closeCallback.
         */
        showCustomModal(modalParams: Object): void;

        /**
         * Displays a popover with a message.
         * @param popoverParams Parameters to customize your popover with values for body, referenceSelector, and cssClass.
         */
        showCustomPopover(popoverParams: Object): void;
    }

    export type OverlayLibrary = LightningOverlayLibrary;
}

declare module 'lightning/pill' {
    import { LightningElement, api } from 'lwc';

    /** A pill displays a label that can contain links and can be removed from view. */
    export default class LightningPill extends LightningElement {
        /** Specifies whether the pill has errors. The default is false. */
        @api
        hasError?: boolean;

        /** The URL of the page that the link goes to. */
        @api
        href?: string;

        /** The text label that displays in the pill. */
        @api
        label: string;

        /** The name for the pill. This value is optional and can be used to identify the pill in a callback. */
        @api
        name?: string;

        /** The action triggered when the pill is removed. */
        @api
        onremove?: EventListener;

        /** The variant changes the appearance of the pill. Accepted variants include link, plain, and plainLink. The default variant is link, which creates a link in the pill when you specify the href attribute. The plain variant renders the pill without a link and ignores the href attribute. The plainLink variant is reserved for internal use. */
        @api
        variant?: 'link' | 'plain' | 'plainLink';
    }

    export type Pill = LightningPill;
}

declare module 'lightning/pillContainer' {
    import { LightningElement, api } from 'lwc';

    /** A list of pills grouped in a container. This component requires API version 42.0 and later. */
    export default class LightningPillContainer extends LightningElement {
        /** Adds a link to a pill in the container. */
        @api
        href?: string;

        /** Specifies whether the pill container can be collapsed. */
        @api
        isCollapsible?: boolean;

        /** Specifies whether the pill container is expanded. */
        @api
        isExpanded?: boolean;

        /** An array of items to be rendered as pills in a container. */
        @api
        items?: Array<any>;

        /** Label for the pill container. */
        @api
        label?: string;

        /** The action triggered when a pill is removed. */
        @api
        onitemremove?: EventListener;

        /** Whether keep pills in single line. */
        @api
        singleLine?: boolean;

        /** The variant changes the appearance of the pill container. Accepted variants include standard and bare. This value defaults to standard. */
        @api
        variant?: 'standard' | 'bare';
    }

    export type PillContainer = LightningPillContainer;
}

declare module 'lightning/platformResourceLoader' {
    import { LightningElement, api } from 'lwc';

    /** Imports a third-party JavaScript or CSS library. */
    export default class LightningPlatformResourceLoader extends LightningElement {

        /**
         * Accesses a .js file in a static resource.
         * @param self A reference to the component. The value must be this.
         * @param fileUrl A string that contains the path to the JavaScript file. To build the string, concatenate the resourceName and the path to the file within the static resource archive.
         * @returns Returns a promise that resolves when the file has loaded.
         */
        loadScript(self: Object, fileUrl: string): Promise<any>;

        /**
         * Accesses a .css file in a static resource.
         * @param self A reference to the component. The value must be this.
         * @param fileUrl A string that contains the path to the CSS file. To build the string, concatenate the resourceName and the path to the file within the static resource archive.
         * @returns Returns a promise that resolves when the file has loaded.
         */
        loadStyle(self: Object, fileUrl: string): Promise<any>;
    }

    export type PlatformResourceLoader = LightningPlatformResourceLoader;

// IC2 BEGIN
    /**
     * Accesses a .js file in a static resource. Returns a promise that resolves when the file has loaded.
     * @param self A reference to the component. The value must be this.
     * @param fileUrl A string that contains the path to the JavaScript file. To build the string, concatenate the resourceName and the path to the file within the static resource archive.
     * @returns Promise<any>
     */
    export function loadScript(self: Object, fileUrl: string): Promise<any>;

    /**
     * Accesses a .css file in a static resource. Returns a promise that resolves when the file has loaded.
     * @param self A reference to the component. The value must be this.
     * @param fileUrl A string that contains the path to the CSS file. To build the string, concatenate the resourceName and the path to the file within the static resource archive.
     * @returns Promise<any>
     */
    export function loadStyle(self: Object, fileUrl: string): Promise<any>;

// IC2 END
}

declare module 'lightning/platformShowToastEvent' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    /**
     * To trigger a toast from a Lightning web component, in the component's JavaScript class, import ShowToastEvent from lightning/platformShowToastEvent. Create a ShowToastEvent with a few parameters, and dispatch it. The app handles the rest.
     */
    export class ShowToastEvent extends Event {
        /**
         * A string representing the body of the message. It can contain placeholders in the form of {0} ... {N}. The placeholders are replaced with the links on messageData.
         */
        message: string;

        /**
         * url and label values that replace the {index} placeholders in the message string.
         */
        messageData: any;

        /**
         * Determines how persistent the toast is. Valid values are: dismissable (default), remains visible until you click the close button or 3 seconds has elapsed, whichever comes first; pester, remains visible for 3 seconds and disappears automatically. No close button is provided; sticky, remains visible until you click the close button.
         */
        mode: 'dismissable' | 'sticky';

        /**
         * The title of the toast, displayed as a heading.
         */
        title: string;

        /**
         * Changes the appearance of the notice. Toasts inherit styling from toasts in the Lightning Design System. Valid values are: info (default), success, warning, and error.
         */
        variant: 'info' | 'success' | 'warning' | 'error';

        constructor(showToastEvent: ShowToastEvent | {
            message?: string,
            messageData?: Object,
            mode?: string,
            title?: string,
            variant?: string
        });
    }

    // FOR TESTING ONLY
    export const ShowToastEventName: string = 'lightning__showtoast';
// IC2 END

    /** Display toasts to provide feedback to a user following an action, such as after a record is created. */
    export default class LightningPlatformShowToastEvent extends LightningElement {
        /** A string representing the body of the message. It can contain placeholders in the form of {0} ... {N}. The placeholders are replaced with the links on messageData. */
        @api
        message: string;

        /** url and label values that replace the {index} placeholders in the message string. */
        @api
        messageData?: any;

        /** Determines how persistent the toast is. Valid values are: dismissable (default), remains visible until you click the close button or 3 seconds has elapsed, whichever comes first; pester, remains visible for 3 seconds and disappears automatically. No close button is provided; sticky, remains visible until you click the close button. */
        @api
        mode?: 'dismissable' | 'pester';

        /** Changes the appearance of the notice. Toasts inherit styling from toasts in the Lightning Design System. Valid values are: info (default), success, warning, and error. */
        @api
        variant?: 'info' | 'success' | 'warning' | 'error';
    }

    export type PlatformShowToastEvent = LightningPlatformShowToastEvent;
}

declare module 'lightning/progressBar' {
    import { LightningElement, api } from 'lwc';

    /** Displays a horizontal progress bar from left to right to indicate the progress of an operation. This component requires API version 41.0 and later. */
    export default class LightningProgressBar extends LightningElement {
        /** The size of the progress bar. Valid values are x-small, small, medium, and large. The default value is medium. */
        @api
        size?: 'x-small' | 'small' | 'medium' | 'large';

        /** The percentage value of the progress bar. */
        @api
        value?: number;

        /** The variant changes the appearance of the progress bar. Accepted variants include base or circular. This value defaults to base. */
        @api
        variant?: 'base' | 'circular';
    }

    export type ProgressBar = LightningProgressBar;
}

declare module 'lightning/progressIndicator' {
    import { LightningElement, api } from 'lwc';

    /** Provides a visual indication on the progress of a particular process. This component is available in version 41.0 and later. */
    export default class LightningProgressIndicator extends LightningElement {
        /** The current step, which must match the value attribute of one of progressStep components. If a step is not provided, the value of the first progressStep component is used. */
        @api
        currentStep?: string;

        /** Indicates whether the current step is in error state and displays a warning icon on the step indicator. Applies to the base type only. This value defaults to false. */
        @api
        hasError?: boolean;

        /** Changes the visual pattern of the indicator. Valid values are base and path. This value defaults to base. */
        @api
        type?: 'base' | 'path';

        /** Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators. This value defaults to base. */
        @api
        variant?: 'base' | 'shaded';
    }

    export type ProgressIndicator = LightningProgressIndicator;
}

declare module 'lightning/progressRing' {
    import { LightningElement, api } from 'lwc';

    /** Displays a circular progress bar to indicate the progress of an operation. */
    export default class LightningProgressRing extends LightningElement {
        /** Controls which way the color flows from the top of the ring, either clockwise or counterclockwise Valid values include fill and drain. The fill value corresponds to a color flow in the clockwise direction. The drain value indicates a color flow in the counterclockwise direction. */
        @api
        direction?: 'fill' | 'drain';

        /** The size of the progress ring. Valid values include medium and large. */
        @api
        size?: 'medium' | 'large';

        /** The percentage value of the progress ring. The value must be a number from 0 to 100. A value of 50 corresponds to a color fill of half the ring in a clockwise or counterclockwise direction, depending on the direction attribute. */
        @api
        value?: string;

        /** Changes the appearance of the progress ring. Accepted variants include base, active-step, warning, expired, base-autocomplete. */
        @api
        variant?: 'base' | 'active-step' | 'warning' | 'expired' | 'base-autocomplete';
    }

    export type ProgressRing = LightningProgressRing;
}

declare module 'lightning/progressStep' {
    import { LightningElement, api } from 'lwc';

    /** To create steps in a lightning-progress-indicator component, use one or more lightning-progress-step component along with label and value attributes. */
    export default class LightningProgressStep extends LightningElement {
        /** The label for the progress indicator step. */
        @api
        label?: string;

        /** Called when a step releases focus with the index of the step. */
        @api
        onstepblur?: string;

        /** Called when a step gains focus with the index of the step. */
        @api
        onstepfocus?: string;

        /** Called when the mouse pointer moves into a step with the index of the step. */
        @api
        onstepmouseenter?: string;

        /** Called when the mouse pointer moves out of a step with the index of the step. */
        @api
        onstepmouseleave?: string;

        /** The value for the progress indicator step. */
        @api
        value?: string;
    }

    export type ProgressStep = LightningProgressStep;
}

declare module 'lightning/quickActionPanel' {
    import { LightningElement, api } from 'lwc';

    /** Builds quick action modals with the same style as the Salesforce Lightning Design System (SLDS) modal. With this component you can customize screen actions and still have consistent UI across all actions. Use lightning-quick-action-panel with the lightning__RecordAction target to use your custom component as a quick action on a record page. */
    export default class LightningQuickActionPanel extends LightningElement {
        /** The panel's header. */
        @api
        header?: string;
    }

    export type QuickActionPanel = LightningQuickActionPanel;
}

declare module 'lightning/radioGroup' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningRadioGroupOption {
        label?: string;
        value?: string;
    }
// IC2 END

    /** A radio button group that can have a single option selected. This component requires API version 41.0 and later. */
    export default class LightningRadioGroup extends LightningElement {
        /** Specifies that an input element should be disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** Text label for the radio group. */
        @api
        label: string;

        /** Optional message displayed when no radio button is selected and the required attribute is set to true. */
        @api
        messageWhenValueMissing?: string;

        /** Specifies the name of an input element. */
        @api
        name?: string;

        /** Array of label-value pairs for each radio button. */
        @api
        options: Array<LightningRadioGroupOption>;

        /** Specifies that an input field must be filled out before submitting the form. This value defaults to false. */
        @api
        required?: boolean;

        /** The style of the radio group. Options are radio or button. The default is radio. */
        @api
        type?: 'radio' | 'button';

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** Specifies the value of an input element. */
        @api
        value?: any;

        /** The variant changes the appearance of the radio group. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and radio group. Use label-stacked to place the label above the radio group. */
        @api
        variant?: 'standard' | 'label-hidden' | 'label-inline' | 'label-stacked';

        /**
         * Returns the valid attribute value (Boolean) on the ValidityState object.
         * @returns The valid attribute value (Boolean) on the ValidityState object.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when the radio group value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message: string): void;

        /** Shows the help message if the form control is in an invalid state. */
        showHelpMessageIfInvalid(): void;
    }

    export type RadioGroup = LightningRadioGroup;
// IC2 BEGIN
    export type RadioGroupOption = LightningRadioGroupOption;
// IC2 END
}

declare module 'lightning/recordEditForm' {
    import { LightningElement, api } from 'lwc';

    /** Represents a record edit layout that displays one or more fields, provided by lightning:outputField. This component requires API version 41.0 and later. */
    export default class LightningRecordEditForm extends LightningElement {
        /** Sets the arrangement style of fields and labels in the form. Accepted values are compact, comfy, and auto. The default is auto, which lets the component dynamically set the density according to the user's Display Density setting and the width of the form. Use compact to display fields and their labels on the same line. Use comfy to display fields stacked below their labels. */
        @api
        density?: 'compact' | 'comfy' | 'auto';

        /** A CSS class for the form element. */
        @api
        formClass?: string;

        /** The API name of the object. */
        @api
        objectApiName: string;

        /** The action triggered when the form is saved. */
        @api
        onsuccess?: EventListener;

        /** The ID of the record to be displayed. */
        @api
        recordId?: string;

        /** The ID of the record type, which is required if you created multiple record types but don't have a default. */
        @api
        recordTypeId?: string;

        /**
         * Submits the form using an array of record fields or field IDs. The field ID is provisioned from @salesforce/schema/. Invoke this method only after the load event.
         * @param fields Array of record field names or field IDs.
         */
        submit(fields?: string): void;
    }

    export type RecordEditForm = LightningRecordEditForm;
}

declare module 'lightning/recordForm' {
    import { LightningElement, api } from 'lwc';

    /** Creates an editable form or display form for a record. This component requires API version 43.0 and later. */
    export default class LightningRecordForm extends LightningElement {
        /** Specifies the number of columns for the form. */
        @api
        columns?: number;

        /** Sets the arrangement style of fields and labels in the form. Accepted values are compact, comfy, and auto. The default is auto, which lets the component dynamically set the density according to the user's Display Density setting and the width of the form. Use compact to display fields and their labels on the same line. Use comfy to display fields stacked below their labels. */
        @api
        density?: 'compact' | 'comfy' | 'auto';

        /** List of fields to be displayed. */
        @api
        fields?: string[];

        /** The type of layout to use to display the form fields. Valid values are Compact and Full. When creating a new record, only the full layout is supported. */
        @api
        layoutType?: 'Compact' | 'Full';

        /** Specifies the interaction and display style for the form. Valid values are view, edit, and readonly. */
        @api
        mode?: 'view' | 'edit' | 'readonly';

        /** The API name of the object. */
        @api
        objectApiName: string;

        /** The action triggered when the form is saved. */
        @api
        onsuccess?: EventListener;

        /** The ID of the record to be displayed. */
        @api
        recordId?: string;

        /** The ID of the record type, which is required if you created multiple record types but don't have a default. */
        @api
        recordTypeId?: string;

        /**
         * Submits the form using an array of record fields or field IDs. The field ID is provisioned from @salesforce/schema/. Invoke this method only after the load event.
         * @param fields Array of record field names or field IDs.
         */
        submit(fields?: string): void;
    }

    export type RecordForm = LightningRecordForm;
}

declare module 'lightning/recordPicker' {
    import { LightningElement, api } from 'lwc';

    /** A component that provides an input search field, that can search for Salesforce records. */
    export default class LightningRecordPicker extends LightningElement {
        /** When this attribute is present, the component is disabled and you cannot interact it. */
        @api
        disabled?: boolean;

        /** The display configuration used to customize the way retrieved records are presented. */
        @api
        displayInfo?: string;

        /** Help text that details the purpose and function of the record picker component. The text displays on hover for desktop and on click for mobile experiences. */
        @api
        fieldLevelHelp?: string;

        /** The filter applied to the retrieved records. */
        @api
        filter?: LightningRecordPickerFilter & string;

        /** The text label for the component. */
        @api
        label: string;

        /** The matching configuration to customize the fields used to match the search results to the search term entered by the user. */
        @api
        matchingInfo?: string;

        /** The error message displayed when the user enters a search term in the input but does not select an option. */
        @api
        messageWhenBadInput?: string;

        /** The API name of the object for the retrieved records. */
        @api
        objectApiName: string;

        /** The text displayed when the input is empty and the user is prompted to enter a search term. */
        @api
        placeholder?: string;

// IC2 BEGIN
        /** The selected record ID. */
        recordId?: string;
// IC2 END

        /** Specifies if a user must select a record. If no record is selected when required, the record picker is in an invalid state. */
        @api
        required?: boolean;

        /** The ID of the record that is selected in the record picker. */
        @api
        value?: string;

        /** The variant changes the appearance of the component. Accepted variant is label-hidden. */
        @api
        variant?: 'label-hidden';

        /**
         * Check if the component is in a valid state.
         * @returns Whether the component is in a valid state.
         */
        checkValidity(): boolean;

        /** Clears the selected record. This method does not clear the search term or refresh the validity message. */
        clearSelection(): void;

        /** Check if the component is in a valid state and refresh the validity message. If the component is valid, it clears the validity error message. If the component is invalid, it displays the validity error message. */
        reportValidity(): void;

        /**
         * Set a custom validity error message.
         * @param message A custom validity message. If it is an empty string, it resets the custom message.
         */
        setCustomValidity(message: string): void;
    }

    export type RecordPicker = LightningRecordPicker;

// IC2 BEGIN
    export interface LightningRecordPickerFilter {
        /** The filter object defines the criteria for individual filters. You can combine these filters using logical operators that you specify with the filterLogic property. */
        criteria: LightningRecordPickerFilterCriterion[];
        /** To define logic for the set of filter criteria objects in the criteria array, specify the filterLogic property in the filter object. If filterLogic is undefined, all criteria are applied with an AND logical operator by default. Valid operators are AND, OR, and NOT. The AND operator has higher precedence than OR. Parentheses are supported. */
        filterLogic?: string;
    }

    export interface LightningRecordPickerFilterCriterion {
        /** The name of the field in the API to filter on. Cross-object references such as Account.Phone are supported. */
        fieldPath: string;
        /** The filter operator. */
        operator: 'eq' | 'ne' | 'lt' | 'gt' | 'lte' | 'gte' | 'in' | 'nin' | 'like' | 'includes' | 'excludes';
        /** The value to filter against. */
        value: any;
    }
// IC2 END
}

declare module 'lightning/recordViewForm' {
    import { LightningElement, api } from 'lwc';

    /** Represents a record view that displays one or more fields, provided by lightning:outputField. This component requires API version 41.0 and later. */
    export default class LightningRecordViewForm extends LightningElement {
        /** Sets the arrangement style of fields and labels in the form. Accepted values are compact, comfy, and auto. Auto is the default. Use compact to display fields and their labels on the same line. Use comfy to display fields below their labels. Use auto to let the component dynamically set the density according to the user's Display Density setting and the width of the form. */
        @api
        density?: 'compact' | 'comfy' | 'auto';

        /** The API name of the object. */
        @api
        objectApiName: string;

        /** The optional fields of the record. */
        @api
        optionalFields?: string[];

        /** The ID of the record to be displayed. */
        @api
        recordId: string;

// IC2 BEGIN
        /** The records for the form. */
        records?: any[];
// IC2 END
    }

    export type RecordViewForm = LightningRecordViewForm;
}

declare module 'lightning/relativeDateTime' {
    import { LightningElement, api } from 'lwc';

    /** Displays the relative time difference between the source date-time and the provided date-time. */
    export default class LightningRelativeDateTime extends LightningElement {
        /** The timestamp or JavaScript Date object to be formatted. */
        @api
        value?: any;
    }

    export type RelativeDateTime = LightningRelativeDateTime;
}

declare module 'lightning/richTextToolbarButton' {
    import { LightningElement, api } from 'lwc';

    /** Adds a custom button to the toolbar of the lightning-input-rich-text component. This component must be nested within lightning-rich-text-toolbar-button-group. */
    export default class LightningRichTextToolbarButton extends LightningElement {
        /** Specifies the value of the aria-haspopup attribute for the rendered toolbar button. Use this attribute to indicate the type of popup that your custom button opens. Accepted values are menu, listbox, tree, grid, dialog and true. */
        @api
        ariaHaspopup?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true';

        /** Specifies whether to display this button in a disabled state. Disabled buttons can't be clicked. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The icon alternative text. */
        @api
        iconAlternativeText?: string;

        /** The icon name. */
        @api
        iconName?: string;

        /** Indicates whether the button is selected. This alters the button's selected or pressed state. A selected button is displayed with a dark color. */
        @api
        selected?: boolean;

        /** Closes the popup for the toolbar button. */
        closePopup(): void;

        /** Shows a popup for the toolbar button. */
        showPopup(): void;
    }

    export type RichTextToolbarButton = LightningRichTextToolbarButton;
}

declare module 'lightning/richTextToolbarButtonGroup' {
    import { LightningElement, api } from 'lwc';

    /** A container for custom buttons in the toolbar of the lightning-input-rich-text component. */
    export default class LightningRichTextToolbarButtonGroup extends LightningElement {
    }

    export type RichTextToolbarButtonGroup = LightningRichTextToolbarButtonGroup;
}

declare module 'lightning/select' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningSelectOption {
        label: string;
        value: any;
    }
// IC2 END

    /** Enables single and multiple selection on a menu of options using the HTML select element and option elements. */
    export default class LightningSelect extends LightningElement {
        /** Reserved for internal use. Controls auto-filling of the field. */
        @api
        autocomplete?: string;

        /** Specifies whether the menu is disabled and users cannot interact with it. */
        @api
        disabled?: boolean;

        /** Help text detailing the purpose and function of the menu of options. The text is displayed in a tooltip above the menu. */
        @api
        fieldLevelHelp?: string;

        /** The text label for the component. To hide the label but make it available to assistive technologies, use the label-hidden variant. */
        @api
        label: string;

        /** The error message that's displayed below the menu when a user interacts with the menu but does not select an option. */
        @api
        messageWhenValueMissing?: string;

        /** Specifies whether multiple options can be selected. */
        @api
        multiple?: boolean;

        /** The identifier for the component. */
        @api
        name?: string;

        /** An array of menu options with key-value pairs for label and value. */
        @api
        options?: Array<LightningSelectOption>;

        /** Specifies whether an option must be selected. */
        @api
        required?: boolean;

        /** The number of rows in the list that should be visible at one time. Use this attribute with the multiple attribute. */
        @api
        size?: number;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** The value of the selected option. If empty and a value is required, the component is in an invalid state. */
        @api
        value?: string;

        /** The variant changes the appearance of the dropdown menu. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the dropdown menu. label-hidden hides the label but make it available to assistive technology. label-inline horizontally aligns the label and dropdown menu. label-stacked places the label above the dropdown menu. */
        @api
        variant?: 'standard' | 'label-inline' | 'label-hidden' | 'label-stacked';

        /**
         * Checks if the input is valid.
         * @returns Whether the input is valid.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when a form is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message: string): void;

        /** Displays an error message on an invalid select field. An invalid field fails at least one constraint validation and returns false when checkValidity() is called. */
        showHelpMessageIfInvalid(): void;
    }

    export type Select = LightningSelect;
// IC2 BEGIN
    export type SelectOption = LightningSelectOption;
// IC2 END
}

declare module 'lightning/serviceCloudVoiceToolkitApi' {
    import { LightningElement, api } from 'lwc';

    /** This component provides access to event listeners and methods for the Service Cloud Voice Toolkit API, enabling your component to listen to events that take place during phone calls with service agents. */
    export default class LightningServiceCloudVoiceToolkitApi extends LightningElement {

        /**
         * Invoke real-time NBA recommendations.
         * @param recordId ID of the record for which Recommendations should be shown.
         * @param parameters Key-value pairs passed to RecommendationStrategy.
         */
        updateNextBestActions(recordId: string, parameters?: Object): void;
    }

    export type ServiceCloudVoiceToolkitApi = LightningServiceCloudVoiceToolkitApi;
}

declare module 'lightning/serviceKnowledgeApi' {
    import { LightningElement, api } from 'lwc';

    /** The lightning/serviceKnowledgeApi module includes a JavaScript method to work with Knowledge APIs. */
    export default class LightningServiceKnowledgeApi extends LightningElement {

        /**
         * Updates view statistics.
         * @param articleOrVersionId The article or version ID
         */
        updateViewStat(articleOrVersionId: string): void;
    }

    export type ServiceKnowledgeApi = LightningServiceKnowledgeApi;
}

declare module 'lightning/slider' {
    import { LightningElement, api } from 'lwc';

    /** An input range slider for specifying a value between two specified numbers. This component requires API version 41.0 and later. */
    export default class LightningSlider extends LightningElement {
        /** The disabled value of the input range. This value default to false. */
        @api
        disabled?: boolean;

        /** Text label to describe the slider. Provide your own label to describe the slider. */
        @api
        label: string;

        /** The max value of the input range. This value defaults to 100. */
        @api
        max?: number;

        /** Error message to be displayed when a bad input is detected. */
        @api
        messageWhenBadInput?: string;

        /** Error message to be displayed when a pattern mismatch is detected. */
        @api
        messageWhenPatternMismatch?: string;

        /** Error message to be displayed when a range overflow is detected. */
        @api
        messageWhenRangeOverflow?: string;

        /** Error message to be displayed when a range underflow is detected. */
        @api
        messageWhenRangeUnderflow?: string;

        /** Error message to be displayed when a step mismatch is detected. */
        @api
        messageWhenStepMismatch?: string;

        /** Error message to be displayed when the value is too long. */
        @api
        messageWhenTooLong?: string;

        /** Error message to be displayed when a type mismatch is detected. */
        @api
        messageWhenTypeMismatch?: string;

        /** Error message to be displayed when the value is missing. */
        @api
        messageWhenValueMissing?: string;

        /** The min value of the input range. This value defaults to 0. */
        @api
        min?: number;

        /** The size of the slider. The default is an empty string, which sets the slider to the width of the viewport. Accepted values are x-small, small, medium, and large. */
        @api
        size?: 'x-small' | 'small' | 'medium' | 'large';

        /** The step increment value of the input range. Example steps include 0.1, 1, or 10. This value defaults to 1. */
        @api
        step?: string;

        /** The type determines the orientation of the slider. Accepted values are vertical and horizontal. The default is horizontal. */
        @api
        type?: 'vertical' | 'horizontal';

        /** Represents the validity states of the slider input, with respect to constraint validation. */
        @api
        validity?: string;

        /** The numerical value of the input range. This value defaults to 0. */
        @api
        value?: number;

        /** The variant changes the appearance of the slider. Accepted variants include standard and label-hidden. The default is standard. */
        @api
        variant?: 'standard' | 'label-hidden';

        /**
         * Returns the valid property value (Boolean) on the ValidityState object to indicate whether the input field value has any validity errors.
         * @returns The valid property value (Boolean) on the ValidityState object to indicate whether the input field value has any validity errors.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Sets a custom error message to be displayed when the slider value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message?: string): void;

        /** Displays error messages on the slider. The slider value is invalid if it fails at least one constraint validation and returns false when checkValidity() is called. */
        showHelpMessageIfInvalid(): void;
    }

    export type Slider = LightningSlider;
}

declare module 'lightning/spinner' {
    import { LightningElement, api } from 'lwc';

    /** Displays an animated spinner. */
    export default class LightningSpinner extends LightningElement {
        /** The alternative text used to describe the reason for the wait and need for a spinner. */
        @api
        alternativeText?: string;

        /** The size of the spinner. Valid values are xx-small, x-small, small, medium, and large. This value defaults to medium. */
        @api
        size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

        /** The variant changes the appearance of the spinner. Accepted variants include base, brand, and inverse. The default is base. */
        @api
        variant?: 'base' | 'brand' | 'inverse';
    }

    export type Spinner = LightningSpinner;
}

declare module 'lightning/tab' {
    import { LightningElement, api } from 'lwc';

    /** A single tab that is nested in a lightning:tabset component. */
    export default class LightningTab extends LightningElement {
        /** Alternative text for the end icon. */
        @api
        endIconAlternativeText?: string;

        /** The name of a utility icon to display after the tab's label. */
        @api
        endIconName?: string;

        /** Assistive text for the icon that's displayed on the left of the tab label. */
        @api
        iconAssistiveText?: string;

        /** The Lightning Design System name of the icon. The icon is displayed on the left of the tab label. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. Only utility icons can be used in this component. */
        @api
        iconName?: string;

        /** The text that appears on the tab. The attribute accepts string values, but for compatibility with previous releases also accepts a component type. Only the text portion of the label value displays and any CSS classes that are applied are ignored. */
        @api
        label?: string;

        /** The action triggered when this tab becomes active. */
        @api
        onactive?: EventListener;

        /** Specifies whether there's an error in the tab content. An error icon is displayed on the right of the tab label. */
        @api
        showErrorIndicator?: boolean;

        /** The optional string to identify which tab was clicked during the tab's active event. This string is also used by active-tab-value in tabset to open a tab. */
        @api
        value?: string;
    }

    export type Tab = LightningTab;
}

declare module 'lightning/tabset' {
    import { LightningElement, api } from 'lwc';

    /** Represents a list of tabs. */
    export default class LightningTabset extends LightningElement {
        /** Sets a specific tab to open by default using a string that matches a tab's value string. If not used, the first tab opens by default. */
        @api
        activeTabValue?: string;

        /** Specifies text to use as custom assistive text for the tabset heading. The text is placed in a div element with role=heading and aria-level=2. The default assistive text is Tabs in an h2 element. */
        @api
        headingLabel?: string;

        /** Specifies the value to pass to aria-level when you specify heading-label. Accepts values from 1 to 6. The default value is 2. */
        @api
        headingLevel?: number;

        /** Determines whether the text that’s passed with the heading-label attribute is visible above the tabset. The default value is false. */
        @api
        headingVisible?: boolean;

        /** The variant changes the appearance of the tabset. Accepted variants are default, scoped, and vertical. */
        @api
        variant?: 'default' | 'scoped' | 'vertical';
    }

    export type Tabset = LightningTabset;
}

declare module 'lightning/textarea' {
    import { LightningElement, api } from 'lwc';

    /** Represents a multiline text input. */
    export default class LightningTextarea extends LightningElement {
        /** Specifies that an input element should be disabled. This value defaults to false. */
        @api
        disabled?: boolean;

        /** The help text that appears in a popover. Set field-level help to provide an informational tooltip on the textarea input field. */
        @api
        fieldLevelHelp?: string;

        /** Text that describes the desired textarea input. */
        @api
        label: string;

        /** The maximum number of characters allowed in the textarea. */
        @api
        maxLength?: number;

        /** Error message to be displayed when a bad input is detected. */
        @api
        messageWhenBadInput?: string;

        /** Error message to be displayed when the value is too long. */
        @api
        messageWhenTooLong?: string;

        /** Error message to be displayed when the value is too short. */
        @api
        messageWhenTooShort?: string;

        /** Error message to be displayed when the value is missing. */
        @api
        messageWhenValueMissing?: string;

        /** The minimum number of characters allowed in the textarea. */
        @api
        minLength?: number;

        /** Specifies the name of an input element. */
        @api
        name?: string;

        /** Text that is displayed when the field is empty, to prompt the user for a valid entry. */
        @api
        placeholder?: string;

        /** Specifies that an input field is read-only. This value defaults to false. */
        @api
        readOnly?: boolean;

        /** Specifies that an input field must be filled out before submitting the form. This value defaults to false. */
        @api
        required?: boolean;

        /** Represents the validity states that an element can be in, with respect to constraint validation. */
        @api
        validity?: any;

        /** The value of the textarea, also used as the default value during init. */
        @api
        value?: string;

        /** The variant changes the appearance of the textarea. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and textarea. Use label-stacked to place the label above the textarea. */
        @api
        variant?: 'standard' | 'label-hidden' | 'label-inline' | 'label-stacked';

        /**
         * Returns the valid attribute value (Boolean) on the ValidityState object.
         * @returns The valid attribute value (Boolean) on the ValidityState object.
         */
        checkValidity(): boolean;

        /**
         * Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true.
         */
        reportValidity(): boolean;

        /**
         * Inserts text in a specified range of index values, replacing content or inserting new content. This method follows the API of the HTMLInputElement.setRangeText() method.
         * @param replacement The string to insert.
         * @param start The 0-based index of the first character to replace. Defaults to the current selectionStart value (the start of the user's current selection).
         * @param end The 0-based index of the character after the last character to replace. Defaults to the current selectionEnd value (the end of the user's current selection).
         * @param selectMode A string defining how the selection should be set after the text has been replaced. Possible values: 'select' selects the newly inserted text; 'start' moves the selection to just before the inserted text; 'end' moves the selection to just after the inserted text; 'preserve' attempts to preserve the selection. This is the default.
         */
        setRangeText(replacement: string, start?: number, end?: number, selectMode?: string): void;

        /**
         * Sets a custom error message to be displayed when the textarea value is submitted.
         * @param message The string that describes the error. If message is an empty string, the error message is reset.
         */
        setCustomValidity(message: string): void;

        /** Displays error messages on invalid fields. An invalid field fails at least one constraint validation and returns false when checkValidity() is called. */
        showHelpMessageIfInvalid(): void;
    }

    export type Textarea = LightningTextarea;
}

declare module 'lightning/tile' {
    import { LightningElement, api } from 'lwc';

    /** A grouping of related information associated with a record. */
    export default class LightningTile extends LightningElement {
        /** A list of actions that's displayed in a dropdown menu. */
        @api
        actions?: string;

        /** The URL of the page that the link goes to. */
        @api
        href?: string;

        /** The text label that displays in the tile and hover text. */
        @api
        label: string;

        /** The icon or figure that's displayed next to the textual information. */
        @api
        media?: string;

        /** Called when the action is triggered. */
        @api
        onactiontriggered?: Function;

        /** The tile type. Valid values are 'standard' and 'media'. The default is 'standard'. */
        @api
        type?: 'standard' | 'media';
    }

    export type Tile = LightningTile;
}

declare module 'lightning/tree' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    /** A tree node */
    export interface LightningTreeItem {
        /** Required. The title and label for the hyperlink. */
        label: string;

        /** Text to provide users with supplemental information and aid with identification or disambiguation. */
        metatext?: string;

        /** Nested items as an array of key-value pairs. */
        items?: Array<LightningTreeItem>;

        /** The unique name for the item for the onselect event handler to return the tree item that was clicked. */
        name?: string;

        /** The URL for the link. */
        href?: string;

        /** Specifies whether a branch is expanded. An expanded branch displays its nested items visually. The default is false. */
        expanded?: boolean;

        /** Specifies whether an item is disabled. A disabled item is grayed out and can't be focused or perform any action. The default is false. */
        disabled?: boolean;
    }
// IC2 END

    /** Displays a nested tree. This component requires API version 41.0 and later. */
    export default class LightningTree extends LightningElement {
        /** The text that's displayed as the tree heading. */
        @api
        header?: string;

        /** An array of key-value pairs that describe the tree. Keys include label, name, disabled, expanded, and items. */
        @api
        items?: Array<LightningTreeItem>;

        /** Selects and highlights the specified tree item. Tree item names are case-sensitive. If the tree item is nested, selecting this item also expands the parent branches. */
        @api
        selectedItem?: string;
    }

    export type Tree = LightningTree;
// IC2 BEGIN
    export type TreeItem = LightningTreeItem;
// IC2 END
}

declare module 'lightning/treeGrid' {
    import { LightningElement, api } from 'lwc';

// IC2 BEGIN
    export interface LightningTreeGridColumn {
        actions?: any;
        cellAttributes?: any;
        fieldName?: string;
        iconName?: string;
        initialWidth?: bigint;
        label?: string;
        type?: 'action' | 'boolean' | 'button' | 'button-icon' | 'currency' | 'date' | 'date-local' | 'email' | 'location' | 'number' | 'percent' | 'phone' | 'text' | 'url';
        typeAttributes?: any;
    }
// IC2 END

    /** Displays a hierarchical view of data in a table. This component requires API version 42.0 and later. */
    export default class LightningTreeGrid extends LightningElement {
        /** Array of the columns object that's used to define the data types. Required properties include 'label', 'dataKey', and 'type'. The default type is 'text'. */
        @api
        columns?: Array<LightningTreeGridColumn>;

        /** Specifies how column widths are calculated. Accepted values include 'auto' and 'fixed'. Set to fixed for columns with equal widths. Set to auto for column widths that are based on the width of the column content and the table width. The default is fixed. */
        @api
        columnWidthsMode?: 'auto' | 'fixed';

        /** The array of data to be displayed. */
        @api
        data?: any;

        /** Specifies the default sorting direction on an unsorted column. Valid options include 'asc' and 'desc'. The default is 'asc' for sorting in ascending order. */
        @api
        defaultSortDirection?: 'asc' | 'desc';

        /** Prevents rows that are specified with a list of key-field values from being selected or deselected. */
        @api
        disabledRows?: string;

        /** The array of unique row IDs that are expanded. */
        @api
        expandedRows?: Array<any>;

        /**  present with hide-table-header, the table borders are hidden. */
        @api
        hideBorders?: boolean;

        /** Hides or displays the checkbox column for row selection. To hide the checkbox column, set hideCheckboxColumn to true. The default is false. */
        @api
        hideCheckboxColumn?: boolean;

        /** If present, the table header is hidden. */
        @api
        hideTableHeader?: boolean;

        /** Specifies whether more data is being loaded and displays a spinner if so. The default is false. */
        @api
        isLoading?: boolean;

        /** Required for better performance. Associates each row with a unique ID. */
        @api
        keyField: string;

        /** The maximum width for all columns. The default is 1000px. */
        @api
        maxColumnWidth?: number;

        /** The minimum width for all columns. The default is 50px. */
        @api
        minColumnWidth?: number;

        /** The action triggered when an operation its clicked. By default its to closes the actions menu. */
        @api
        onrowaction?: EventListener;

        /** The action triggered when a row is selected. */
        @api
        onrowselection?: EventListener;

        /** The action triggered when all rows are toggled (expanded or collapsed). */
        @api
        ontoggleall?: EventListener;

        /** Specifies whether column resizing is disabled. The default is false. */
        @api
        resizeColumnDisabled?: boolean;

        /** Determines where to start counting the row number. The default is 0. */
        @api
        rowNumberOffset?: number;

        /** The array of unique row IDs that are selected. */
        @api
        selectedRows?: Array<any>;

        /** Hides or displays the row number column. To show the row number column, set showRowNumberColumn to true. The default is false. */
        @api
        showRowNumberColumn?: boolean;

        /** The event fired when a column is sorted. */
        @api
        sort?: string;

        /** The column key or fieldName(s) that controls the sorting order. Sort the data using the onsort event handler. */
        @api
        sortedBy?: string;

        /** Specifies the sorting direction. Sort the data using the onsort event handler. Valid options include 'asc' and 'desc'. */
        @api
        sortedDirection?: 'asc' | 'desc';

        /** Collapse all rows. */
        collapseAll(): void;

        /** Expand all rows with children content. */
        expandAll(): void;

        /** Returns an array of rows that are expanded. */
        getCurrentExpandedRows(): void;

        /** Returns data in each selected row. */
        getSelectedRows(): void;
    }

    export type TreeGrid = LightningTreeGrid;
// IC2 BEGIN
    export type TreeGridColumn = LightningTreeGridColumn;
// IC2 END
}

declare module 'lightning/verticalNavigation' {
    import { LightningElement, api } from 'lwc';

    /** Represents a vertical list of links that either take the user to another page or parts of the page the user is in. This component requires API version 41.0 and later. */
    export default class LightningVerticalNavigation extends LightningElement {
        /** Specify true to reduce spacing between navigation items. This value defaults to false. */
        @api
        compact?: boolean;

        /** Action fired before an item is selected. The event params include the `name` of the selected item. To prevent the onselect handler from running, call event.preventDefault() in the onbeforeselect handler. */
        @api
        onbeforeselect?: EventListener;

        /** Name of the navigation item to make active. */
        @api
        selectedItem?: string;

        /** Specify true when the vertical navigation is sitting on top of a shaded background. This value defaults to false. */
        @api
        shaded?: boolean;
    }

    export type VerticalNavigation = LightningVerticalNavigation;
}

declare module 'lightning/verticalNavigationItem' {
    import { LightningElement, api } from 'lwc';

    /** A text-only link within lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later. */
    export default class LightningVerticalNavigationItem extends LightningElement {
        /** The URL of the page that the navigation item goes to. */
        @api
        href?: string;

        /** The text displayed for the navigation item. */
        @api
        label: string;

        /** A unique identifier for the navigation item. */
        @api
        name: string;
    }

    export type VerticalNavigationItem = LightningVerticalNavigationItem;
}

declare module 'lightning/verticalNavigationItemBadge' {
    import { LightningElement, api } from 'lwc';

    /** A link and badge within a lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later. */
    export default class LightningVerticalNavigationItemBadge extends LightningElement {
        /** Assistive text describing the number in the badge. This is used to enhance accessibility and is not displayed to the user. */
        @api
        assistiveText?: string;

        /** The number to show inside the badge. If this value is zero the badge will be hidden. */
        @api
        badgeCount?: number;

        /** The URL of the page that the navigation item goes to. */
        @api
        href?: string;

        /** The text displayed for this navigation item. */
        @api
        label: string;

        /** A unique identifier for this navigation item. */
        @api
        name: string;
    }

    export type VerticalNavigationItemBadge = LightningVerticalNavigationItemBadge;
}

declare module 'lightning/verticalNavigationItemIcon' {
    import { LightningElement, api } from 'lwc';

    /** A link and icon within a lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later. */
    export default class LightningVerticalNavigationItemIcon extends LightningElement {
        /** The URL of the page that the navigation item goes to. */
        @api
        href?: string;

        /** The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. */
        @api
        iconName?: string;

        /** The text displayed for this navigation item. */
        @api
        label: string;

        /** A unique identifier for this navigation item. */
        @api
        name: string;
    }

    export type VerticalNavigationItemIcon = LightningVerticalNavigationItemIcon;
}

declare module 'lightning/verticalNavigationOverflow' {
    import { LightningElement, api } from 'lwc';

    /** Represents an overflow of items from a preceding lightning:verticalNavigationSection, with the ability to toggle visibility. This component requires API 41.0 and later. */
    export default class LightningVerticalNavigationOverflow extends LightningElement {
    }

    export type VerticalNavigationOverflow = LightningVerticalNavigationOverflow;
}

declare module 'lightning/verticalNavigationSection' {
    import { LightningElement, api } from 'lwc';

    /** Represents a section within a lightning:verticalNavigation. This component requires API version 41.0 and later. */
    export default class LightningVerticalNavigationSection extends LightningElement {
        /** The heading text for this section. */
        @api
        label: string;
    }

    export type VerticalNavigationSection = LightningVerticalNavigationSection;
}

declare module 'slot' {
    import { LightningElement, api } from 'lwc';

    /** A placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together. */
    export default class LightningSlot extends LightningElement {
        /** The slot's name. */
        @api
        name?: string;
    }

    export type Slot = LightningSlot;
}