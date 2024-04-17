const flowbite = require("flowbite-react/tailwind");
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  flowbite.content(),
];
export const theme = {
  extend: {},
};
export const plugins = [
  flowbite.plugin(),
];