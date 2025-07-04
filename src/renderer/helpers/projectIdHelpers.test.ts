import { generateUniqueProjectId } from "./projectIdHelpers";
import { Project } from "../../preload/preload";

// Test the unique ID generation
const testUniqueIdGeneration = () => {
  console.log("Testing unique ID generation...");

  // Test case 1: First project with projectName
  const existingProjects1: Project[] = [];
  const id1 = generateUniqueProjectId(
    "9admin",
    "admin-folder",
    existingProjects1
  );
  console.log("Test 1 - First project:", id1); // Should be "9admin-0"

  // Test case 2: Second project with same projectName
  const existingProjects2: Project[] = [
    {
      id: "9admin-0",
      folderName: "admin-folder",
      folderPath: "/path1",
      cursorRules: 0,
      projectName: "9admin",
    },
  ];
  const id2 = generateUniqueProjectId(
    "9admin",
    "admin-folder2",
    existingProjects2
  );
  console.log("Test 2 - Second project with same name:", id2); // Should be "9admin-1"

  // Test case 3: Project without projectName (uses folderName)
  const existingProjects3: Project[] = [
    {
      id: "9admin-0",
      folderName: "admin-folder",
      folderPath: "/path1",
      cursorRules: 0,
      projectName: "9admin",
    },
  ];
  const id3 = generateUniqueProjectId(
    undefined,
    "my-project",
    existingProjects3
  );
  console.log("Test 3 - Project without projectName:", id3); // Should be "my-project-0"

  // Test case 4: Multiple projects with same base name
  const existingProjects4: Project[] = [
    {
      id: "9admin-0",
      folderName: "admin-folder",
      folderPath: "/path1",
      cursorRules: 0,
      projectName: "9admin",
    },
    {
      id: "9admin-1",
      folderName: "admin-folder2",
      folderPath: "/path2",
      cursorRules: 0,
      projectName: "9admin",
    },
    {
      id: "9admin-2",
      folderName: "admin-folder3",
      folderPath: "/path3",
      cursorRules: 0,
      projectName: "9admin",
    },
  ];
  const id4 = generateUniqueProjectId(
    "9admin",
    "admin-folder4",
    existingProjects4
  );
  console.log("Test 4 - Fourth project with same name:", id4); // Should be "9admin-3"

  console.log("All tests completed!");
};

// Export for potential use
export { testUniqueIdGeneration };
