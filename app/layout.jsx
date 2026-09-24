import "./globals.css";
import { fontVariables } from "@/lib/fonts";

export const metadata = {
  title: "Ticktock",
  description: "Countdown and count-up timer with customizable appearance.",
};

export default function RootLayout({ children }) {
  const themeScript = `(function(){try{var s=JSON.parse(localStorage.getItem('timer.settings')||'{}');var t=s.theme==='dark'||s.theme==='light'?s.theme:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}