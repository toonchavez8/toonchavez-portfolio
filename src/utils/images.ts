// Import necessary modules and types
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { OpenGraph } from "@astrolib/seo";

// Function to load images dynamically
const load = async function () {
	let images: Record<string, () => Promise<unknown>> | undefined = undefined;

	try {
		// Attempt to load image paths based on a specific pattern
		images = import.meta.glob(
			"/src/assets/**.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,PNG,JPG,TIFF,GIF,SVG}"
		);
	} catch (e) {
		// Handle errors if the dynamic import fails
		console.error("Error during dynamic image import:", e);
	}

	if (!images) {
		// If no images were found or an error occurred during import, warn about it
		console.warn("No images found or an error occurred during import.");
	}

	// Return the loaded images (or undefined if there was an error)
	return images;
};

// Initialize a variable to store loaded images
let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

// Function to fetch and cache local images
export const fetchLocalImages = async () => {
	// Use the already loaded images if available, or load them if not
	_images = _images ?? (await load());
	return _images;
};

// Function to find an image by its path or metadata
export const findImage = async (
	imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
	if (typeof imagePath !== "string") {
		// If the input is not a string, return it as is (placeholder function)
		return imagePath;
	}
};

// Function to adapt OpenGraph metadata by processing image URLs and dimensions
export const adaptOpenGraphImages = async (
	openGraph: OpenGraph = {},
	astroSite: URL | undefined = new URL("")
): Promise<OpenGraph> => {
	if (!openGraph?.images?.length) {
		return openGraph;
	}

	const defaultWidth = 1200;
	const defaultHeight = 626;

	// Helper function to process a single image
	const processImage = async (image) => {
		if (!image?.url) {
			return { url: "" };
		}

		const resolvedImage = (await findImage(image.url)) as
			| ImageMetadata
			| undefined;
		if (!resolvedImage) {
			return { url: "" };
		}

		const _image = await getImage({
			src: resolvedImage,
			alt: "Placeholder Alt",
			width: image.width ?? defaultWidth,
			height: image.height ?? defaultHeight,
		});

		if (typeof _image !== "object") {
			return { url: "" };
		}

		const adaptedImage = {
			url:
				typeof _image.src === "string"
					? String(new URL(_image.src, astroSite))
					: "pepe",
		};

		if (typeof _image.width === "number") {
			adaptedImage.width = _image.width;
		}

		if (typeof _image.height === "number") {
			adaptedImage.height = _image.height;
		}

		return adaptedImage;
	};

	// Process all images in parallel
	const adaptedImages = await Promise.all(openGraph.images.map(processImage));

	return {
		...openGraph,
		...(adaptedImages.length ? { images: adaptedImages } : {}),
	};
};
