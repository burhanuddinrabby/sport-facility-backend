import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { facilitiesRouter } from '../modules/facility/facilities.route';
import { bookingRoute } from '../modules/bookings/bookings.route';

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter
  },
  {
    path: "/facility",
    route: facilitiesRouter
  },
  {
    path: "/bookings",
    route: bookingRoute
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
