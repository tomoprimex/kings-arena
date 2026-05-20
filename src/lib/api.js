// API utilities for Kings Arena

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Tournament API calls
export const tournamentAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/tournaments?${params}`);
  },
  
  getById: (id) => apiRequest(`/tournaments/${id}`),
  
  create: (tournamentData) => apiRequest('/tournaments', {
    method: 'POST',
    body: JSON.stringify(tournamentData),
  }),
  
  update: (id, tournamentData) => apiRequest(`/tournaments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tournamentData),
  }),
  
  delete: (id) => apiRequest(`/tournaments/${id}`, {
    method: 'DELETE',
  }),
  
  join: (id) => apiRequest(`/tournaments/${id}/join`, {
    method: 'POST',
  }),
  
  withdraw: (id) => apiRequest(`/tournaments/${id}/withdraw`, {
    method: 'POST',
  }),
  
  getParticipants: (id) => apiRequest(`/tournaments/${id}/participants`),
  
  getBracket: (id) => apiRequest(`/tournaments/${id}/bracket`),
};

// Player API calls
export const playerAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/players?${params}`);
  },
  
  getById: (id) => apiRequest(`/players/${id}`),
  
  getByUsername: (username) => apiRequest(`/players/username/${username}`),
  
  update: (id, playerData) => apiRequest(`/players/${id}`, {
    method: 'PUT',
    body: JSON.stringify(playerData),
  }),
  
  getStats: (id) => apiRequest(`/players/${id}/stats`),
  
  getMatchHistory: (id, limit = 10) => apiRequest(`/players/${id}/matches?limit=${limit}`),
  
  getAchievements: (id) => apiRequest(`/players/${id}/achievements`),
  
  challenge: (id) => apiRequest(`/players/${id}/challenge`, {
    method: 'POST',
  }),
};

// Leaderboard API calls
export const leaderboardAPI = {
  getGlobal: (timeFilter = 'all-time', limit = 100) => 
    apiRequest(`/leaderboard/global?time=${timeFilter}&limit=${limit}`),
  
  getGameSpecific: (game, timeFilter = 'all-time', limit = 50) => 
    apiRequest(`/leaderboard/game/${game}?time=${timeFilter}&limit=${limit}`),
  
  getRegional: (region, timeFilter = 'all-time', limit = 50) => 
    apiRequest(`/leaderboard/region/${region}?time=${timeFilter}&limit=${limit}`),
  
  getPlayerRank: (playerId) => apiRequest(`/leaderboard/player/${playerId}`),
};

// Match API calls
export const matchAPI = {
  create: (matchData) => apiRequest('/matches', {
    method: 'POST',
    body: JSON.stringify(matchData),
  }),
  
  getById: (id) => apiRequest(`/matches/${id}`),
  
  update: (id, matchData) => apiRequest(`/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(matchData),
  }),
  
  submitResult: (id, result) => apiRequest(`/matches/${id}/result`, {
    method: 'POST',
    body: JSON.stringify(result),
  }),
  
  getPlayerMatches: (playerId, status = 'all') => 
    apiRequest(`/matches/player/${playerId}?status=${status}`),
  
  getTournamentMatches: (tournamentId) => apiRequest(`/matches/tournament/${tournamentId}`),
};

// News API calls
export const newsAPI = {
  getAll: (category = 'all', limit = 20) => 
    apiRequest(`/news?category=${category}&limit=${limit}`),
  
  getById: (id) => apiRequest(`/news/${id}`),
  
  getBySlug: (slug) => apiRequest(`/news/slug/${slug}`),
  
  create: (newsData) => apiRequest('/news', {
    method: 'POST',
    body: JSON.stringify(newsData),
  }),
  
  update: (id, newsData) => apiRequest(`/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newsData),
  }),
  
  delete: (id) => apiRequest(`/news/${id}`, {
    method: 'DELETE',
  }),
};

// User/Profile API calls
export const userAPI = {
  getProfile: () => apiRequest('/user/profile'),
  
  updateProfile: (profileData) => apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  
  getSettings: () => apiRequest('/user/settings'),
  
  updateSettings: (settingsData) => apiRequest('/user/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  }),
  
  getStats: () => apiRequest('/user/stats'),
  
  getNotifications: () => apiRequest('/user/notifications'),
  
  markNotificationRead: (notificationId) => apiRequest(`/user/notifications/${notificationId}/read`, {
    method: 'POST',
  }),
  
  deleteNotification: (notificationId) => apiRequest(`/user/notifications/${notificationId}`, {
    method: 'DELETE',
  }),
};

// Admin API calls
export const adminAPI = {
  getUsers: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/admin/users?${params}`);
  },
  
  getUserById: (id) => apiRequest(`/admin/users/${id}`),
  
  updateUser: (id, userData) => apiRequest(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  deleteUser: (id) => apiRequest(`/admin/users/${id}`, {
    method: 'DELETE',
  }),
  
  banUser: (id, reason) => apiRequest(`/admin/users/${id}/ban`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  }),
  
  unbanUser: (id) => apiRequest(`/admin/users/${id}/unban`, {
    method: 'POST',
  }),
  
  getTournaments: (status = 'all') => apiRequest(`/admin/tournaments?status=${status}`),
  
  approveTournament: (id) => apiRequest(`/admin/tournaments/${id}/approve`, {
    method: 'POST',
  }),
  
  rejectTournament: (id, reason) => apiRequest(`/admin/tournaments/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  }),
  
  getNews: () => apiRequest('/admin/news'),
  
  createNews: (newsData) => apiRequest('/admin/news', {
    method: 'POST',
    body: JSON.stringify(newsData),
  }),
  
  getSystemStats: () => apiRequest('/admin/stats'),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    window.location.href = '/auth/login';
  } else if (error.message.includes('403')) {
    // Forbidden - show access denied message
    console.error('Access denied: You do not have permission to perform this action');
  } else if (error.message.includes('404')) {
    // Not found
    console.error('Resource not found');
  } else if (error.message.includes('500')) {
    // Server error
    console.error('Server error. Please try again later.');
  } else {
    // Generic error
    console.error('An error occurred:', error.message);
  }
};

export const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const uploadFile = async (file, type = 'avatar') => {
  const formData = createFormData({ file, type });
  
  return apiRequest('/upload', {
    method: 'POST',
    headers: {}, // Let browser set Content-Type for FormData
    body: formData,
  });
};

// WebSocket connection for real-time updates
export const createWebSocketConnection = (endpoint) => {
  const token = localStorage.getItem('auth_token');
  const wsUrl = `${API_BASE_URL.replace('http', 'ws')}${endpoint}?token=${token}`;
  
  return new WebSocket(wsUrl);
};

// Real-time event handlers
export const subscribeToTournamentUpdates = (tournamentId, onUpdate) => {
  const ws = createWebSocketConnection(`/tournaments/${tournamentId}/subscribe`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
  
  return ws;
};

export const subscribeToMatchUpdates = (matchId, onUpdate) => {
  const ws = createWebSocketConnection(`/matches/${matchId}/subscribe`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };
  
  return ws;
};
