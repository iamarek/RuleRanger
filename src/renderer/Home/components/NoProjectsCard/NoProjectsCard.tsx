import { useState } from "react";
import { useUserPreferences } from "../../../useUserPreferences";
import Card from "../../../../components/Card/Card";
import Heading from "../../../../components/Heading/Heading";
import Button from "../../../../components/Button/Button";
import { IconArrowForward, IconRefresh } from "@tabler/icons-react";
import RadioGroup, {
  RadioOption,
} from "../../../../components/RadioGroup/RadioGroup";

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
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <Heading variant="h2">How do you want to link your projects?</Heading>
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

export default NoProjectsCard;
