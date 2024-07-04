import Link from "next/link";
import { Container } from "@mantine/core";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <Container className="mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          Goober 🚚
        </Link>
        <div className="space-x-4">
          <Link
            href="/rider?rider=1"
            className="text-sm text-white hover:text-gray-200"
          >
            Rider 1
          </Link>
          <Link
            href="/rider?rider=4"
            className="text-sm text-white hover:text-gray-200"
          >
            Rider 2
          </Link>
          <Link
            href="/driver-dashboard?driver=2"
            className="text-sm text-white hover:text-gray-200"
          >
            Driver 1
          </Link>
          <Link
            href="/driver-dashboard?driver=5"
            className="text-sm text-white hover:text-gray-200"
          >
            Driver 2
          </Link>
        </div>
      </Container>
    </nav>
  );
}
