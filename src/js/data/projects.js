/**
 * Dados dos projetos exibidos no portfólio, em inglês e português.
 *
 * @typedef {Object} ProjectSection
 * @property {string} heading - Subtítulo da seção (ex: "2. Discovery: ...").
 * @property {string[]} paragraphs - Parágrafos da seção.
 *
 * @typedef {Object} ProjectTranslation
 * @property {string} title
 * @property {string} summary
 * @property {ProjectSection[]} sections
 *
 * @typedef {Object} Project
 * @property {string} id - Identificador único (slug), usado na URL e no DOM.
 * @property {{ en: ProjectTranslation, pt: ProjectTranslation }} translations
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 'stefanini',
    translations: {
      en: {
        title: 'Stefanini Group',
        summary: 'Leading design teams in corporate strategies and restructuring.',
        sections: [
          {
            heading: '2. Diagnosis: understand before transforming',
            paragraphs: [
              'Before any process change, a complete human and operational mapping of the real situation was carried out. Individual conversations with each team member allowed understanding not only ongoing projects but also technical knowledge, individual aptitudes, accumulated frustrations, and the energy points of each designer. In small teams under pressure, ignoring this mapping is building on sand.',
              'In parallel, an ecosystem mapping was conducted: existing workflows, people the team interacted with, key influential stakeholders, executive managers, and directorates with the greatest partnership potential. This exercise revealed what the team could not see because they were immersed in operations: there was pent-up demand for design on several fronts of the company — the problem was invisibility, not irrelevance.',
              "Central finding: the team didn't have little work because there was little room for UX at Stefanini. It had little work because no one knew, clearly, what the UX team was capable of doing and when to engage them.",
            ],
          },
          {
            heading: '3. Building presence: the UX team as an internal brand',
            paragraphs: [
              'With the diagnosis mapped, the adopted strategy was to deliberately build institutional presence — not through formal presentations, but through frequent, consistent, and value-oriented conversations with project managers, directors, and executives from different areas.',
              'This relationship building work was systematic. Each conversation had a clear objective: to demonstrate capability, understand unresolved project pain points, and position the UX team as a strategic partner — not as a service provider called at the end. Over time, this presence generated a compound effect: the team began to be engaged in commercial proposals, pricing, client meetings, pre-projects, assessments, and initial discoveries for dozens of projects, with the role of structuring the path before development began.',
              'Participation in these initial moments had a direct impact on project quality: more assertive prioritizations, more consistent backlogs, and less rework in subsequent phases. The UX team ceased to be a stage in the flow to become a risk reduction element from the outset.',
            ],
          },
          {
            heading: '4. Internal structure: rituals that build a team',
            paragraphs: [
              'As demand grew, it became necessary to build the internal structure that would support growth without losing cohesion. Rituals deliberately varied in tone and objective were established.',
              'Weekly plannings for priority alignment and workload visibility across projects. Retrospectives to capture learnings and continuously adjust processes. Regular informal meetings — without a project agenda — used to share achievements, answer technical questions, and maintain the sense of belonging that was absent when management was taken over. In consulting teams, where designers are often allocated to different clients and see each other little, these moments are not secondary: they are what makes the team exist as a unit, not just as a collection of individuals.',
              'In parallel, monthly individual 1:1s were implemented for career and well-being monitoring, skill maps for structured and consistent technical development, and specific training sessions on particular aspects of the work. Development ceased to be spontaneous and became structured — with each designer knowing where they stood, where they were growing, and what the team expected from them.',
            ],
          },
          {
            heading: '5. Management craft: decisions that defined expansion',
            paragraphs: [
              'The transition from 6 to 20 designers in approximately a year and a half was not just the result of relationship building and visibility — it was the result of technical management decisions that made growth sustainable.',
              "Positioning before projects, not during. Participation in initial assessments and discoveries consolidated an operating model that differentiated Stefanini's UX team from the consulting standard: designers involved at the moment the problem is still being defined, not just when the solution needs to be designed. This increased the quality of deliverables and clients' perception of value.",
              'Acting on difficult projects as a vector for reputation. The team began to be regularly engaged in projects facing execution difficulties — high-visibility, high-risk situations. The ability to enter critical projects, bring alignment with clients, and reduce validation time through prototyping consolidated a reputation that no internal presentation could build.',
              'Multi-directorate expansion as a model disruption. The standard at Stefanini was siloed operations — squads separated by directorate, without permeability. The expansion of the UX team to multiple directorates simultaneously was unprecedented and represented a change in model recognized internally. It was not an expansion by volume — it was an expansion by accumulated legitimacy.',
              "People development as a capacity multiplier. The investment in skill maps and individual monitoring resulted in designers who grew technically in a consistent manner — and who became references in their respective areas. Several team members received the company's highest evaluations and were recognized as promising talents in the management chain, an acknowledgment granted from top-down that validates the quality of internally conducted development.",
            ],
          },
          {
            heading: '6. Results: from 6 isolated designers to an institutional reference',
            paragraphs: [
              "In about a year and a half, the team grew from 6 to 20 designers, expanded its operations from one to multiple directorates, and established an operating model recognized as a reference within the company. The multi-directorate expansion — unprecedented in the area's history — was made possible by systematic relationship building, consistent delivery, and strategic positioning at moments of greatest visibility.",
              'The team is regularly praised for its results and frequently requested for difficult projects — an indicator of institutional trust that goes beyond satisfaction with punctual deliveries. The increasing involvement in artificial intelligence solutions positions the team at the forefront of what the company offers the market.',
              'On an individual level, multiple team members — including management — repeatedly received top evaluations and formal recognition as promising talents by the management chain. Today, UX management is engaged for proposal pricing, organizing projects in the negotiation phase with clients, pre-project alignment processes, backlog generation, and recruitment — functions that transcend the original scope of the position and reflect the level of trust built throughout the process.',
              "Central learning: in consulting, the most effective UX practice is not the one with the best internal processes — it's the one that becomes indispensable before the project begins. Strategic visibility and delivery quality are not separate dimensions: one cannot sustain itself without the other.",
            ],
          },
          {
            heading: '7. Strategic learnings',
            paragraphs: [
              'Human diagnosis before process diagnosis. Understanding people individually — their aptitudes, frustrations, and energies — is the prerequisite for any organizational change that lasts.',
              'Systematic presence generates demand. In consulting environments, UX that waits to be called is rarely called. What builds relationships before the project exists becomes part of the conversation from the start.',
              'Informal rituals are team infrastructure, not management courtesy. In teams distributed across different projects, moments without an agenda are what create cohesion. Cohesion is what transforms allocations into a team.',
              "Entering difficult projects is the most honest shortcut to reputation. No internal presentation builds trust as quickly as solving a problem others couldn't.",
              'Individual development is a collective lever. Designers who grew in a structured way become multipliers — and multipliers are what make a team of 20 operate with the cohesion of a team of 6.',
            ],
          },
        ],
      },
      pt: {
        title: 'Stefanini Group',
        summary: 'Liderando times de design em estratégias corporativas e reestruturação.',
        sections: [], // TODO: traduzir os 6 case studies (ver docs/case-studies-raw/stefanini.md)
      },
    },
  },
  {
    id: 'volvo',
    translations: {
      en: {
        title: 'Volvo Bank',
        summary:
          'Financial design solutions focused on user experience and security. Developing processes that facilitated daily operations and increased the reliability of thousands of fleet managers.',
        sections: [
          {
            heading: '2. Discovery: mapping real pains with Lean Inception',
            paragraphs: [
              'The discovery phase was structured using the Lean Inception methodology, executed as a 5-day collaborative sprint with representatives from Business, Finance, and IT areas simultaneously. The decision to involve all areas from the beginning — instead of conducting sequential interviews by silo — was strategic: it eliminated the rework of late alignment and accelerated the prioritization process.',
              'During this stage, contextual interviews were conducted with real fleet managers, focusing on effective workflows — not just declared ones. Collaborative workshops for persona and journey definition allowed mapping critical points of friction in the current financial routine. Each functionality was evaluated by its real impact on the user, not by internal preference or isolated business logic. Value hypotheses were formulated and documented for validation in subsequent sprints.',
              'Key research insight: Fleet managers didn\'t want a "complete" app. They wanted three things accessible in fewer than 3 taps: outstanding balance, invoice issuance, and payment history. Any functionality beyond that was noise — and noise creates abandonment.',
              'This clarity guided every subsequent design and backlog prioritization decision.',
            ],
          },
          {
            heading: '3. Design and construction: workflows that work under pressure',
            paragraphs: [
              "The information architecture was designed based on the principle of zero doubt in the journey: each screen should answer the user's question before they even needed to search for it. This implied deliberate simplification decisions — reducing the number of steps in critical flows, eliminating redundant micro-copy, and ensuring that error states were resolvable without human support.",
              'The initial screen hierarchy was built around the most frequently consulted data in interviews: the outstanding balance of the active contract. The invoice issuance flow — which in the analog process involved seven interactions (call, authentication, request, wait, email receipt, download, and payment) — was reduced to two steps: contract selection and instant document generation.',
              'Throughout the sprints, usability tests were conducted with real fleet managers, not internal proxies. Each cycle generated a structured report of findings, with documented interface changes, justified by behavioral evidence, and revalidated before going into production. This process eliminated assumptions and ensured that every design decision was traceable to an observed behavior.',
            ],
          },
          {
            heading: '4. Co-creation with stakeholders: business as an ally',
            paragraphs: [
              'Each sprint concluded with a structured presentation of solutions to the leadership of the involved areas. The format of these presentations was deliberately oriented towards business criteria — not aesthetic validation. The goal was to verify adherence to the financial model and industry standards before any line of code was written.',
              'This continuous alignment ritual significantly reduced internal resistance, transformed leaders into co-owners of the product, and eliminated the late rework that often arises when design arrives ready for approval.',
            ],
          },
          {
            heading: '5. Design craft: technical decisions that sustain the experience',
            paragraphs: [
              'The quality of the final experience was not the result of good intentions — it was the result of deliberate technical decisions, made layer by layer.',
              "Information architecture oriented to the context of use. The hierarchy of each screen was defined based on users' real questions, mapped in interviews. The home screen does not display a generic dashboard: it immediately shows the outstanding balance of the active contract, because this was the data consulted in 100% of calls to the call center. Information at the top, action with one tap.",
              'Flow reduction as a design metric. The invoice issuance flow was treated as an experience engineering problem: the analog process had seven steps (call → authentication → request → wait → email → download → payment). The digital version reached two steps. Each removed step was justified by research evidence, not aesthetic preference.',
              'Componentized design system from sprint 1. The construction of a reusable component system from the outset ensured visual consistency across all flows and drastically reduced handoff time for development. State variants — empty, loading, error, success — were specified for each component before implementation, eliminating ambiguities at the time of delivery.',
              'Microinteractions as a layer of trust. In a financial product, uncertainty is unacceptable. Every critical operation — document issuance, payment confirmation, balance update — received immediate and explicit visual feedback. Processing states were designed to communicate real progress, not just to occupy the screen while the system responds.',
              'Technical specification oriented to edge cases. Error flows were treated with the same rigor as success flows. Situations such as expired contract, already issued invoice, connection failure, and outdated data were mapped and specified with clear, actionable language without financial jargon — ensuring that the user knew exactly what to do next, without needing to call the bank.',
            ],
          },
          {
            heading: '6. Results: measurable impact and international expansion',
            paragraphs: [
              'After its launch, the platform achieved widespread adoption rapidly. More than 90% of Volvo contract financial flow began to transition through the digital platform, entirely replacing phone and email interactions for balance inquiries and document issuance.',
              "The reduction in call center inquiries validated the project's central hypothesis: a well-designed interface is, in itself, a support deflection mechanism. The most revealing data about the quality of the experience was the organic monthly return of users — without any marketing campaigns or notification pushes. This indicates that the platform was incorporated into the actual workflow of managers, not just adopted out of obligation.",
              'Due to the success of the Brazilian operation, the platform was ported and adapted for Peru and Chile, becoming a pan-American product. The expansion process validated the scalability of the design architecture and developed flows, with minimal localization adaptations.',
            ],
          },
          {
            heading: '7. Strategic learnings',
            paragraphs: [
              'Surgical research beats extensive research. Identifying the three critical user jobs-to-be-done is worth more than exhaustively mapping dozens of secondary functionalities.',
              'Organic adoption is the most honest KPI. When design solves a real pain, the user returns without needing to be called.',
              'Simplicity is a product decision, not an aesthetic one. Every functionality removed from the MVP was a choice based on research data, not design preference.',
              'Technical craft and strategy are not opposites. The most impactful decisions of the project happened at the intersection of business understanding and rigor in specification — not at one end in isolation.',
            ],
          },
        ],
      },
      pt: {
        title: 'Volvo Bank',
        summary:
          'Soluções financeiras focadas em experiência do usuário e segurança, com processos que facilitaram operações diárias de milhares de gestores de frota.',
        sections: [], // TODO: traduzir (ver docs/case-studies-raw/volvo.md)
      },
    },
  },
  {
    id: 'sesc-senac',
    translations: {
      en: {
        title: 'SESC / SENAC',
        summary: 'Strategic evolution in the accessibility of integrated popular services.',
        sections: [
          {
            heading: '2. Information architecture: breaking down organizational silos',
            paragraphs: [
              "I conducted Card Sorting and Tree Testing with extremely diverse user profiles — from seniors in social tourism programs to young people seeking vocational courses. The result was revealing: the current navigation organization reflected the institution's internal structure, not the users' mental model.",
              'I redesigned the information architecture based on the tasks people wanted to complete — not the departments that managed that information.',
            ],
          },
          {
            heading: "3. Inclusive experience: accessibility is not a feature, it's structure",
            paragraphs: [
              'We implemented full WCAG 2.1 AA compliance across all components — contrasts, typographic hierarchy, screen reader compatibility, and keyboard navigation. More than just meeting regulations, the goal was for a 70-year-old user to find physiotherapy appointments without asking anyone for help.',
              'We tested with real senior users, and each test generated concrete adjustments — from font size to feedback for form errors.',
            ],
          },
          {
            heading: '4. Results: access that transforms',
            paragraphs: [
              'After the implementations:',
              '+45% in the volume of online course registrations — without additional marketing campaigns.',
              '+60% in the success rate of senior users completing transactions autonomously.',
              'Measurable reduction in the institutional call center workload.',
              'The central learning: accessibility is not a side project — it is the most strategic design decision a social organization can make.',
            ],
          },
        ],
      },
      pt: {
        title: 'SESC / SENAC',
        summary: 'Evolução estratégica na acessibilidade de serviços populares integrados.',
        sections: [], // TODO: traduzir (ver docs/case-studies-raw/sesc-senac.md)
      },
    },
  },
  {
    id: 'seduc-recife',
    translations: {
      en: {
        title: 'SEDUC Recife',
        summary: "Modernization of Recife's educational infrastructure and digital footprint.",
        sections: [
          {
            heading: '2. Discovery: dismantling legacy systems to understand reality',
            paragraphs: [
              'The discovery began with mapping the legacy systems used by teachers — not to replace functionality feature-for-feature, but to understand which workflows were already internalized and which were, in fact, the root cause of daily complaints. This distinction is critical: legacy systems carry learned behaviors that, if ignored, become adoption barriers in the new product.',
              'Moderated usability tests were conducted with public school teachers, principals, and pedagogical secretaries — in the field, in real-world usage environments, not in a lab. The sessions included observation of real tasks, not just questions about declared preferences.',
              "Main finding: 60% of teachers' daily tasks concentrated on just 3 workflows — and these 3 workflows were precisely the most poorly resolved in the legacy systems. This defined what would be built first and guided the entire backlog prioritization.",
            ],
          },
          {
            heading: '3. Class journals and lesson plans: the core of teacher management',
            paragraphs: [
              "The Class Journals module was designed based on a concrete benchmark, defined by time data collected during field observations: a teacher should be able to enter grades, attendance, and activities for a class in less than 2 minutes per day. This number was not arbitrary — it was calculated based on the teacher's class load and the time available between lessons. The design was built to meet this goal, and every friction that prevented it was treated as an experience bug, not an interface detail.",
              'The Lesson Plan module solved a chronic pedagogical coordination problem: each teacher planned individually, without visibility into what colleagues in the same grade or discipline were developing. The module created a shared and structured space, categorized by theme and school level according to MEC guidelines — transforming an isolated process into a collaborative practice without imposing artificial workflows.',
            ],
          },
          {
            heading:
              '4. News portal and enrollment registration: inclusive access as a design requirement',
            paragraphs: [
              "The Education Portal centralized the Department's official communications, replacing WhatsApp chains and printed notices that arrived days late — or didn't arrive at all. The design decision here was about reliability as a value: an official channel only works if users learn that they can depend on it.",
              'The Enrollment Registration was the module with the greatest direct social impact within the ecosystem. The target audience were guardians with low digital literacy, often completing the process via cell phone, unfamiliar with online forms. The workflow was subjected to multiple rounds of testing with real guardians — not proxies — and iterated until 95% of participants were able to complete the process autonomously, without any external assistance. This number was not a business goal: it was an ethical design requirement for an essential public service.',
            ],
          },
          {
            heading: '5. Design craft: technical decisions for a multi-profile system at scale',
            paragraphs: [
              'Designing for radical user diversity requires technical rigor beyond conventional usability. Craft decisions were as decisive as strategic ones.',
              'Multi-profile architecture with separate contexts. Each profile — teacher, coordinator, principal, family member — accesses a distinct experience, with navigation and information hierarchy calibrated for their real objectives. "Views" of the same system were not created: independent journeys were designed that share infrastructure but do not impose complexity from one profile to another.',
              'Design for low digital literacy as a primary constraint. Language, icon, and visual hierarchy decisions were made using the user with the lowest digital familiarity as the approval parameter — not as an exception to be dealt with later. Natural language labels, absence of technical or educational jargon, and clear visual progression between steps were specification requirements, not style suggestions.',
              'Time benchmark as a flow acceptance criterion. The 2-minute limit for journal entry was not an aspiration — it was an acceptance criterion tested in each iteration. Flows that didn\'t meet the goal returned for review. This shifted the quality evaluation from subjective ("seems simple") to measurable ("is fast enough for the real usage context").',
              'Exhaustive specification of states and edge cases. A system used by hundreds of schools simultaneously cannot have ambiguous behaviors. Each module was specified with complete states: empty, loading, connection error, outdated data, insufficient permission. In contexts of unstable connectivity — a reality for many schools in the network — failure states were treated with the same attention as success states.',
              'Scalable component system for multiple modules. The construction of a design system shared among the modules (Journals, Lesson Plan, Portal, Enrollment, SAAP) ensured perceptual consistency for the user transitioning between contexts and reduced handoff and maintenance costs throughout the project. Component variants were documented and versioned before implementation.',
            ],
          },
          {
            heading: '6. Results: an ecosystem that changed the routine of thousands',
            paragraphs: [
              "SEDUC Recife's digital ecosystem is now active across the entire municipal network, used by teachers, students, family members, coordinators, principals, and pedagogical teams in hundreds of schools.",
              "The elimination of duplicate data entry returned approximately one hour of daily work to teachers who were already overloaded — a gain that doesn't appear on a dashboard but transforms the routine of those who teach. Families throughout the city began to complete enrollments online, without travel and without in-person queues, with a workflow validated to function autonomously even for those who had never filled out a digital form.",
              'SAAP — System for Monitoring Pedagogical Actions — implemented in the ecosystem gave coordination real-time visibility into what was happening in the classroom, replacing manual reports and alignment meetings that consumed time without generating clarity.',
              'Key learning: scale is not a guarantee of complexity. The best public systems are those that any user can use alone, on the first try — and this criterion should be the starting point of design, not the final result of testing.',
            ],
          },
          {
            heading: '7. Strategic learnings',
            paragraphs: [
              'The user with the lowest digital literacy defines the quality ceiling of the system. Designing for the most capable user and adapting later is a logic that systematically excludes those who need the service most.',
              'Time benchmark is a design criterion, not a vanity metric. Transforming the time taken to complete a task into a flow acceptance criterion eliminates subjectivity from reviews and guides iterations with precision.',
              'Legacy systems carry learned behavior. Mapping what users already know how to do — even poorly — is as important as mapping what they need to do. Ignoring this is to design invisible adoption barriers.',
              'Social impact is measured in autonomy. In public services, the most honest indicator of success is not adoption — it is how many people can use the system without needing help.',
            ],
          },
        ],
      },
      pt: {
        title: 'SEDUC Recife',
        summary:
          'Modernização da infraestrutura educacional e presença digital da cidade do Recife.',
        sections: [], // TODO: traduzir (ver docs/case-studies-raw/seduc-recife.md)
      },
    },
  },
  {
    id: 'moinhos-connect',
    translations: {
      en: {
        title: 'Moinhos Connect',
        summary: 'Health platform design to connect patients and doctors.',
        sections: [
          {
            heading: "2. Discovery: why weren't the benefits being used?",
            paragraphs: [
              'The discovery phase was structured via Lean Inception with approximately 15 stakeholders — doctors, HR, IT, finance, and operational line employees. The decision to include operational employees in the same process as doctors and managers was deliberate: in corporate health products, the gap between those who design the benefits policy and those who need to use it is often the main cause of adoption failure.',
              'The objective was not to map functionalities — it was to understand why existing tools were not being used. This distinction guided the entire process: instead of asking "what do you want in the system," sessions were conducted to reveal actual benefit access behaviors, abandonment points, and beliefs about what was or wasn\'t available.',
              "Central finding: employees were not negligent with their own health. They simply didn't know what they were entitled to or how to access it. The problem wasn't motivation — it was opacity. This defined the product's central directive: to be proactive, not reactive. To notify and guide, not just respond to requests.",
            ],
          },
          {
            heading: '3. Design: experience that prevents, not remedies',
            paragraphs: [
              'The architecture of Moinhos Connect was built around two key behaviors identified in discovery: self-scheduling and preventive monitoring. The entire information hierarchy, navigation, and notification system were designed to create these behaviors — not just to support them when the user was already motivated.',
              "Integration with legacy systems was treated as an experience requirement, not a technical detail: every exam performed should appear in the employee's history in real-time, without manual intervention. An incomplete or outdated history would destroy trust in the product — and trust, in healthcare, is the most fragile asset to recover.",
              "The notification system represented one of the project's biggest UX calibration challenges. The line between useful and intrusive in a healthcare context is narrow: excessive notifications lead to blocking; insufficient notifications recreate the original problem. Four latencies and three different formats were tested before arriving at the model that maximized openness without generating opt-outs — a decision based on behavioral data, not product preference.",
            ],
          },
          {
            heading: '4. Design craft: a design system that communicates medical trust',
            paragraphs: [
              "An exclusive design system was developed for Moinhos Connect, anchored in the hospital's consolidated visual identity — but reinterpreted for a digital context of everyday use. The decision to create a proprietary system, instead of adapting a generic library, stemmed from a clinical design premise: in healthcare products, visual familiarity with the institution is a direct factor in adoption.",
              "Remote usability tests conducted throughout the sprints precisely confirmed this hypothesis: visual familiarity with the hospital's brand directly increased employees' willingness to use the app. This data transformed the design system from a consistency deliverable into a strategic engagement lever.",
              "Each component was designed to resolve a specific tension: conveying medical authority without the cold, clinical look that people associate with hospitals. The palette, typography, and iconography patterns were calibrated for a welcoming and modern aesthetic — consistent with the institution's excellence, accessible to the employee who opens the app during a shift break.",
              'Component states specified for healthcare contexts. Exam results, vaccination history, pending appointments, and preventive alerts carry a different emotional weight than financial or pedagogical data. The visual states — neutral, attention, critical, completed — were designed with this load in mind, ensuring that the visual hierarchy communicated correct urgency without generating unnecessary anxiety.',
              'Documented handoff for scale. The system was delivered with usage documentation, design tokens, and extension guidelines — ensuring that future new modules would maintain coherence without relying on centralized review at each iteration.',
            ],
          },
          {
            heading: '5. Results: prevention is cheaper than treatment',
            paragraphs: [
              'With Moinhos Connect implemented, the first months showed consistent patterns of behavioral change. The increase in preventive appointments scheduled via the app occurred without any active HR action — validating the hypothesis that the original problem was one of access and visibility, not motivation.',
              'The reduction in calls to the benefits department regarding coverage and scheduling doubts demonstrated that a well-informed interface is also a support deflection mechanism — the same pattern observed in other digital service contexts. Qualitative feedback from employees converged around a common perception: the benefit "finally made sense." This phrase, more than any engagement metric, captures the failure of the previous system and the success of the new one.',
              'Active monitoring during the evaluation period pointed to a potential reduction in costs for late treatments — the long-term financial impact that motivated the project from the outset.',
              "Central learning: a health product only truly works if the user doesn't need to be sick to use it. Proactivity is not a feature — it's the design premise that determines whether the product has a reason to exist.",
            ],
          },
          {
            heading: '6. Strategic learnings',
            paragraphs: [
              "Opacity is the biggest enemy of adoption in corporate benefits. Employees didn't use the benefit because they didn't know what they had. Clarity of rights is, in itself, a design decision.",
              "In healthcare, visual trust is not branding — it's a functional requirement. Familiarity with the institution's identity directly increased the app's usage rate. Aesthetics and trust are not separate dimensions.",
              'Notifications need to be calibrated with behavioral data, not intuition. The difference between useful and intrusive is measurable — and ignoring it is designing for abandonment.',
              "The most effective preventive product is one that acts before the user realizes they needed it. Well-designed proactivity doesn't look like automation — it looks like care.",
            ],
          },
        ],
      },
      pt: {
        title: 'Moinhos Connect',
        summary: 'Aplicativo de saúde para conectar pacientes e médicos.',
        sections: [], // TODO: traduzir (ver docs/case-studies-raw/moinhos-connect.md)
      },
    },
  },
  {
    id: 'ayrton-senna',
    translations: {
      en: {
        title: 'Inst. Ayrton Senna',
        summary: 'Creation of educational solutions for network capacity building.',
        sections: [
          {
            heading: "2. Discovery: understanding the teacher's real routine",
            paragraphs: [
              'The discovery phase was conducted through interviews with teachers and pedagogical coordinators from different regions of Brazil — with an intentional geographic scope, given that the Institute operates in very distinct educational contexts. The focus of the sessions was the actual behavior of searching for, evaluating, and using didactic materials, not declared preferences.',
              "The central finding structurally redirected the project: the biggest bottleneck wasn't a lack of content — it was a lack of confidence that the material found was reliable and up-to-date. Teachers reported abandoning searches not because they found nothing, but because they didn't know if what they found could be taken into the classroom.",
              'Design implication: before information architecture and visual decisions, it would be necessary to build a system of perceptible curation — clear, fast, and reliable signals that the content had been validated, was current, and was appropriate for the context of use. Trust, in this product, was a functional feature, not a brand attribute.',
            ],
          },
          {
            heading: '3. Design: a library for those with little time',
            paragraphs: [
              'The platform was designed based on the principle of minimum effort, maximum value — a guideline that translated into concrete architectural and interaction decisions, not just an intention of simplicity.',
              'Dynamic filters by area of knowledge, education level, and content format were structured so that teachers could reach the desired material in less than 30 seconds. This benchmark was not arbitrary: it was defined based on time data collected in field interviews and validated in all usability testing rounds throughout the project. Flows that did not meet the goal went back for revision.',
              'Personalized profiles with access history and automatic recommendations were incorporated to reduce search effort in recurring sessions — transforming returning behavior into a loop of increasing value. Sharing tools among teachers were integrated to create community dynamics within the platform itself, without relying on external channels.',
            ],
          },
          {
            heading: '4. A difficult decision: fewer features, more focus',
            paragraphs: [
              'During the project, pressure arose to include discussion forums and co-authorship spaces in the first version. The decision taken was contrary — and supported by data: tests showed that adding social complexity before the basic search was perfectly resolved increased the abandonment rate by 34%. The mechanism was clear: a user arriving with the intention of finding specific material and encountering social layers before completing this task interpreted the platform as yet another network, not as a tool.',
              'The presentation of this data to stakeholders converted the simplification decision from a tactical retreat into a documented strategic choice. The launched MVP was smaller than the original scope — and was significantly better received precisely because of this.',
              'Consolidated principle: functionalities postponed based on evidence are not cut scope — they are complexity protected for the right moment.',
            ],
          },
          {
            heading: '5. Design craft: technical decisions that sustain trust and discovery',
            paragraphs: [
              'In a digital library for educators, design craft decisions are not just about usability — they are about epistemology: how the user evaluates whether something deserves their attention and trust.',
              "Curation signals as interface elements. Based on the research finding about trust, specific visual components were developed to communicate credibility, facilitating the teacher's choice and ensuring the pedagogical use of the materials.",
            ],
          },
          {
            heading: '6. Results: a national resource in real use',
            paragraphs: [
              "After its launch, the Ayrton Senna Institute's Digital Library began to be accessed by teachers from all states of Brazil — extending the Institute's reach beyond the regions where it operates in person, without additional distribution structure.",
              "Organic user return — without any CRM campaign or push notification — indicated that the platform had been incorporated into teachers' planning routines, not just experimented with after launch. The average session time showed deep reading, not superficial browsing — behavioral data that distinguishes a product that delivers real value from a product that merely attracts clicks.",
              'Central learning: in educational products, trust in content is more decisive than the volume of features. A smaller, well-curated, and easily accessible collection consistently outperforms a comprehensive platform where nothing seems trustworthy enough to use.',
            ],
          },
          {
            heading: '7. Strategic learnings',
            paragraphs: [
              'Trust in content is an architectural decision, not a communication one. Teachers abandon searches not due to a lack of material, but due to a lack of signals indicating whether the material is trustworthy. These signals need to be designed, not presumed.',
              "Time benchmarks transform the intention of simplicity into a verifiable criterion. 'It should be easy' doesn't guide iteration. 'The user must reach the material in less than 30 seconds' does.",
              'Test data is the most effective argument against scope creep. Presenting the abandonment rate caused by premature complexity converted a decision to cut scope into a strategic choice understood by all stakeholders.',
              'Organic return is the most honest indicator of delivered value. When the user returns without being prompted, the product has fulfilled its promise.',
            ],
          },
        ],
      },
      pt: {
        title: 'Inst. Ayrton Senna',
        summary: 'Criação de soluções educacionais para capacitação em rede.',
        sections: [], // TODO: traduzir (ver docs/case-studies-raw/ayrton-senna.md)
      },
    },
  },
  {
    id: 'nidus',
    translations: {
      en: {
        title: 'NIDUS — Federal Police Child Protection Platform',
        summary:
          'Design thinking and prototyping for a national platform that centralizes and triages child-abuse reports for the Brazilian Federal Police. Project currently in active discovery.',
        sections: [
          {
            heading: '2. Context: a legal mandate, an unsustainable volume',
            paragraphs: [
              'Brazilian legislation on child protection online now requires every internet provider operating in the country to report suspected child-abuse material through a structured channel, regardless of where the provider is based. The Federal Police receives these reports and is responsible for authenticating them, preserving a legally sound chain of custody, and triaging them so that the most urgent cases reach an investigator first.',
              'The existing intake process was not built for the resulting volume, and the strain was structural rather than a matter of individual effort: a system that decides, case by case, which report reaches a human being next needs to be trustworthy in a way that goes beyond usability. This is the mandate the platform — internally named NIDUS — exists to fulfill: not to investigate, but to receive, authenticate, enrich, and route with enough rigor that investigation can begin without doubt about the material handed to it.',
            ],
          },
          {
            heading: '3. Discovery: designing for people under sustained pressure',
            paragraphs: [
              'My role on this project is design thinking and prototyping within a small, focused team. Discovery started with stakeholder interviews across the roles that would actually touch the system day to day: the analysts who triage incoming reports, the technical leadership responsible for the platform, and the providers who submit reports in the first place — three very different relationships to the same queue.',
              'A recurring theme shaped several early decisions: the people reviewing this material are exposed to it repeatedly, and the interface itself is part of what determines whether that exposure is sustainable. That informed choices like automatic filtering/blurring of sensitive media by default and deliberately avoiding language — even in public-facing and management-facing communication — that could make the system read as a black-box "AI decision" rather than a tool that supports a human judgment call. ⚠️ These are documented product decisions from project meetings; the underlying interviews and their full detail are internal to the client engagement and not reproduced here.',
              'A structured validation flow was designed to walk an analyst through a case in a consistent order — case data, the people involved, the incoming media, and a final review — rather than leaving triage to unstructured judgment under time pressure. An early interactive prototype of this flow was reviewed with the technical stakeholders responsible for the current process and approved as a direction to continue building on.',
            ],
          },
          {
            heading: '4. Design decisions: trust before polish',
            paragraphs: [
              "The platform deliberately does not follow the Brazilian federal government's public-facing design standard for its analyst-facing side — a conscious choice to prioritize a fast, low-friction interface for people working under time pressure over visual conformity with citizen-facing government sites, since the primary users here are internal investigators, not the public.",
              'Custody and traceability requirements shaped interface decisions as much as usability did: every step needs to be attributable and time-stamped in a way that would hold up as part of an investigation, which meant validation states and audit trails were treated as core interface requirements from the first prototype, not an afterthought layered on later.',
            ],
          },
          {
            heading: '5. Where the project stands',
            paragraphs: [
              'This case study describes work in progress, not a finished product. As of this writing, the interactive prototype has been reviewed and approved as a direction by the relevant technical stakeholders, and the team is moving from prototype into build. ⚠️ Scope, architecture, and timeline are still being defined at this stage and are likely to evolve — this section will be updated as the project matures rather than presented as a completed outcome.',
            ],
          },
          {
            heading: '6. Strategic learnings',
            paragraphs: [
              'Designing for people who make high-stakes judgment calls under sustained exposure to difficult material is a different discipline from designing for efficiency alone — protecting the analyst is a legitimate design requirement, not a nice-to-have layered on top of the "real" interface.',
              'Chain-of-custody and legal defensibility are not backend concerns that design can ignore. When every action may need to be accounted for later, traceability has to be visible and understandable in the interface itself, not just logged somewhere the user never sees.',
              "Conformance to a visual standard is a means, not an end. Choosing not to follow the federal government's citizen-facing design system here was a deliberate call based on who the actual users are — a reminder that design systems exist to serve users, not the other way around.",
            ],
          },
        ],
      },
      pt: {
        title: 'NIDUS — Plataforma de Proteção Infantil da Polícia Federal',
        summary:
          'Design thinking e prototipação para uma plataforma nacional que centraliza e faz a triagem de denúncias de abuso infantil para a Polícia Federal. Projeto atualmente em descoberta ativa.',
        sections: [], // TODO: traduzir (conteúdo original em inglês, ver translations.en acima)
      },
    },
  },
  {
    id: 'frontline',
    translations: {
      en: {
        title: 'Frontline — Federal Design System Alignment',
        summary:
          'Leading the initial diagnostic to align the Federal Police internal design system with Brazil’s federal government Design System standard, before committing to a work plan. Project in initial assessment phase.',
        sections: [
          {
            heading: '2. Context: two design systems, one federal mandate',
            paragraphs: [
              'The Brazilian federal government maintains its own official Design System, and government-linked institutions are expected to align with it as a matter of digital interoperability policy. The Federal Police maintains its own internal design system, built over years for the needs of internal, investigator-facing tools rather than citizen-facing services — different technology, different constraints, different users.',
              'A formal request came in asking for an assessment of how well the internal system currently adheres to the federal standard, a document guiding internal teams on mandatory use of the official design kits, and technical guidance on evolving the internal system going forward. My role is leading the diagnostic phase that has to happen before any of that can be responsibly scoped and estimated.',
            ],
          },
          {
            heading: '3. Method: separating fact from assumption before estimating',
            paragraphs: [
              "The request itself didn't name the internal system explicitly or specify which version of the federal standard it referred to — two points that materially change the scope of the work. Rather than assume and proceed, both were documented explicitly as assumptions pending confirmation, alongside the reasoning and evidence supporting each one, so that anyone reviewing the diagnostic could see exactly what was inferred versus confirmed.",
              'This project also benefited from a prior comparative analysis between the two design systems, produced during earlier work on a related initiative. Rather than starting technical discovery from zero, the diagnostic phase focused on re-reading that existing analysis through the lens of this specific request, and identifying precisely where genuinely new research was still needed — the Figma design kits had not yet been evaluated, for instance — versus where the answer already existed and only needed to be reframed and formalized.',
            ],
          },
          {
            heading: '4. What the diagnostic found',
            paragraphs: [
              'The comparison surfaced structural gaps rather than surface-level ones: design tokens defined in a way that never actually reaches the running theme at runtime, no dark-mode support, an incompatible typographic scale, and accessibility-focused states that exist informally rather than as a defined system of tokens. These are foundational issues — the kind that require re-architecting how the system is built, not swapping out a color palette.',
              "On the more encouraging side, the federal government's official ecosystem already ships supported component libraries for the same frameworks the internal system uses, which meaningfully de-risks part of the requested technical guidance: it's less a question of building new integration tooling from scratch and more one of evaluating and recommending adoption of what the government has already published.",
              '⚠️ The diagnostic also flagged an open question that materially affects project scope: whether "alignment" is expected to mean a recommendation document, actual implementation work on the internal system, or both — this had not yet been confirmed with the requesting party at the time of writing and was raised explicitly as a blocker to committing hours to a detailed plan.',
            ],
          },
          {
            heading: '5. Where the project stands',
            paragraphs: [
              'This case study describes a diagnostic phase, not a completed engagement. A structured, high-level work plan has been drafted as a starting point for discussion, built on the assumption of full scope until the open questions above are resolved. ⚠️ Timelines, budget, and final scope are pending confirmation and are deliberately not presented here as settled facts.',
            ],
          },
          {
            heading: '6. Strategic learnings',
            paragraphs: [
              'Reusing prior work honestly is a skill in itself. The temptation on a new request is to start fresh; the more disciplined move was recognizing how much of an earlier analysis already answered this new question, and being precise about what genuinely still needed investigation.',
              "Naming assumptions explicitly protects everyone. A request that doesn't spell out its own scope isn't a gap to quietly fill in with a best guess — surfacing exactly what's assumed versus confirmed, and why, is what makes an estimate defensible later.",
              'Diagnosing before estimating prevents the most expensive kind of rework. Committing hours to a plan before scope is confirmed risks building the wrong thing efficiently — a documented open question is more valuable at this stage than a premature plan.',
            ],
          },
        ],
      },
      pt: {
        title: 'Frontline — Alinhamento a Design System Federal',
        summary:
          'Condução do diagnóstico inicial para alinhar o design system interno da Polícia Federal ao padrão de Design System do governo federal brasileiro, antes de comprometer um plano de trabalho. Projeto em fase de avaliação inicial.',
        sections: [], // TODO: traduzir (conteúdo original em inglês, ver translations.en acima)
      },
    },
  },
];

/**
 * Busca um projeto pelo id (slug).
 * @param {string} id
 * @returns {Project | undefined}
 */
export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}

/**
 * Retorna a tradução de um projeto para o idioma dado, com fallback para
 * inglês caso a tradução solicitada não exista ou esteja incompleta
 * (sections vazio).
 * @param {Project} project
 * @param {string} locale
 * @returns {ProjectTranslation}
 */
export function getProjectTranslation(project, locale) {
  const translation = project.translations[locale];
  const fallback = project.translations.en;

  if (!translation) {
    return fallback;
  }

  return {
    ...translation,
    sections: translation.sections.length > 0 ? translation.sections : fallback.sections,
  };
}
