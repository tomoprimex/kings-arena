"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "../../styles/players.css";

export default function NewsArticle() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArticle = {
      id: 1,
      title: "Kings Championship Season 1 Announced",
      slug: "kings-championship-season-1-announced",
      content: `
        <p>Get ready for the most exciting tournament of the year! Kings Arena is proud to announce Season 1 of the Kings Championship, bringing together the best players from around the world in an epic battle for supremacy.</p>
        
        <h3>Tournament Overview</h3>
        <p>The Kings Championship Season 1 will feature a massive prize pool of $50,000, with participants competing across multiple game titles including eFootball, FIFA, and Call of Duty. The tournament will run for three weeks, starting May 15th and concluding with the grand finals on June 5th.</p>
        
        <h3>How to Participate</h3>
        <p>Registration opens on May 8th and will remain open until May 14th. Players can register through the tournament section of the Kings Arena platform. The entry fee is $10, with all proceeds contributing to the prize pool.</p>
        
        <h3>Tournament Structure</h3>
        <p>The competition will be divided into three phases:</p>
        <ul>
          <li><strong>Qualification Round:</strong> May 15-17 - Open to all registered players</li>
          <li><strong>Group Stage:</strong> May 18-25 - Top 64 players compete in groups</li>
          <li><strong>Knockout Stage:</strong> May 26 - June 5 - Single elimination bracket</li>
        </ul>
        
        <h3>Prize Distribution</h3>
        <p>The prize pool will be distributed as follows:</p>
        <ul>
          <li>1st Place: $20,000 + Championship Trophy</li>
          <li>2nd Place: $12,000</li>
          <li>3rd Place: $8,000</li>
          <li>4th Place: $5,000</li>
          <li>5th-8th Place: $1,250 each</li>
        </ul>
        
        <h3>Special Features</h3>
        <p>This season introduces several new features:</p>
        <ul>
          <li>Live streaming of all matches on Kings Arena TV</li>
          <li>Professional commentary and analysis</li>
          <li>Player interviews and behind-the-scenes content</li>
          <li>Interactive viewer polls and predictions</li>
        </ul>
        
        <h3>Don't Miss Out</h3>
        <p>Whether you're a seasoned competitor or new to the arena, the Kings Championship Season 1 offers something for everyone. Mark your calendars, practice your skills, and get ready for the ultimate gaming experience!</p>
        
        <p>For more information and to register, visit the <Link href="/tournaments">tournaments section</Link> of Kings Arena.</p>
      `,
      author: "Kings Arena Team",
      category: "tournaments",
      image: "/images/news/championship.jpg",
      publishedAt: "2026-05-08T10:00:00Z",
      readTime: 5,
      tags: ["tournament", "championship", "eFootball", "FIFA", "Call of Duty"],
      views: 1250,
      likes: 89
    };

    const mockRelatedArticles = [
      {
        id: 2,
        title: "New Ranking System Implemented",
        slug: "new-ranking-system-implemented",
        excerpt: "We've updated our ranking algorithm to provide fairer and more accurate player rankings.",
        publishedAt: "2026-05-07T14:30:00Z",
        readTime: 3
      },
      {
        id: 3,
        title: "Player Spotlight: KingSlayer99",
        slug: "player-spotlight-kingslayer99",
        excerpt: "Meet the current #1 ranked player and learn about their journey to the top.",
        publishedAt: "2026-05-06T09:15:00Z",
        readTime: 7
      },
      {
        id: 4,
        title: "Mobile App Beta Testing Now Open",
        slug: "mobile-app-beta-testing-open",
        excerpt: "Sign up for our mobile app beta and take Kings Arena with you anywhere.",
        publishedAt: "2026-05-05T16:45:00Z",
        readTime: 4
      }
    ];

    setTimeout(() => {
      setArticle(mockArticle);
      setRelatedArticles(mockRelatedArticles);
      setLoading(false);
    }, 1000);
  }, [params.slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="players">
        <div className="playersContainer">
          <h1>Loading article...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="players">
        <div className="playersContainer">
          <h1>Article not found</h1>
          <Link href="/news" className="backLink">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="players">
      <div className="playersContainer">
        <div className="articleContainer">
          <div className="articleHeader">
            <div className="articleBreadcrumb">
              <Link href="/news">News</Link>
              <span>/</span>
              <span>{article.category}</span>
            </div>
            
            <h1 className="articleTitle">{article.title}</h1>
            
            <div className="articleMeta">
              <div className="articleAuthor">
                <strong>{article.author}</strong>
              </div>
              <div className="articleDate">
                {formatDate(article.publishedAt)}
              </div>
              <div className="articleStats">
                <span>{article.readTime} min read</span>
                <span>•</span>
                <span>{article.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{article.likes} likes</span>
              </div>
            </div>
          </div>

          <div className="articleImage">
            <img src={article.image} alt={article.title} />
          </div>

          <div className="articleContent">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <div className="articleTags">
            <h3>Tags</h3>
            <div className="tagsList">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="articleActions">
            <button className="likeBtn">
              <span>👍</span>
              <span>{article.likes}</span>
            </button>
            <button className="shareBtn">
              <span>📤</span>
              <span>Share</span>
            </button>
            <button className="bookmarkBtn">
              <span>🔖</span>
              <span>Bookmark</span>
            </button>
          </div>

          <div className="articleComments">
            <h3>Comments</h3>
            <div className="commentForm">
              <textarea
                placeholder="Share your thoughts..."
                className="commentInput"
                rows={3}
              />
              <button className="commentBtn">Post Comment</button>
            </div>
            
            <div className="commentsList">
              <div className="comment">
                <div className="commentAuthor">
                  <strong>ProGamer2026</strong>
                  <span className="commentDate">2 hours ago</span>
                </div>
                <p className="commentText">This is going to be an amazing tournament! Can't wait to participate!</p>
              </div>
              
              <div className="comment">
                <div className="commentAuthor">
                  <strong>ArenaMaster</strong>
                  <span className="commentDate">5 hours ago</span>
                </div>
                <p className="commentText">The prize pool is incredible. Kings Arena is really stepping up their game!</p>
              </div>
            </div>
          </div>

          <div className="relatedArticles">
            <h3>Related Articles</h3>
            <div className="relatedGrid">
              {relatedArticles.map((related) => (
                <article key={related.id} className="relatedCard">
                  <h4>{related.title}</h4>
                  <p>{related.excerpt}</p>
                  <div className="relatedMeta">
                    <span>{formatDate(related.publishedAt)}</span>
                    <span>•</span>
                    <span>{related.readTime} min read</span>
                  </div>
                  <Link href={`/news/${related.slug}`} className="relatedLink">
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="articleSidebar">
          <div className="sidebarSection">
            <h3>Newsletter</h3>
            <p>Get the latest news and updates delivered to your inbox.</p>
            <form className="sidebarNewsletter">
              <input
                type="email"
                placeholder="Your email"
                className="newsletterInput"
              />
              <button type="submit" className="newsletterBtn">Subscribe</button>
            </form>
          </div>

          <div className="sidebarSection">
            <h3>Popular Articles</h3>
            <div className="popularList">
              <Link href="/news/new-ranking-system" className="popularItem">
                <span>1.</span>
                New Ranking System Implemented
              </Link>
              <Link href="/news/player-spotlight" className="popularItem">
                <span>2.</span>
                Player Spotlight: KingSlayer99
              </Link>
              <Link href="/news/mobile-app-beta" className="popularItem">
                <span>3.</span>
                Mobile App Beta Testing Now Open
              </Link>
            </div>
          </div>

          <div className="sidebarSection">
            <h3>Categories</h3>
            <div className="categoriesList">
              <Link href="/news?category=tournaments" className="categoryItem">
                Tournaments (12)
              </Link>
              <Link href="/news?category=updates" className="categoryItem">
                Updates (8)
              </Link>
              <Link href="/news?category=players" className="categoryItem">
                Players (15)
              </Link>
              <Link href="/news?category=results" className="categoryItem">
                Results (6)
              </Link>
            </div>
          </div>

          <div className="sidebarSection">
            <h3>Follow Us</h3>
            <div className="socialLinks">
              <a href="#" className="socialLink">Twitter</a>
              <a href="#" className="socialLink">Discord</a>
              <a href="#" className="socialLink">YouTube</a>
              <a href="#" className="socialLink">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
