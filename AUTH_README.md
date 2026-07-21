# Email and password authentication

Credential accounts are stored in `credentialUsers` with normalized unique email and username values and a one-way scrypt password hash. Plaintext passwords are never stored. Auth.js credentials sessions use JWT strategy, while the existing GitHub provider remains available.

This patch does not include email verification, password reset, MFA, or distributed rate limiting. Those should be implemented before opening self-registration to untrusted public traffic.
