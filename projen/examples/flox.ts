import { APIService } from "../projects/api-service";

const projectWithFlox = new APIService({
	name: "project-with-flox",
}).withFlox({
	install: {
		"bun": {},
		"node": {
			"pkg-path": "nodejs",
		}
	}
});

projectWithFlox.synth();
