import "@testing-library/jest-dom/vitest";

function createLocalStorageMock(): Storage {
	let store: Record<string, string> = {};

	return {
		get length() {
			return Object.keys(store).length;
		},
		clear() {
			store = {};
		},
		getItem(key: string) {
			return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
		},
		key(index: number) {
			return Object.keys(store)[index] ?? null;
		},
		removeItem(key: string) {
			delete store[key];
		},
		setItem(key: string, value: string) {
			store[key] = String(value);
		},
	} as Storage;
}

// Some JSDOM configurations run with an opaque origin which can make `localStorage`
// unavailable or incomplete; provide a stable mock for unit tests.
try {
	if (!window.localStorage || typeof window.localStorage.clear !== "function") {
		Object.defineProperty(window, "localStorage", {
			value: createLocalStorageMock(),
			configurable: true,
		});
	}
} catch {
	Object.defineProperty(window, "localStorage", {
		value: createLocalStorageMock(),
		configurable: true,
	});
}
