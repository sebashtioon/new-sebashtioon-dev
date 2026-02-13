import * as React from "react";
import ProsePage from "@/components/ProsePage";
import SocialLinksToggle from "@/components/SocialLinksToggle";

const EMAIL = "sebastiansuciu607@gmail.com";
const CANBERRA_TZ = "Australia/Sydney";

function getTimeZoneOffsetMinutes(timeZone: string, date: Date) {
  // Uses the host browser's ICU data. Returns minutes east of UTC.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";

  // Examples: "GMT", "GMT+11", "GMT+10:30", "UTC+01"
  const match = tzPart.match(/(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/);
  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes);
}

function formatAheadBehind(diffMinutes: number) {
  if (diffMinutes === 0) return "same time as you";

  const ahead = diffMinutes > 0;
  const abs = Math.abs(diffMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;

  const hm = m === 0 ? `${h}h` : `${h}h ${m}m`;
  return `${hm} ${ahead ? "ahead of" : "behind"} you`;
}

const Contact = () => {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const canberraTime = React.useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: CANBERRA_TZ,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now);
  }, [now]);

  const canberraOffsetMinutes = React.useMemo(() => {
    return getTimeZoneOffsetMinutes(CANBERRA_TZ, now);
  }, [now]);

  const localOffsetMinutes = -now.getTimezoneOffset();
  const diffMinutes = canberraOffsetMinutes - localOffsetMinutes;
  const relative = formatAheadBehind(diffMinutes);

  return (
    <ProsePage
      title="contact"
      subtitle={
        <span className="lowercase">
          ill get back to you within 48 hours i promise
        </span>
      }
    >
      <p className="lowercase">
        email: <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>
      </p>

      <p className="lowercase text-muted-foreground">
        you can literally email me about anything (i dont really care lol)
      </p>

      <div className="w-full flex justify-end">
        <SocialLinksToggle />
      </div>

      <p className="lowercase">
        timezone: canberra (australia) {canberraTime} ({relative})
      </p>

      <p className="mt-6 lowercase">
        <a
          href="https://dontasktoask.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          dontasktoask.com
        </a>
      </p>
    </ProsePage>
  );
};

export default Contact;
