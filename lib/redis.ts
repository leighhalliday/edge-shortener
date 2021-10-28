import upstash from "@upstash/redis";

const redis = upstash(
  process.env.UPSTASH_REDIS_REST_URL,
  process.env.UPSTASH_REDIS_REST_TOKEN
);

export async function setUrl(url: string) {
  const short = getShort();
  await redis.set(`short/${short}`, url);
  return short;
}

export async function getUrl(short: string): Promise<string> {
  const { data } = await redis.get(`short/${short}`);
  return data;
}

function getShort(): string {
  const alpha = "abcdefghijklmnopqrstuvwxyz".split("");
  return [...new Array(8)]
    .map((_) => alpha[Math.floor(Math.random() * alpha.length)])
    .join("");
}
