<template>
  <div class="container col-12 col-lg-6 my-5">
    <b-input-group>
      <template #prepend>
        <b-input-group-text col-2 v-model="task">New task</b-input-group-text>
      </template>
      <b-form-input v-model="task"></b-form-input>
      <div></div>
      <b-button size="md" variant="success" @click="addTask(task)">
        <b-icon icon="plus-circle"></b-icon>
      </b-button>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "AddInput",
  props: {
    msg: String,
  },
  data() {
    return {
      task: "",
    };
  },
  methods: {
    addTask(task, id) {
      this.$emit("addButton", task, id);
    },
  },
};
</script>
