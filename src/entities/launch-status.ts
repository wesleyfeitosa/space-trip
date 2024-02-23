export class LaunchStatus {
	id: number;
	name: string;
	abbrev: string;
	description: string;

	constructor({ id, name, abbrev, description }: LaunchStatus) {
		this.id = id;
		this.name = name;
		this.abbrev = abbrev;
		this.description = description;
	}
}
