import { Project, type ProjectOptions } from "projen";
import { Flox, type ManifestConfig } from "../components/flox";

interface APIServiceOptions extends ProjectOptions {}

export class APIService extends Project {
	constructor(options: APIServiceOptions) {
		super({
			...options,
			gitIgnoreOptions: {
				ignorePatterns: ["david"],
			}
		});
	}

	withFlox(config: ManifestConfig): APIService {
		this.components.concat(new Flox(this, config));

		return this;
	}
}
