<template>
  <div class="contact-view py-6">
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">Contact Us</h1>

      <div class="grid">
        <div class="col-12 lg:col-6">
          <Card>
            <template #title>Send us a message</template>
            <template #content>
              <form @submit.prevent="handleSubmit">
                <div class="field mb-4">
                  <label for="name" class="font-semibold mb-2 block">Name</label>
                  <InputText id="name" v-model="formData.name" class="w-full" required />
                </div>

                <div class="field mb-4">
                  <label for="email" class="font-semibold mb-2 block">Email</label>
                  <InputText
                    id="email"
                    v-model="formData.email"
                    type="email"
                    class="w-full"
                    required
                  />
                </div>

                <div class="field mb-4">
                  <label for="subject" class="font-semibold mb-2 block">Subject</label>
                  <InputText id="subject" v-model="formData.subject" class="w-full" required />
                </div>

                <div class="field mb-4">
                  <label for="message" class="font-semibold mb-2 block">Message</label>
                  <Textarea
                    id="message"
                    v-model="formData.message"
                    rows="5"
                    class="w-full"
                    required
                  />
                </div>

                <Button type="submit" label="Send Message" :loading="submitting" />
              </form>
            </template>
          </Card>
        </div>

        <div class="col-12 lg:col-6">
          <Card>
            <template #title>Contact Information</template>
            <template #content>
              <div class="flex flex-column gap-4">
                <div>
                  <h4 class="font-semibold mb-2">
                    <i class="pi pi-envelope mr-2"></i>
                    Email
                  </h4>
                  <p>info@apenews.com</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-2">
                    <i class="pi pi-phone mr-2"></i>
                    Phone
                  </h4>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 class="font-semibold mb-2">
                    <i class="pi pi-map-marker mr-2"></i>
                    Address
                  </h4>
                  <p>
                    123 News Street
                    <br />
                    Media City, MC 12345
                  </p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const submitting = ref(false);

const handleSubmit = async () => {
  submitting.value = true;

  // Simulate form submission
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your message has been sent! We will get back to you soon.',
      life: 5000,
    });

    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    submitting.value = false;
  }, 1000);
};
</script>
