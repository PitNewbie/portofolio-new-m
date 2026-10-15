import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSplitView } from './components/ProjectsSplitView';
import { ProjectDetailDrawer } from './components/ProjectDetailDrawer';
import { AIContributionsSection } from './components/AIContributionsSection';
import { ContactSection } from './components/ContactSection';
import { PROJECTS_DATA } from './data/projectsData';
import { AI_CONTRIBUTIONS_DATA, ROBOT_DIALOGUES } from './data/aiContributionsData';
import { ProjectItem, RobotEmotion, DialogMessage } from './types';

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [currentEmotion, setCurrentEmotion] = useState<RobotEmotion>('happy');
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [dialogMessage, setDialogMessage] = useState<DialogMessage | null>(ROBOT_DIALOGUES[0]);

  // Project drawer state
  const [drawerProject, setDrawerProject] = useState<ProjectItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Handle robot click interaction
  const handleRobotClick = () => {
    const nextIdx = (dialogIndex + 1) % ROBOT_DIALOGUES.length;
    const msg = ROBOT_DIALOGUES[nextIdx];
    setDialogIndex(nextIdx);
    setDialogMessage(msg);
    setCurrentEmotion(msg.emotion);
  };

  const handleNextDialog = () => {
    const nextIdx = (dialogIndex + 1) % ROBOT_DIALOGUES.length;
    const msg = ROBOT_DIALOGUES[nextIdx];
    setDialogIndex(nextIdx);
    setDialogMessage(msg);
    setCurrentEmotion(msg.emotion);
  };

  const handleSelectTopic = (topicKey: string) => {
    if (topicKey === 'projects') {
      const projMsg = ROBOT_DIALOGUES.find((d) => d.id === 'projects') || ROBOT_DIALOGUES[2];
      setDialogMessage(projMsg);
      setCurrentEmotion(projMsg.emotion);
      // Smooth scroll to projects section
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (topicKey === 'ai') {
      const aiMsg = ROBOT_DIALOGUES.find((d) => d.id === 'ai') || ROBOT_DIALOGUES[3];
      setDialogMessage(aiMsg);
      setCurrentEmotion(aiMsg.emotion);
      // Smooth scroll to contributions section
      document.getElementById('contributions')?.scrollIntoView({ behavior: 'smooth' });
    } else if (topicKey === 'about') {
      const aboutMsg = ROBOT_DIALOGUES.find((d) => d.id === 'about') || ROBOT_DIALOGUES[1];
      setDialogMessage(aboutMsg);
      setCurrentEmotion(aboutMsg.emotion);
    }
  };

  const handleOpenDrawer = (project: ProjectItem) => {
    setDrawerProject(project);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleContactClick = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-[#F3F4F6] relative selection:bg-sky-500/30 selection:text-sky-200">
      {/* 1. Cinematic Welcome Entrance Animation */}
      {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}

      {/* 2. Top Navigation Bar (3-Zone Top Bar Contract) */}
      <Navbar onContactClick={handleContactClick} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 3. Hero Section with 3D Robot Companion */}
        <HeroSection
          currentEmotion={currentEmotion}
          onEmotionChange={(emo) => setCurrentEmotion(emo)}
          onRobotClick={handleRobotClick}
          dialogMessage={dialogMessage}
          onNextDialog={handleNextDialog}
          onSelectTopic={handleSelectTopic}
          onDismissDialog={() => setDialogMessage(null)}
        />

        {/* 4. Split-Screen Project Showcase (Website Buatanku) */}
        <ProjectsSplitView
          projects={PROJECTS_DATA}
          onOpenDrawer={handleOpenDrawer}
        />

        {/* 5. Deep AI Contribution Showcase */}
        <AIContributionsSection contributions={AI_CONTRIBUTIONS_DATA} />

        {/* 6. Contact & About Section */}
        <ContactSection />
      </main>

      {/* 7. Fullscreen Slide-Over Case Study Drawer */}
      <ProjectDetailDrawer
        project={drawerProject}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
