"use client";

export const teams = [
  { name: "Player A", played: 0, win: 0, draw: 0, loss: 0, points: 0 },
  { name: "Player B", played: 0, win: 0, draw: 0, loss: 0, points: 0 },
  { name: "Player C", played: 0, win: 0, draw: 0, loss: 0, points: 0 },
  { name: "Player D", played: 0, win: 0, draw: 0, loss: 0, points: 0 },
];

export const fixtures = [
  ["Player A", "Player B"],
  ["Player C", "Player D"],
  ["Player A", "Player C"],
  ["Player B", "Player D"],
  ["Player A", "Player D"],
  ["Player B", "Player C"],
];

let currentIndex = 0;

export function playMatch() {
  if (currentIndex >= fixtures.length) return null;

  const [home, away] = fixtures[currentIndex];

  const scoreA = Math.floor(Math.random() * 5);
  const scoreB = Math.floor(Math.random() * 5);

  const update = (team, scored, conceded) => {
    team.played++;
    if (scored > conceded) {
      team.win++;
      team.points += 3;
    } else if (scored < conceded) {
      team.loss++;
    } else {
      team.draw++;
      team.points += 1;
    }
  };

  const tA = teams.find(t => t.name === home);
  const tB = teams.find(t => t.name === away);

  update(tA, scoreA, scoreB);
  update(tB, scoreB, scoreA);

  currentIndex++;

  return { home, away, scoreA, scoreB };
}

export function getNextMatch() {
  return fixtures[currentIndex] || null;
}

export function getTable() {
  return [...teams].sort((a, b) => b.points - a.points);
}

export function resetSeason() {
  teams.forEach(t => {
    t.played = 0;
    t.win = 0;
    t.draw = 0;
    t.loss = 0;
    t.points = 0;
  });
  currentIndex = 0;
}