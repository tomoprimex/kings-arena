"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Crown, Trophy, Target, Medal, TrendingUp, Star, Users, BarChart3, User } from "lucide-react";
import "../styles/dashboard.css";
import Loader from "../components/Loader";
import AuthGuard from "@/components/AuthGuard";

export default function Dashboard() {
  const [userStats, setUserStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockStats = {
      totalMatches: 45,
      wins: 34,
      losses: 11,
      winRate: 75.6,
      currentRank: 12,
      points: 3400,
      level: 28,
      tournaments: 3,
      achievements: 8
    };

    const mockActivity = [
      {
        id: 1,
        type: "match",
        title: "Match Victory",
        description: "Defeated ProGamer2026 in eFootball",
        time: "2 hours ago",
        icon: <Trophy size={20} />
      },
      {
        id: 2,
        type: "tournament",
        title: "Tournament Joined",
        description: "Registered for Kings Championship Season 1",
        time: "1 day ago",
        icon: <Target size={20} />
      },
      {
        id: 3,
        type: "achievement",
        title: "New Achievement",
        description: "Unlocked 'Win Streak Master' badge",
        time: "3 days ago",
        icon: <Medal size={20} />
      },
      {
        id: 4,
        type: "rank",
        title: "Rank Up",
        description: "Climbed from rank 15 to rank 12",
        time: "1 week ago",
        icon: <TrendingUp size={20} />
      }
    ];

    setTimeout(() => {
      setUserStats(mockStats);
      setRecentActivity(mockActivity);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboardContainer">
          <Loader size="large" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="dashboard">
        <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Dashboard</h1>
          <p className="dashboardSubtitle">
            Welcome back! Here's your gaming overview.
          </p>
        </div>

        <div className="dashboardGrid">
          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Total Matches</h3>
              <span className="cardIcon">🎮</span>
            </div>
            <div className="cardValue">{userStats.totalMatches}</div>
            <div className="cardDescription">Career matches played</div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Win Rate</h3>
              <span className="cardIcon">📊</span>
            </div>
            <div className="cardValue">{userStats.winRate}%</div>
            <div className="cardDescription">
              {userStats.wins} wins / {userStats.losses} losses
            </div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Current Rank</h3>
              <span className="cardIcon"><Crown size={24} /></span>
            </div>
            <div className="cardValue">#{userStats.currentRank}</div>
            <div className="cardDescription">Global ranking</div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Points</h3>
              <span className="cardIcon"><Star size={24} /></span>
            </div>
            <div className="cardValue">{userStats.points.toLocaleString()}</div>
            <div className="cardDescription">Total points earned</div>
          </div>
        </div>

        <div className="dashboardGrid">
          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Level</h3>
              <span className="cardIcon"><TrendingUp size={24} /></span>
            </div>
            <div className="cardValue">{userStats.level}</div>
            <div className="cardDescription">Current player level</div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Tournaments</h3>
              <span className="cardIcon"><Trophy size={24} /></span>
            </div>
            <div className="cardValue">{userStats.tournaments}</div>
            <div className="cardDescription">Active tournaments</div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Achievements</h3>
              <span className="cardIcon"><Medal size={24} /></span>
            </div>
            <div className="cardValue">{userStats.achievements}</div>
            <div className="cardDescription">Unlocked achievements</div>
          </div>

          <div className="dashboardCard">
            <div className="cardHeader">
              <h3 className="cardTitle">Next Goal</h3>
              <span className="cardIcon"><Target size={24} /></span>
            </div>
            <div className="cardValue">Top 10</div>
            <div className="cardDescription">Reach top 10 ranking</div>
          </div>
        </div>

        <div className="recentActivity">
          <h3>Recent Activity</h3>
          <div className="activityList">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activityItem">
                <div className="activityIcon">{activity.icon}</div>
                <div className="activityContent">
                  <div className="activityTitle">{activity.title}</div>
                  <div className="activityDescription">{activity.description}</div>
                  <div className="activityTime">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quickActions">
          <Link href="/tournaments" className="actionBtn">
            <span className="actionIcon"><Trophy size={20} /></span>
            <span className="actionText">Browse Tournaments</span>
          </Link>
          <Link href="/players" className="actionBtn">
            <span className="actionIcon"><Users size={20} /></span>
            <span className="actionText">Find Players</span>
          </Link>
          <Link href="/leaderboard" className="actionBtn">
            <span className="actionIcon"><BarChart3 size={20} /></span>
            <span className="actionText">View Leaderboard</span>
          </Link>
          <Link href="/dashboard/profile" className="actionBtn">
            <span className="actionIcon"><User size={20} /></span>
            <span className="actionText">Edit Profile</span>
          </Link>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
