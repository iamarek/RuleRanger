import { useState } from "react";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import RadioGroup, {
  RadioOption,
} from "../../components/RadioGroup/RadioGroup";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Button from "../../components/Button/Button";
import { IconArrowForward, IconRefresh } from "@tabler/icons-react";
import { useUserPreferences } from "../useUserPreferences";
import NoProjectsCard from "./components/NoProjectsCard/NoProjectsCard";
import SelectProjectsCard from "./components/SelectProjectsCard/SelectProjectsCard";

const Home = () => {
  const { loading, preferences } = useUserPreferences();

  const isSetupComplete =
    preferences.directories.length > 0 || preferences.allowFullAccess;

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

export default Home;
