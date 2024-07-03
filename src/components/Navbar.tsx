import Link from "next/link";
import { Container } from "@mantine/core";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <Container className="mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          Goober
        </Link>
        <div className="space-x-4">
          <Link
            href="/request-ride"
            className="text-sm text-white hover:text-gray-200"
          >
            Request a Ride
          </Link>
          <Link
            href="/view-rides"
            className="text-sm text-white hover:text-gray-200"
          >
            View Your Rides
          </Link>
          <Link
            href="/driver-dashboard"
            className="text-sm text-white hover:text-gray-200"
          >
            Driver Dashboard
          </Link>
        </div>
      </Container>
    </nav>
  );
}
