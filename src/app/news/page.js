"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/players.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockNews = [
      {
        id: 1,
        title: "Kings Championship Season 1 Announced",
        slug: "kings-championship-season-1-announced",
        excerpt: "The biggest tournament of the year is coming! Join players from around the world in this epic competition.",
        content: "Get ready for the most exciting tournament of the year...",
        author: "Kings Arena Team",
        category: "tournaments",
        image: "/images/news/championship.jpg",
        publishedAt: "2026-05-08T10:00:00Z",
        readTime: 5,
        featured: true
      },
      {
        id: 2,
        title: "New Ranking System Implemented",
        slug: "new-ranking-system-implemented",
        excerpt: "We've updated our ranking algorithm to provide fairer and more accurate player rankings.",
        content: "After months of development and testing...",
        author: "Development Team",
        category: "updates",
        image: "/images/news/ranking.jpg",
        publishedAt: "2026-05-07T14:30:00Z",
        readTime: 3,
        featured: false
      },
      {
        id: 3,
        title: "Player Spotlight: KingSlayer99",
        slug: "player-spotlight-kingslayer99",
        excerpt: "Meet the current #1 ranked player and learn about their journey to the top.",
        content: "In this exclusive interview, we sit down with...",
        author: "News Team",
        category: "players",
        image: "/images/news/spotlight.jpg",
        publishedAt: "2026-05-06T09:15:00Z",
        readTime: 7,
        featured: false
      },
      {
        id: 4,
        title: "Mobile App Beta Testing Now Open",
        slug: "mobile-app-beta-testing-open",
        excerpt: "Sign up for our mobile app beta and take Kings Arena with you anywhere.",
        content: "We're excited to announce the beta testing phase...",
        author: "Product Team",
        category: "updates",
        image: "/images/news/mobile.jpg",
        publishedAt: "2026-05-05T16:45:00Z",
        readTime: 4,
        featured: false
      },
      {
        id: 5,
        title: "Continental Cup Results",
        slug: "continental-cup-results",
        excerpt: "The final results are in! See who emerged victorious in the latest Continental Cup.",
        content: "After an intense weekend of competition...",
        author: "Tournament Team",
        category: "results",
        image: "/images/news/results.jpg",
        publishedAt: "2026-05-04T11:20:00Z",
        readTime: 6,
        featured: false
      },
      {
        id: 6,
        title: "Game Balance Updates",
        slug: "game-balance-updates",
        excerpt: "Important balance changes coming to eFootball and FIFA tournaments.",
        content: "Based on community feedback and gameplay data...",
        author: "Game Team",
        category: "updates",
        image: "/images/news/balance.jpg",
        publishedAt: "2026-05-03T13:00:00Z",
        readTime: 5,
        featured: false
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNews = news.filter(article => {
    const matchesCategory = category === "all" || article.category === category;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = news.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="players">
        <div className="playersContainer">
          <div className="playersHeader">
            <h1 className="playersTitle">Loading News...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="players">
      <div className="playersContainer">
        <div className="playersHeader">
          <h1 className="playersTitle">News & Updates</h1>
          <p className="playersSubtitle">
            Stay updated with the latest news, tournaments, and community highlights
          </p>
        </div>

        <div className="newsFilters">
          <div className="filterGroup">
            <input
              type="text"
              className="searchBox"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filterGroup">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="filterSelect"
            >
              <option value="all">All Categories</option>
              <option value="tournaments">Tournaments</option>
              <option value="updates">Updates</option>
              <option value="players">Players</option>
              <option value="results">Results</option>
            </select>
          </div>
        </div>

        {featuredArticle && category === "all" && !searchTerm && (
          <div className="featuredArticle">
            <div className="featuredImage">
              <img src={featuredArticle.image} alt={featuredArticle.title} />
            </div>
            <div className="featuredContent">
              <span className="featuredBadge">Featured</span>
              <h2>{featuredArticle.title}</h2>
              <p className="featuredExcerpt">{featuredArticle.excerpt}</p>
              <div className="featuredMeta">
                <span>{formatDate(featuredArticle.publishedAt)}</span>
                <span>•</span>
                <span>{featuredArticle.readTime} min read</span>
                <span>•</span>
                <span>{featuredArticle.author}</span>
              </div>
              <Link href={`/news/${featuredArticle.slug}`} className="featuredLink">
                Read Full Article
              </Link>
            </div>
          </div>
        )}

        <div className="newsGrid">
          {regularArticles.map((article) => (
            <article key={article.id} className="newsCard">
              <div className="newsImage">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="newsContent">
                <span className="newsCategory">{article.category}</span>
                <h3>{article.title}</h3>
                <p className="newsExcerpt">{article.excerpt}</p>
                <div className="newsMeta">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
                <Link href={`/news/${article.slug}`} className="newsLink">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="noNews">
            <h3>No articles found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        <div className="newsletterSection">
          <div className="newsletterContent">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest news and tournament updates.</p>
            <form className="newsletterForm">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletterInput"
                required
              />
              <button type="submit" className="newsletterBtn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
