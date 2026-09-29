# SEDUC RECIFE

EDUCATIONAL SOLUTIONS FOR THE CITY OF RECIFE.

## CHALLENGES

### 2. DISCOVERY: DISMANTLING LEGACY SYSTEMS TO UNDERSTAND REALITY

The discovery began with mapping the legacy systems used by teachers — not to replace functionality feature-for-feature, but to understand which workflows were already internalized and which were, in fact, the root cause of daily complaints. This distinction is critical: legacy systems carry learned behaviors that, if ignored, become adoption barriers in the new product.

Moderated usability tests were conducted with public school teachers, principals, and pedagogical secretaries — in the field, in real-world usage environments, not in a lab. The sessions included observation of real tasks, not just questions about declared preferences.

Main finding: 60% of teachers' daily tasks concentrated on just 3 workflows — and these 3 workflows were precisely the most poorly resolved in the legacy systems. This defined what would be built first and guided the entire backlog prioritization.

### 3. CLASS JOURNALS AND LESSON PLANS: THE CORE OF TEACHER MANAGEMENT

The Class Journals module was designed based on a concrete benchmark, defined by time data collected during field observations: a teacher should be able to enter grades, attendance, and activities for a class in less than 2 minutes per day. This number was not arbitrary — it was calculated based on the teacher's class load and the time available between lessons. The design was built to meet this goal, and every friction that prevented it was treated as an experience bug, not an interface detail.

The Lesson Plan module solved a chronic pedagogical coordination problem: each teacher planned individually, without visibility into what colleagues in the same grade or discipline were developing. The module created a shared and structured space, categorized by theme and school level according to MEC guidelines — transforming an isolated process into a collaborative practice without imposing artificial workflows.

### 4. NEWS PORTAL AND ENROLLMENT REGISTRATION: INCLUSIVE ACCESS AS A DESIGN REQUIREMENT

The Education Portal centralized the Department's official communications, replacing WhatsApp chains and printed notices that arrived days late — or didn't arrive at all. The design decision here was about reliability as a value: an official channel only works if users learn that they can depend on it.

The Enrollment Registration was the module with the greatest direct social impact within the ecosystem. The target audience were guardians with low digital literacy, often completing the process via cell phone, unfamiliar with online forms. The workflow was subjected to multiple rounds of testing with real guardians — not proxies — and iterated until 95% of participants were able to complete the process autonomously, without any external assistance. This number was not a business goal: it was an ethical design requirement for an essential public service.

### 5. DESIGN CRAFT: TECHNICAL DECISIONS FOR A MULTI-PROFILE SYSTEM AT SCALE

Designing for radical user diversity requires technical rigor beyond conventional usability. Craft decisions were as decisive as strategic ones.

Multi-profile architecture with separate contexts. Each profile — teacher, coordinator, principal, family member — accesses a distinct experience, with navigation and information hierarchy calibrated for their real objectives. "Views" of the same system were not created: independent journeys were designed that share infrastructure but do not impose complexity from one profile to another.

Design for low digital literacy as a primary constraint. Language, icon, and visual hierarchy decisions were made using the user with the lowest digital familiarity as the approval parameter — not as an exception to be dealt with later. Natural language labels, absence of technical or educational jargon, and clear visual progression between steps were specification requirements, not style suggestions.

Time benchmark as a flow acceptance criterion. The 2-minute limit for journal entry was not an aspiration — it was an acceptance criterion tested in each iteration. Flows that didn't meet the goal returned for review. This shifted the quality evaluation from subjective ("seems simple") to measurable ("is fast enough for the real usage context").

Exhaustive specification of states and edge cases. A system used by hundreds of schools simultaneously cannot have ambiguous behaviors. Each module was specified with complete states: empty, loading, connection error, outdated data, insufficient permission. In contexts of unstable connectivity — a reality for many schools in the network — failure states were treated with the same attention as success states.

Scalable component system for multiple modules. The construction of a design system shared among the modules (Journals, Lesson Plan, Portal, Enrollment, SAAP) ensured perceptual consistency for the user transitioning between contexts and reduced handoff and maintenance costs throughout the project. Component variants were documented and versioned before implementation.

### 6. RESULTS: AN ECOSYSTEM THAT CHANGED THE ROUTINE OF THOUSANDS

SEDUC Recife's digital ecosystem is now active across the entire municipal network, used by teachers, students, family members, coordinators, principals, and pedagogical teams in hundreds of schools.

The elimination of duplicate data entry returned approximately one hour of daily work to teachers who were already overloaded — a gain that doesn't appear on a dashboard but transforms the routine of those who teach. Families throughout the city began to complete enrollments online, without travel and without in-person queues, with a workflow validated to function autonomously even for those who had never filled out a digital form.

SAAP — System for Monitoring Pedagogical Actions — implemented in the ecosystem gave coordination real-time visibility into what was happening in the classroom, replacing manual reports and alignment meetings that consumed time without generating clarity.

Key learning: scale is not a guarantee of complexity. The best public systems are those that any user can use alone, on the first try — and this criterion should be the starting point of design, not the final result of testing.

### 7. STRATEGIC LEARNINGS

The user with the lowest digital literacy defines the quality ceiling of the system. Designing for the most capable user and adapting later is a logic that systematically excludes those who need the service most.

Time benchmark is a design criterion, not a vanity metric. Transforming the time taken to complete a task into a flow acceptance criterion eliminates subjectivity from reviews and guides iterations with precision.

Legacy systems carry learned behavior. Mapping what users already know how to do — even poorly — is as important as mapping what they need to do. Ignoring this is to design invisible adoption barriers.

Social impact is measured in autonomy. In public services, the most honest indicator of success is not adoption — it is how many people can use the system without needing help.
