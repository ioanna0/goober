import { Container, Title, Button, Card, Text } from "@mantine/core";
import Link from "next/link";
import Layout from "~/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Container className="rounded-md bg-white bg-opacity-90 p-6 text-center shadow-lg">
          <Title order={1} className="mb-4 text-4xl font-bold text-gray-800">
            Welcome to Goober 🚚
          </Title>
          <Text className="mb-6 text-gray-600">
            Your reliable ride-sharing app
          </Text>
          <div className="space-y-4">
            <Link href="/request-ride">
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-lg"
              >
                <Text className="text-xl font-semibold text-blue-500">
                  Request a Ride
                </Text>
              </Card>
            </Link>
            <Link href="/view-rides">
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-lg"
              >
                <Text className="text-xl font-semibold text-blue-500">
                  View Your Rides
                </Text>
              </Card>
            </Link>
            <Link href="/driver-dashboard">
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-lg"
              >
                <Text className="text-xl font-semibold text-blue-500">
                  Driver Dashboard
                </Text>
              </Card>
            </Link>
          </div>
        </Container>
      </main>
    </Layout>
  );
}
