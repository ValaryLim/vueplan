import AcadPlan from './components/acadplan/AcadPlan.vue';
import GradProgress from './components/gradprogress/GradProgress.vue';
import ModuleInfo from './components/moduleinfo/ModuleInfo.vue';
import SEPMapping from './components/sepmapping/SEPMapping.vue';

export const routes = [
    { path: '/', component: AcadPlan },
    { path: '/acadplan', component: AcadPlan },
    { path: '/gradprogress', component: GradProgress },
    { path: '/moduleinfo', component: ModuleInfo },
    { path: '/sepmapping', component: SEPMapping },
];