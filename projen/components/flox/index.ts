import { Component, IgnoreFile, type Project } from "projen";
import { Manifest, type ManifestConfig } from "./manifest";
import { Env } from "./env";

export * from "./manifest";

export class Flox extends Component {
	constructor(project: Project, config: ManifestConfig) {
		super(project, `${project.name}-flox`);

		new Env(project, config.version ?? 1);
		new Manifest(project, config);
		new IgnoreFile(project, ".flox/.gitignore", {
			ignorePatterns: [
				"*",
				"!env.json",
				"!env/manifest.*",
			],
		});
	}
}
