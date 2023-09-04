import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface MetaData {
	title?: string;
	ignoreTitle?: boolean;
	canonical?: string;
	robots?: MetaDataRobots;
	description?: string;
	openGraph?: MetaDataOpenGraph;
	twitter?: MetadataTwitter;
}

export interface MetaDataRobots {
	index?: boolean;
	follow?: boolean;
}

export interface MetaDataImage {
	url: string;
	width?: number;
	height?: number;
}
export interface MetaDataOpenGraph {
	url?: string;
	siteName?: string;
	images?: Array<MetaDataImage>;
	locale?: string;
	type?: string;
}
export interface MetaDataTwitter {
	handle?: string;
	site?: string;
	cardType?: string;
}
