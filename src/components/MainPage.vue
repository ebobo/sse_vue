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
      <tr v-for="(m, index) in messages" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ m.Type }}</td>
        <td>{{ m.UnitId }}</td>
        <td>{{ m.System }}</td>
        <td>{{ m.Timestamp }}</td>
        <td>{{ m.Acknowledged ? 'Acked' : 'Unacked' }}</td>
      </tr>
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
  data(): {
    event_source: EventSource | null;
    sse_client_id: Number;
    messages: systemMessage[];
  } {
    return {
      event_source: null,
      sse_client_id: 0,
      messages: [],
    };
  },
  props: {
    msg: {
      required: true,
      type: String,
      default: '',
    },
  },

  methods: {
    connectSSE() {
      if (this.event_source === null) {
        this.event_source = new EventSource('http://localhost:5005/stream');

        // console.log(this.event_source);

        this.event_source.addEventListener('clear', (event) => {
          const data = event.data;
          console.log(data);
          if (data === 'all') {
            this.messages = [];
          }
        });

        this.event_source.addEventListener('message', (event: MessageEvent) => {
          const data = JSON.parse(event.data);
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
  },
};

const count = ref(0);
</script>

<style scoped>
a {
  color: #42b983;
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
