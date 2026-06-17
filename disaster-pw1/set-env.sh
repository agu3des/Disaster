#!/bin/sh
cat > /app/src/environments/environment.production.ts << EOF
export const environment = {
    production: true,
    URL_DISASTERS: '/api/disasters',
    URL_VOLUNTEERS: '/api/volunteers',
    GOOGLE_CLIENT_ID: '${GOOGLE_CLIENT_ID}'
};
EOF