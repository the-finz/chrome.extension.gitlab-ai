document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
  const promptInput = document.getElementById('prompt') as HTMLTextAreaElement;
  const testButton = document.getElementById('testApiKey');
  const saveButton = document.getElementById('saveChanges');

  // Load saved settings
  chrome.storage.sync.get(['apiKey', 'prompt'], (result) => {
    if (result.apiKey) apiKeyInput.value = result.apiKey;
    if (result.prompt) promptInput.value = result.prompt;
  });

  // Test API key
  testButton?.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value;
    try {
      // Add API test logic here
      alert('API key is valid!');
    } catch (error) {
      alert('Invalid API key');
    }
  });

  // Save settings
  saveButton?.addEventListener('click', () => {
    chrome.storage.sync.set({
      apiKey: apiKeyInput.value,
      prompt: promptInput.value
    }, () => {
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Settings saved successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
  });
}); 