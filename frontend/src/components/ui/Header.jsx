import React from 'react';
import NavigationBar from './NavigationBar';
import UserContextIndicator from './UserContextIndicator';
import SystemStatusBar from './SystemStatusBar';

const Header = ({ 
  currentUser,
  connectionStatus,
  onLogout,
  className = ''
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-1000 ${className}`}>
      {/* Main Navigation */}
      <NavigationBar />
      
      {/* System Status and User Context */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-12 px-6">
          {/* System Status */}
          <SystemStatusBar connectionStatus={connectionStatus} />
          
          {/* User Context */}
          <UserContextIndicator 
            currentUser={currentUser}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;