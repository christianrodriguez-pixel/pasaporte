import { createBrowserRouter } from "react-router";
import { SplashPage } from "./pages/splash";
import { OnboardingPage } from "./pages/onboarding";
import { RegisterPage } from "./pages/register";
import { ProfileSetupPage } from "./pages/profile-setup";
import { HomePage } from "./pages/home";
import { BenefitsPage } from "./pages/benefits";
import { BenefitDetailPage } from "./pages/benefit-detail";
import { PassportPage } from "./pages/passport";
import { QRFullscreenPage } from "./pages/qr-fullscreen";
import { ExplorePage } from "./pages/explore";
import { ExploreDetailPage } from "./pages/explore-detail";
import { ProfilePage } from "./pages/profile";
import { PointsBadgesPage } from "./pages/points-badges";
import { AppLayout } from "./components/layout";

export const router = createBrowserRouter([
  { path: "/", Component: SplashPage },
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/register", Component: RegisterPage },
  { path: "/profile-setup", Component: ProfileSetupPage },
  {
    Component: AppLayout,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/benefits", Component: BenefitsPage },
      { path: "/benefits/:id", Component: BenefitDetailPage },
      { path: "/passport", Component: PassportPage },
      { path: "/explore", Component: ExplorePage },
      { path: "/explore/:id", Component: ExploreDetailPage },
      { path: "/profile", Component: ProfilePage },
      { path: "/points/badges", Component: PointsBadgesPage },
    ],
  },
  { path: "/passport/qr", Component: QRFullscreenPage },
]);
