/**
 * Admin Dashboard Page
 */
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  Activity,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface DashboardData {
  total_users: number;
  active_sessions: number;
  security_alerts: number;
  failed_logins_24h: number;
  api_requests_24h: number;
  avg_response_time_ms: number;
  system_health: string;
}

interface SecurityAlert {
  id: string;
  alert_type: string;
  severity: string;
  description: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchSecurityAlerts();
  }, []);

  const fetchDashboardData = async () => {
    const mockData: DashboardData = {
      total_users: 1234,
      active_sessions: 89,
      security_alerts: 3,
      failed_logins_24h: 12,
      api_requests_24h: 45678,
      avg_response_time_ms: 125.5,
      system_health: "healthy",
    };
    setDashboardData(mockData);
    setLoading(false);
  };

  const fetchSecurityAlerts = async () => {
    const mockAlerts: SecurityAlert[] = [
      {
        id: "1",
        alert_type: "failed_login",
        severity: "medium",
        description: "Multiple failed login attempts",
        created_at: new Date().toISOString(),
      },
    ];
    setSecurityAlerts(mockAlerts);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{dashboardData?.total_users}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold">{dashboardData?.active_sessions}</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
              <p className="text-2xl font-bold">{dashboardData?.security_alerts}</p>
            </div>
            <Shield className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">API Requests</p>
              <p className="text-2xl font-bold">
                {dashboardData?.api_requests_24h.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>
    </div>
  );
}
