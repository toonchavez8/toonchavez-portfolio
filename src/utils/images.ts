import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { OpenGraph } from "@astrolib/seo";

const load = async function () {
	let images: Record<string, () => Promise<unknown>> | undefined = undefined;

	try {
		images = import.meta.glob(
			"@/assets/images/**/*.{jpeg,jpg,png,tiff, webp,giff,svg,JEPG,PNG,JPG,TIFF,GIF,SVG}"
		);
	} catch (e) {}
	return images;
};
