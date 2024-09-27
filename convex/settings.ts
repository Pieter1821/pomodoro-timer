import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query('settings')
      .filter(q => q.eq(q.field('userId'), args.userId))
      .first();
    return settings || { pomodoro: 25, shortBreak: 5, longBreak: 15 };
  },
});

export const update = mutation({
  args: { 
    userId: v.string(),
    settings: v.object({
      pomodoro: v.optional(v.number()),
      shortBreak: v.optional(v.number()),
      longBreak: v.optional(v.number())
    })
  },
  handler: async (ctx, args) => {
    const { userId, settings } = args;
    const existing = await ctx.db
      .query('settings')
      .filter(q => q.eq(q.field('userId'), userId))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, settings);
    } else {
      await ctx.db.insert('settings', { 
        userId, 
        pomodoro: settings.pomodoro ?? 25,
        shortBreak: settings.shortBreak ?? 5,
        longBreak: settings.longBreak ?? 15
      });
    }
  },
});