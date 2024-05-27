import express from "express";
import unAuthorizedErrorHandler from "../middleware/unAuthorizedErrorHandler.js";
import serverErrorHandler from "../middleware/serverErrorHandler.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import createdErrorHandler from "../middleware/createdErrorHandler.js";
import clientErrorHandler from "../middleware/clientErrorHandler.js";
import "dotenv/config";
import loginRouter from "../routes/login.js";
import userRouter from "../routes/user.js";
import hostRouter from "../routes/host.js";
import propertyRouter from "../routes/property.js";
import amenitieRouter from "../routes/amenitie.js";
import bookingRouter from "../routes/booking.js";
import reviewRouter from "../routes/review.js";
import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: "https://a8c28ccb61ba26ad3552e1b5b136acc4@o4507140806279168.ingest.de.sentry.io/4507226207486032",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertyRouter);
app.use("/amenities", amenitieRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/login", loginRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error Handlers
//

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
