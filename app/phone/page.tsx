import { SiteShell } from "../site-shell";
import { BananaPhone } from "./phone-frame";
export const metadata = { title: "BananaPhone Ω — Does a Banana Need a Reason?", description: "通話に、理由はいらない。番号を選び、バナナと話す。電話帳と熟度が育つBananaPhone Ω。" };
export default function PhonePage() { return <SiteShell current="phone" plate="ROOM 03 / BANANA NET"><BananaPhone /></SiteShell>; }
