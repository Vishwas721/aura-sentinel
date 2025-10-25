import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatus = ({ className = '' }) => {
  const complianceData = [
    {
      framework: "ISO 27001",
      status: "compliant",
      score: 98,
      lastAudit: "2024-08-15",
      nextReview: "2024-12-15",
      controls: { total: 114, compliant: 112, pending: 2 }
    },
    {
      framework: "SOC 2 Type II",
      status: "compliant",
      score: 95,
      lastAudit: "2024-07-20",
      nextReview: "2025-01-20",
      controls: { total: 64, compliant: 61, pending: 3 }
    },
    {
      framework: "GDPR",
      status: "partial",
      score: 87,
      lastAudit: "2024-09-01",
      nextReview: "2024-11-01",
      controls: { total: 32, compliant: 28, pending: 4 }
    },
    {
      framework: "NIST CSF",
      status: "compliant",
      score: 92,
      lastAudit: "2024-08-30",
      nextReview: "2024-12-30",
      controls: { total: 108, compliant: 99, pending: 9 }
    }
  ];

  const statusConfig = {
    compliant: {
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      label: 'Compliant'
    },
    partial: {
      icon: 'AlertCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      label: 'Partial'
    },
    nonCompliant: {
      icon: 'XCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      label: 'Non-Compliant'
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCompliancePercentage = () => {
    const totalControls = complianceData?.reduce((sum, item) => sum + item?.controls?.total, 0);
    const compliantControls = complianceData?.reduce((sum, item) => sum + item?.controls?.compliant, 0);
    return Math.round((compliantControls / totalControls) * 100);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Compliance Dashboard</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Overall:</span>
          <span className="text-lg font-bold text-success">{getCompliancePercentage()}%</span>
        </div>
      </div>
      <div className="space-y-4">
        {complianceData?.map((compliance, index) => {
          const config = statusConfig?.[compliance?.status];
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${config?.borderColor} ${config?.bgColor} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={config?.icon} size={18} className={config?.color} />
                  <h4 className="font-medium text-foreground">{compliance?.framework}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${config?.bgColor} ${config?.color} border ${config?.borderColor}`}>
                    {config?.label}
                  </span>
                  <span className="text-sm font-bold text-foreground">{compliance?.score}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Last Audit</span>
                  <p className="text-sm font-medium text-foreground">{formatDate(compliance?.lastAudit)}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Next Review</span>
                  <p className="text-sm font-medium text-foreground">{formatDate(compliance?.nextReview)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-muted-foreground">
                    Controls: {compliance?.controls?.compliant}/{compliance?.controls?.total}
                  </span>
                  {compliance?.controls?.pending > 0 && (
                    <span className="text-accent">
                      {compliance?.controls?.pending} pending
                    </span>
                  )}
                </div>
                <div className="flex-1 bg-muted rounded-full h-1.5 ml-4">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      compliance?.status === 'compliant' ? 'bg-success' : 
                      compliance?.status === 'partial' ? 'bg-accent' : 'bg-warning'
                    }`}
                    style={{ width: `${compliance?.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              {complianceData?.filter(c => c?.status === 'compliant')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">
              {complianceData?.filter(c => c?.status === 'partial')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Partial</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">
              {complianceData?.filter(c => c?.status === 'nonCompliant')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Non-Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatus;