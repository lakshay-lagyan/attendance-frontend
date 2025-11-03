const API_CONFIG = {
    // Backend API URL 
    BASE_URL: 'https://attendance-backend-api-production-c552.up.railway.app',
    
    // API endpoints
    ENDPOINTS: {
        // Auth
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        ME: '/api/auth/me',
        CHANGE_PASSWORD: '/api/auth/change-password',
        
        // Admin
        ADMIN_STATS: '/api/admin/stats',
        ADMIN_USERS: '/api/admin/users',
        BLOCK_USER: '/api/admin/block_user',
        UNBLOCK_USER: '/api/admin/unblock_user',
        ENROLLMENT_REQUESTS: '/api/admin/enrollment_requests',
        PENDING_COUNT: '/api/admin/pending_requests_count',
        APPROVE_ENROLLMENT: '/api/admin/approve_enrollment',
        REJECT_ENROLLMENT: '/api/admin/reject_enrollment',
        
        // Attendance
        ATTENDANCE_RECENT: '/api/attendance/recent',
        ATTENDANCE_STATS: '/api/attendance/stats',
        ATTENDANCE_TODAY: '/api/attendance/today',
        
        // User
        USER_PROFILE: '/api/user/profile',
        USER_ATTENDANCE: '/api/user/attendance_history',
        USER_STATS: '/api/user/attendance_stats',
        UPDATE_PROFILE: '/api/user/update_profile',
        
        // Enrollment
        ENROLL: '/api/enrollment/enroll',
        VALIDATE_IMAGE: '/api/enrollment/validate-image',
        
        // Face
        RECOGNIZE: '/api/face/recognize',
        RECOGNIZE_CROWD: '/api/face/recognize/crowd',
        RESET_CACHE: '/api/face/recognize/reset-cache'
    },
    
    // Request options
    OPTIONS: {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}