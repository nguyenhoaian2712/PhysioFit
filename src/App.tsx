import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { storageService } from './services/storage';
import { UserProfile, PainRecord, ROMRecord, WorkoutSession } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sparkles } from './components/Sparkles';
import { AuthModal } from './pages/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { BodyMapPage } from './pages/BodyMapPage';
import { ProblemSelectionPage } from './pages/ProblemSelectionPage';
import { ExerciseRecommendationPage } from './pages/ExerciseRecommendationPage';
import { ExerciseDetailPage } from './pages/ExerciseDetailPage';
import { ExerciseSessionPage } from './pages/ExerciseSessionPage';
import { ROMTrackingPage } from './pages/ROMTrackingPage';
import { ProgressPage } from './pages/ProgressPage';
import { MyExercisesPage } from './pages/MyExercisesPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(() => storageService.getProfile());
  const [painRecords, setPainRecords] = useState<PainRecord[]>(() => storageService.getPainRecords());
  const [romRecords, setRomRecords] = useState<ROMRecord[]>(() => storageService.getROMRecords());
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => storageService.getSessions());

  const [sparklesEnabled, setSparklesEnabled] = useState<boolean>(
    user.preferences.sparklesEnabled
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Sync state to local storage when modified
  const handleToggleBookmark = (exerciseId: string) => {
    storageService.toggleBookmark(exerciseId);
    setUser(storageService.getProfile());
  };

  const isBookmarked = (exerciseId: string): boolean => {
    return user.savedExerciseIds.includes(exerciseId);
  };

  const handleAddPainRecord = (record: Omit<PainRecord, 'id' | 'timestamp'>) => {
    const newRecord = storageService.addPainRecord(record);
    setPainRecords([newRecord, ...painRecords]);
  };

  const handleAddROMRecord = (record: Omit<ROMRecord, 'id' | 'timestamp'>) => {
    const newRecord = storageService.addROMRecord(record);
    setRomRecords([newRecord, ...romRecords]);
  };

  const handleCompleteSession = (session: Omit<WorkoutSession, 'id' | 'timestamp'>) => {
    const newSession = storageService.addSession(session);
    setSessions([newSession, ...sessions]);
  };

  const handleSaveProfile = (updated: UserProfile) => {
    storageService.saveProfile(updated);
    setUser(updated);
  };

  const handleResetData = () => {
    storageService.resetAllData();
    setUser(storageService.getProfile());
    setPainRecords(storageService.getPainRecords());
    setRomRecords(storageService.getROMRecords());
    setSessions(storageService.getSessions());
  };

  const handleToggleSparkles = () => {
    const next = !sparklesEnabled;
    setSparklesEnabled(next);
    const updated = {
      ...user,
      preferences: {
        ...user.preferences,
        sparklesEnabled: next
      }
    };
    storageService.saveProfile(updated);
    setUser(updated);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#31465A] font-sans antialiased relative selection:bg-[#C7DFA3] selection:text-[#31465A]">
        {/* Ambient floating sparkles */}
        <Sparkles enabled={sparklesEnabled} />

        {/* Global Navigation */}
        <Navbar
          user={user}
          sparklesEnabled={sparklesEnabled}
          onToggleSparkles={handleToggleSparkles}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route
              path="/home"
              element={
                <HomePage
                  user={user}
                  painRecords={painRecords}
                  romRecords={romRecords}
                  sessions={sessions}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route path="/body-map" element={<BodyMapPage />} />

            <Route
              path="/problem-select/:regionId"
              element={
                <ProblemSelectionPage
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route
              path="/exercises"
              element={
                <ExerciseRecommendationPage
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route
              path="/exercise/:exerciseId"
              element={
                <ExerciseDetailPage
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route
              path="/session/:exerciseId"
              element={
                <ExerciseSessionPage
                  onCompleteSession={handleCompleteSession}
                  onAddPainRecord={handleAddPainRecord}
                />
              }
            />

            <Route
              path="/rom-tracking"
              element={
                <ROMTrackingPage
                  romRecords={romRecords}
                  painRecords={painRecords}
                  onAddROMRecord={handleAddROMRecord}
                  onAddPainRecord={handleAddPainRecord}
                />
              }
            />

            <Route
              path="/progress"
              element={
                <ProgressPage
                  painRecords={painRecords}
                  romRecords={romRecords}
                  sessions={sessions}
                />
              }
            />

            <Route
              path="/my-exercises"
              element={
                <MyExercisesPage
                  user={user}
                  sessions={sessions}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProfilePage
                  user={user}
                  onSaveProfile={handleSaveProfile}
                  onResetData={handleResetData}
                  sparklesEnabled={sparklesEnabled}
                  onToggleSparkles={handleToggleSparkles}
                />
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(updatedUser) => {
            const newUser = { ...user, ...updatedUser };
            handleSaveProfile(newUser);
          }}
        />
      </div>
    </Router>
  );
};

export default App;
