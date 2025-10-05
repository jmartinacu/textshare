import { connect } from "@db/redis"

export default await connect({
  hostname: Deno.env.get("REDIS_HOST") || "localhost",
  port: Number(Deno.env.get("REDIS_PORT")) || 6379,
})
