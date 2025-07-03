import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import { useUserPreferences } from "../useUserPreferences";
import NoProjectsCard from "../Home/components/NoProjectsCard/NoProjectsCard";
import SelectProjectsCard from "../Home/components/SelectProjectsCard/SelectProjectsCard";

const Onboarding: FC = () => {
  const { loading, preferences } = useUserPreferences();
  const navigate = useNavigate();

  const isSetupComplete =
    preferences.directories.length > 0 || preferences.allowFullAccess;

  // Redirect to dashboard if onboarding is already complete
  if (preferences.onboardingCompletedAt) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col h-full max-h-full">
        <Banner
          title="Welcome to RuleRanger"
          description="Start your journey with adding your projects"
        />
        {!loading && (
          <div className="pl-10 pr-14 space-y-4 flex-1 flex flex-col">
            {isSetupComplete && !preferences.onboardingCompletedAt && (
              <SelectProjectsCard />
            )}
            {!isSetupComplete && !preferences.onboardingCompletedAt && (
              <NoProjectsCard />
            )}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Onboarding;
