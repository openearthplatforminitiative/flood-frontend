import { JWT } from 'next-auth/jwt';
import { UserFormData } from '@/app/components/onboarding/OnboardingDashboard';

export async function fetchAccessToken() {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID!,
      client_secret: process.env.KEYCLOAK_SECRET!,
      grant_type: 'client_credentials',
    }),
    method: 'POST',
    cache: 'no-store',
  });
}

export async function createKeycloakUser(token: JWT, user: UserFormData) {
  console.log('Create');
  try {
    await fetch(
      `${process.env.KEYCLOAK_ISSUER}/admin/realms/flood-frontend/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          enabled: true,
          attributes: {},
          groups: [],
          username: 'henrik',
          email: '',
          emailVerified: '',
          firstName: user.name,
          lastName: '',
        }),
        method: 'POST',
        cache: 'no-store',
      }
    );
  } catch (e) {
    console.error(e);
  }
}
