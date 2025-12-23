<script setup>
const projects = [
  {
    title: 'MediFlow POS',
    category: 'Pharmacy / Retail',
    image: 'https://placehold.co/900x520/0f172a/ffffff?text=MediFlow+POS',
    description:
      'Enterprise-grade POS with eRx, inventory, and compliance dashboards across locations.',
    impact: '99.95% uptime, 22% faster checkout',
  },
  {
    title: 'StyleSync',
    category: 'Salon / Services',
    image: 'https://placehold.co/900x520/3b82f6/ffffff?text=StyleSync',
    description:
      'Scheduling, sales, and loyalty in one UI — synced across tablet, phone, and kiosk.',
    impact: '18% revenue lift, 30% fewer no-shows',
  },
  {
    title: 'LumiHR',
    category: 'HR / Enterprise',
    image: 'https://placehold.co/900x520/64748b/ffffff?text=LumiHR',
    description:
      'AI-assisted people ops with payroll, attendance, and analytics under zero-trust controls.',
    impact: '2x faster payroll, 40% fewer support tickets',
  },
  {
    title: 'EcoShop',
    category: 'E-commerce',
    image: 'https://placehold.co/900x520/0f172a/ffffff?text=EcoShop',
    description:
      'Sustainable D2C storefront with blazing performance and AEO-ready content architecture.',
    impact: '35% conversion lift, <1s LCP on mobile',
  },
];

const highlights = [
  { label: 'Platforms', value: 'Web · Mobile · POS · Kiosk' },
  { label: 'Practices', value: 'AEO · Zero Trust · SRE' },
  { label: 'Time to launch', value: '6–10 weeks for MVP' },
];
</script>

<template>
  <div class="portfolio-view">
    <section class="angled-section">
      <div class="container hero" style="padding-top: calc(var(--nav-height) + 1.5rem)">
        <div>
          <div class="hero-badge">
            <i class="pi pi-images"></i>
            Recent wins
          </div>
          <h1 class="hero-title">Outcomes we’ve shipped.</h1>
          <p class="hero-subtitle">
            POS, HR, web, and mobile experiences with measurable lift — built with AI-native,
            security-first delivery.
          </p>
          <div class="flex flex-wrap gap-2">
            <span v-for="item in highlights" :key="item.label" class="tech-pill">
              {{ item.label }} — {{ item.value }}
            </span>
          </div>
        </div>
        <div>
          <div class="mockup-frame">
            <span class="mockup-tag">Case Study</span>
            <img
              src="https://placehold.co/1000x540/111827/ffffff?text=Portfolio+Reel"
              alt="Portfolio Reel"
              style="width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio">
      <div class="container">
        <div class="card-grid">
          <div v-for="project in projects" :key="project.title" class="surface-card">
            <div class="mockup-frame" style="margin-bottom: 1rem">
              <img :src="project.image" :alt="project.title" style="width: 100%; display: block" />
            </div>
            <div class="flex justify-content-between align-items-center mb-2">
              <h3 class="m-0">{{ project.title }}</h3>
              <span class="text-secondary">{{ project.category }}</span>
            </div>
            <p class="text-secondary mb-3">{{ project.description }}</p>
            <div class="flex align-items-center gap-2 text-secondary mb-3">
              <i class="pi pi-chart-line"></i>
              <span>{{ project.impact }}</span>
            </div>
            <Button
              label="View Case Study"
              icon="pi pi-external-link"
              class="btn-ghost"
              size="small"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="cta" class="cta-block">
      <div class="container text-center">
        <h2 class="section-heading">Want your logo here next?</h2>
        <p class="section-lead">Let’s design the roadmap and ship the outcome together.</p>
        <div class="flex gap-2 justify-content-center">
          <Button
            label="Start a Project"
            class="btn-primary"
            icon="pi pi-send"
            @click="$router.push('/contact')"
          />
          <Button
            label="Explore Services"
            class="btn-ghost"
            icon="pi pi-th-large"
            @click="$router.push('/services')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cta-block {
  padding: 3.5rem 0;
}

h3 {
  margin: 0;
}

.m-0 {
  margin: 0;
}

.text-secondary {
  color: var(--text-secondary-color);
}
</style>
