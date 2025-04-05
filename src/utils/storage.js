// Storage keys
const STORAGE_KEYS = {
  USER_SYSTEMS: 'goalMaster_userSystems',
  GOALS: 'goalMaster_goals',
  ANALYTICS: 'goalMaster_analytics',
  USER_PREFERENCES: 'goalMaster_userPreferences',
};

// User Systems Storage
export const saveUserSystem = (systemData) => {
  const existingSystems = getUserSystems();
  const updatedSystems = existingSystems.map(system => 
    system.id === systemData.id ? systemData : system
  );
  
  if (!existingSystems.find(system => system.id === systemData.id)) {
    updatedSystems.push(systemData);
  }
  
  localStorage.setItem(STORAGE_KEYS.USER_SYSTEMS, JSON.stringify(updatedSystems));
  return updatedSystems;
};

export const getUserSystems = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_SYSTEMS);
  return data ? JSON.parse(data) : [];
};

export const getUserSystem = (systemId) => {
  const systems = getUserSystems();
  return systems.find(system => system.id === systemId) || null;
};

export const deleteUserSystem = (systemId) => {
  const systems = getUserSystems();
  const updatedSystems = systems.filter(system => system.id !== systemId);
  localStorage.setItem(STORAGE_KEYS.USER_SYSTEMS, JSON.stringify(updatedSystems));
  return updatedSystems;
};

// Goals Storage
export const saveGoals = (goals) => {
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
};

export const getGoals = () => {
  const data = localStorage.getItem(STORAGE_KEYS.GOALS);
  return data ? JSON.parse(data) : [];
};

export const addGoal = (goal) => {
  const goals = getGoals();
  goals.push({ ...goal, id: Date.now(), createdAt: new Date().toISOString() });
  saveGoals(goals);
  return goals;
};

export const updateGoal = (goalId, updates) => {
  const goals = getGoals();
  const updatedGoals = goals.map(goal => 
    goal.id === goalId ? { ...goal, ...updates } : goal
  );
  saveGoals(updatedGoals);
  return updatedGoals;
};

export const deleteGoal = (goalId) => {
  const goals = getGoals();
  const filteredGoals = goals.filter(goal => goal.id !== goalId);
  saveGoals(filteredGoals);
  return filteredGoals;
};

// Analytics Storage
export const saveAnalytics = (analytics) => {
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
};

export const getAnalytics = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
  return data ? JSON.parse(data) : {
    weeklyProgress: 0,
    completedTasks: 0,
    totalTasks: 0,
    productivityScore: 0,
    history: [],
  };
};

export const updateAnalytics = (newData) => {
  const analytics = getAnalytics();
  const updatedAnalytics = {
    ...analytics,
    ...newData,
    history: [...analytics.history, { ...newData, timestamp: new Date().toISOString() }],
  };
  saveAnalytics(updatedAnalytics);
  return updatedAnalytics;
};

// User Preferences Storage
export const saveUserPreferences = (preferences) => {
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
};

export const getUserPreferences = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
  return data ? JSON.parse(data) : {
    theme: 'dark',
    notifications: true,
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

// Clear all data (for testing or logout)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}; 