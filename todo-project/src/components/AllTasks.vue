<template>
  <div>
    <AddInput @addButton="addTask"></AddInput>
    <b-tabs
      content-class="mt-3"
      border-variant="primary"
      align="center"
      class="fs-4"
    >
      <b-tab title="To do " active>
        <TabsList
          v-for="task in tasksUndone"
          :key="task.id"
          :task="task"
          @deleteButton="deleteTask(task.id)"
          @changeButton="updateTask(task.id)"
        />
      </b-tab>
      <b-tab title="Done ">
        <TabsList
          v-for="task in tasksDone"
          :key="task.id"
          :task="task"
          @deleteButton="deleteTask(task.id)"
          @changeButton="updateTask(task.id)"
      /></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import AddInput from "./AddInput.vue";
import TabsList from "./TabsList.vue";

export default {
  name: "AllTasks",
  components: {
    AddInput,
    TabsList,
  },
  data() {
    return {
      tasks: [],
      tasksUndone: this.tasks,
      tasksDone: [],
      id: 0,
      data: "",
    };
  },
  methods: {
    addTask(task) {
      console.log(this.tasks);
      this.tasks.push({
        id: this.id++,
        data: task,
        done: false,
      });
      this.filtrarTasks();
    },
    deleteTask(id) {
      let result = this.tasks.filter((task) => task.id != id);
      this.tasks = result;
      this.filtrarTasks();
    },
    updateTask(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id == id) {
          this.tasks[i].done = !this.tasks[i].done;
        }
      }
      this.filtrarTasks();
    },
    filtrarTasks() {
      let result = this.tasks.filter((task) => task.done != true);
      let result1 = this.tasks.filter((task) => task.done != false);
      this.tasksDone = result1;
      this.tasksUndone = result;
    },
  },
};
</script>
