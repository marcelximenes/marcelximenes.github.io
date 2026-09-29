# VOLVO BANK

SIMPLIFIED FINANCIAL PLATFORM FOR VOLVO CUSTOMERS.

## CHALLENGES

### 2. DISCOVERY: MAPPING REAL PAINS WITH LEAN INCEPTION

The discovery phase was structured using the Lean Inception methodology, executed as a 5-day collaborative sprint with representatives from Business, Finance, and IT areas simultaneously. The decision to involve all areas from the beginning — instead of conducting sequential interviews by silo — was strategic: it eliminated the rework of late alignment and accelerated the prioritization process.

During this stage, contextual interviews were conducted with real fleet managers, focusing on effective workflows — not just declared ones. Collaborative workshops for persona and journey definition allowed mapping critical points of friction in the current financial routine. Each functionality was evaluated by its real impact on the user, not by internal preference or isolated business logic. Value hypotheses were formulated and documented for validation in subsequent sprints.

Key research insight: Fleet managers didn't want a "complete" app. They wanted three things accessible in fewer than 3 taps: outstanding balance, invoice issuance, and payment history. Any functionality beyond that was noise — and noise creates abandonment.

This clarity guided every subsequent design and backlog prioritization decision.

### 3. DESIGN AND CONSTRUCTION: WORKFLOWS THAT WORK UNDER PRESSURE

The information architecture was designed based on the principle of zero doubt in the journey: each screen should answer the user's question before they even needed to search for it. This implied deliberate simplification decisions — reducing the number of steps in critical flows, eliminating redundant micro-copy, and ensuring that error states were resolvable without human support.

The initial screen hierarchy was built around the most frequently consulted data in interviews: the outstanding balance of the active contract. The invoice issuance flow — which in the analog process involved seven interactions (call, authentication, request, wait, email receipt, download, and payment) — was reduced to two steps: contract selection and instant document generation.

Throughout the sprints, usability tests were conducted with real fleet managers, not internal proxies. Each cycle generated a structured report of findings, with documented interface changes, justified by behavioral evidence, and revalidated before going into production. This process eliminated assumptions and ensured that every design decision was traceable to an observed behavior.

### 4. CO-CREATION WITH STAKEHOLDERS: BUSINESS AS AN ALLY

Each sprint concluded with a structured presentation of solutions to the leadership of the involved areas. The format of these presentations was deliberately oriented towards business criteria — not aesthetic validation. The goal was to verify adherence to the financial model and industry standards before any line of code was written.

This continuous alignment ritual significantly reduced internal resistance, transformed leaders into co-owners of the product, and eliminated the late rework that often arises when design arrives ready for approval.

### 5. DESIGN CRAFT: TECHNICAL DECISIONS THAT SUSTAIN THE EXPERIENCE

The quality of the final experience was not the result of good intentions — it was the result of deliberate technical decisions, made layer by layer.

Information architecture oriented to the context of use. The hierarchy of each screen was defined based on users' real questions, mapped in interviews. The home screen does not display a generic dashboard: it immediately shows the outstanding balance of the active contract, because this was the data consulted in 100% of calls to the call center. Information at the top, action with one tap.

Flow reduction as a design metric. The invoice issuance flow was treated as an experience engineering problem: the analog process had seven steps (call → authentication → request → wait → email → download → payment). The digital version reached two steps. Each removed step was justified by research evidence, not aesthetic preference.

Componentized design system from sprint 1. The construction of a reusable component system from the outset ensured visual consistency across all flows and drastically reduced handoff time for development. State variants — empty, loading, error, success — were specified for each component before implementation, eliminating ambiguities at the time of delivery.

Microinteractions as a layer of trust. In a financial product, uncertainty is unacceptable. Every critical operation — document issuance, payment confirmation, balance update — received immediate and explicit visual feedback. Processing states were designed to communicate real progress, not just to occupy the screen while the system responds.

Technical specification oriented to edge cases. Error flows were treated with the same rigor as success flows. Situations such as expired contract, already issued invoice, connection failure, and outdated data were mapped and specified with clear, actionable language without financial jargon — ensuring that the user knew exactly what to do next, without needing to call the bank.

### 6. RESULTS: MEASURABLE IMPACT AND INTERNATIONAL EXPANSION

After its launch, the platform achieved widespread adoption rapidly. More than 90% of Volvo contract financial flow began to transition through the digital platform, entirely replacing phone and email interactions for balance inquiries and document issuance.

The reduction in call center inquiries validated the project's central hypothesis: a well-designed interface is, in itself, a support deflection mechanism. The most revealing data about the quality of the experience was the organic monthly return of users — without any marketing campaigns or notification pushes. This indicates that the platform was incorporated into the actual workflow of managers, not just adopted out of obligation.

Due to the success of the Brazilian operation, the platform was ported and adapted for Peru and Chile, becoming a pan-American product. The expansion process validated the scalability of the design architecture and developed flows, with minimal localization adaptations.

### 7. STRATEGIC LEARNINGS

Surgical research beats extensive research. Identifying the three critical user jobs-to-be-done is worth more than exhaustively mapping dozens of secondary functionalities.

Organic adoption is the most honest KPI. When design solves a real pain, the user returns without needing to be called.

Simplicity is a product decision, not an aesthetic one. Every functionality removed from the MVP was a choice based on research data, not design preference.

Technical craft and strategy are not opposites. The most impactful decisions of the project happened at the intersection of business understanding and rigor in specification — not at one end in isolation.
