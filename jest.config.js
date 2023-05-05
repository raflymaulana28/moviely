const config = {
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        //the content you'd placed at "global"
        babel: true,
        tsConfig: "tsconfig.json",
      },
    ],
  },
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/**/(*.)test.(js|jsx|ts|tsx)",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

module.exports = config;
