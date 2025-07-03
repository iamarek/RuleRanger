/**
 * Split the path by `Users/<NAME_OF_USER>` and return the part before it, and after this in array
 *
 * Example: /Users/iamarek/Projects/NameOfProject -> ['/Users/iamarek', '/Projects/NameOfProject']
 */
const convertUserPathToIcon = (path: string) => {
  const userPath = path.split("/").find((part) => part.includes("Users"));
  console.log({ userPath });
  if (!userPath) return [path];

  const userName = userPath.split("/").pop();
  return [`/Projects/NameOfProject`, userName];
};

export { convertUserPathToIcon };
