<template>
    <div>
        <!-- set academic plan to the home screen -->
        <acad-plan></acad-plan>
    </div>
</template>

<script>
import AcadPlan from './acadplan/AcadPlan.vue';

export default {
  name: 'App',
  components: {
    acadPlan: AcadPlan,
  }
}
</script>