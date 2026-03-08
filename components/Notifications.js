import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { DEGREE_REQUIREMENTS } from '../data/requirements';

export default function Notifications({ student, onNavigate }) {
  const notifications = generateNotifications(student);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FF' }}>
      <View style={{ backgroundColor: '#1A237E', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')} style={styles.back}>
          <Text style={{ color: 'white', fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>🔔 Notifications</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48 }}>✅</Text>
            <Text style={styles.emptyTitle}>All Good!</Text>
            <Text style={styles.emptyText}>No academic alerts at this time.</Text>
          </View>
        ) : (
          notifications.map((notif, i) => (
            <View key={i} style={[styles.notification, { borderLeftColor: notif.color }]}>
              <Text style={styles.notifIcon}>{notif.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifText}>{notif.message}</Text>
                {notif.action && (
                  <TouchableOpacity style={styles.actionButton} onPress={() => onNavigate(notif.action)}>
                    <Text style={styles.actionText}>Take Action</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function generateNotifications(student) {
  const notifications = [];
  const reqs = DEGREE_REQUIREMENTS[student.major];
  
  if (!reqs) return notifications;

  // Check missing prerequisites
  const completed = new Set(student.completedCourses);
  const available = reqs.required.filter(course => {
    if (completed.has(course.code)) return false;
    return course.prereqs.every(prereq => completed.has(prereq));
  });

  if (available.length === 0) {
    notifications.push({
      icon: '⚠️',
      title: 'No Available Courses',
      message: 'You may need to complete prerequisites before taking more courses.',
      color: '#FF9800',
      action: 'plan'
    });
  }

  // Check graduation timeline
  const remaining = reqs.required.filter(c => !completed.has(c.code));
  const remainingCredits = remaining.reduce((sum, c) => sum + c.credits, 0) + reqs.electives;
  const semestersLeft = Math.ceil(remainingCredits / 15);

  if (semestersLeft > 8) {
    notifications.push({
      icon: '📅',
      title: 'Extended Timeline',
      message: `You need ${semestersLeft} more semesters. Consider summer courses or higher course loads.`,
      color: '#F44336',
      action: 'whatif'
    });
  }

  // Check for critical courses
  const criticalCourses = remaining.filter(c => 
    reqs.required.some(req => req.prereqs.includes(c.code))
  );

  if (criticalCourses.length > 0) {
    notifications.push({
      icon: '🎯',
      title: 'Priority Courses',
      message: `Take ${criticalCourses.slice(0, 2).map(c => c.code).join(', ')} soon - other courses depend on them.`,
      color: '#2196F3',
      action: 'plan'
    });
  }

  // Progress milestone
  const progress = (student.creditsCompleted / reqs.totalCredits) * 100;
  if (progress >= 75 && progress < 90) {
    notifications.push({
      icon: '🎉',
      title: 'Almost There!',
      message: `You're ${Math.round(progress)}% complete. Start planning your final semester!`,
      color: '#4CAF50'
    });
  }

  return notifications;
}

const styles = {
  back: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 8, paddingHorizontal: 12 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1A237E', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#90A4AE', textAlign: 'center', marginTop: 8 },
  notification: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', gap: 12, borderLeftWidth: 4 },
  notifIcon: { fontSize: 24 },
  notifTitle: { fontSize: 16, fontWeight: '700', color: '#1A237E', marginBottom: 4 },
  notifText: { fontSize: 14, color: '#37474F', lineHeight: 20 },
  actionButton: { backgroundColor: '#E8EAF6', padding: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 8 },
  actionText: { fontSize: 12, color: '#3949AB', fontWeight: '600' }
};