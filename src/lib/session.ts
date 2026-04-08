/** Maps UI session label e.g. "2025/2026" to API `sessionId` (start year). */
export function sessionLabelToSessionId(session: string): number {
  const m = session.match(/^(\d{4})/);
  if (m) return parseInt(m[1], 10);
  return new Date().getFullYear();
}

/** Maps UI semester label to API numeric semester. */
export function semesterLabelToApi(sem: string): number {
  return sem === 'Second' ? 2 : 1;
}
