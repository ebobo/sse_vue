<template>
  <h2>{{ msg }}</h2>
  <h4>client ID: {{ sse_client_id }}</h4>
  <p>
    <button
      class="button"
      :disabled="event_source !== null"
      @click="connectSSE"
    >
      Subscribe SSE
    </button>
    <button class="button" @click="disconnectSSE">Unsubscribe</button>
    <button class="button" @click="$emit('change-avatar')">
      Change Avatar
    </button>
  </p>
  <div class="Total">
    <label>Total Events:</label>
    <label>{{ messages.length }}</label>
  </div>
  <div>
    <table class="table">
      <tr>
        <th>Index</th>
        <th>State</th>
        <th>UnitID</th>
        <th>System</th>
        <th>Timestamp</th>
        <th>Acknowledged</th>
      </tr>
      <!-- <tr v-for="(m, index) in messages" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ m.Type }}</td>
        <td>{{ m.UnitId }}</td>
        <td>{{ m.System }}</td>
        <td>{{ m.Timestamp }}</td>
        <td>{{ m.Acknowledged ? 'Acked' : 'Unacked' }}</td>
      </tr> -->
    </table>
  </div>
  <!-- <li v-for="(m, index) in messages" :key="index">
    {{ index + 1 }} - {{ m.Type }} - {{ m.UnitId }} -{{ m.System }} -
    {{ m.Timestamp }} - {{ m.Acknowledged ? 'Acked' : 'Unacked' }}
  </li> -->
</template>

<script lang="ts">
import { ref } from 'vue';

interface systemMessage {
  unitId: string;
  type: string;
  system: string;
}

export default {
  emits: ['change-avatar'],
  data(): {
    event_source: EventSource | null;
    sse_client_id: Number;
    messages: systemMessage[];
    sse_worker: Worker | null;
  } {
    return {
      event_source: null,
      sse_client_id: 0,
      messages: [],
      sse_worker: null,
    };
  },
  props: {
    msg: {
      required: true,
      type: String,
      default: '',
    },
  },

  mounted() {
    this.sse_worker = new Worker('/src/workers/sworker.ts');
  },

  methods: {
    connectSSE(): void {
      if (this.event_source === null) {
        this.event_source = new EventSource('http://localhost:5005/stream');

        if (this.sse_worker) {
          this.sse_worker.postMessage('Hello, worker');
        }

        this.event_source.addEventListener('clear', (event: MessageEvent) => {
          const data = event.data;
          console.log(data);
          if (data === 'all') {
            this.messages = [];
          }
        });

        this.event_source.addEventListener('message', (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          console.log('data come in');
          this.messages = this.messages.concat(data);
        });

        // this.event_source.onmessage = (event: MessageEvent) => {
        //   const data = JSON.parse(event.data);
        //   // console.log(data.length);
        //   console.log(event);
        //   this.messages = this.messages.concat(data);
        //   // console.log(event.data);
        // };
      }
    },

    disconnectSSE() {
      if (this.event_source !== null) {
        this.event_source.close();
        this.messages = [];
        this.event_source = null;
      }
    },

    changeAvatar() {
      console.log('change avatar');
    },
  },
};

const count = ref(0);
</script>

<style scoped>
a {
  color: #42b983;
}
.button-main {
  display: block;
}

.button {
  margin-left: 10px;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

table {
  margin: auto;
  width: 60%;
  border: 3px solid #73ad21;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #73ad21;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
