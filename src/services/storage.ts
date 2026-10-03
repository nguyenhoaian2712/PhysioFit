import { User, PainRecord, ROMRecord, WorkoutSession } from '../types';

const STORAGE_KEYS = {
  USER: 'physiofit_user',
  PAIN: 'physiofit_pain_records',
  ROM: 'physiofit_rom_records',
  SESSIONS: 'physiofit_workout_sessions'
};

export const DEMO_USER: User = {
  id: 'demo-user-001',
  fullName: 'Nguyen Van A',
  age: 35,
  location: 'Ha Noi',
  commonConditions: ['Dau lung', 'Dau khop goi'],
  otherCondition: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  onboardingCompleted: true,
  savedExerciseIds: ['ex-09', 'ex-01', 'ex-12', 'ex-28'],
  dailyGoalMinutes: 15,
  preferences: {
    soundEnabled: true,
    ambientVolume: 0.35,
    sparklesEnabled: true
  }
};

const normalizeUser = (value: Partial<User>): User => ({
  ...DEMO_USER,
  ...value,
  savedExerciseIds: Array.isArray(value.savedExerciseIds)
    ? value.savedExerciseIds
    : DEMO_USER.savedExerciseIds,
  preferences: {
    ...DEMO_USER.preferences,
    ...value.preferences
  }
});

export const storageService = {
  getUser(): User {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) {
        const user = normalizeUser(JSON.parse(data));
        this.saveUser(user);
        return user;
      }
    } catch (error) {
      console.error('Unable to read user profile:', error);
    }

    this.saveUser(DEMO_USER);
    return DEMO_USER;
  },

  getProfile(): User {
    return this.getUser();
  },

  saveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Unable to save user profile:', error);
    }
  },

  saveProfile(user: User): void {
    this.saveUser(user);
  },

  toggleBookmark(exerciseId: string): void {
    const user = this.getUser();
    const saved = user.savedExerciseIds || [];

    const updated = saved.includes(exerciseId)
      ? saved.filter(id => id !== exerciseId)
      : [...saved, exerciseId];

    this.saveUser({
      ...user,
      savedExerciseIds: updated,
      updatedAt: new Date().toISOString()
    });
  },

  getPainRecords(): PainRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PAIN);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Unable to read pain records:', error);
      return [];
    }
  },

  addPainRecord(record: Omit<PainRecord, 'id' | 'timestamp'>): PainRecord {
    const list = this.getPainRecords();

    const newRecord: PainRecord = {
      ...record,
      id: 'pain-' + Date.now(),
      timestamp: new Date().toISOString()
    };

    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.PAIN, JSON.stringify(list));
    return newRecord;
  },

  getROMRecords(): ROMRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROM);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Unable to read ROM records:', error);
      return [];
    }
  },

  addROMRecord(record: Omit<ROMRecord, 'id' | 'timestamp'>): ROMRecord {
    const list = this.getROMRecords();

    const newRecord: ROMRecord = {
      ...record,
      id: 'rom-' + Date.now(),
      timestamp: new Date().toISOString()
    };

    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.ROM, JSON.stringify(list));
    return newRecord;
  },

  getSessions(): WorkoutSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Unable to read workout sessions:', error);
      return [];
    }
  },

  addSession(session: Omit<WorkoutSession, 'id' | 'timestamp'>): WorkoutSession {
    const list = this.getSessions();

    const newSession: WorkoutSession = {
      ...session,
      id: 'sess-' + Date.now(),
      timestamp: new Date().toISOString()
    };

    list.unshift(newSession);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(list));
    return newSession;
  },

  resetAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    this.saveUser(DEMO_USER);
  },

  resetAllData(): void {
    this.resetAll();
  }
};
