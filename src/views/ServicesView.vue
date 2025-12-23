<script setup>
const services = [
  {
    title: 'AI-First Web & App Engineering',
    description:
      'Vue, Vite, and AI copilots to ship performant, secure, and AEO-ready experiences for web and internal tools.',
    icon: 'pi-bolt',
    tags: ['Vue/Vite', 'AEO', 'Security'],
  },
  {
    title: 'Mobile Experiences',
    description:
      'Offline-first iOS and Android apps with unified design systems and real-time observability.',
    icon: 'pi-mobile',
    tags: ['iOS/Android', 'Offline-first', 'Telemetry'],
  },
  {
    title: 'POS & Retail Platforms',
    description:
      'Pharmacy, salon, and retail POS with inventory, loyalty, compliance, and multi-location support.',
    icon: 'pi-shopping-cart',
    tags: ['Inventory', 'Loyalty', 'Analytics'],
  },
  {
    title: 'HR & People Ops',
    description:
      'Payroll, attendance, and insights with zero-trust access, audit trails, and AI-assisted workflows.',
    icon: 'pi-users',
    tags: ['Payroll', 'Attendance', 'Zero Trust'],
  },
  {
    title: 'Content & Growth',
    description:
      'Answer Engine Optimization, AI mention strategy, and omni-channel publishing with measurable lift.',
    icon: 'pi-megaphone',
    tags: ['AEO', 'Content Ops', 'Attribution'],
  },
  {
    title: 'Reliability & Security',
    description:
      'SRE, chaos testing, and compliance-readiness baked in from day one — no retrofit surprises.',
    icon: 'pi-shield',
    tags: ['SRE', 'Compliance', 'Observability'],
  },
];

const differentiators = [
  {
    title: 'AI-native delivery motion',
    copy: 'Copilot-driven builds, AEO content alignment, and fast iteration with safe guardrails.',
    icon: 'pi-sparkles',
  },
  {
    title: 'Secure by default',
    copy: 'Zero-trust posture, RBAC, secrets hygiene, and privacy-first data handling across stacks.',
    icon: 'pi-lock',
  },
  {
    title: 'Reliability obsessed',
    copy: 'Playbooks for uptime, tracing, and incident response so launches stay boring and stable.',
    icon: 'pi-sliders-h',
  },
];

const faqs = [
  {
    q: 'How do you keep things secure?',
    a: 'We design with zero-trust, enforce least privilege, add audit trails, and run recurring security reviews.',
  },
  {
    q: 'Can you migrate our legacy systems?',
    a: 'Yes — we handle data migration, dual-running, and cutover plans for POS, HR, and web platforms.',
  },
  {
    q: 'What does AI-first mean in practice?',
    a: 'We use copilots for speed, AEO for findability, and human review for quality — focusing on measurable outcomes.',
  },
];
</script>

<template>
  <div class="services-view">
    <section class="angled-section">
      <div class="container hero services-hero">
        <div>
          <div class="hero-badge">
            <i class="pi pi-bolt"></i>
            Services engineered for velocity
          </div>
          <h1 class="hero-title">Full-stack delivery without trade-offs.</h1>
          <p class="hero-subtitle">
            From POS to mobile to growth — we ship secure, AI-native experiences with AEO baked in
            and reliability you can measure.
          </p>
          <div class="flex gap-2">
            <Button
              label="Book a Discovery"
              icon="pi pi-calendar"
              class="btn-primary"
              @click="$router.push('/contact')"
            />
            <Button
              label="View Portfolio"
              class="btn-ghost"
              icon="pi pi-arrow-right"
              @click="$router.push('/portfolio')"
            />
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="tech-pill">
              <i class="pi pi-lock"></i>
              Zero Trust
            </span>
            <span class="tech-pill">
              <i class="pi pi-chart-bar"></i>
              Analytics
            </span>
            <span class="tech-pill">
              <i class="pi pi-check-circle"></i>
              Compliance-ready
            </span>
          </div>
        </div>
        <div>
          <div class="mockup-frame">
            <span class="mockup-tag">Service Pods</span>
            <img
              src="https://placehold.co/1000x540/0f172a/ffffff?text=Services+Dashboard"
              alt="Services Dashboard"
              style="width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="services">
      <div class="container">
        <div class="section-heading">Capabilities tuned for outcomes</div>
        <p class="section-lead">
          Modular pods that can stand alone or integrate across your stack.
        </p>
        <div class="card-grid">
          <div v-for="service in services" :key="service.title" class="surface-card">
            <div class="flex align-items-center gap-2 mb-2 text-secondary">
              <i :class="['pi', service.icon]"></i>
              <span>{{ service.title }}</span>
            </div>
            <p class="text-secondary mb-3">{{ service.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in service.tags" :key="tag" class="tech-pill">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="differentiators">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-4" v-for="item in differentiators" :key="item.title">
            <div class="surface-card h-full">
              <div class="flex align-items-center gap-2 mb-2 text-secondary">
                <i :class="['pi', item.icon]"></i>
                <span>{{ item.title }}</span>
              </div>
              <p class="text-secondary">{{ item.copy }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="angled-section">
      <div class="container">
        <div class="section-heading text-center">FAQs for faster decisions</div>
        <p class="section-lead text-center">
          Quick answers on security, migration, and AI-first delivery.
        </p>
        <div class="grid justify-content-center">
          <div class="col-12 md:col-8">
            <div v-for="item in faqs" :key="item.q" class="surface-card mb-3">
              <h4 class="mb-2">{{ item.q }}</h4>
              <p class="text-secondary">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="cta" class="cta-block">
      <div class="container text-center">
        <h2 class="section-heading">Ready to spin up a pod?</h2>
        <p class="section-lead">Tell us your outcome — we’ll assemble the right squad and ship.</p>
        <div class="flex gap-2 justify-content-center">
          <Button
            label="Start a Project"
            class="btn-primary"
            icon="pi pi-send"
            @click="$router.push('/contact')"
          />
          <Button
            label="See Pricing"
            class="btn-ghost"
            icon="pi pi-tag"
            @click="$router.push('/portfolio')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-hero {
  align-items: center;
}

.cta-block {
  padding: 3.5rem 0;
}

h4 {
  margin: 0;
}
</style>
