import { ToastProvider } from "@/components/ToastProvider";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="cs">
        <body>
            <ToastProvider>
            { children}
            </ToastProvider>
        </body>
      </html>
    )
  }
  