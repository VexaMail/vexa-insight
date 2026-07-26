// Offline prompt-eval harness (server-only, macOS-only).
// Runs the production prompts on the free Claude Max lane so a prompt can be
// iterated without spending API credit. See docs/ai-max-oauth-backend.md.

export { callMaxOAuthLane } from './callMaxOAuthLane'
export { DEFAULT_EVAL_MODEL } from './defaultEvalModel'
export { EVAL_RESULTS_DIR } from './evalResultsDir'
export { loadEvalReport } from './loadEvalReport'
export { loadEvalReportDomains } from './loadEvalReportDomains'
export { runDiagnosticsInsightsEval } from './runDiagnosticsInsightsEval'
export { runOneEvalCall } from './runOneEvalCall'
export { runReportInsightsEval } from './runReportInsightsEval'
export { summarizeEvalArtifact } from './summarizeEvalArtifact'
export { writeEvalArtifact } from './writeEvalArtifact'
