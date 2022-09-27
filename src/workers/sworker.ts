interface systemMessage {
  unitId: string;
  type: string;
  system: string;
}

let event_source: EventSource | null = null;
let messages: systemMessage[] = [];
let interval: number | null = null;

self.onmessage = (message) => {
  if (
    message.data === 'connect' &&
    event_source === null &&
    interval === null
  ) {
    console.log('connect');
    event_source = new EventSource('http://localhost:5005/stream');

    event_source.addEventListener('clear', (event: MessageEvent) => {
      const data = event.data;
      console.log(data);
      if (data === 'all') {
        messages = [];
      }
      self.postMessage({ command: 'clear' });
    });

    event_source.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      messages = messages.concat(data);
    });

    interval = setInterval(() => {
      self.postMessage({ command: 'message', messages });
      messages = [];
    }, 1000);
  } else if (message.data === 'disconnect') {
    if (event_source !== null) {
      event_source.close();
      messages = [];
      event_source = null;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  }
};
