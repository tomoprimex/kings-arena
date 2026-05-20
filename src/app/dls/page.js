import Link from "next/link";

export default function DLSPage() {
  const cards = [
    { title: "Tournaments", link: "/dls/tournaments" },
    { title: "National League", link: "/dls/national-league" },
    { title: "Continental League", link: "/dls/continental-league" },
    { title: "Intercontinental Championship", link: "/dls/intercontinental" },
    { title: "Friendly Arena", link: "/dls/friendly" },
    { title: "Hall of Champions", link: "/dls/champions" },
    { title: "Profile", link: "/dls/profile" },
    { title: "Token Store", link: "/dls/tokens" },
  ];

  return (
    <div>
      <h1>DLS Arena</h1>
      <p>Compete, connect, and become a champion.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {cards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div style={{ padding: "20px", border: "1px solid white", cursor: "pointer" }}>
              <h3>{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}