import { createCompanionAction } from "@aikyo/utils";
import z from "zod";

export const gestureAction = createCompanionAction({
	id: "gesture",
	description: "ジェスチャーを表現します。",
	inputSchema: z.object({
		name: z.enum(["idle", "wave", "dance"]),
	}),
	topic: "actions",
	publish: ({ input, id }) => {
		return {
			jsonrpc: "2.0",
			method: "action.send",
			params: {
				name: "gesture",
				from: id,
				params: { name: input.name },
			},
		};
	},
});
