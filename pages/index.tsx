import { useState } from "react";
import { setUrl } from "../lib/redis";

export default function Home() {
  const [value, setValue] = useState("https://next.leighhalliday.com");
  const [shortUrl, setShortUrl] = useState<string>(null);

  return (
    <div>
      {shortUrl ? (
        <div>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch("/api/shorten", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: value }),
            });
            const data = await response.json();

            setShortUrl(
              `${document.location.protocol}//${document.location.host}/${data.short}`
            );
          }}
        >
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit">Shorten!</button>
        </form>
      )}
    </div>
  );
}
