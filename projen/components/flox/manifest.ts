import { Project, FileBase, type IResolver } from "projen";
import { stringify } from "smol-toml";

export interface ManifestConfig {
	version?: number;
	options?: Options;
	install: Record<string, Package>;
}

interface Package {
	"pkg-path"?: string;
	version?: string;
}

interface Options {
	systems?: string[];
}

export class Manifest extends FileBase {
	private readonly config: ManifestConfig;

	constructor(project: Project, config: ManifestConfig) {
		super(project, ".flox/env/manifest.toml");

		this.config = config;
	}

	protected synthesizeContent(): string {
		const defaultedInstall = Object.entries(this.config.install).reduce((acc, [key, pkg]) => {
			if (!pkg["pkg-path"]) {
				pkg["pkg-path"] = key;
			}
			acc[key] = pkg;
			return acc;
		}, {} as Record<string, Package>);

		return stringify({
			version: this.config.version ?? 1,
			install: defaultedInstall,
			options: this.config.options,
		});
	}
}
