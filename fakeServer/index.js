import connect from "connect";
import { createFakeMiddleware, createLogger } from "vite-plugin-fake-server";

const loggerOutput = createLogger(undefined, {
	allowClearScreen: undefined,
	// customLogger: undefined,
});

async function main() {

	const app = connect();
	const middleware = await createFakeMiddleware(
		{
			...{
  "include": [
    "mock"
  ],
  "exclude": [],
  "infixName": false,
  "extensions": [
    "ts",
    "js",
    "mjs",
    "cjs",
    "cts",
    "mts"
  ],
  "enableProd": true,
  "enableDev": true,
  "watch": true,
  "logger": true,
  "basename": "",
  "headers": {},
  "build": true,
  "http2": true
},
			loggerOutput,
			// config.root
			root: process.cwd(),
		},
		app
	);
	app.use(middleware);

	app.listen(8888);
	console.log("listen: http://localhost:8888");
}

main();
