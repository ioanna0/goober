import { Container, Title, Card, Text, Group } from "@mantine/core";
import Link from "next/link";
import Layout from "~/components/Layout";

export default function Home() {
  const cardStyles = {
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const cardHoverStyles = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center  bg-center">
        <Container className="rounded-md bg-white bg-opacity-90 p-6 text-center shadow-lg">
          <Title order={3} className="mb-8 text-xl font-bold text-gray-800">
            Welcome to Goober 🚚
          </Title>
          <Text className="mb-6 text-gray-600">
            Your reliable ride-sharing app
          </Text>
          <div>
            <div>
              <Title
                order={6}
                className="text-md mb-8 font-semibold text-gray-800"
              >
                Rider Pages:
              </Title>
              <Group dir="column" gap="xs">
                <Link href="/rider?rider=1">
                  <Card
                    shadow="sm"
                    padding="md"
                    radius="md"
                    withBorder
                    style={cardStyles}
                    className="hover:shadow-lg"
                  >
                    <Text className="text-md font-semibold text-blue-500">
                      Rider 1
                    </Text>
                  </Card>
                </Link>
                <Link href="/rider?rider=4">
                  <Card
                    shadow="sm"
                    padding="md"
                    radius="md"
                    withBorder
                    style={cardStyles}
                    className="hover:shadow-lg"
                  >
                    <Text className="text-md font-semibold text-blue-500">
                      Rider 2
                    </Text>
                  </Card>
                </Link>
              </Group>
            </div>
            <div>
              <Title
                order={6}
                className="mb-2 text-3xl font-semibold text-gray-800"
              >
                Driver Pages:
              </Title>
              <Group dir="column" gap="xs">
                <Link href="/driver-dashboard?driver=2">
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={cardStyles}
                    className="hover:shadow-lg"
                  >
                    <Text className="text-md font-semibold text-blue-500">
                      Driver 1
                    </Text>
                  </Card>
                </Link>
                <Link href="/driver-dashboard?driver=5">
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={cardStyles}
                    className="hover:shadow-lg"
                  >
                    <Text className="text-md font-semibold text-blue-500">
                      Driver 2
                    </Text>
                  </Card>
                </Link>
              </Group>
            </div>
          </div>
        </Container>
      </main>
      <style jsx>{`
        .hover\\:shadow-lg:hover {
          ${Object.entries(cardHoverStyles)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ")}
        }
      `}</style>
    </Layout>
  );
}
