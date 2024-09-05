import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse().map((message) => ({
      ...message,
      // Convert the timestamp to a string.

      body: message.body
        .replaceAll(/lmbo/gi, "🤣🤣🤣")
        .replaceAll(/lmao/gi, "🤣🤣🤣")
        .replaceAll(/rofl/gi, "🤣🤣🤣")
        // regex to replace all instances of "baby oil" with "baby 🧴"
        .replace(/coconut oil/gi, "🥥 Oil"),
    }));
  },
});

export const send = mutation({
  args: {
    body: v.string(),
    author: v.string(),
  },
  handler: async (ctx, { body, author }) => {
    // Send a new message.
    await ctx.db.insert("messages", { body, author });
  },
});
