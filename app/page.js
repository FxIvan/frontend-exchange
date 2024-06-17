import Image from "next/image";
import Link from "next/link";
/*
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_PRO_LICENSE_KEY);
*/
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href="/admin"
        className="py-4 px-6 bg-black text-white rounded-full"
      >
        Historial de Usuario API Binance
      </Link>
    </main>
  );
}
