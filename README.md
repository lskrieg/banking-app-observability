# banking-app-observability

A mock banking application used as a data source for observability tooling evaluation and portfolio demos.

## Better Stack Integration (July 2026)

This repo includes a working Better Stack observability integration built as part of a product evaluation.

**What's running:**
- Node.js/Express backend with four banking endpoints: health check, accounts, transfers, and loan applications
- Instrumented with `@logtail/node` and Winston, streaming structured logs to Better Stack Telemetry in real time
- Log levels: INFO, WARN (large transfer flagged), and ERROR (invalid amount, simulated crash)
- A simple HTML frontend served statically with buttons to trigger each endpoint

**To run locally:**

```bash
npm install
echo "BETTERSTACK_TOKEN=your_token_here" > .env
node index.js
```

Then open `http://localhost:3000` in your browser.

---

## Planned Architecture (Dynatrace / OpenTelemetry)

The broader vision for this repo is a full-stack observability demo using Dynatrace and OpenTelemetry. Status: in progress.

Most observability demos stop at infrastructure metrics or a single instrumented service. This project goes further: it simulates a realistic banking application and instruments every layer, so the resulting dashboards tell a complete story from user experience through to backend performance and synthetic load behavior.

**Planned Stack**

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express |
| Instrumentation | OpenTelemetry SDK (OTLP) |
| Observability platform | Dynatrace |
| Frontend monitoring | Dynatrace RUM (OneAgent JS injection) |
| Load testing | k6 |

**Build Roadmap**

- [ ] Phase 1: Mock banking app (React frontend, Node.js/Express backend, core user flows)
- [ ] Phase 2: OTel instrumentation on the backend, OTLP export to Dynatrace
- [ ] Phase 3: Dynatrace RUM on the frontend (usability metrics, session replay, funnel tracking)
- [ ] Phase 4: k6 load test scripts targeting key journeys, results integrated into Dynatrace
- [ ] Phase 5: Dashboard build (performance, UX/usability, load test visibility)

Each phase is independently demoable.

---

## Related Repos

- [example_backend-performance-test](https://github.com/lskrieg/example_backend-performance-test): Backend performance test example with k6
- [webhook-demo](https://github.com/lskrieg/webhook-demo): Node.js webhook integration demo

## Author

Lindyn Sommer Krieg | [github.com/lskrieg](https://github.com/lskrieg)
