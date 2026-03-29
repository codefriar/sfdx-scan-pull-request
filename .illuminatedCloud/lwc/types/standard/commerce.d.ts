// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

// https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-display-lwc-apis.html
// TODO: The resolved Promise output data types are not specified/documented
// TODO: The input data types are not specified/documented

declare module "commerce/activitiesApi" {
    /**
     * Triggers the addToCart activity when a shopper adds a product to the cart.
     *
     * If you replace the Product Detail Purchase Options component with a custom component, implement the addToCart
     * activity to ensure that Commerce Einstein Recommendations use cases generate results based on shopper or buyer
     * view behavior.
     *
     * @param product the the product
     */
    export function trackAddProductToCart(
        product: Product
    ): void;

    // TODO: This data type isn't defined
    export interface Product {
    }

    /**
     * Triggers the clickReco activity when a recommended product is clicked and the customer is taken to the product
     * detail page.
     *
     * Implement this activity when building a custom Commerce Einstein recommendations component.
     *
     * @param recommenderName The name of the recommender
     * @param recoUUID A string representing the unique ID for this recommendation response
     * @param product An object with an 18-character product ID that represents the product that the customer clicked
     * @param sku A unique stock keeping unit identifier for the product
     */
    export function trackClickReco(
        recommenderName: string,
        recoUUID: string,
        product: Product,
        sku?: string
    ): void;

    /**
     * Triggers the viewProduct activity when a shopper views a Product Detail page.
     *
     * Don’t fire if a product is displayed via a recommendation, search result, or any other means.
     *
     * If you replace the Product Detail Purchase Options component with a custom component, implement the viewProduct
     * activity to ensure that Commerce Einstein Recommendations use cases generate results based on shopper or buyer
     * view behavior.
     *
     * @param productId The 18-character productId of the product that the customer viewed
     * @param sku A unique stock keeping unit identifier for the product
     */
    export function trackViewProduct(
        productId: string,
        sku?: string
    ): void;

    /**
     * Triggers the viewReco activity when a recommendation is displayed to the customer.
     *
     * Implement this activity when building a custom Commerce Einstein recommendations component.
     *
     * If you calculate a recommendation but don’t show it to the customer—for example, it doesn’t have as many results
     * as you like—don’t fire this activity.
     *
     * @param recommenderName The name of the recommender
     * @param recoUUID A string representing the unique ID for this recommendation response
     * @param product An object with an 18-character product ID that represents the product that the customer clicked
     * @param sku A unique stock keeping unit identifier for the product
     */
    export function trackViewReco(
        recommenderName: string,
        recoUUID: string,
        product: Product,
        sku?: string
    ): void;
}

declare module "commerce/cartApi" {
    /**
     * Adds an item to a cart.
     *
     * @param productId the product ID
     * @param quantity the quantity
     */
    export function addItemToCart(
        productId: string,
        quantity: number
    ): Promise<any>;

    /**
     * Adds multiple items to a cart.
     *
     * @param payload the items to be added to the cart
     */
    export function addItemsToCart(
        payload: AddItemsToCartActionPayload
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface AddItemsToCartActionPayload {
    }

    /**
     * Applies a coupon to the cart.
     *
     * @param couponCode the coupon code
     */
    export function addCouponToCart(
        couponCode: string
    ): Promise<any>;

    /**
     * Deletes an applied coupon from the cart.
     *
     * @param couponCode the coupon code
     */
    export function deleteCouponFromCart(
        couponCode: string
    ): Promise<any>;

    /**
     * Deletes an active/current cart.
     */
    export function deleteCurrentCart(): Promise<any>;

    /**
     * Deletes an item from the cart.
     *
     * @param itemId the item ID
     */
    export function deleteItemFromCart(
        itemId: string
    ): Promise<any>;

    /**
     * Refreshes the cart summary.
     */
    export function refreshCartSummary(): Promise<any>;

    /**
     * Sets the isProcessing status field of the cart to the provided processing state.
     *
     * @param status the status
     */
    export function updateCartStatusProcessing(
        status: boolean
    ): Promise<any>;

    /**
     * Updates the item quantity in the cart.
     *
     * @param itemId the item ID
     * @param quantity the quantity
     */
    export function updateItemInCart(
        itemId: string,
        quantity: number
    ): Promise<any>;
}

declare module "commerce/checkoutApi" {
    /**
     * Authorizes a tokenized payment for a checkout session.
     *
     * @param checkoutId the checkout ID
     * @param tokenResponseToken the token response token
     * @param billingAddress the billing address
     */
    export function authorizePayment(
        checkoutId: string,
        tokenResponseToken: string,
        billingAddress: Address
    ): Promise<any>;

    /**
     * Called when the checkout status is ready.
     *
     * @param checkoutStatus the checkout status
     * @return true if the supplied checkout status is complete and will accept additional parameters
     */
    export function checkoutStatusIsReady(
        checkoutStatus: CheckoutStatus | undefined
    ): boolean;

    // TODO: This data type isn't defined
    export interface CheckoutStatus {
    }

    /**
     * Creates a contact point address record.
     *
     * This API doesn’t affect the checkout session.
     *
     * @param address the address
     */
    export function createContactPointAddress(
        address: Address
    ): Promise<any>;

    /**
     * Loads the checkout session or error and saves it in the store for access by the wire adapter.
     */
    export function loadCheckout(): Promise<any>;

