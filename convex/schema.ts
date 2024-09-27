import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    name: v.string(),
    completed: v.boolean(),
    userId: v.string(),
  }),
  settings: defineTable({
    userId: v.string(),
    pomodoro: v.number(),
    shortBreak: v.number(),
    longBreak: v.number(),
  }),
});