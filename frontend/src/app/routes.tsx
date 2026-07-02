import { createMemoryRouter } from "react-router";
import { RootLayout } from "./components/root-layout";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import NewReviewPage from "./pages/new-review";
import AIPipelinePage from "./pages/ai-pipeline";
import ReviewResultsPage from "./pages/review-results";
import CaseManagementPage from "./pages/case-management";
import KnowledgeBasePage from "./pages/knowledge-base";
import CompareReviewsPage from "./pages/compare-reviews";

export const router = createMemoryRouter(
  [
    { path: "/landing", Component: LandingPage },
    { path: "/login", Component: LoginPage },
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: DashboardPage },
        { path: "new-review", Component: NewReviewPage },
        { path: "ai-pipeline", Component: AIPipelinePage },
        { path: "review-results/:id", Component: ReviewResultsPage },
        { path: "cases", Component: CaseManagementPage },
        { path: "knowledge-base", Component: KnowledgeBasePage },
        { path: "compare", Component: CompareReviewsPage },
      ],
    },
  ],
  { initialEntries: ["/landing"] }
);
