# banking-app-observability

A full-stack observability demo using a mock banking application as the data source. Built to demonstrate end-to-end monitoring across frontend UX, backend performance, and load test visibility using Dynatrace and OpenTelemetry.

> **Status: In progress.** Architecture and build roadmap are defined. Implementation coming in phases.

---

## Overview

Most observability demos stop at infrastructure metrics or a single instrumented service. This project goes further: it simulates a realistic banking application and instruments every layer, so the resulting Dynatrace dashboards tell a complete story from user experience through to backend performance and synthetic load behavior.

The backend is instrumented with **OpenTelemetry (OTLP)**, making the architecture platform-agnostic. Traces export to Dynatrace, but the same setup works with any OTLP-compatible backend (Grafana Tempo, Elastic APM, Jaeger, etc.).

---

## Architecture

```
[ Frontend (React) ]
    |-- Dynatrace RUM (OneAgent JS)
    |-- User flows: login, account overview, transfer, transaction history

[ Backend (Node.js / Express) ]
    |-- OpenTelemetry SDK (traces, metrics, logs)
    |-- OTLP export to Dynatrace
    |-- Simulated services: auth, accounts, transactions

[ Load Testing (k6) ]
    |-- Scripts targeting key user journeys
    |-- Results surfaced in Dynatrace dashboards via k6 output integration

[ Dynatrace ]
    |-- Dashboard 1: Backend performance (response times, error rates, service map)
    |-- Dashboard 2: Frontend UX (RUM, rage clicks, session replay, funnel visibility)
    |-- Dashboard 3: Load test results (throughput, latency percentiles, error trends)
```

---

## Planned Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express |
| Instrumentation | OpenTelemetry SDK (OTLP) |
| Observability platform | Dynatrace |
| Frontend monitoring | Dynatrace RUM (OneAgent JS injection) |
| Load testing | k6 |
| Dashboards | Dynatrace Dashboards |

---

## Build Roadmap

- [ ] **Phase 1:** Mock banking app (React frontend, Node.js/Express backend, core user flows)
- [ ] **Phase 2:** OTel instrumentation on the backend, OTLP export to Dynatrace
- [ ] **Phase 3:** Dynatrace RUM on the frontend (usability metrics, session replay, funnel tracking)
- [ ] **Phase 4:** k6 load test scripts targeting key journeys, results integrated into Dynatrace
- [ ] **Phase 5:** Dashboard build (performance, UX/usability, load test visibility)

Each phase is independently demoable.

---

## Observability Goals

**Performance monitoring**
Response times, error rates, throughput, and service dependencies across the backend.

**Usability monitoring**
RUM data including load times, rage clicks, session replay, and user journey drop-off points. Most APM demos skip this layer; it's often where the most actionable insights live.

**Load test visibility**
k6 test results surfaced inside Dynatrace rather than isolated in a CI report, so performance regression is visible in the same context as production behavior.

---

## Related Repos

- [k6-learning](https://github.com/lskrieg/k6-learning): k6 fundamentals and script patterns
- [example_backend-performance-test](https://github.com/lskrieg/example_backend-performance-test): Backend performance test example with k6
- [webhook-demo](https://github.com/lskrieg/webhook-demo): Node.js webhook integration demo

---

## Author

Lindyn Sommer Krieg | [github.com/lskrieg](https://github.com/lskrieg)
