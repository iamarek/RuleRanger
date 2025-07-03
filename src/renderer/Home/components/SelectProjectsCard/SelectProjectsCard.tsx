import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserPreferences } from "../../../useUserPreferences";
import { useProjectScanner } from "../../../useProjectScanner";
import Card from "../../../../components/Card/Card";
import Heading from "../../../../components/Heading/Heading";
import ProjectsPickList from "../../../../components/ProjectsPickList/ProjectsPickList";
import Button from "../../../../components/Button/Button";
import Text from "../../../../components/Text/Text";
import { Project } from "../../../../preload/preload";

const SelectProjectsCard = () => {
  const navigate = useNavigate();
  const { preferences, updatePreferences, resetPreferences } =
    useUserPreferences();
  const { projects, loading, error, scanProjects } = useProjectScanner();
  const [checkedProjects, setCheckedProjects] = useState<Project[]>([]);

  const handleAddProjects = async () => {
    await updatePreferences({
      selectedProjects: [...preferences.selectedProjects, ...checkedProjects],
      onboardingCompletedAt: new Date().toISOString(),
    });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (preferences.allowFullAccess || preferences.directories.length > 0) {
      scanProjects();
    }
  }, [preferences.allowFullAccess, preferences.directories, scanProjects]);

  if (loading) {
    return (
      <Card className="min-h-[200px] flex items-center justify-center">
        <div className="flex items-center justify-center">
          <Text size="large">Scanning for projects...</Text>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="min-h-[200px] flex items-center justify-center">
        <div className="flex items-center justify-center">
          <Text size="large">Something went wrong</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card className="!px-0">
      <button onClick={() => resetPreferences()}>Reset</button>
      <div className="flex flex-col">
        <div className="px-6">
          <Heading variant="h2">
            Select the projects you want to include
          </Heading>
        </div>
        <div>
          {projects.length === 0 ? (
            <div className="text-gray-600">No projects found</div>
          ) : (
            <ProjectsPickList
              projects={projects}
              checkedProjects={checkedProjects}
              setCheckedProjects={setCheckedProjects}
            />
          )}
        </div>
        <div className="px-6 flex justify-end mt-8">
          <Button
            variant="primary"
            size="big"
            disabled={checkedProjects.length === 0}
            onClick={handleAddProjects}
          >
            {checkedProjects.length > 1
              ? `Add ${checkedProjects.length} selected projects`
              : "Add selected projects"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SelectProjectsCard;
