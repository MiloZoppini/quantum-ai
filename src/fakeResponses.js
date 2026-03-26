const labels = [
  'Neural Architecture —',
  'Quantum Core Logic —',
  'Synthesis Engine —',
  'Deep Analysis —',
  'Signal Processing —',
  'Entropy Module —',
  'Predictive Matrix —',
]

const responses = [
  {
    keywords: ['hello', 'hi', 'hey', 'ciao'],
    texts: [
      'Greetings. All neural pathways are active and ready for synthesis. What data streams shall I process for you today?',
      'Welcome back to the Quantum interface. Systems are nominal. Ready to process your next directive.',
    ],
  },
  {
    keywords: ['analyze', 'analysis', 'scan'],
    texts: [
      'Running deep analysis across all active clusters...\n\nPreliminary findings indicate a **12.4% improvement** in signal coherence since the last calibration cycle.\n\n• Primary data streams: Stable\n• Secondary redundancy layers: Active\n• Anomaly detection threshold: Within parameters\n\nFull report will be compiled within the next processing cycle.',
      'Initiating multi-spectrum analysis protocol...\n\nThe scan reveals **3 critical data nodes** requiring immediate attention:\n\n• Node SF-7: Bandwidth saturation at 94%\n• Node Berlin-3: Latency spike detected (12ms → 47ms)\n• Node Tokyo-1: Operating within optimal parameters\n\nRecommend prioritizing SF-7 for entropy reduction.',
    ],
  },
  {
    keywords: ['deploy', 'launch', 'start', 'init'],
    texts: [
      'Deployment sequence initiated.\n\n• Phase 1: Environment validation — **Complete**\n• Phase 2: Neural weight synchronization — **Complete**\n• Phase 3: Edge node propagation — **In progress**\n\nEstimated time to full deployment: **4.2 seconds**. All safety protocols are engaged.',
      'Initializing deployment pipeline across **12 edge nodes**...\n\nPre-flight checks passed. The system will begin rolling deployment in reverse-chronological priority order.\n\nNote: Berlin-Edge-01 is currently in maintenance mode. Shall I bypass or defer?',
    ],
  },
  {
    keywords: ['error', 'bug', 'issue', 'problem', 'fix'],
    texts: [
      'I have identified the anomaly in the data stream. Root cause analysis suggests a **recursive loop in the entropy buffer**.\n\n• Affected systems: 2 of 12 clusters\n• Data integrity: 99.7% preserved\n• Auto-recovery: Initiated\n\nThe self-healing protocol should resolve this within 800ms.',
      'Diagnostic complete. The issue stems from a **desynchronized timestamp** in the signal relay chain.\n\nApplying corrective patch to all affected nodes. No data loss detected. System will resume nominal operations shortly.',
    ],
  },
  {
    keywords: ['status', 'health', 'report'],
    texts: [
      'System health report:\n\n• **CPU Utilization**: 34.7% across all clusters\n• **Memory**: 12.8TB / 24TB allocated\n• **Network throughput**: 940 Gbps\n• **Active threads**: 4,291,003\n• **Uptime**: 99.9997%\n\nAll systems are operating within expected parameters. No anomalies detected.',
      'Current operational status:\n\n• SF-Main-Cluster: **Online** — Processing at peak efficiency\n• Berlin-Edge-01: **Online** — Handling European data streams\n• Tokyo-Node: **Standby** — Awaiting activation command\n\nOverall system health: **Optimal**.',
    ],
  },
  {
    keywords: ['predict', 'forecast', 'model', 'future'],
    texts: [
      'Engaging predictive model v2.4...\n\nBased on current data trajectories, I project a **23% increase** in processing demand over the next 72 hours.\n\n• Confidence interval: 94.2%\n• Primary driver: Seasonal data influx from APAC region\n• Recommendation: Pre-scale Berlin and Tokyo nodes by 15%\n\nShall I auto-configure the scaling parameters?',
      'Running forecast simulation across **10,000 iterations**...\n\nResults converge on a high-probability scenario: the current neural architecture will reach capacity in **14 days** at current growth rates.\n\n• Option A: Horizontal scaling (+4 nodes) — Cost: Moderate\n• Option B: Vertical optimization — Cost: Low, Risk: Medium\n• Option C: Hybrid approach — Recommended\n\nAwaiting your directive.',
    ],
  },
  {
    keywords: ['encrypt', 'security', 'protect', 'secure'],
    texts: [
      'Security audit initiated...\n\nAll data channels are currently protected with **AES-256-GCM encryption**. I have detected no intrusion attempts in the last 24-hour cycle.\n\n• Firewall status: Active on all ports\n• Certificate validity: 340 days remaining\n• Zero-day vulnerability scan: Clean\n\nRecommendation: Rotate API keys as part of scheduled maintenance.',
      'Activating enhanced security protocol...\n\n• Layer 1: **Quantum-resistant key exchange** — Enabled\n• Layer 2: **Behavioral anomaly detection** — Active\n• Layer 3: **Signal obfuscation mesh** — Deployed\n\nAll outgoing packets are now wrapped with military-grade encryption. System is secure.',
    ],
  },
]

const fallbackTexts = [
  'Processing your request through the quantum synthesis engine...\n\nThe neural architecture has processed your input across **7 parallel data streams**. Results indicate a coherent pattern emerging from the noise layer.\n\n• Confidence score: 97.3%\n• Processing latency: 0.4ms\n• Output fidelity: High\n\nIs there a specific vector you would like me to explore further?',
  'Acknowledged. Routing your query through the deep analysis pipeline...\n\nI have cross-referenced your input against **2.4 billion data points** in the active knowledge graph. The synthesis reveals several actionable pathways.\n\n• Primary recommendation: Increase signal amplification by 8%\n• Secondary: Restructure the data ingestion pipeline\n• Tertiary: Enable adaptive learning on Node SF-7\n\nStanding by for further instructions.',
  'Your directive has been received and processed.\n\nThe quantum core has identified **4 optimization vectors** relevant to your query:\n\n• Vector Alpha: Data compression ratio improvement\n• Vector Beta: Latency reduction across edge nodes\n• Vector Gamma: Predictive cache warming\n• Vector Delta: Entropy normalization\n\nEach vector carries a projected efficiency gain of **6-11%**. Shall I proceed with implementation?',
  'Interesting query. Let me run this through the synthesis engine...\n\nAfter processing across all available clusters, I can confirm the following:\n\n• Your hypothesis aligns with **89.4% of observed data patterns**\n• The remaining 10.6% deviation is within acceptable noise margins\n• No conflicting signals detected in the primary data stream\n\nRecommendation: Proceed with confidence. The data supports your approach.',
]

export function generateResponse(userInput) {
  const lower = userInput.toLowerCase()
  const label = labels[Math.floor(Math.random() * labels.length)]

  for (const entry of responses) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      const text = entry.texts[Math.floor(Math.random() * entry.texts.length)]
      return { label, text }
    }
  }

  const text = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)]
  return { label, text }
}
