import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextIndicator = ({ 
  currentUser = {
    name: 'Alex Chen',
    role: 'SOC Analyst',
    avatar: null,
    status: 'active',
    lastActivity: new Date(),
    permissions: ['monitor', 'analyze', 'respond']
  },
  onLogout = () => {},
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRoles = {
    'SOC Analyst': { icon: 'Shield', color: 'text-primary' },
    'Security Manager': { icon: 'Users', color: 'text-accent' },
    'Threat Specialist': { icon: 'Search', color: 'text-success' },
    'CISO': { icon: 'Crown', color: 'text-warning' }
  };

  const statusColors = {
    active: 'bg-success',
    away: 'bg-accent',
    busy: 'bg-warning',
    offline: 'bg-muted'
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatLastActivity = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date?.toLocaleDateString();
  };

  const roleConfig = userRoles?.[currentUser?.role] || userRoles?.['SOC Analyst'];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* User Context Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-150 contextual-glow btn-press"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            {currentUser?.avatar ? (
              <img 
                src={currentUser?.avatar} 
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={16} className="text-muted-foreground" />
            )}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors?.[currentUser?.status]} rounded-full border-2 border-background`}></div>
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {currentUser?.name}
          </span>
          <span className={`text-xs ${roleConfig?.color} flex items-center space-x-1`}>
            <Icon name={roleConfig?.icon} size={12} />
            <span>{currentUser?.role}</span>
          </span>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-150 ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg cyber-shadow-md z-1100">
          {/* User Profile Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser?.avatar} 
                      alt={currentUser?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors?.[currentUser?.status]} rounded-full border-2 border-background`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{currentUser?.name}</h3>
                <div className={`flex items-center space-x-1 ${roleConfig?.color}`}>
                  <Icon name={roleConfig?.icon} size={14} />
                  <span className="text-sm">{currentUser?.role}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last active: {formatLastActivity(currentUser?.lastActivity)}
                </p>
              </div>
            </div>
          </div>

          {/* Session Status */}
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Session Status</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${statusColors?.[currentUser?.status]} rounded-full animate-pulse-data`}></div>
                <span className="text-sm font-medium text-foreground capitalize">
                  {currentUser?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="p-3 border-b border-border">
            <span className="text-sm text-muted-foreground mb-2 block">Access Level</span>
            <div className="flex flex-wrap gap-1">
              {currentUser?.permissions?.map((permission) => (
                <span 
                  key={permission}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start mb-1"
              iconName="Settings"
              iconPosition="left"
              onClick={() => setIsDropdownOpen(false)}
            >
              Preferences
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start mb-1"
              iconName="HelpCircle"
              iconPosition="left"
              onClick={() => setIsDropdownOpen(false)}
            >
              Help & Support
            </Button>
            <div className="border-t border-border my-2"></div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              iconName="LogOut"
              iconPosition="left"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextIndicator;