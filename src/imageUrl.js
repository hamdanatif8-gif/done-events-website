// Resolve an image in /public/images against the app base path
// so it works both locally and under the GitHub Pages sub-path.
export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`
