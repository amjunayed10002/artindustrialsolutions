import { AdminUser, ContactMessage, RFQ } from '../types';

interface SiteDataResponse {
  initialized: boolean;
  data: Record<string, unknown> | null;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || `Request failed (${response.status})`);
  }
  return result as T;
}

async function csrfHeaders(): Promise<Record<string, string>> {
  const { csrfToken } = await request<{ csrfToken: string }>('csrf/');
  return { 'X-CSRFToken': csrfToken };
}

export async function fetchSiteData(): Promise<SiteDataResponse> {
  return request<SiteDataResponse>('site-data/');
}

export async function initializeSiteData(data: Record<string, unknown>): Promise<SiteDataResponse> {
  return request<SiteDataResponse>('site-data/', {
    method: 'POST',
    headers: await csrfHeaders(),
    body: JSON.stringify({ data }),
  });
}

export async function saveSiteData(data: Record<string, unknown>): Promise<void> {
  await request('site-data/', {
    method: 'PUT',
    headers: await csrfHeaders(),
    body: JSON.stringify({ data }),
  });
}

export async function fetchAdminSession(): Promise<AdminUser | null> {
  const result = await request<{ user: AdminUser | null }>('session/');
  return result.user;
}

export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  const result = await request<{ user: AdminUser }>('login/', {
    method: 'POST',
    headers: await csrfHeaders(),
    body: JSON.stringify({ username, password }),
  });
  return result.user;
}

export async function logoutAdmin(): Promise<void> {
  await request('logout/', { method: 'POST', headers: await csrfHeaders() });
}

export async function submitRFQ(data: Omit<RFQ, 'id' | 'reference_no' | 'created_at' | 'status'>): Promise<RFQ> {
  const result = await request<{ data: RFQ }>('submissions/rfq/', {
    method: 'POST',
    headers: await csrfHeaders(),
    body: JSON.stringify(data),
  });
  return result.data;
}

export async function submitContactMessage(data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): Promise<ContactMessage> {
  const result = await request<{ data: ContactMessage }>('submissions/contact/', {
    method: 'POST',
    headers: await csrfHeaders(),
    body: JSON.stringify(data),
  });
  return result.data;
}