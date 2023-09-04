import fs from "fs";
import yaml from "js-yaml";
import merge from "lodash.merge";

export interface SiteConfig {
	name: string;
	stie?: string;
	base?: string;
	trailingSlash: boolean;
	googleSiteVerificationId?: string;
}
export interface MetaDataConfig {}
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

export const UI = getUI();
export const I18N = getI18N();
