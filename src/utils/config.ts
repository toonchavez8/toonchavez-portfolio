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

export const UI = getUI();
