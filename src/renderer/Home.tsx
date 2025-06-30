import { useState } from "react";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import Heading from "../components/Heading/Heading";
import RadioGroup, { RadioOption } from "../components/RadioGroup/RadioGroup";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Button from "../components/Button/Button";
import { IconArrowForward, IconRefresh } from "@tabler/icons-react";
import { useUserPreferences } from "./useUserPreferences";

const projectSetupOptions: RadioOption[] = [
  {
    value: "scan",
    label: "Scan all the files on your Mac",
    description: "You will have to grant access to some parts of your Mac",
    labelSuffix: "Recommended",
  },
  {
    value: "select",
    label: "Select directory, where all your projects live",
    description: "You might have to grant access to some parts of your Mac",
  },
];

const NoProjectsCard = () => {
  const [selectedOption, setSelectedOption] = useState("scan");
  const { preferences, setPreferences, resetPreferences } =
    useUserPreferences();
  console.log({ preferences });

  const handleSelection = async () => {
    if (selectedOption === "scan") {
      setPreferences({
        ...preferences,
        allowFullAccess: true,
      });
    } else {
      const selectedDirectory = await window.api.selectDirectory();
      if (selectedDirectory) {
        setPreferences({
          ...preferences,
          directories: [...preferences.directories, selectedDirectory],
        });
      }
    }
  };

  const handleReset = async () => {
    await resetPreferences();
    console.log("Preferences reset to default state");
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <Heading variant="h2">How do you want to link your projects?</Heading>
          <Button
            size="regular"
            variant="secondary"
            iconRight={<IconRefresh size={16} />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <RadioGroup
          options={projectSetupOptions}
          value={selectedOption}
          onChange={setSelectedOption}
          name="project-setup"
        />
        <div className="flex justify-end">
          <Button
            size="big"
            variant="primary"
            iconRight={<IconArrowForward />}
            onClick={handleSelection}
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Home = () => {
  return (
    <DefaultLayout>
      <Banner
        title="Welcome to RuleRanger"
        description="Start your journey with adding your projects"
      />
      <div className="pl-10 pr-14 space-y-4">
        <NoProjectsCard />
      </div>
    </DefaultLayout>
  );
};

export default Home;
