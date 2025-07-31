{/* <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.min.js"></script> */}
    
        const { createApp, ref, onMounted, nextTick } = Vue;

        createApp({
            setup() {
                const messages = ref([
                    { type: 'bot-message', content: 'Hello! I am SmartChat. How can I help you today?' }
                ]);
                const newMessage = ref('');
                const messagesContainer = ref(null);

                function sendMessage() {
                    if (!newMessage.value.trim()) return;
                    
                    // Add user message
                    messages.value.push({
                        type: 'user-message',
                        content: newMessage.value
                    });
                    
                    // Generate response
                    const response = generateResponse(newMessage.value);
                    
                    // Add bot response after short delay
                    setTimeout(() => {
                        messages.value.push({
                            type: 'bot-message',
                            content: response
                        });
                        scrollToBottom();
                    }, 500);
                    
                    newMessage.value = '';
                    scrollToBottom();
                }

                function generateResponse(message) {
                    const msg = message.toLowerCase().trim();
                    
                    // Greetings
                    if (/^(hi|hello|hey)/i.test(msg)) {
                        return "Hello! How can I assist you today?";
                    }
                    
                    // Goodbye
                    if (/^(bye|goodbye)/i.test(msg)) {
                        return "Goodbye! Have a great day!";
                    }
                    
                    // Time
                    if (/time/i.test(msg)) {
                        return `The current time is ${new Date().toLocaleTimeString()}`;
                    }
                    
                    // Date
                    if (/date/i.test(msg)) {
                        return `Today is ${new Date().toLocaleDateString()}`;
                    }
                    
                    // Math calculations
                    const mathMatch = msg.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
                    if (mathMatch) {
                        const num1 = parseFloat(mathMatch[1]);
                        const num2 = parseFloat(mathMatch[3]);
                        const op = mathMatch[2];
                        
                        let result;
                        switch(op) {
                            case '+': result = num1 + num2; break;
                            case '-': result = num1 - num2; break;
                            case '*': result = num1 * num2; break;
                            case '/': result = num1 / num2; break;
                        }
                        return `${num1} ${op} ${num2} = ${result}`;
                    }
                    
                    // Weather
                    if (/weather/i.test(msg)) {
                        return "I don't have real-time weather data, but you can check a weather service for accurate information.";
                    }
                    
                    // Default response
                    return "I'm an AI assistant. I can answer questions about time, date, do simple math, and more. What would you like to know?";
                }

                function scrollToBottom() {
                    nextTick(() => {
                        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                    });
                }

                onMounted(() => {
                    scrollToBottom();
                });

                return {
                    messages,
                    newMessage,
                    messagesContainer,
                    sendMessage
                };
            }
        }).mount('#app');
