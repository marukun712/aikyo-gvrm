import { anthropic } from "@ai-sdk/anthropic";
import {
	CompanionAgent,
	type CompanionCard,
	CompanionServer,
	type Message,
} from "@aikyo/server";
import { aya } from "./cards/aya";

const cards: CompanionCard[] = [aya];

async function main() {
	await Promise.all(
		cards.map(async (card) => {
			const history: Message[] = [];
			const agent = new CompanionAgent(
				card,
				anthropic("claude-3-5-haiku-latest"),
				history,
			);
			const server = new CompanionServer(agent, history);
			await server.start();
		}),
	);
}

main().catch((e) => console.error(e));
