
import searchDonor from 'views/searchDonor';
import registerDonor from "views/registerDonor";
import About from "views/About";
  const routes = [
  {
    path: "searchDonor",
    name: "Sarch Donor",
    icon: 'fa fa-search',
    component: searchDonor,
    layout:'/PlasmaDonor/'
  },
  {
    path: "registerDonor",
    name: "DonatePlasma",
    icon: "fa fa-heart",
    component:registerDonor,
    layout: "/PlasmaDonor/",
  },
  {
    path: "about",
    name: "Help",
    icon: "fa fa-question-circle",
    component:About,
    layout: "/PlasmaDonor/",
  },
];

export default routes;
