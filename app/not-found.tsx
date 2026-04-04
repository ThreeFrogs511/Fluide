import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-neutral-800 mb-4">404</h1>
      <p className="text-lg text-neutral-500 mb-8">Page not found.</p>
      <Link href="/" className="text-sm text-neutral-700 underline underline-offset-4 hover:text-neutral-900">
        Back to home
      </Link>
    </div>
  );
}
