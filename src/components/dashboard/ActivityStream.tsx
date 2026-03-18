import { Package, Users, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    icon: Package,
    iconBg: "bg-secondary-container",
    iconColor: "text-primary",
    title: "New product added",
    time: "2 mins ago",
    detail: "SKU-9402"
  },
  {
    id: 2,
    icon: Users,
    iconBg: "bg-surface-container",
    iconColor: "text-on-surface-variant",
    title: "New user registered",
    time: "45 mins ago",
    detail: "Sarah J."
  },
  {
    id: 3,
    icon: FileText,
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-on-tertiary-fixed",
    title: "Log report generated",
    time: "2 hours ago",
    detail: "Automated"
  },
  {
    id: 4,
    icon: AlertTriangle,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    title: "SLA Breach Warning",
    time: "5 hours ago",
    detail: "Node-04"
  }
]

export function ActivityStream() {
  return (
    <Card className="bg-surface-container-lowest editorial-shadow rounded-[0.75rem] border-none">
      <CardHeader className="p-8 pb-6">
        <CardTitle className="font-inter font-medium text-[1.125rem] text-primary">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div>
                <p className="font-inter text-[0.875rem] text-primary font-medium">{activity.title}</p>
                <p className="font-inter text-[0.75rem] text-on-surface-variant">
                  {activity.time} • {activity.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-10 py-6 font-inter text-xs font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors"
        >
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
