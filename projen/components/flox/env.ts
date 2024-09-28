import { Project, FileBase, type IResolver } from "projen";

export class Env extends FileBase {
	private readonly version: number;

	constructor(project: Project, version: number) {
		super(project, ".flox/env.json");

		this.version = version;
	}

	protected synthesizeContent(): string {
		return JSON.stringify({
			name: this.project.name,
			version: this.version,
		})
	}
}
