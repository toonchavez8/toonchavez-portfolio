import fs from "fs";
import yaml from "js-yaml";
import merge from "lodash.merge";

import type { MetaData } from "@/types";
export interface SiteConfig {
	name: string;
	site?: string;
	base?: string;
	trailingSlash: boolean;
	googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, "title"> {
	title?: {
		defalt: string;
		template: string;
	};
}
export interface I18NConfig {
	language: string;
	textDirection: string;
	dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {}

const config = yaml.load(fs.readFileSync("src/config.yaml", "utf8")) as {
	site?: SiteConfig;
	metadata?: MetaDataConfig;
	i18n?: I18NConfig;
	apps?: {
		blog?: AppBlogConfig;
	};
	ui?: unknown;
	analytics?: unknown;
};

const DEFAULT_SITE_NAME = "Toonchavez portfolio";

const getSite = () => {
	const _default = {
		name: DEFAULT_SITE_NAME,
		site: undefined,
		base: "/",
		trailingSlash: false,
		googleSiteVerificationId: "",
	};
	return merge({}, _default, config?.site ?? {}) as SiteConfig;
};
const getUI = () => {
	const _default = {
		theme: "system",
		classes: {},
		tokens: {},
	};
	return merge({}, _default, config?.ui ?? {});
};

const getI18N = () => {
	const _default = {
		language: "en",
		textDirection: "ltr",
	};

	const value = merge({}, _default, config?.i18n ?? {});

	return Object.assign(value, {
		dateFormatter: new Intl.DateTimeFormat(value.language, {
			year: "numeric",
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		}),
	}) as I18NConfig;
};

const getMetadata = () => {
	const siteConfig = getSite();

	const _default = {
		title: {
			default: siteConfig?.name || DEFAULT_SITE_NAME,
			template: "%s",
		},
		description: "",
		robots: {
			index: false,
			follow: false,
		},
		openGraph: {
			type: "website",
		},
	};
	return merge({}, _default, config?.metadata ?? {});
};

export const UI = getUI();
export const I18N = getI18N();
export const SITE = getSite();
export const METADATA = getMetadata();
