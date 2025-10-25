import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Command Center',
      path: '/threat-intelligence-command-center',
      icon: 'Shield',
      description: 'Real-time threat monitoring dashboard'
    },
    {
      label: 'Live Monitoring',
      path: '/live-security-monitoring',
      icon: 'Activity',
      description: 'Immediate security event tracking'
    },
    {
      label: 'Analytics',
      path: '/security-operations-analytics',
      icon: 'BarChart3',
      description: 'Strategic threat intelligence analysis'
    },
    {
      label: 'Executive',
      path: '/executive-security-dashboard',
      icon: 'TrendingUp',
      description: 'High-level security posture overview'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-data"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Aegis Command
        </span>
        <span className="text-xs text-muted-foreground -mt-1">
          Security Operations
        </span>
      </div>
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 contextual-glow btn-press
                    ${isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                  title={item?.description}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-data"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="contextual-glow"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border cyber-shadow-md">
          <div className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                    transition-all duration-150 btn-press
                    ${isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <div className="flex-1">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item?.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-data"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;