import { Construct } from "constructs";
import { ManagedDomain, Registrar } from "../dnsProvider";

export default (scope: Construct): ManagedDomain => {
	const managedDomain = new ManagedDomain(
		scope,
		"rawkode.live",
		Registrar.Cloudflare,
	);

	managedDomain.discourageEmail().setupShortIO("@");

	return managedDomain;
};
