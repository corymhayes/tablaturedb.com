import Dexie, { type EntityTable } from "dexie";

interface Tab {
	id: number;
	song: string;
	artist: string;
	tuning: string;
	instrument: string;
	link: string;
}

interface Tuning {
	id: number;
	name: string;
}

interface Instrument {
	id: number;
	name: string;
}

const db = new Dexie("TabsDatabase") as Dexie & {
	tabs: EntityTable<Tab, "id">;
	tunings: EntityTable<Tuning, "id">;
	instruments: EntityTable<Instrument, "id">;
};

db.version(1).stores({
	tabs: "++id, song, artist, tuning, link"
});

db.version(2).stores({
	tabs: "++id, song, artist, tuning, link",
	tunings: "++id, name",
	instruments: "++id, name"
});

export type { Tab, Tuning, Instrument };
export { db };
