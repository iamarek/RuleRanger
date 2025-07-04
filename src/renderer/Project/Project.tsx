import { FC } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Banner from "../../components/Banner/Banner";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import { useUserPreferences } from "../useUserPreferences";
import Button from "../../components/Button/Button";
import { IconFolderPlus } from "@tabler/icons-react";

const Project: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { preferences } = useUserPreferences();

  const project = preferences.selectedProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <DefaultLayout>
        <div className="flex flex-col h-full max-h-full">
          <Banner
            title="Project Not Found"
            description="The requested project could not be found"
          />
          <div className="pl-10 pr-14 space-y-6 flex-1 flex flex-col mt-12">
            <Text>
              The project you are looking for does not exist or has been
              removed.
            </Text>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout
      headerBorder
      header={
        <div>
          <Button
            variant="secondary"
            size="regular"
            iconLeft={<IconFolderPlus />}
          >
            Add new project
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-full max-h-full">
        <div className="pl-10 pr-14 space-y-6 flex-1 flex flex-col mt-12">
          <div className="max-w-[820px]">
            <div className="flex items-center gap-2 mb-4">
              {project.favicon && (
                <img
                  src={project.favicon}
                  alt={`${project.projectName || project.folderName} favicon`}
                  className="w-6 h-6 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <Heading variant="h2">
                {project.projectName || project.folderName}
              </Heading>
            </div>

            <div className="space-y-4">
              <div>
                <Text size="small" className="font-medium text-gray-600 mb-1">
                  Project ID
                </Text>
                <Text>{project.id}</Text>
              </div>

              <div>
                <Text size="small" className="font-medium text-gray-600 mb-1">
                  Folder Path
                </Text>
                <Text>{project.folderPath}</Text>
              </div>

              <div>
                <Text size="small" className="font-medium text-gray-600 mb-1">
                  Folder Name
                </Text>
                <Text>{project.folderName}</Text>
              </div>

              {project.projectName && (
                <div>
                  <Text size="small" className="font-medium text-gray-600 mb-1">
                    Project Name
                  </Text>
                  <Text>{project.projectName}</Text>
                </div>
              )}

              <div>
                <Text size="small" className="font-medium text-gray-600 mb-1">
                  Cursor Rules Count
                </Text>
                <Text>{project.cursorRules}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Project;
