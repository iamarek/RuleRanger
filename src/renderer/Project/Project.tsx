import { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Banner from "../../components/Banner/Banner";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import { useUserPreferences } from "../useUserPreferences";
import { useProjectRules } from "../useProjectRules";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { IconFolderPlus } from "@tabler/icons-react";

const Project: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { preferences } = useUserPreferences();
  const { rules, loading, error, scanProjectRules } = useProjectRules();

  const project = preferences.selectedProjects.find((p) => p.id === projectId);

  useEffect(() => {
    if (projectId && project) {
      scanProjectRules(projectId);
    }
  }, [projectId, project, scanProjectRules]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const formatRuleId = (name: string): string => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

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
            Add new rule
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-full max-h-full">
        <div className="flex-1 flex flex-col p-6">
          <div className="border border-gray-lightest rounded-lg p-6 max-w-[820px]">
            <div className="flex items-center gap-2 mb-6">
              {project.favicon && (
                <img
                  src={project.favicon}
                  alt={`${project.projectName || project.folderName} favicon`}
                  className="w-4 h-4 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <Heading variant="h2">
                {project.projectName || project.folderName} rules
              </Heading>
            </div>
            <Text size="small" color="text-gray-normal" className="mb-6">
              {project.folderPath}
            </Text>

            {loading ? (
              <Loading />
            ) : error ? (
              <Text className="text-red-600">{error}</Text>
            ) : rules.length === 0 ? (
              <Text className="text-gray-600">
                No rules found in this project
              </Text>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-200">
                  <Text
                    size="small"
                    className="font-medium col-span-2 text-gray-600"
                  >
                    Rule
                  </Text>
                  <Text
                    size="small"
                    className="font-medium col-span-2 text-gray-600"
                  >
                    Description
                  </Text>
                  <Text size="small" className="font-medium text-gray-600">
                    Last updated
                  </Text>
                </div>
                {rules.map((rule, index) => (
                  <Link
                    key={`${rule.filePath}-${index}`}
                    to={`/projects/${projectId}/rules/${formatRuleId(
                      rule.name
                    )}`}
                    className="grid grid-cols-5 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-3 -mx-3"
                  >
                    <div className="flex flex-col col-span-2 items-start">
                      <Text className="font-medium text-gray-900">
                        {rule.name}
                      </Text>
                      <div className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Always applied
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Text size="tiny" color="text-gray-normal">
                        {rule.description ||
                          "Guidelines for implementing mutations in the 9admin project"}
                      </Text>
                    </div>
                    <div className="col-span-1">
                      <Text size="tiny" color="text-gray-normal">
                        {formatDate(rule.lastModified)}
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Project;
