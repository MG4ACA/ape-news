<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const note = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    name.value = '';
    email.value = '';
    note.value = '';
  }, 200);
};

const contacts = [
  { icon: 'pi-map-marker', title: 'HQ', detail: '123 Tech Plaza, Digital City' },
  { icon: 'pi-envelope', title: 'Email', detail: 'hello@lumicore.com' },
  { icon: 'pi-phone', title: 'Phone', detail: '+1 (555) 123-4567' },
];
</script>

<template>
  <div class="contact-view">
    <section class="angled-section">
      <div class="container hero" style="padding-top: calc(var(--nav-height) + 1.5rem)">
        <div>
          <div class="hero-badge">
            <i class="pi pi-send"></i>
            Let’s build together
          </div>
          <h1 class="hero-title">Tell us the outcome you need.</h1>
          <p class="hero-subtitle">
            We respond within one business day with next steps. Prefer a call? Pick a time and we’ll
            make it easy.
          </p>
          <div class="flex gap-2">
            <Button
              label="Book a Call"
              class="btn-primary"
              icon="pi pi-calendar"
              @click="$router.push('/contact')"
            />
            <Button
              label="View Services"
              class="btn-ghost"
              icon="pi pi-th-large"
              @click="$router.push('/services')"
            />
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="tech-pill">
              <i class="pi pi-lock"></i>
              Secure by default
            </span>
            <span class="tech-pill">
              <i class="pi pi-bolt"></i>
              AI-first
            </span>
            <span class="tech-pill">
              <i class="pi pi-clock"></i>
              Fast response
            </span>
          </div>
        </div>
        <div>
          <div class="mockup-frame">
            <span class="mockup-tag">Contact</span>
            <img
              src="https://placehold.co/960x520/0f172a/ffffff?text=Contact+Panel"
              alt="Contact Panel"
              style="width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="contact" style="padding-top: 3rem">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-5">
            <div class="card-grid">
              <div v-for="item in contacts" :key="item.title" class="surface-card">
                <div class="flex align-items-center gap-2 mb-2 text-secondary">
                  <i :class="['pi', item.icon]"></i>
                  <span>{{ item.title }}</span>
                </div>
                <p class="text-secondary">{{ item.detail }}</p>
              </div>
            </div>
            <div class="surface-card" style="margin-top: 1rem">
              <div class="stat-number">24h</div>
              <div class="text-secondary">Avg. initial response time</div>
            </div>
          </div>

          <div class="col-12 md:col-7">
            <div class="surface-card p-4">
              <h3 class="m-0 mb-3">Send us a message</h3>
              <form @submit.prevent="handleSubmit" class="flex flex-column gap-3">
                <div class="flex flex-column gap-2">
                  <label for="name">Name</label>
                  <InputText id="name" v-model="name" required />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="email">Email</label>
                  <InputText id="email" v-model="email" type="email" required />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="note">What do you need?</label>
                  <Textarea id="note" v-model="note" rows="5" required />
                </div>
                <Button type="submit" label="Send Message" icon="pi pi-send" class="btn-primary" />
                <Message v-if="submitted" severity="success" class="mt-2">
                  Thank you! Your message has been sent.
                </Message>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.m-0 {
  margin: 0;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.text-secondary {
  color: var(--text-secondary-color);
}
</style>
