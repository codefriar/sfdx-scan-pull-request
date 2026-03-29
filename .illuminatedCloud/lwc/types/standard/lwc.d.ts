// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/** Lightning Web Components core module */
declare module 'lwc' {
// IC2 BEGIN
    // backwards compatible type used for the old days when TS didn't support `event.composed`
    // interface ComposableEvent extends Event {
    //     composed: boolean;
    // }
    // NOTE: The interface above is no longer necessary and just causes issues in TypeScript, so make it an alias for
    // DOM Event in case anyone is using/extending it
    type ComposableEvent = Event;
// IC2 END

// IC2 BEGIN
    // Just making this extend HTMLElement and add the few things that it's been adding to that interface
    class HTMLElementTheGoodPart extends HTMLElement {
        // dispatchEvent(evt: Event): boolean;
        // addEventListener(
        //     type: string,
        //     listener: EventListenerOrEventListenerObject,
        //     options?: boolean | AddEventListenerOptions
        // ): void;
        // removeEventListener(
        //     type: string,
        //     listener: EventListenerOrEventListenerObject,
        //     options?: boolean | EventListenerOptions
        // ): void;
        // setAttributeNS(ns: string, attrName: string, value: any): void;
        // removeAttributeNS(ns: string, attrName: string): void;
        // removeAttribute(attrName: string): void;
        // setAttribute(attrName: string, value: any): void;
        // getAttribute(attrName: string): string | null;
        // getAttributeNS(ns: string, attrName: string): string | null;
        // // noinspection JSDeprecatedSymbols
        // getBoundingClientRect(): ClientRect;
        // querySelector<E extends Element = Element>(selectors: string): E | null;
        // querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
        // getElementsByTagName(tagNameOrWildCard: string): HTMLCollectionOf<Element>;
        // getElementsByClassName(names: string): HTMLCollectionOf<Element>;
        // readonly tagName: string;
        // readonly classList: DOMTokenList;

        // Default HTML Properties
        // dir: string;
        // id: string;
        // accessKey: string;
        // title: string;
        // lang: string;
        // hidden: boolean;
        // draggable: boolean;
        // tabIndex: number;

        // Aria Properties
        // ariaAutoComplete: string | null;
        // ariaChecked: string | null;
        // ariaCurrent: string | null;
        // ariaDisabled: string | null;
        // ariaExpanded: string | null;
        // ariaHasPopup: string | null;
        // ariaHidden: string | null;
        // ariaInvalid: string | null;
        // ariaLabel: string | null;
        // ariaLevel: string | null;
        // ariaMultiLine: string | null;
        // ariaMultiSelectable: string | null;
        // ariaOrientation: string | null;
        // ariaPressed: string | null;
        // ariaReadOnly: string | null;
        // ariaRequired: string | null;
        // ariaSelected: string | null;
        // ariaSort: string | null;
        // ariaValueMax: string | null;
        // ariaValueMin: string | null;
        // ariaValueNow: string | null;
        // ariaValueText: string | null;
        // ariaLive: string | null;
        ariaRelevant: string | null;
        // ariaAtomic: string | null;
        // ariaBusy: string | null;
        ariaActiveDescendant: string | null;
        ariaControls: string | null;
        ariaDescribedBy: string | null;
        ariaFlowTo: string | null;
        ariaLabelledBy: string | null;
        ariaOwns: string | null;
        // ariaPosInSet: string | null;
        // ariaSetSize: string | null;
        // ariaColCount: string | null;
        // ariaColIndex: string | null;
        ariaDetails: string | null;
        ariaErrorMessage: string | null;
        // ariaKeyShortcuts: string | null;
        // ariaModal: string | null;
        // ariaPlaceholder: string | null;
        // ariaRoleDescription: string | null;
        // ariaRowCount: string | null;
        // ariaRowIndex: string | null;
        // ariaRowSpan: string | null;
        // ariaColSpan: string | null;
        // role: string | null;
    }
// IC2 END

// IC2 BEGIN
    interface NodeSelector {
        /**
         * Returns the first matching <code>Element</code> node within the node's subtree. If no matching node is found,
         * <code>null</code> is returned.
         */
        querySelector<E extends Element>(selectors: string): E | null;
        /**
         * Returns a <code>NodeList</code> containing all matching <code>Element</code> nodes within the node's subtree,
         * or an empty <code>NodeList</code> if no matches are found.<p/>
         *
         * <b>Note:</b> The <code>NodeList</code> returned by <code>querySelectorAll()</code> is not live, which means
         * that changes in the DOM are not reflected in the collection. This is different from other DOM querying
         * methods that return live node lists.
         */
        querySelectorAll<E extends Element>(selectors: string): NodeListOf<E>;
    }
// IC2 END

    // @ts-ignore type-mismatch
// IC2 BEGIN
    interface ShadowRootTheGoodPart extends ShadowRoot, NodeSelector {
        // mode: string;
        // readonly activeElement: Element | null;
        // readonly host: HTMLElement;
        // readonly firstChild: Node | null;
        // readonly lastChild: Node | null;
        // readonly innerHTML: string;
        // readonly textContent: string;
        // readonly childNodes: Node[];
        // readonly delegatesFocus: boolean;
        // addEventListener(
        //     type: string,
        //     listener: EventListenerOrEventListenerObject,
        //     options?: boolean | AddEventListenerOptions
        // ): void;
        // removeEventListener(
        //     type: string,
        //     listener: EventListenerOrEventListenerObject,
        //     options?: boolean | EventListenerOptions
        // ): void;
        // hasChildNodes(): boolean;
        // compareDocumentPosition(otherNode: Node): number;
        // contains(otherNode: Node): boolean;
        // elementFromPoint(x: number, y: number): Element | null;
        // querySelector<K extends keyof HTMLElementTagNameMap>(
        //     selectors: K
        // ): HTMLElementTagNameMap[K] | null;
        // querySelector<K extends keyof SVGElementTagNameMap>(
        //     selectors: K
        // ): SVGElementTagNameMap[K] | null;
        // querySelector<E extends Element = Element>(selectors: string): E | null;
        // querySelectorAll<K extends keyof HTMLElementTagNameMap>(
        //     selectors: K
        // ): NodeListOf<HTMLElementTagNameMap[K]>;
        // querySelectorAll<K extends keyof SVGElementTagNameMap>(
        //     selectors: K
        // ): NodeListOf<SVGElementTagNameMap[K]>;
        // querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    }
// IC2 BEGIN