    /**
     * Publishes an updated checkout session state to the store so changes can be propagated by the wire adapter to
     * subscribed listeners.
     *
     * Passing an Error replaces the checkout state and checkout ID with the error state.
     *
     * Passing null clears the published data cache. Returns the passed in data unmodified.
     *
     * @param state the state
     */
    export function notifyCheckout(
        state: CheckoutInformation | Error | null
    ): Promise<any>;

    /**
     * Finalizes the order, completing the active checkout session.
     */
    export function placeOrder(): Promise<any>;

    /**
     * Sends a client-side authorization result to the server.
     *
     * @param checkoutId the checkout ID
     * @param paymentToken the payment token
     * @param billingAddress the billing address
     * @param paymentsData the payments data
     */
    export function postAuthorizePayment(
        checkoutId: string,
        paymentToken: string,
        billingAddress?: Address,
        paymentsData?: object
    ): Promise<any>;

    /**
     * Restarts an active checkout process.
     *
     * Before you use this API, clear all cached checkout and address data to prepare for a new “active” session.
     * Clear cache is required anytime the previous checkout session becomes invalid. Attempts to use other checkout
     * APIs after the previous session become invalid and fail until the restart is called.
     */
    export function restartCheckout(): Promise<any>;

    /**
     * Sends an authenticated buyer's simple purchase order number to the server.
     *
     * @param checkoutId the checkout ID
     * @param tokenResponseToken the token response token
     * @param billingAddress the billing address
     */
    export function simplePurchaseOrderPayment(
        checkoutId: string,
        tokenResponseToken: string,
        billingAddress: Address
    ): Promise<any>;

    /**
     * Updates the guest contact information in the active checkout session.
     *
     * @param contactInfo the contact information
     */
    export function updateContactInformation(
        contactInfo: ContactInfo
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface ContactInfo {
    }

    /**
     * Updates an existing contact point address record.
     *
     * This API doesn’t affect the checkout session.
     *
     * @param address the address
     */
    export function updateContactPointAddress(
        address: Address
    ): Promise<any>;

    /**
     * Updates the delivery method for the default delivery group in the active checkout session, and updates the cart
     * summary.
     *
     * @param deliveryMethodId the delivery method ID
     */
    export function updateDeliveryMethod(
        deliveryMethodId: string
    ): Promise<any>;

    /**
     * Updates the cached guest email value that’s shared between components.
     *
     * This API doesn’t affect the checkout session.
     *
     * @param guestEmail the guest email address
     */
    export function updateGuestEmail(
        guestEmail: string | undefined
    ): Promise<any>;

    /**
     * Updates the shipping address for the default delivery group in the active checkout session.
     *
     * @param deliveryGroup the delivery group
     */
    export function updateShippingAddress(
        deliveryGroup: DeliveryGroup
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface DeliveryGroup {
    }

    /**
     * Returns a resolved promise immediately if the checkout status is complete. Otherwise, the returned promise
     * resolves after the checkout status becomes complete or errors.
     */
    export function waitForCheckout(): Promise<any>;
}

declare module "commerce/contextApi" {
    /**
     * Get application-context-specific data.
     */
    export function getAppContext(): Promise<any>;

    /**
     * Get session-context-specific data.
     */
    export function getSessionContext(): Promise<any>;
}

declare module "commerce/myAccountApi" {
    /**
     * Create an account address.
     *
     * @param address the address
     */
    export function createMyAccountAddress(
        address: MyAccountAddress
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface MyAccountAddress {
    }

    /**
     * Delete an account address.
     *
     * @param addressId the address ID
     */
    export function deleteMyAccountAddress(
        addressId: string
    ): Promise<any>;

    /**
     * Update an account address.
     *
     * @param address the address
     */
    export function updateMyAccountAddress(
        address: MyAccountAddress
    ): Promise<any>;

    /**
     * Reset a password.
     *
     * @param username the username
     */
    export function resetPassword(
        username: string
    ): Promise<any>;

    /**
     * Update an existing account profile.
     *
     * @param profile the profile
     */
    export function updateMyAccountProfile(
        profile: MyAccountProfileRequestOptions
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface MyAccountProfileRequestOptions {
    }
}

declare module "commerce/orderApi" {
    /**
     * TODO: Undocumented
     *
     * @param options the options
     */
    export function startReOrder(
        options: OrderActionAddToCartRequestOptions
    ): Promise<any>;

    // TODO: This data type isn't defined
    export interface OrderActionAddToCartRequestOptions {
    }

    /**
     * Authorize guest users by verifying their personally identifiable information to access the requested order
     * summary. This API is specifically for guest users.
     *
     * @param options the options
     */
    export function authorizeOrderSummaryAccess(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;
}

declare module "commerce/effectiveAccountApi" {
    // TODO: effectiveAccount.update(...)?
}

declare module "commerce/wishlistApi" {
    /**
     * Add items to wishlist.
     *
     * @param options the options
     */
    export function addItemToWishlist(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;

    /**
     * Add a wishlist to a cart.
     *
     * @param options the options
     */
    export function addWishlistToCart(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;

    /**
     * Create a wishlist.
     *
     * @param options the options
     */
    export function createWishlist(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;

    /**
     * Delete a wishlist item.
     *
     * @param options the options
     */
    export function deleteItemFromWishlist(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;

    /**
     * Delete a wishlist.
     *
     * @param options the options
     */
    export function deleteWishlist(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;

    /**
     * Update a wishlist.
     *
     * @param options the options
     */
    export function updateWishlist(
        // TODO: This data type isn't specified
        options: any
    ): Promise<any>;
}