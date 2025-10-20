import type { RequestEvent } from '@sveltejs/kit';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { prisma } from '$lib/server/db';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const sessionCookieName = 'auth-session';

// Generate a random session token
export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	return encodeBase64url(bytes);
}

// Create a session for a user
export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

	const session = await prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt
		}
	});

	return session;
}

// Validate a session token and refresh if needed
export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: {
			user: {
				select: {
					id: true,
					username: true,
					banned: true,
					ghost: true
				}
			}
		}
	});

	if (!session) return { session: null, user: null };

	const now = Date.now();
	const expiresAt = session.expiresAt.getTime();

	// Session expired
	if (now >= expiresAt) {
		await prisma.session.delete({ where: { id: session.id } });
		return { session: null, user: null };
	}

	// Refresh session if expiring within 15 days
	if (now >= expiresAt - DAY_IN_MS * 15) {
		const newExpiry = new Date(now + DAY_IN_MS * 30);
		await prisma.session.update({
			where: { id: session.id },
			data: { expiresAt: newExpiry }
		});
		session.expiresAt = newExpiry;
	}

	return { session, user: session.user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

// Invalidate a session
export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({ where: { id: sessionId } });
}

// Set session cookie in SvelteKit
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

// Delete session cookie
export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, { path: '/' });
}