    /**
     * Base class for the Lightning Web Component JavaScript class
     */
    export class LightningElement extends HTMLElementTheGoodPart {
        /**
         * This static getter builds a Web Component class from a LWC constructor so it can be registered
         * as a new element via customElements.define() at any given time. For example:
         *
         * ```
         * import XComponent from 'namespace/element';
         * customElements.define('x-component', XComponent.CustomElementConstructor);
         * const elm = document.createElement('x-component');
         * ```
         */
        static get CustomElementConstructor(): typeof HTMLElement;
        /**
         * Called when the element is inserted in a document
         */
        connectedCallback(): void;
        /**
         * Called when the element is removed from a document
         */
        disconnectedCallback(): void;
// IC2 BEGIN
        /**
         * Called to render the element
         */
        render(): string;
// IC2 END
        /**
         * Called after every render of the component
         */
        renderedCallback(): void;
        /**
         * Called when a descendant component throws an error in one of its lifecycle hooks
         */
        errorCallback(error: Error, stack: string): void;

// IC2 BEGIN
        /**
         * Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes.
         */
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        /**
         * Retrieves a collection of objects based on the specified element name.
         * @param qualifiedName Specifies the name of an element.
         */
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
// IC2 END

        readonly template: ShadowRootTheGoodPart;
// IC2 BEGIN
        //readonly shadowRoot: null;
        readonly shadowRoot: ShadowRootTheGoodPart;
        readonly isConnected: boolean;
        readonly style: CSSStyleDeclaration;
        readonly hostElement: HTMLElement;
        /**
         * Provides direct access to elements designated with lwc:ref. If you call this.refs for a nonexistent ref, it returns undefined. If the template contains duplicate lwc:ref directives, this.refs references the last directive. For a component with more than one template, this.refs refers to the most recently rendered template.
         */
        readonly refs: {
            [key: string]: HTMLElement;
        };
// IC2 END
    }

    /**
     * Decorator to mark public reactive properties
     */
    export const api: PropertyDecorator;

    /**
     * Decorator to mark private reactive properties
     */
    export const track: PropertyDecorator;

    /**
     * Decorator factory to wire a property or method to a wire adapter data source
     * @param adapter the adapter used to provision data
     * @param config configuration object for the adapter
     */
    export function wire(
// IC2 BEGIN
        // NOTE: Have to add Function here for the Typescript compiler
        adapter: WireAdapterConstructor | LegacyWireAdapterConstructor | Function,
// IC2 END
        config?: WireConfigValue
    ): PropertyDecorator;

    type LegacyWireAdapterConstructor = (config?: any) => any;
    type WireConfigValue = Record<string, any>;
    type ContextValue = Record<string, any>;

    interface WireAdapter {
        update(config: WireConfigValue, context?: ContextValue): void;
        connect(): void;
        disconnect(): void;
    }

    type WireDataCallback = (value: any) => void;
    type WireAdapterSchemaValue = 'optional' | 'required';

    interface ContextConsumer {
        provide(newContext: ContextValue): void;
    }

    interface ContextProviderOptions {
        consumerConnectedCallback: (consumer: ContextConsumer) => void;
        consumerDisconnectedCallback?: (consumer: ContextConsumer) => void;
    }

    interface WireAdapterConstructor {
        new (callback: WireDataCallback): WireAdapter;
        configSchema?: Record<string, WireAdapterSchemaValue>;
        contextSchema?: Record<string, WireAdapterSchemaValue>;
    }

    type Contextualizer = (elm: EventTarget, options: ContextProviderOptions) => void;
    export function createContextProvider(config: WireAdapterConstructor): Contextualizer;

// IC2 BEGIN - Cloned from upgrade.d.ts to support completion and resolution of createElement() for Jest testing
    /**
     * EXPERIMENTAL: This function is almost identical to document.createElement
     * (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
     * with the slightly difference that in the options, you can pass the `is`
     * property set to a Constructor instead of just a string value. The intent
     * is to allow the creation of an element controlled by LWC without having
     * to register the element as a custom element. E.g.:
     *
     * const el = createElement('x-foo', { is: FooCtor });
     *
     * If the value of `is` attribute is not a constructor,
     * then it throws a TypeError.
     */
    export function createElement<T extends Element = Element>(sel: string, options: CreateElementOptions<T>) : T | null;

    export interface CreateElementOptions<T extends Element = Element> {
        is?: ComponentConstructor | Type<T>;
        mode?: ShadowDomMode;
    }

    export interface ComponentInterface {
        setAttribute(attrName: string, value: any): void;
    }

    export interface ComponentConstructor {
        new(): ComponentInterface;

        readonly name: string;
        readonly labels?: string[];
        readonly delegatesFocus?: boolean;
    }

    export type ShadowDomMode = 'open' | 'closed';
// IC2 END
}