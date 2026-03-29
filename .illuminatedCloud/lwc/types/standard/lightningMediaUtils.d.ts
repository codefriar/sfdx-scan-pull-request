// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/** https://developer.salesforce.com/docs/component-library/bundle/lightning-media-utils/documentation */
declare module 'lightning/mediaUtils' {
    /** Resizes and compresses image files. */
    export function processImage(file: File | Blob, {options}: ProcessImageOptions)

    export interface ProcessImageOptions {
        /**
         * A string that determines how the image will be resized. It can contain one of the below values:
         * * `fill`: This is default. The image will be resized to fill the target dimension. If necessary, the image will be stretched or squished to fit.
         * * `contain`: The image keeps its aspect ratio but will be resized to fit within the target dimension.
         * * `none`: The image will not be resized and will retain its original dimension.
         */
        resizeMode?: 'fill' | 'contain' | 'none';
        /**
         * A string that determines how to resize the image. If `resizeMode` is set to `none` this flag will be ignored.
         * * `reduce`: Only resize if the image is larger than the target size (smaller images won't be resized).
         * * `enlarge`: Only resize if the image is smaller than the target size (larger images won't be resized).
         * * `always`: This is default. Always resize the image to the target size regardless of the original image dimensions.
         */
        resizeStrategy?: 'reduce' | 'enlarge' | 'always';
        /** The target width when resizing an image. If omitted, defaults to the original image width. If `resizeMode` is set to `none` this flag will be ignored. */
        targetWidth?: number;
        /** The target height when resizing an image. If omitted, defaults to the original image height. If `resizeMode` is set to `none` this flag will be ignored. */
        targetHeight?: number;
        /**
         * A number between 0-1 that determines the compression quality. If omitted then the browser/webview picks a
         * default value as it sees fit. Note that this parameter will be considered as a suggested compression quality,
         * however the browser/webview may choose to override this value if it deems it necessary. For example if the
         * value is larger than 1 or if it is considered to be too small by the browser/webview, then it will override
         * the value to something that it deems more appropriate.
         */
        compressionQuality?: number;
        /** A boolean that determines whether scaled images are smoothed or not. Defaults to `true`. */
        imageSmoothingEnabled?: boolean;
        /**
         * A boolean that determines whether the transparency info of the input image (if any) should be preserved or
         * not. Defaults to `true`. If the input image is a GIF/PNG and this flag is set to `true` the output image
         * will be a PNG. For all other cases the output will be a JPEG.
         */
        preserveTransparency?: boolean;
        /**
         * A string that defines a CSS color as described here. Defaults to `white`. When `preserveTransparency` is set
         * to `false`, the output image will have its background set to this color before the input image is resized
         * and drawn on top.
         */
        backgroundColor?: string;
    }
}