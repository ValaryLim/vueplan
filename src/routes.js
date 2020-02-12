import Home from './components/Home.vue';
import AcadPlan from './components/acadplan/AcadPlan.vue';
import GradProgress from './components/gradprogress/GradProgress.vue';
import ModuleInfo from './components/moduleinfo/ModuleInfo.vue';
import Reviews from './components/reviews/Reviews.vue';
import SEPMapping from './components/sepmapping/SEPMapping.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/acadplan', component: AcadPlan },
    { path: '/gradprogress', component: GradProgress },
    { path: '/moduleinfo', component: ModuleInfo },
    { path: '/reviews', component: Reviews },
    { path: '/sepmapping', component: SEPMapping },
];