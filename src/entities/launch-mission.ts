export class LaunchMission {
	id: number;
	name: string;
	description: string;
	type: string;

	constructor({ id, name, description, type }: LaunchMission) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
	}
}
