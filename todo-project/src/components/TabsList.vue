<template>
  <div>
    <b-list-group>
      <b-list-group-item class="container mt-2">
        <p class="fs-5">{{ task.data }}</p>
        <b-button
          variant="outline-primary"
          class="mx-3 btn-sm"
          @click="changeState(task)"
          >Change status</b-button
        >
        <b-button
          variant="outline-danger"
          class="btn-sm"
          @click="deleteTask(task)"
          >Delete</b-button
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "TabsList",
  props: ["task"],
  methods: {
    changeState(task, id) {
      this.$emit("changeButton", task, id);
    },
    deleteTask(task) {
      this.$emit("deleteButton", task);
    },
  },
};
</script>
