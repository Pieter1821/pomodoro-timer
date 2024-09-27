import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('tasks')
      .filter(q => q.eq(q.field('userId'), args.userId))
      .collect();
  },
});

export const add = mutation({
  args: { name: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('tasks', { name: args.name, completed: false, userId: args.userId });
  },
});

export const update = mutation({
  args: { id: v.id('tasks'), completed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: args.completed });
  },
});

export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});