const { createApp, ref, nextTick } = Vue;


const API_KEY = "AIzaSyDb_3EO6zr7nf7KIQxNLFtotSA2xjGq1a0";


const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
createApp({
  setup() {
    const messages = ref([]);
    const input = ref('');
    const loading = ref(false);
    const messagesEl = ref(null);
    const inputEl = ref(null);
    const history = ref([]);

    const scrollBottom = async () => {
      await nextTick();
      if (messagesEl.value) {
        messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
      }
    };

    const autoResize = () => {
      const el = inputEl.value;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    };

    const useSuggestion = (text) => {
      input.value = text;
      nextTick(() => send());
    };

    const send = async () => {
      const text = input.value.trim();
      if (!text || loading.value) return;

      messages.value.push({ role: 'user', text });
      history.value.push({ role: 'user', parts: [{ text }] });
      input.value = '';
      loading.value = true;

      if (inputEl.value) inputEl.value.style.height = '48px';

      
      messages.value.push({ role: 'ai', text: '', typing: true });
      await scrollBottom();

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: history.value })
        });

        const data = await res.json();

        if (data.error) throw new Error(data.error.message);

        const reply = data.candidates[0].content.parts[0].text;
        history.value.push({ role: 'model', parts: [{ text: reply }] });

        messages.value[messages.value.length - 1] = {
          role: 'ai',
          text: reply,
          typing: false
        };

      } catch (err) {
        messages.value[messages.value.length - 1] = {
          role: 'ai',
          text: '❌ Xatolik: ' + err.message + '\n\nAPI kalitingizni script.js faylida tekshiring.',
          typing: false
        };
      } finally {
        loading.value = false;
        await scrollBottom();
      }
    };

    const clearChat = () => {
      messages.value = [];
      history.value = [];
    };

    return {
      messages,
      input,
      loading,
      messagesEl,
      inputEl,
      send,
      clearChat,
      useSuggestion,
      autoResize
    };
  }
}).mount('#app');
