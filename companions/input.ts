import { randomUUID } from "node:crypto";
import readline from "node:readline";
import WebSocket from "ws";

const firehoseUrl = "ws://localhost:8080";
const ws = new WebSocket(firehoseUrl);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
});

ws.on("open", () => {
	rl.prompt();

	rl.on("line", (line) => {
		const text = line.trim();
		if (text.length === 0) {
			rl.prompt();
			return;
		}

		const message = {
			topic: "messages",
			body: {
				jsonrpc: "2.0",
				method: "message.send",
				params: {
					id: randomUUID(),
					from: "system",
					to: ["companion_aya"],
					message: text,
				},
			},
		};

		ws.send(JSON.stringify(message));
		rl.prompt();
	});
});

ws.on("message", (data) => {
	try {
		const msg = JSON.parse(data.toString());
		console.log(msg);
	} catch (e) {
		console.error(e);
	}
	rl.prompt();
});
